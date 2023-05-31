<script setup lang="ts">
import { useStreamStore, type ConsumerGroup } from '@/stores/stream'
import ConsumerWorker from '@/components/widgets/ConsumerWorker.vue'
import { ref } from 'vue'

const props = defineProps<{
  consumerGroup: ConsumerGroup
}>()

const counter = ref(props.consumerGroup.info[3])

const handleCreateWorker = async () => {
  await streamStore.createWorker(props.consumerGroup.name, `worker-${counter.value}`)
  counter.value++
}

const streamStore = useStreamStore()
console.log('streamStore: ', streamStore)
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
