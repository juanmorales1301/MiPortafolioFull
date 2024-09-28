<template>
    <div class="galeria-container">
        <div v-if="loading" class="loading">Cargando imágenes...</div>
        <div v-if="error" class="error">{{ error }}</div>

        <div class="galeria-grid">
            <div v-for="(image, index) in images" :key="index" class="galeria-item">
                <img :src="image.url" alt="Imagen" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useGaleria } from '@/composables/modules/administracion/useGaleria';
import type { Imagen } from '@/models/administracion/galeria.model';

const images = ref<Imagen[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

// Función para obtener las imágenes
const { obtenerImagenes } = useGaleria();

onMounted(async () => {
    loading.value = true;
    try {
        const albumId = '12345'; // Pasar el ID del álbum que corresponda
        images.value = await obtenerImagenes(albumId);
        loading.value = false;
    } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : 'Error al cargar las imágenes';
        error.value = errorMsg;
        loading.value = false;
    }
});
</script>

<style scoped>
.galeria-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    width: 100%;
}

.galeria-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
}

.galeria-item {
    flex: 1 1 200px;
    max-width: 200px;
    max-height: 200px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 15px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.galeria-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 15px;
}

.galeria-item:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}
</style>