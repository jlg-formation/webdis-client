import { webdis } from '@/webdis/Webdis'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export interface StreamItem {
  id: string
}

export const useStreamStore = defineStore('stream', () => {
  const items: Ref<StreamItem[]> = ref([])

  const add = async () => {
    await webdis.send('XADD mystream * x 10 y 3')
    await refresh()
  }

  const refresh = async () => {
    console.log('refresh')
    const result = await webdis.send('XRANGE mystream - +')
    console.log('result: ', result)
  }

  return { items, refresh, add }
})
