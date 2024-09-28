import { ref, type Ref } from 'vue';
import { useHttp } from '@/composables/modules/core/useHttp';
import { useModal } from '@/composables/shared/useModal';
import type { albumModel, imagenModel } from '@/models/administracion/galeria.model';

export function useGaleria() {
    const { httpGet, httpPost } = useHttp();
    const { abrirAlerta } = useModal();

    const galerias: Ref<albumModel[]> = ref([]);
    const images: Ref<imagenModel[]> = ref([]);
    const cargando = ref(false);
    const error = ref<string | null>(null);

    // Obtiene las galerías desde la API, maneja el estado de carga y muestra mensajes de alerta
    const obtenerGalerias = async (): Promise<albumModel[]> => {
        cargando.value = true;
        try {
            const response = await httpGet('/galeria/album');
            if (response && response.length) {
                galerias.value = response as albumModel[];
            } else {
                abrirAlerta('Galerías no disponibles', 'No se encontraron galerías.', 'warning');
            }
            cargando.value = false;
            return galerias.value;
        } catch (err: unknown) {
            const errorMsg = err instanceof Error ? err.message : 'Error al cargar las galerías';
            error.value = errorMsg;
            abrirAlerta('Error al cargar las galerías', errorMsg, 'danger');
            cargando.value = false;
            return [];
        }
    };

    // Obtiene las imágenes de un álbum específico, maneja el estado de carga y muestra mensajes de alerta
    const obtenerImagenesAlbum = async (albumId: string): Promise<imagenModel[]> => {
        cargando.value = true;
        images.value = [];
        try {
            const response = await httpGet(`/galeria/imagen/album/${albumId || 0}`);
            if (response && response.length) {
                images.value = response as imagenModel[];
            }
            cargando.value = false;
            return images.value;
        } catch (err: unknown) {
            const errorMsg = err instanceof Error ? err.message : 'Error al cargar las imágenes';
            error.value = errorMsg;
            abrirAlerta('Error al cargar las imágenes', errorMsg, 'danger');
            cargando.value = false;
            return [];
        }
    };

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

    const crearImagen = async (imagenData: imagenModel) => {
        try {
            const response = await httpPost('/galeria/imagen', imagenData);
    
            if (response) {
                abrirAlerta('Imagen creada exitosamente', 'La imagen ha sido creada con éxito.', 'success');
                return { success: true, message: 'Imagen creada exitosamente' };
            } else {
                abrirAlerta('Error al crear imagen', response.mensaje || 'Error en la creación de la imagen', 'warning');
                return { success: false, message: response.mensaje || 'Error al crear imagen' };
            }
        } catch (error: any) {
            abrirAlerta('Error al crear imagen', error.message, 'danger');
            return { success: false, message: error.message || 'Error al crear imagen' };
        }
    };
    

    return {
        galerias,
        images,
        cargando,
        error,
        obtenerGalerias,
        obtenerImagenesAlbum,
        crearAlbum,
        crearImagen
    };
}
