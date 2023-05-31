<script setup lang="ts">
import StreamConsumer from '@/components/widgets/StreamConsumer.vue'
import { useStreamStore, type ConsumerGroup } from '@/stores/stream'

const props = defineProps<{
  consumerGroup: ConsumerGroup
}>()

const getNextCounter = () => {
  let result = 0
  for (const consumer of props.consumerGroup.consumers) {
    const name: string = consumer[1]
    const nbr = +name.replace(/^.*-(\d+)$/, '$1')
    if (nbr > result) {
      result = nbr
    }
  }
  result++
  return result
}

const handleCreateConsumer = async () => {
  const counter = getNextCounter()
  await streamStore.createConsumer(props.consumerGroup.name, `consumer-${counter}`)
}

const streamStore = useStreamStore()
</script>

<template>
  <div class="consumer-group">
    <div class="keyvalue">
      <div class="item" v-for="item in consumerGroup.info" :key="item">{{ item }}</div>
    </div>
    <StreamConsumer
      v-for="consumer in consumerGroup.consumers"
      :key="consumer"
      :consumer="consumer"
      :consumer-group-name="consumerGroup.name"
    />
    <button @click="handleCreateConsumer">Create Consumer</button>
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
