<script setup lang="ts">
import { useWebdisStore } from '@/stores/webdis'
import { webdis } from '@/webdis/Webdis'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const url = ref(webdis.url)
const result = ref('')
const webdisStore = useWebdisStore()
const router = useRouter()

const handleSubmit = async () => {
  try {
    webdisStore.setUrl(url.value)
    await webdisStore.checkConnection()
    result.value = 'Success!'
    router.push(webdisStore.afterConnectRoute)
  } catch (err) {
    console.log('err: ', err)
    result.value = 'Connection error'
  }
}
</script>

<template>
  <form class="connect" @submit.prevent="handleSubmit">
    <label>
      <span>Webdis URL</span>
      <input type="text" v-model="url" />
    </label>
    <button>Test Ping Pong</button>
    <div class="result">
      {{ result }}
    </div>
  </form>
</template>

<style scoped lang="scss">
form.connect {
  border: 0.02em solid #ccc;
  padding: 0.5em;
  display: flex;
  flex-flow: column;
  gap: 0.5em;

  div.result {
    height: 2em;
    display: flex;
    align-items: center;
  }
}
</style>
