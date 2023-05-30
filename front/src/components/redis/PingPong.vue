<script setup lang="ts">
import { webdis } from '@/webdis/Webdis'
import { ref } from 'vue'

const url = ref(webdis.url)
const result = ref('')

const handleSubmit = async () => {
  try {
    console.log('submit')
    result.value = ''
    webdis.url = url.value
    const json: { PING: [true, string] } = await webdis.send('PING')
    result.value = json.PING[1]
    if (result.value !== 'PONG') {
      throw new Error('bad value')
    }
    webdis.tested = true
  } catch (err) {
    console.log('err: ', err)
    result.value = 'connection error'
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
