<script setup lang="ts">
import PingPong from '../components/redis/PingPong.vue'
</script>

<template>
  <main>
    <h1>Some visual examples about Redis:</h1>
    <nav>
      <RouterLink to="hyperloglog" class="button">Hyperloglog</RouterLink>
      <RouterLink to="stream" class="button primary">Streams</RouterLink>
    </nav>
    <PingPong />
  </main>
</template>

<style scoped lang="scss">
main {
  flex: 0;
  nav {
    margin-bottom: 3em;
  }
}
</style>
