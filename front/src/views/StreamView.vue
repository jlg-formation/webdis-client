<script setup lang="ts">
import StreamObject from '@/components/widgets/StreamObject.vue'
import { useStreamStore } from '@/stores/stream'

const streamStore = useStreamStore()

const handleAdd = async () => {
  await streamStore.add()
}

const handleReset = async () => {
  await streamStore.reset()
}
</script>

<template>
  <main>
    <h1>Streams</h1>
    <button @click="handleReset">Reset</button>
    <button @click="handleAdd">Add Record</button>
    <StreamObject />
  </main>
</template>

<style scoped lang="scss"></style>
