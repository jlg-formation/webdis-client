<script setup lang="ts">
import { useWebdisStore } from '@/stores/webdis'

const webdisStore = useWebdisStore()
</script>

<template>
  <header>
    <div class="site-id">
      <RouterLink to="/">
        <img src="/images/logo.svg" alt="Redis Client" />
        <span>Web Tester</span>
      </RouterLink>
    </div>

    <div class="status">
      <RouterLink to="/connection" class="button">{{
        webdisStore.isConnected ? `Connected to Webdis at ${webdisStore.url}` : 'Connect to Webdis'
      }}</RouterLink>
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  border-bottom: 0.02em solid black;
  height: 3em;
  display: flex;
  align-items: center;
  justify-content: space-between;

  div.site-id {
    a {
      border-right: 0.02em solid transparent;
      border-left: 0.02em solid transparent;
      border-bottom: 0.02em solid transparent;
      height: 3em;
      display: flex;
      align-items: center;
      gap: 0.5em;

      padding: 0 0.5em;

      text-decoration: inherit;
      color: inherit;

      &:hover {
        border-color: black;
        background-color: #eee;
      }

      img {
        height: 2.5em;
      }

      span {
        font-weight: bold;
        font-size: 1.3em;
      }
    }
  }

  div.status {
    display: flex;
    padding: 0 0.5em;
  }
}
</style>
