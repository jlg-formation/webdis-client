import { webdis } from '@/webdis/Webdis'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export interface StreamItem {
  id: string
  msg: object
}

export interface ConsumerGroup {
  name: string
  info: any[]
  consumers: any[]
}

export const useStreamStore = defineStore('stream', () => {
  const items: Ref<StreamItem[]> = ref([])
  const consumerGroups: Ref<ConsumerGroup[]> = ref([])

  const add = async () => {
    await webdis.send('XADD mystream 0-* x 10 y 3')
    await refresh()
  }

  const reset = async () => {
    await webdis.send('DEL mystream')
    await refresh()
  }

  const refresh = async () => {
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
      consumerGroup.consumers = consumerListResult.XINFO
    }
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

  return {
    items,
    consumerGroups,
    refresh,
    add,
    reset,
    createConsumerGroup,
    createConsumer,
    removeConsumer,
    pickOne,
  }
})
