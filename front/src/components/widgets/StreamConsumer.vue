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

const handleClaim = async () => {
  await streamStore.claim(props.consumerGroupName, props.consumer.name)
}
</script>

<template>
  <div class="consumer">
    <div class="header">
      <span>Consumer</span>
      <div class="button" @click="handleDelete()">
        <font-awesome-icon icon="fa-solid fa-trash-alt" />
      </div>
    </div>
    <div class="main">
      <div class="keyvalue">
        <div class="item" v-for="(item, index) in consumer.info" :key="index">{{ item }}</div>
      </div>

      <nav>
        <button @click="handlePickOne()">
          <font-awesome-icon icon="fa-solid fa-arrow-down" />
          <span>Pick one entry</span>
        </button>
        <button @click="handleClaim()">
          <font-awesome-icon icon="fa-solid fa-hourglass-end" />
          <span>Claim pending &gt;10s</span>
        </button>
      </nav>

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
    </div>
  </div>
</template>

<style scoped lang="scss">
div.consumer {
  border: 0.02em solid black;
  div.header {
    background-color: #eee;
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
        background-color: #ddd;
      }
      &:hover {
        background-color: #ccc;
      }
    }
  }

  div.main {
    display: flex;
    flex-flow: column;
    gap: 0.5em;
    align-items: start;
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

  div.pendings {
    display: flex;
    gap: 0.5em;
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
