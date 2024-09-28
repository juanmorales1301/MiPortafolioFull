import { useSessionStore } from '@/stores/core/auth';
import { ref } from 'vue';
import { useModal } from '@/composables/shared/useModal';
const { abrirCargador, cerrarModal } = useModal();

export function useHttp() {
  const sessionStore = useSessionStore();

  const apiBaseUrl = ref(import.meta.env.VITE_API_BASE_URL);
  const subDom = ref(import.meta.env.VITE_API_SUB_DOM);
  const apiPort = ref(import.meta.env.VITE_API_PORT);

  const buildUrl = (path: string) => {
    return `${apiBaseUrl.value}${apiPort.value && apiPort.value !== '80' ? `:${apiPort.value}` : ''}${subDom.value ? `/${subDom.value}` : ''}${path}`;
  };

  const getHeaders = () => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (sessionStore.isLoggedIn && sessionStore.token) {
      headers['x-auth-token'] = `Bearer ${sessionStore.token}`;
    }

    return headers;
  };

  // Método GET
  const httpGet = async (path: string) => {
    const idModal = abrirCargador('Cargando...', true);
    try {
      const url = buildUrl(path);
      const response = await fetch(url, { method: 'GET', headers: getHeaders() });

      if (!response.ok) throw new Error('Error en la solicitud GET');
      return response.json();
    } finally {
      cerrarModal(idModal, -1);
    }
  };

  // Método POST
  const httpPost = async (path: string, data: any) => {
    const idModal = abrirCargador('Cargando...', true);
    try {
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
    } finally {
      cerrarModal(idModal, -1);
    }
  };

  // Método PUT
  const httpPut = async (path: string, data: any) => {
    const idModal = abrirCargador('Cargando...', true);
    try {
      const url = buildUrl(path);
      const response = await fetch(url, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.mensaje || 'Error en la solicitud PUT');
      }

      return response.json();
    } finally {
      cerrarModal(idModal, -1);
    }
  };

  // Método DELETE
  const httpDelete = async (path: string) => {
    const idModal = abrirCargador('Cargando...', true);
    try {
      const url = buildUrl(path);
      const response = await fetch(url, { method: 'DELETE', headers: getHeaders() });

      if (!response.ok) throw new Error('Error en la solicitud DELETE');
      return response.json();
    } finally {
      cerrarModal(idModal, -1);
    }
  };

  return {
    httpGet,
    httpPost,
    httpPut,
    httpDelete,
  };
}
