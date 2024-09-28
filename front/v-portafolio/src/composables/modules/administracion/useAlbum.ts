import { useHttp } from '@/composables/modules/core/useHttp';
import { useModal } from '@/composables/shared/useModal';

export interface albumModel {
    nombre: string;
    descripcion: string;
    usuario_id: number;
    numero_imagenes: number;
    estado: string;
}

const { abrirAlerta } = useModal();

export function useAlbum() {
    const { httpPost } = useHttp();

    const crearAlbum = async (albumData: albumModel) => {
        try {
            const response = await httpPost('/galeria/album', albumData);

            if (response) {
                abrirAlerta('Álbum creado exitosamente', 'El álbum ha sido creado con éxito.', 'success');
                return { success: true, message: 'Álbum creado exitosamente' };
            } else {
                abrirAlerta('Error al crear álbum', response.mensaje || 'Error en la creación del álbum', 'warning');
                return { success: false, message: response.mensaje || 'Error al crear álbum' };
            }
        } catch (error: any) {
            abrirAlerta('Error al crear álbum', error.message, 'danger');
            return { success: false, message: error.message || 'Error al crear álbum' };
        }
    };

    return {
        crearAlbum
    };
}
