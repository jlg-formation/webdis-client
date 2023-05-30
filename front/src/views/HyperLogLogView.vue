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
        <button>Get cardinality</button>
        <div class="cardinality">
          {{ cardinality }}
        </div>
      </form>
    </div>
  </main>
</template>

<style scoped lang="scss">
div.content {
  display: flex;
  flex-flow: column;
  align-items: start;
  gap: 0.5em;
}
form.add {
  display: flex;
  align-items: end;
  gap: 0.5em;
}

form.get {
  display: flex;
  gap: 0.5em;

  div.cardinality {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
