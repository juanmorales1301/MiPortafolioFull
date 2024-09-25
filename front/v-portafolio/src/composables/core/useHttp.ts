// src/composables/useHttp.ts
import { useSessionStore } from '@/stores/core/auth';  // Store para manejar la sesión
import { ref } from 'vue';

export function useHttp() {
  const sessionStore = useSessionStore();

  // Acceder a las variables de entorno
  const apiBaseUrl = ref(import.meta.env.VITE_API_BASE_URL);
  const subDom = ref(import.meta.env.VITE_API_SUB_DOM);
  const apiPort = ref(import.meta.env.VITE_API_PORT);

  // Construir la URL completa
  const buildUrl = (path: string) => {
    return `${apiBaseUrl.value}:${apiPort.value}${subDom.value ? `/${subDom.value}` : ''}${path}`;
  };

  // Obtener los headers para la solicitud
  const getHeaders = () => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Incluir el token JWT si el usuario está autenticado
    if (sessionStore.isLoggedIn && sessionStore.token) {
      headers['Authorization'] = `Bearer ${sessionStore.token}`;
    }

    return headers;
  };

  // Realizar petición GET
  const httpGet = async (path: string) => {
    const url = buildUrl(path);

    const response = await fetch(url, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Error en la solicitud GET');
    }

    return response.json();
  };

  // Realizar petición POST
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

  // Función específica para el login
  const login = async (credentials: { correoElectronico: string; contrasena: string }) => {
    try {
      // Consumir el endpoint de autenticación
      const response = await httpPost('/auth/auth/autentificar', credentials);

      // Si la autenticación es exitosa, guardar el token en el store de sesión
      if (response.token) {
        sessionStore.login(response.token);  // Guardar el token en el store
        return { success: true, message: 'Autenticación exitosa' };
      } else {
        return { success: false, message: response.mensaje || 'Error de autenticación' };
      }
    } catch (error: any) {
      console.error('Error al autenticar:', error.message);
      return { success: false, message: error.message || 'Error en la autenticación' };
    }
  };

  return {
    httpGet,
    httpPost,
    login,
  };
}
