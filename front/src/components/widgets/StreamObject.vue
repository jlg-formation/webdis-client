<script setup lang="ts">
import { useStreamStore } from '@/stores/stream'

const streamStore = useStreamStore()
</script>

<template>
  <div class="stream">
    <div class="item" v-for="item in streamStore.items" :key="item.id">{{ item.id }}</div>
  </div>
</template>

<style scoped lang="scss">
div.stream {
  display: flex;
  justify-content: center;

  div.item {
    border: 0.02em solid black;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
