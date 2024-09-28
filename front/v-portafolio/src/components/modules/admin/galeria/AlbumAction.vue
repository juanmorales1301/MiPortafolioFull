<template>
    <ButtonForm @click="crearAlbum()">
        Agregar Album &nbsp;
        <i class="fa-solid fa-plus"></i>
    </ButtonForm>
</template>

<script lang="ts" setup>
import ButtonForm from '@/components/shared/forms/ButtonForm.vue';
import { useModal } from '@/composables/shared/useModal';
import AlbumForm from './AlbumForm.vue';
import { ref } from 'vue';
import { useAlbumStore } from '@/stores/galeria/albumStore';

const albumStore = useAlbumStore();

const { abrirModal, cerrarModal } = useModal();
const idModalForm = ref(0);

const crearAlbum = () => {
    idModalForm.value = abrirModal({
        body: {
            component: AlbumForm
        }
    });
}

// Escuchar el evento de recarga de álbumes
albumStore.$onAction(({ name }) => {
    if (name === 'cargarAlbums') {
        cerrarModal(idModalForm.value, -1);
    }
});
</script>

<style scoped></style>
