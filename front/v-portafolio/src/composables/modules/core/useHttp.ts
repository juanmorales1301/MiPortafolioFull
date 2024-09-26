// src/composables/useHttp.ts
import { useSessionStore } from '@/stores/core/auth';
import { ref } from 'vue';

export function useHttp() {
  const sessionStore = useSessionStore();

  const apiBaseUrl = ref(import.meta.env.VITE_API_BASE_URL);
  const subDom = ref(import.meta.env.VITE_API_SUB_DOM);
  const apiPort = ref(import.meta.env.VITE_API_PORT);

  const buildUrl = (path: string) => {
    return `${apiBaseUrl.value}:${apiPort.value}${subDom.value ? `/${subDom.value}` : ''}${path}`;
  };

  const getHeaders = () => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (sessionStore.isLoggedIn && sessionStore.token) {
      headers['Authorization'] = `Bearer ${sessionStore.token}`;
    }

    return headers;
  };

  const httpGet = async (path: string) => {
    const url = buildUrl(path);
    const response = await fetch(url, { method: 'GET', headers: getHeaders() });

    if (!response.ok) throw new Error('Error en la solicitud GET');
    return response.json();
  };

  const httpPost = async (path: string, data: any) => {
    const url = buildUrl(path);
    const response = await fetch(url, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.mensaje || 'Error en la solicitud POST');
    }

    return response.json();
  };

  return {
    httpGet,
    httpPost,
  };
}
