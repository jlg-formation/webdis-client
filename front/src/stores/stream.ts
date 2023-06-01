import { webdis } from '@/webdis/Webdis'
import { getMaxHousekeepingId } from '@/utils/stream.utils'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export interface StreamItem {
  id: string
  msg: object
}

export interface ConsumerGroup {
  name: string
  info: any[]
  consumers: Consumer[]
}

export interface Consumer {
  name: string
  info: any[]
  pendings: PendingInfo[]
}

export interface PendingInfo {
  owner: string
  id: string
  elapsedTime: number
  deliveries: number
}

export const useStreamStore = defineStore('stream', () => {
  const items: Ref<StreamItem[]> = ref([])
  const consumerGroups: Ref<ConsumerGroup[]> = ref([])
  const maxHousekeepingId: Ref<string> = ref('0-0')

  const add = async () => {
    await webdis.send('XADD mystream 0-* x 10 y 3')
    await refresh()
  }

  const reset = async () => {
    await webdis.send('DEL mystream')
    await refresh()
  }

  const refresh = async () => {
    console.log('refresh')

    const result: { XRANGE: StreamItem[] } = await webdis.send('XRANGE mystream - +')
    items.value = result.XRANGE

    const consumerGroupResult: { XINFO: any[] } = await webdis.send('XINFO GROUPS mystream')
    if (consumerGroupResult.XINFO.length === 2 && consumerGroupResult.XINFO[0] === false) {
      return
    }
    consumerGroups.value = consumerGroupResult.XINFO.map((c) => ({
      name: c[1],
      info: c,
      consumers: [],
    }))

    for (const consumerGroup of consumerGroups.value) {
      const consumerListResult: { XINFO: any[] } = await webdis.send(
        `XINFO CONSUMERS mystream ${consumerGroup.name}`
      )
      console.log('consumerListResult: ', consumerListResult)
      consumerGroup.consumers = consumerListResult.XINFO.map((c) => ({
        name: c[1],
        info: c,
        pendings: [],
      }))

      const pendingResult: { XPENDING: PendingInfo[] } = await webdis.send(
        `XPENDING mystream ${consumerGroup.name} - + ${consumerGroup.info[5]}`
      )
      console.log('pendingResult: ', pendingResult)
      for (const pendingInfo of pendingResult.XPENDING) {
        console.log('pendingInfo: ', pendingInfo)
        const consumerName = pendingInfo.owner
        const consumer = consumerGroup.consumers.find((c) => c.name === consumerName)
        if (consumer === undefined) {
          console.log('consumer not found: ', consumerName)
          continue
        }
        consumer.pendings.push(pendingInfo)
      }
    }
    console.log('consumerGroups.value: ', consumerGroups.value)
    maxHousekeepingId.value = await getMaxHousekeepingId(consumerGroups.value)
  }

  const createConsumerGroup = async (name: string) => {
    await webdis.send(`XGROUP CREATE mystream ${name} 0-0`)
    refresh()
  }

  const createConsumer = async (consumerGroupName: string, consumerName: string) => {
    await webdis.send(`XGROUP CREATECONSUMER mystream ${consumerGroupName} ${consumerName}`)
    refresh()
  }

  const removeConsumer = async (consumerGroupName: string, consumerName: string) => {
    await webdis.send(`XGROUP DELCONSUMER mystream ${consumerGroupName} ${consumerName}`)
    refresh()
  }

  const pickOne = async (consumerGroupName: string, consumerName: string) => {
    await webdis.send(
      `XREADGROUP GROUP ${consumerGroupName} ${consumerName} COUNT 1 STREAMS mystream >`
    )
    refresh()
  }

  const deleteConsumerGroup = async (consumerGroupName: string) => {
    await webdis.send(`XGROUP DESTROY mystream ${consumerGroupName}`)
    refresh()
  }

  const ack = async (consumerGroupName: string, id: string) => {
    await webdis.send(`XACK mystream ${consumerGroupName} ${id}`)
    refresh()
  }

  const cleanProcessed = async () => {
    const result: { XRANGE: StreamItem[] } = await webdis.send(
      `XRANGE mystream - ${maxHousekeepingId.value}`
    )
    console.log('result: ', result)
    const ids = result.XRANGE.map((i) => i.id)
    await webdis.send(`XDEL mystream ${ids.join(' ')}`)
    refresh()
  }

  return {
    items,
    consumerGroups,
    maxHousekeepingId,
    refresh,
    add,
    reset,
    createConsumerGroup,
    deleteConsumerGroup,
    createConsumer,
    removeConsumer,
    pickOne,
    ack,
    cleanProcessed,
  }
})
