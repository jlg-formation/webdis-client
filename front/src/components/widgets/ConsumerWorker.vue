<script setup lang="ts">
import { useStreamStore } from '@/stores/stream'

const props = defineProps<{
  worker: any[]
  consumerGroupName: string
}>()

const streamStore = useStreamStore()

const handleDelete = async (workerName: string) => {
  await streamStore.removeWorker(props.consumerGroupName, workerName)
}
</script>

<template>
  <div class="consumer-worker">
    <div>Worker</div>
    <div class="info">
      <div class="item" v-for="item in worker" :key="item">{{ item }}</div>
    </div>
    <button @click="handleDelete(worker[1])">Delete</button>
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
