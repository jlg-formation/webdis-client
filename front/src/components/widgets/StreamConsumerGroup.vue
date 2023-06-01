<script setup lang="ts">
import ListConsumerGroup from '@/components/widgets/ListConsumerGroup.vue'
import { useStreamStore } from '@/stores/stream'
import { getNextCounter } from '@/utils/counter.utils'

const streamStore = useStreamStore()

const handleCreate = async () => {
  const consumerGroups = streamStore.consumerGroups
  const counter = getNextCounter(consumerGroups.map((c) => c.name))
  streamStore.createConsumerGroup(`group-${counter}`)
}
</script>

<template>
  <div class="consumer-group">
    <button @click="handleCreate">Create Consumer Group</button>
    <ListConsumerGroup />
  </div>
</template>

<style scoped lang="scss">
div.consumer-group {
  width: 100%;
  display: flex;
  align-items: start;
  flex-flow: column;
  gap: 0.5em;
  form {
    display: flex;
    align-items: end;
    gap: 0.5em;
  }
}
</style>
