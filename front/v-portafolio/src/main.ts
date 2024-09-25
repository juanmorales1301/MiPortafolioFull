import '@/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { useSessionStore } from '@/stores/core/auth';

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Verificar sesión al iniciar la aplicación
const sessionStore = useSessionStore();
sessionStore.checkSession();

app.mount('#app')
