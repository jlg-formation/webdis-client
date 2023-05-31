<script setup lang="ts">
import { useStreamStore } from '@/stores/stream'

defineProps<{
  worker: any[]
}>()

const streamStore = useStreamStore()
console.log('streamStore: ', streamStore)
</script>

<template>
  <div class="consumer-worker">
    <div>Worker</div>
    <div class="info">
      <div class="item" v-for="item in worker" :key="item">{{ item }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
div.consumer-worker {
  border: 0.02em solid black;
  padding: 0.5em;
  display: flex;
  flex-flow: column;
  align-items: start;

  div.info {
    display: flex;
    gap: 0.5em;
  }
}
</style>
