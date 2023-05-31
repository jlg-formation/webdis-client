import { webdis } from '@/webdis/Webdis'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export interface StreamItem {
  id: string
  msg: object
}

export const useStreamStore = defineStore('stream', () => {
  const items: Ref<StreamItem[]> = ref([])

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
  }

  return { items, refresh, add, reset }
})
