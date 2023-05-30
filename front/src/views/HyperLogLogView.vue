<script setup lang="ts">
import { ref } from 'vue'

const cardinality = ref(0)
</script>

<template>
  <main>
    <h1>HyperLogLog</h1>
    <div class="content">
      <form class="add">
        <label>
          <span>Nbr of random elements to add in the set</span>
          <input type="number" value="1" />
        </label>
        <button>Add</button>
      </form>
      <form class="get">
        <div class="cardinality">
          <span>Cardinality: </span>
          <span>
            {{ cardinality }}
          </span>
        </div>
        <button>Refresh Cardinality</button>
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
