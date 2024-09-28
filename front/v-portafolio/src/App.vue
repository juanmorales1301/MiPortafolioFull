<template>
  <main class="main-content">
    <RouterView />
  </main>
  <ModalAction />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import ModalAction from './components/shared/components/ModalAction.vue';
</script>

<style scoped>
.main-content {
  height: auto;
  display: flex;
  width: 100%;
  justify-content: center;
}
</style>
