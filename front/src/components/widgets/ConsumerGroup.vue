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
    <div class="header">
      <span>Consumer Group</span>
      <div @click="handleDeleteConsumerGroup" class="button">
        <font-awesome-icon icon="fa-solid fa-trash-alt" />
      </div>
    </div>
    <div class="main">
      <div class="keyvalue">
        <div class="item" v-for="(item, index) in consumerGroup.info" :key="index">{{ item }}</div>
      </div>

      <nav>
        <button @click="handleCreateConsumer">
          <font-awesome-icon icon="fa-solid fa-plus" />
          <span>Consumer</span>
        </button>
      </nav>
      <StreamConsumer
        v-for="consumer in consumerGroup.consumers"
        :key="consumer.name"
        :consumer="consumer"
        :consumer-group-name="consumerGroup.name"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
div.consumer-group {
  border: 0.02em solid black;
  display: flex;
  flex-flow: column;
  div.header {
    background-color: #ddd;
    border-bottom: 0.02em solid black;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span,
    .button {
      height: 2em;
      padding: 0 0.8em;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .button {
      cursor: pointer;
      &:hover {
        background-color: #ccc;
      }
      &:hover {
        background-color: #bbb;
      }
    }
  }
  div.main {
    display: flex;
    flex-flow: column;
    gap: 0.5em;
    padding: 0.5em;
    div.keyvalue {
      display: flex;
      align-items: center;
      height: 2em;
      gap: 0.5em;
      div.item {
        display: flex;
        gap: 0.5em;
      }
    }
  }
}
/* div.consumer-group {
  
  padding: 0.5em;
  display: flex;
  flex-flow: column;
  align-items: start;
  gap: 0.5em;

  
} */
</style>
