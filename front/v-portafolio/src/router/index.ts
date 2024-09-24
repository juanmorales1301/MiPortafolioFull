import HomeGaleria from '@/views/HomeGaleria.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home-galeria',
      component: HomeGaleria
    }
  ]
})

export default router
