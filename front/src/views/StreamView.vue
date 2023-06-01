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

const handleClean = async () => {
  await streamStore.cleanProcessed()
}
</script>

<template>
  <main>
    <h1>Streams</h1>
    <div class="content">
      <nav>
        <button @click="handleRefresh" title="Refresh">
          <font-awesome-icon icon="fa-solid fa-rotate-right" />
        </button>
        <button @click="handleAdd">
          <font-awesome-icon icon="fa-solid fa-plus" />
          <span>Add Record</span>
        </button>
        <button @click="handleClean">
          <font-awesome-icon icon="fa-solid fa-recycle" />
          <span>Clean</span>
        </button>
        <button @click="handleReset" title="Delete Stream">
          <font-awesome-icon icon="fa-solid fa-trash-alt" />
        </button>
      </nav>
      <StreamObject />
      <StreamConsumerGroup v-if="streamStore.exists" />
    </div>
  </main>
</template>

<style scoped lang="scss">
div.content {
  width: 100%;
  display: flex;
  flex-flow: column;
  gap: 0.5em;
}
</style>
