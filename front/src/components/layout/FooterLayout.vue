<script setup lang="ts"></script>

<template>
  <footer>
    <a href="#">Legal</a>
  </footer>
</template>

<style scoped lang="scss">
footer {
  border-top: 0.02em solid black;
  height: 3em;
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    height: 3em;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5em 2em;
    border-left: 0.02em solid transparent;
    border-right: 0.02em solid transparent;
    text-decoration: inherit;
    color: inherit;

    &:hover {
      border-color: black;
      background-color: #eee;
    }
  }
}
</style>
