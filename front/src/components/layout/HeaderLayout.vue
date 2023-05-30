<script setup lang="ts"></script>

<template>
  <header>
    <a href="#">
      <img src="images/logo.svg" alt="Redis Client" />
      <span>Web Tester</span>
    </a>
  </header>
</template>

<style scoped lang="scss">
header {
  border-bottom: 0.02em solid black;
  height: 3em;
  display: flex;
  align-items: center;

  padding: 0 0.5em;

  a {
    border: 0.02em solid transparent;
    display: flex;
    align-items: center;
    gap: 0.5em;

    padding: 0 0.5em;

    text-decoration: inherit;
    color: inherit;

    &:hover {
      border-color: black;
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
</style>
