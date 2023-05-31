<script setup lang="ts">
import { useStreamStore } from '@/stores/stream'

const props = defineProps<{
  consumer: any[]
  consumerGroupName: string
}>()

const streamStore = useStreamStore()

const handleDelete = async (consumerName: string) => {
  await streamStore.removeConsumer(props.consumerGroupName, consumerName)
}
</script>

<template>
  <div class="consumer">
    <div>Consumer</div>
    <div class="info">
      <div class="item" v-for="item in consumer" :key="item">{{ item }}</div>
    </div>
    <button @click="handleDelete(consumer[1])">Delete</button>
  </div>
</template>

<style scoped lang="scss">
div.consumer {
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
