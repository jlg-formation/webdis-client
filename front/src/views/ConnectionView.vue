<script setup lang="ts">
import PingPong from '@/components/redis/PingPong.vue'
</script>

<template>
  <main>
    <h1>Setup a Webdis connection</h1>
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
