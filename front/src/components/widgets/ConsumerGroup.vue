<script setup lang="ts">
import StreamConsumer from '@/components/widgets/StreamConsumer.vue'
import { useStreamStore, type ConsumerGroup } from '@/stores/stream'
import { getNextCounter } from '@/utils/counter.utils'

const props = defineProps<{
  consumerGroup: ConsumerGroup
}>()

const handleCreateConsumer = async () => {
  const counter = getNextCounter(props.consumerGroup.consumers.map((c) => c.name))
  await streamStore.createConsumer(props.consumerGroup.name, `consumer-${counter}`)
}

const handleDeleteConsumerGroup = async () => {
  await streamStore.deleteConsumerGroup(props.consumerGroup.name)
}

const streamStore = useStreamStore()
</script>

<template>
  <div class="consumer-group">
    <button @click="handleDeleteConsumerGroup">Delete Consumer Group</button>
    <div class="keyvalue">
      <div class="item" v-for="(item, index) in consumerGroup.info" :key="index">{{ item }}</div>
    </div>
    <StreamConsumer
      v-for="consumer in consumerGroup.consumers"
      :key="consumer.name"
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
