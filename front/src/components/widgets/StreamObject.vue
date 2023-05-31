<script setup lang="ts">
import { useStreamStore } from '@/stores/stream'
import { onMounted } from 'vue'

const streamStore = useStreamStore()

onMounted(async () => {
  await streamStore.refresh()
})
</script>

<template>
  <div class="stream">
    <div class="item" v-for="item in streamStore.items" :key="item.id">
      {{ item.id.substring(2) }}
    </div>
  </div>
</template>

<style scoped lang="scss">
div.stream {
  width: 100%;
  max-width: 100ch;
  overflow-x: auto;
  display: flex;

  div.item {
    border: 0.02em solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5em 1em;
    white-space: nowrap;
  }
}
</style>
