import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

// Cargar estilos dinámicamente
import('@/assets/main.css');
import('@/assets/css/shared/all.min.css');

// Cargar scripts adicionales dinámicamente
import('@/assets/js/shared/all.min.js' as any);

// Inicializar la aplicación
const app = createApp(App);

// Usar dynamic imports para optimizar el router
import('./router').then(({ default: router }) => {
    app.use(createPinia());
    app.use(router);

    // Verificar sesión al iniciar la aplicación
    import('@/stores/core/auth').then(({ useSessionStore }) => {
        const sessionStore = useSessionStore();
        sessionStore.checkSession();
        app.mount('#app');
    });
});
