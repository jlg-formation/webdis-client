<script setup lang="ts">
import { useStreamStore } from '@/stores/stream'
import { onMounted } from 'vue'

const canBeFlushed = (id: string, maxFlushableId: string): boolean => {
  console.log('canBeFlushed id: ', id, 'x', maxFlushableId)

  const idNbr = +id.substring(2)
  const maxFlushableIdNbr = +maxFlushableId.substring(2)
  return idNbr <= maxFlushableIdNbr
}

const streamStore = useStreamStore()

onMounted(async () => {
  await streamStore.refresh()
})
</script>

<template>
  <div class="stream">
    <div class="no-stream" v-if="!streamStore.exists">No Stream</div>
    <div
      :class="{ item: true, flushable: canBeFlushed(item.id, streamStore.maxHousekeepingId) }"
      v-for="item in streamStore.items"
      :key="item.id"
    >
      {{ item.id.substring(2) }}
    </div>
  </div>
</template>

<style scoped lang="scss">
div.stream {
  height: 3em;
  width: 100%;
  max-width: 100ch;
  overflow-x: auto;
  display: flex;
  align-items: center;

  div.item {
    border: 0.02em solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5em 1em;
    white-space: nowrap;

    &.flushable {
      background-color: #eee;
    }
  }
}
</style>
