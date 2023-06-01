import { webdis } from '@/webdis/Webdis'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWebdisStore = defineStore('webdis', () => {
  const isConnected = ref(webdis.tested)
  const url = ref(webdis.url)
  const afterConnectRoute = ref('/')

  const setUrl = (newUrl: string) => {
    url.value = newUrl
  }
  const checkConnection = async () => {
    try {
      webdis.url = url.value
      isConnected.value = await webdis.ping()
    } catch (err) {
      isConnected.value = false
      throw err
    }
  }

  return { isConnected, url, checkConnection, afterConnectRoute, setUrl }
})
