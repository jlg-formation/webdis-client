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
    const result: { XRANGE: StreamItem[] } = await webdis.send('XRANGE mystream - +')
    items.value = result.XRANGE

    const consumerGroupResult: { XINFO: any[] } = await webdis.send('XINFO GROUPS mystream')
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
    await webdis.send(`XGROUP CREATE mystream ${name} 0-0`)
    refresh()
  }

  const createWorker = async (consumerGroupName: string, workerName: string) => {
    await webdis.send(`XGROUP CREATECONSUMER mystream ${consumerGroupName} ${workerName}`)
    refresh()
  }

  const removeWorker = async (consumerGroupName: string, workerName: string) => {
    await webdis.send(`XGROUP DELCONSUMER mystream ${consumerGroupName} ${workerName}`)
    refresh()
  }

  return {
    items,
    consumerGroups,
    refresh,
    add,
    reset,
    createConsumerGroup,
    createWorker,
    removeWorker,
  }
})
