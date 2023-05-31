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
  workers: any[]
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
    console.log('refresh')
    const result: { XRANGE: StreamItem[] } = await webdis.send('XRANGE mystream - +')
    console.log('result: ', result)
    items.value = result.XRANGE

    const consumerGroupResult: { XINFO: any[] } = await webdis.send('XINFO GROUPS mystream')
    console.log('consumerGroupResult: ', consumerGroupResult)
    if (consumerGroupResult.XINFO.length === 2 && consumerGroupResult.XINFO[0] === false) {
      return
    }
    consumerGroups.value = consumerGroupResult.XINFO.map((c) => ({
      name: c[1],
      info: c,
      workers: [],
    }))

    for (const consumerGroup of consumerGroups.value) {
      const consumerListResult: { XINFO: any[] } = await webdis.send(
        `XINFO CONSUMERS mystream ${consumerGroup.name}`
      )
      console.log('consumerListResult: ', consumerListResult)
      consumerGroup.workers = consumerListResult.XINFO
    }
  }

  const createConsumerGroup = async (name: string) => {
    console.log('create consumer group')
    await webdis.send(`XGROUP CREATE mystream ${name} 0-0`)
    refresh()
  }

  const createWorker = async (consumerGroupName: string, workerName: string) => {
    console.log('create worker')
    await webdis.send(`XGROUP CREATECONSUMER mystream ${consumerGroupName} ${workerName}`)
    refresh()
  }

  return { items, consumerGroups, refresh, add, reset, createConsumerGroup, createWorker }
})
