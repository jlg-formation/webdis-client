<script setup lang="ts">
defineProps<{
  ratio: number
}>()
</script>

<template>
  <div class="progression-bar">
    <div class="ratio" :style="{ width: ratio * 100 + '%' }"></div>
  </div>
</template>

<style scoped lang="scss">
div.progression-bar {
  width: 100%;
  height: 0.1em;
  display: flex;
  background-color: #eee;

  div.ratio {
    background-color: black;
    display: flex;
    height: 0.1em;
  }
}
</style>
