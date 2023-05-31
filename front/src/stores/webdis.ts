import { webdis } from '@/webdis/Webdis'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWebdisStore = defineStore('webdis', () => {
  const isConnected = ref(webdis.tested)
  const afterConnectRoute = ref('/')
  const checkConnection = async (url: string) => {
    try {
      webdis.url = url
      isConnected.value = await webdis.ping()
    } catch (err) {
      isConnected.value = false
      throw err
    }
  }

  return { isConnected, checkConnection, afterConnectRoute }
})
