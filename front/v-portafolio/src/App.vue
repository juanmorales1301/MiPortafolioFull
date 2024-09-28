<template>
  <main class="main-content">
    <RouterView />
  </main>
  <Suspense>
    <template #default>
      <ModalAction />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { defineAsyncComponent } from 'vue';

// Cargar ModalAction de manera asíncrona (lazy loading)
const ModalAction = defineAsyncComponent(() =>
  import('./components/shared/components/ModalAction.vue')
);
</script>

<style scoped>
.main-content {
  height: auto;
  display: flex;
  width: 100%;
  justify-content: center;
}
</style>
