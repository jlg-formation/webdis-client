<script setup lang="ts">
import StreamObject from '@/components/widgets/StreamObject.vue'
import { useStreamStore } from '@/stores/stream'

const streamStore = useStreamStore()

const handleAdd = async () => {
  await streamStore.add()
}
</script>

<template>
  <main>
    <h1>Streams</h1>
    <button @click="handleAdd">Add Record</button>
    <StreamObject />
  </main>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
