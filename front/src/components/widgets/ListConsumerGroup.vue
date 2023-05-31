<script setup lang="ts">
import { useStreamStore } from '@/stores/stream'
import ConsumerGroup from '@/components/widgets/ConsumerGroup.vue'

const streamStore = useStreamStore()
</script>

<template>
  <div class="consumer-group-list">
    <ConsumerGroup
      v-for="consumerGroup in streamStore.consumerGroups"
      :key="consumerGroup.name"
      :consumerGroup="consumerGroup"
    />
  </div>
</template>

<style scoped lang="scss">
div.consumer-group-list {
  width: 100%;
  display: flex;
  flex-flow: column;
  gap: 0.5em;
}
</style>
