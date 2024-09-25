import { defineStore } from 'pinia';

export const useSessionStore = defineStore('session', {
  state: () => ({
    isLoggedIn: false,
    token: null as string | null,
  }),
  actions: {
    login(token: string) {
      this.token = token;
      this.isLoggedIn = true;
      localStorage.setItem('token', token); 
    },
    logout() {
      this.token = null;
      this.isLoggedIn = false;
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
