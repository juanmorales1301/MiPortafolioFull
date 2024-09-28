import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';
import { useGaleria } from '@/composables/modules/administracion/useGaleria';
import type { albumModel, imagenModel } from '@/models/administracion/galeria.model';

export const useAlbumStore = defineStore('albumStore', () => {
    const { obtenerGalerias, obtenerImagenesAlbum } = useGaleria();
    const albums: Ref<albumModel[]> = ref([]);
    const imagesAct: Ref<imagenModel[]> = ref([]);

    // Cargar los álbumes
    const cargarAlbums = async () => {
        albums.value = await obtenerGalerias();
    };

    // Cargar imagenes por album
    const cargarImagenesAlbum = async (albumId: string) => {
        imagesAct.value = await obtenerImagenesAlbum(albumId);
    };

    return {
        albums,
        imagesAct,
        cargarAlbums,
        cargarImagenesAlbum
    };
});
