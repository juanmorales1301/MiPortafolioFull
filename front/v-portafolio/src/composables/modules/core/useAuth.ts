// src/composables/useAuth.ts
import { useHttp } from '@/composables/modules/core/useHttp';
import { useSessionStore } from '@/stores/core/auth';
import { useModal } from '@/composables/shared/useModal';
const { abrirAlerta, escucharEvento } = useModal();

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
      abrirAlerta('Error al autenticar', error.message, 'danger');
      return { success: false, message: error.message || 'Error en la autenticación' };
    }
  };

  const logout = () => {
    sessionStore.logout(); // Limpiar la sesión
  };


  // Escuchar los eventos de retorno del modal
  escucharEvento((action) => {
    if (action === 1) {
      console.log('Confirmación aceptada');
    } else if (action === 2) {
      console.log('Operación cancelada');
    }
  });

  return {
    login,
    logout,
  };
}
