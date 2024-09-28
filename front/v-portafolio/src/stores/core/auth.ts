import type { usuarioModel } from '@/composables/modules/administracion/useUsuario';
import { defineStore } from 'pinia';

export const useSessionStore = defineStore('session', {
  state: () => ({
    isLoggedIn: false,
    usuario: {} as usuarioModel,
    token: null as string | null,
  }),
  actions: {
    login(token: string, usuario: usuarioModel) {
      this.token = token;
      this.isLoggedIn = true;
      this.usuario = usuario;
      localStorage.setItem('token', token); 
    },
    logout() {
      this.token = null;
      this.isLoggedIn = false;
      this.usuario = {} as usuarioModel;
      localStorage.removeItem('token'); 
    },
    checkSession() {
      const token = localStorage.getItem('token');
      if (token) {
        this.token = token;
        this.isLoggedIn = true;
      }
    },
  },
});
