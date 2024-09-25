<template>
  <main class="main-content">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style scoped>
.main-content {
  height: auto;
  display: flex;
  width: 100%;
  justify-content: center;
}
</style>
