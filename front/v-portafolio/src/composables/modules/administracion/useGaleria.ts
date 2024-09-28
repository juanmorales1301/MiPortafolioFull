import { ref, type Ref } from 'vue';
import { useHttp } from '@/composables/modules/core/useHttp';
import { useModal } from '@/composables/shared/useModal';
import type { Album, Imagen } from '@/models/administracion/galeria.model';

export function useGaleria() {
    const { httpGet } = useHttp();
    const { abrirAlerta } = useModal();

    const galerias: Ref<Album[]> = ref([]);
    const images: Ref<Imagen[]> = ref([]);
    const cargando = ref(false);
    const error = ref<string | null>(null);

    // Obtiene las galerías desde la API, maneja el estado de carga y muestra mensajes de alerta
    const obtenerGalerias = async (): Promise<Album[]> => {
        cargando.value = true;
        try {
            const response = await httpGet('/galeria/album');
            if (response && response.length) {
                galerias.value = response as Album[];
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
    const obtenerImagenes = async (albumId: string): Promise<Imagen[]> => {
        cargando.value = true;
        try {
            const response = await httpGet(`/galeria/imagen?albumId=${albumId}`);
            if (response && response.length) {
                images.value = response as Imagen[];
            } else {
                abrirAlerta('Imágenes no disponibles', 'No se encontraron imágenes para este álbum.', 'warning');
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

    return {
        galerias,
        images,
        cargando,
        error,
        obtenerGalerias,
        obtenerImagenes,
    };
}
