<script setup lang="ts">
import { useStreamStore, type Consumer } from '@/stores/stream'

const props = defineProps<{
  consumer: Consumer
  consumerGroupName: string
}>()

const streamStore = useStreamStore()

const handleDelete = async () => {
  await streamStore.removeConsumer(props.consumerGroupName, props.consumer.name)
}
const handlePickOne = async () => {
  await streamStore.pickOne(props.consumerGroupName, props.consumer.name)
}

const handleAck = async (id: string) => {
  await streamStore.ack(props.consumerGroupName, id)
}
</script>

<template>
  <div class="consumer">
    <div>Consumer</div>
    <div class="info">
      <div class="item" v-for="(item, index) in consumer.info" :key="index">{{ item }}</div>
    </div>
    <div class="pendings">
      <div
        class="item"
        v-for="pending in consumer.pendings"
        :key="consumer.name + '-' + pending.id"
        @click="handleAck(pending.id)"
      >
        {{ pending.id.substring(2) }}
      </div>
    </div>
    <button @click="handleDelete()">Delete</button>
    <button @click="handlePickOne()">Pick One</button>
  </div>
</template>

<style scoped lang="scss">
div.consumer {
  border: 0.02em solid black;
  padding: 0.5em;
  display: flex;
  flex-flow: column;
  align-items: start;

  div.info {
    display: flex;
    gap: 0.5em;
  }

  div.pendings {
    display: flex;
    div.item {
      border: 0.02em solid black;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.5em;
      cursor: pointer;
    }
  }
}
</style>
