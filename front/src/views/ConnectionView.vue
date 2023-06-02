<script setup lang="ts">
import PingPong from '@/components/redis/PingPong.vue'
</script>

<template>
  <main>
    <h1>Setup a Webdis connection</h1>
    <PingPong />
    <div class="description">
      <p>See the webdis project to start a redis on your machine.</p>
      <p>
        <a href="https://github.com/nicolasff/webdis" target="_blank"
          >https://github.com/nicolasff/webdis</a
        >
      </p>
    </div>
  </main>
</template>

<style scoped lang="scss">
main {
  nav {
    margin-bottom: 3em;
  }
}
</style>
