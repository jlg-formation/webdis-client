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
    text-decoration: inherit;
    color: inherit;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
