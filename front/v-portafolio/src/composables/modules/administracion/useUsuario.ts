import { useHttp } from '@/composables/modules/core/useHttp';
import { useModal } from '@/composables/shared/useModal';
const { abrirAlerta } = useModal();

export interface usuarioModel{
  _id?: any,
  nombre: string;
  apellido: string;
  tipoIdentificacion: string;
  identificacion: string;
  direccion: string;
  correoElectronico: string;
  contrasena?: string;
  telefono: string;
}

export function useUsuario() {
  const { httpPost } = useHttp();

  const crearUsuario = async (usuarioData: usuarioModel) => {
    try {
      const response = await httpPost('/admin/usuario', usuarioData);

      if (response) {
        abrirAlerta('Usuario creado exitosamente', 'El usuario ha sido creado con éxito. Te invitamos ir a la sección de Acceso a la plataforma para iniciar sesión.', 'success');
        return { success: true, message: 'Usuario creado exitosamente' };
      } else {
        abrirAlerta('Error al crear usuario', response.mensaje || response?.mensaje, 'warning');
        return { success: false, message: response.mensaje || 'Error al crear usuario' };
      }
    } catch (error: any) {
      abrirAlerta('Error al crear usuario', error.message, 'danger');
      console.error();
      return { success: false, message: error.message || 'Error al crear usuario' };
    }
  };

  return {
    crearUsuario,
  };
}
