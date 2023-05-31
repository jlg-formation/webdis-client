<script setup lang="ts">
import StreamObject from '@/components/widgets/StreamObject.vue'
import StreamConsumerGroup from '@/components/widgets/StreamConsumerGroup.vue'
import { useStreamStore } from '@/stores/stream'

const streamStore = useStreamStore()

const handleAdd = async () => {
  await streamStore.add()
}

const handleReset = async () => {
  await streamStore.reset()
}

const handleRefresh = async () => {
  await streamStore.refresh()
}
</script>

<template>
  <main>
    <h1>Streams</h1>
    <button @click="handleReset">Reset</button>
    <button @click="handleRefresh">Refresh</button>
    <button @click="handleAdd">Add Record</button>
    <StreamObject />
    <StreamConsumerGroup />
  </main>
</template>

<style scoped lang="scss"></style>
