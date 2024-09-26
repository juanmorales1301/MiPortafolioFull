// src/composables/useAuth.ts
import { useHttp } from '@/composables/modules/core/useHttp';
import { useSessionStore } from '@/stores/core/auth';

export function useAuth() {
  const { httpPost } = useHttp();
  const sessionStore = useSessionStore();

  const login = async (credentials: { correoElectronico: string; contrasena: string }) => {
    try {
      const response = await httpPost('/auth/auth/autentificar', credentials);

      if (response.token) {
        sessionStore.login(response.token);
        return { success: true, message: 'Autenticación exitosa' };
      } else {
        return { success: false, message: response.mensaje || 'Error de autenticación' };
      }
    } catch (error: any) {
      console.error('Error al autenticar:', error.message);
      return { success: false, message: error.message || 'Error en la autenticación' };
    }
  };

  const logout = () => {
    sessionStore.logout(); // Limpiar la sesión
  };

  return {
    login,
    logout,
  };
}
