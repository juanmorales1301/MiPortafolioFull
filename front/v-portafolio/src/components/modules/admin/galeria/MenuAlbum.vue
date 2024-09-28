<template>
    <div class="contenido-menu">
        <div v-if="cargando" class="loading">Cargando galerías...</div>
        <div v-if="error" class="error">{{ error }}</div>

        <div v-for="galeria in galerias" :key="galeria.id" class="cont-item" @click="seleccionarGaleria(galeria.id)">
            <div class="item">
                <div class="item-icon">
                    <i class="fa-solid fa-images"></i>
                </div>
                <div class="item-text">
                    {{ galeria.nombre }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useGaleria } from '@/composables/modules/administracion/useGaleria';
import type { Album } from '@/models/administracion/galeria.model';

const galerias = ref<Album[]>([]);
const cargando = ref(false);
const error = ref<string | null>(null);

// Función para obtener las galerías
const { obtenerGalerias } = useGaleria();

const emit = defineEmits(['galeriaSeleccionada']);

onMounted(async () => {
    cargando.value = true;
    try {
        galerias.value = await obtenerGalerias();
        cargando.value = false;
    } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : 'Error al cargar las galerías';
        error.value = errorMsg;
        cargando.value = false;
    }
});

const seleccionarGaleria = (id: string) => {
    emit('galeriaSeleccionada', id);
};
</script>

<style scoped>
.contenido-menu {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}

.cont-item {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    padding: 5px 15px;
}

.item {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    padding: 5px 15px;
    border-radius: 20px;
    transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
}

.item:hover {
    background-color: var(--primary-color);
    color: var(--primary-text-color);
    cursor: pointer;
}

.item-icon {
    font-size: 1.4rem;
}

.item-text {
    font-size: 1.1rem;
}

.loading,
.error {
    text-align: center;
    width: 100%;
    padding: 10px;
}
</style>