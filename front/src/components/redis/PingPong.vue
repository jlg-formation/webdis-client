<script setup lang="ts">
import { useWebdisStore } from '@/stores/webdis'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const result = ref('')
const webdisStore = useWebdisStore()
const url = ref(webdisStore.url === '' ? 'http://127.0.0.1:7379' : webdisStore.url)
const router = useRouter()

const handleSubmit = async () => {
  webdisStore.setUrl(url.value)
  await webdisStore.checkConnection()
  if (!webdisStore.isConnected) {
    result.value = 'Connection error'
    return
  }
  result.value = 'Success!'
  router.push(webdisStore.afterConnectRoute)
}

const handleDisconnect = async () => {
  webdisStore.setUrl('')
  await webdisStore.checkConnection()
}
</script>

<template>
  <button @click="handleDisconnect" v-if="webdisStore.isConnected">Disconnect</button>
  <form v-else class="connect" @submit.prevent="handleSubmit">
    <label>
      <span>Webdis URL</span>
      <input type="text" v-model="url" />
    </label>

    <div class="error">
      {{ result }}
    </div>
    <button class="primary">Connect</button>
  </form>
</template>

<style scoped lang="scss">
form.connect {
  border: 0.02em solid #ccc;
  padding: 0.5em;
  display: flex;
  flex-flow: column;
  gap: 0.5em;

  div.error {
    height: 2em;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
}
</style>
