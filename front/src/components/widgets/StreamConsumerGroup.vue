<script setup lang="ts">
import { useStreamStore } from '@/stores/stream'
import ListConsumerGroup from '@/components/widgets/ListConsumerGroup.vue'
import { ref } from 'vue'

const streamStore = useStreamStore()

const groupName = ref('mygroup')

const handleCreate = async () => {
  streamStore.createConsumerGroup(groupName.value)
}
</script>

<template>
  <div class="consumer-group">
    <form @submit.prevent="handleCreate">
      <label>
        <span>Consumer Group Name</span>
        <input type="text" v-model="groupName" />
      </label>
      <button>Create Consumer Group</button>
    </form>
    <ListConsumerGroup />
  </div>
</template>

<style scoped lang="scss">
div.consumer-group {
  width: 100%;
  display: flex;
  flex-flow: column;
  gap: 0.5em;
  form {
    display: flex;
    align-items: end;
    gap: 0.5em;
  }
}
</style>
