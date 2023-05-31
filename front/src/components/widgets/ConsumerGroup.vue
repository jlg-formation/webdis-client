<script setup lang="ts">
import ConsumerWorker from '@/components/widgets/ConsumerWorker.vue'
import { useStreamStore, type ConsumerGroup } from '@/stores/stream'

const props = defineProps<{
  consumerGroup: ConsumerGroup
}>()

const getNextCounter = () => {
  let result = 0
  for (const worker of props.consumerGroup.workers) {
    const name: string = worker[1]
    const nbr = +name.replace(/^.*-(\d+)$/, '$1')
    if (nbr > result) {
      result = nbr
    }
  }
  result++
  return result
}

const handleCreateWorker = async () => {
  const counter = getNextCounter()
  await streamStore.createWorker(props.consumerGroup.name, `worker-${counter}`)
}

const streamStore = useStreamStore()
</script>

<template>
  <div class="consumer-group">
    <div class="keyvalue">
      <div class="item" v-for="item in consumerGroup.info" :key="item">{{ item }}</div>
    </div>
    <ConsumerWorker
      v-for="worker in consumerGroup.workers"
      :key="worker"
      :worker="worker"
      :consumer-group-name="consumerGroup.name"
    />
    <button @click="handleCreateWorker">Create Worker</button>
  </div>
</template>

<style scoped lang="scss">
div.consumer-group {
  border: 0.02em solid black;
  padding: 0.5em;
  display: flex;
  flex-flow: column;
  align-items: start;

  div.keyvalue {
    display: flex;
    div.item {
      padding: 0.5em;
      display: flex;
      gap: 0.5em;
    }
  }
}
</style>
