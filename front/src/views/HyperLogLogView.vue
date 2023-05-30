<script setup lang="ts">
import { webdis } from '@/webdis/Webdis'
import { ref } from 'vue'

const cardinality = ref(0)
const total = ref(1)
const processing = ref(false)

const handleAdd = async () => {
  try {
    console.log('submit')
    processing.value = true
    for (let i = 0; i < total.value; i++) {
      await webdis.send('PFADD members ' + crypto.randomUUID())
    }
  } catch (err) {
    console.log('err: ', err)
  } finally {
    processing.value = false
  }
}

const handleGet = async () => {
  try {
    console.log('submit')
    const result: { PFCOUNT: number } = await webdis.send('PFCOUNT members')
    console.log('result: ', result)
    cardinality.value = result.PFCOUNT
  } catch (err) {
    console.log('err: ', err)
  }
}
const handleRemove = async () => {
  try {
    console.log('remove')
    await webdis.send('DEL members')
  } catch (err) {
    console.log('err: ', err)
  }
}
</script>

<template>
  <main>
    <h1>HyperLogLog</h1>
    <div class="content">
      <form class="add" @submit.prevent="handleAdd">
        <label>
          <span>Nbr of random elements to add in the set</span>
          <input type="number" v-model="total" />
        </label>
        <button :disabled="processing">Add</button>
      </form>
      <form class="get" @submit.prevent="handleGet">
        <div class="cardinality">
          <span>Cardinality: </span>
          <span>
            {{ cardinality }}
          </span>
        </div>
        <button>Refresh Cardinality</button>
      </form>
      <form class="remove" @submit.prevent="handleRemove">
        <button>Reset</button>
      </form>
    </div>
  </main>
</template>

<style scoped lang="scss">
div.content {
  display: flex;
  flex-flow: column;
  align-items: start;
  gap: 2em;
}
form.add {
  display: flex;
  align-items: end;
  gap: 0.5em;
}

form.get {
  width: 100%;
  display: flex;
  gap: 0.5em;
  justify-content: space-between;

  div.cardinality {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
  }
}
</style>
