<script setup lang="ts">
import ProgressionBar from '@/components/widgets/ProgressionBar.vue'
import { webdis } from '@/webdis/Webdis'
import { ref } from 'vue'

const cardinality = ref(0)
const length = ref(0)
const total = ref(1)
const processing = ref(false)
const ratio = ref(0)

const handleAdd = async () => {
  try {
    const BULK_SIZE = 1000
    processing.value = true
    ratio.value = 0
    let items: string[] = []
    for (let i = 0; i < total.value; i++) {
      items.push(crypto.randomUUID())
      ratio.value = i / total.value
      if (items.length > BULK_SIZE) {
        await webdis.send('PFADD members ' + items.join(' '))
        items = []
      }
    }
    await webdis.send('PFADD members ' + items.join(' '))
    items = []
  } catch (err) {
    console.log('err: ', err)
  } finally {
    processing.value = false
    ratio.value = 0
  }
}

const handleGet = async () => {
  try {
    const result: { PFCOUNT: number } = await webdis.send('PFCOUNT members')
    cardinality.value = result.PFCOUNT
  } catch (err) {
    console.log('err: ', err)
  }
}
const handleRemove = async () => {
  try {
    await webdis.send('DEL members')
  } catch (err) {
    console.log('err: ', err)
  }
}

const handleGetLength = async () => {
  try {
    const result: { STRLEN: number } = await webdis.send('STRLEN members')
    length.value = result.STRLEN
  } catch (err) {
    console.log('err: ', err)
  }
}
</script>

<template>
  <main>
    <h1>HyperLogLog</h1>
    <div class="content">
      <div class="add">
        <form class="add" @submit.prevent="handleAdd">
          <label>
            <span>Nbr of random elements to add in the set</span>
            <input type="number" v-model="total" />
          </label>
          <button :disabled="processing">Add</button>
        </form>
        <ProgressionBar :ratio="ratio" />
      </div>
      <form class="get" @submit.prevent="handleGet">
        <div class="cardinality">
          <span>Cardinality: </span>
          <span>
            {{ cardinality }}
          </span>
        </div>
        <button>Refresh Cardinality</button>
      </form>
      <form class="strlen" @submit.prevent="handleGetLength">
        <div class="strlen">
          <span>Length: </span>
          <span>
            {{ length }}
          </span>
        </div>
        <button>Refresh String Length</button>
      </form>
      <form class="remove" @submit.prevent="handleRemove">
        <button>Reset</button>
      </form>
    </div>
    <div class="description">
      <h1>How it works?</h1>
      <p>The hyperloglog structure in Redis is in fact a string of maximum 12304 bytes</p>
      <p>
        The hyperloglog represents a projection of a set where you can only add element, but not
        retrieve them.
      </p>
      <p>
        However, the hyperloglog allows to get the cardinality (ie. size) of the set with an small
        approximation (less than 1%). It is design to measure the size of very big set (>10^9
        elements)
      </p>
      <p>
        The primitive commands are PFADD, PFCOUNT. You can see them in
        <a href="https://redis.io/commands/?group=hyperloglog" target="_blank">the redis doc</a>
      </p>
    </div>
  </main>
</template>

<style scoped lang="scss">
div.content {
  display: flex;
  flex-flow: column;
  align-items: start;
  gap: 2em;

  div.add {
    display: flex;
    flex-flow: column;
    gap: 0.5em;
  }
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
form.strlen {
  width: 100%;
  display: flex;
  gap: 0.5em;
  justify-content: space-between;

  div.strlen {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
  }
}
</style>
