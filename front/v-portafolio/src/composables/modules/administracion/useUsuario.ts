import { useHttp } from '@/composables/modules/core/useHttp';

export function useUsuario() {
  const { httpPost } = useHttp();

  const crearUsuario = async (usuarioData: {
    nombre: string;
    apellido: string;
    tipoIdentificacion: string;
    identificacion: string;
    direccion: string;
    correoElectronico: string;
    contrasena: string;
    telefono: string;
  }) => {
    try {
      const response = await httpPost('/admin/usuario', usuarioData);

      if (response) {
        return { success: true, message: 'Usuario creado exitosamente' };
      } else {
        return { success: false, message: response.mensaje || 'Error al crear usuario' };
      }
    } catch (error: any) {
      console.error('Error al crear usuario:', error.message);
      return { success: false, message: error.message || 'Error al crear usuario' };
    }
  };

  return {
    crearUsuario,
  };
}
