import { createRouter, createWebHistory } from 'vue-router';
import { useSessionStore } from '@/stores/core/auth'; // Importa el store de Pinia
console.log('Base URL ', import.meta.env.BASE_URL)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/modules/core/LoginMain.vue')
    },
    {
      path: '/home',
      name: 'home-galeria',
      component: () => import('@/views/modules/galeria/HomeGaleria.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/login'
    }
  ]
});

// Agregar un guard global para verificar si el usuario está autenticado
router.beforeEach((to, from, next) => {
  const sessionStore = useSessionStore();
  
  // Verifica si la ruta requiere autenticación
  if (to.meta.requiresAuth && !sessionStore.isLoggedIn) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
