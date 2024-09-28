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

const { abrirModal } = useModal();

const crearAlbum = () => {
    const idModal = abrirModal({
        body: {
            component: AlbumForm
        }
    });
    
    console.log(idModal);    
}
</script>

<style scoped></style>