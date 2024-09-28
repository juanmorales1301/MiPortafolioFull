<template>
    <div class="galeria-container">
        <div class="filter-galeria">
            <div class="busqueda-galeria">
                <InputForm v-model="busqueda" placeholder="Buscar por nombre o descripción..."></InputForm>
            </div>

            <div class="actions-galeria">
                <div class="cont-btns">
                    <div class="item-action" v-for="(action, index) in actions" :key="index" :title="action.tooltip"
                        @click="eventoAction(action.evento)">
                        <i :class="action.classIcon"></i>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="loading" class="loading">{{ msgCarga }}</div>
        <div v-if="error" class="error">{{ error }}</div>
        
        <div v-if="modoSlide" class="slider-content">
            <!-- Swiper para deslizar imágenes a pantalla completa -->
            <swiper :modules="[Navigation, Pagination]" navigation pagination>
                <swiper-slide v-for="(image, index) in imagenesFiltradas" :key="index">
                    <div class="content-img">
                        <div class="imagen">
                            <img :src="image.url" alt="Imagen" class="swiper-image" />
                        </div>
                        <div class="texto-img">
                            <h3>{{ image.titulo }}</h3>
                            <p>{{ image.descripcion }}</p>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>

        <div v-else class="galeria-grid">
            <!-- Cuadrícula de imágenes -->
            <div v-for="(image, index) in imagenesFiltradas" :key="index" class="galeria-item">
                <img :src="image.url" alt="Imagen" loading="lazy" />
            </div>
        </div>

    </div>
</template>


<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useGaleria } from '@/composables/modules/administracion/useGaleria';
import type { imagenModel } from '@/models/administracion/galeria.model';
import InputForm from '@/components/shared/forms/InputForm.vue';
import ImagenForm from './ImagenForm.vue';
import { useModal } from '@/composables/shared/useModal';
import { useAlbumStore } from '@/stores/galeria/albumStore';

export interface btnActionGaleria {
    evento: number,
    tooltip: string,
    classIcon: string
}

const busqueda = ref('');
const images = ref<imagenModel[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const modoSlide = ref(false); // Modo deslizador o cuadrícula
const actions = ref<btnActionGaleria[]>([
    { classIcon: 'fa-solid fa-magnifying-glass', evento: 1, tooltip: 'Buscar Imagen' },
    { classIcon: 'fa-regular fa-object-group', evento: 2, tooltip: 'Slider de imagenes' },
    { classIcon: 'fa-solid fa-table-cells', evento: 3, tooltip: 'Imagenes agrupadas' },
    { classIcon: 'fa-solid fa-plus', evento: 4, tooltip: 'Agregar Imagen' },
]);
const msgCarga = ref('Cargando imágenes...');
const idModalForm = ref<number>(0);

// Función para obtener las imágenes
const { obtenerImagenesAlbum } = useGaleria();
const { abrirModal, cerrarModal } = useModal();
const albumStore = useAlbumStore();

onMounted(async () => {
    recargarImagenes(props.albumId);
});

const props = defineProps({
    albumId: {
        type: String,
        required: true
    }
});

watch(() => props.albumId, async (newAlbumId: string) => {
    recargarImagenes(newAlbumId);
});

albumStore.$onAction((item) => {
    if (item.name === 'cargarImagenesAlbum') {
        recargarImagenes(props.albumId);
        cerrarModal(idModalForm.value, -1);
    }
});

const recargarImagenes = async (newAlbumId: string) => {
    msgCarga.value = 'Cargando imágenes...';
    loading.value = true;
    images.value = [];
    try {
        images.value = await obtenerImagenesAlbum(newAlbumId);
        if (images.value.length > 0) {
            loading.value = false;
        } else {
            msgCarga.value = 'No se encuentran imágenes en el álbum, agrega una';
        }
    } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : 'Error al cargar las imágenes';
        error.value = errorMsg;
        loading.value = false;
    }
}

const imagenesFiltradas = computed(() => {
    if (!busqueda.value.trim()) {
        return images.value;
    }
    const search = busqueda.value.toLowerCase();
    return images.value.filter(image =>
        image.titulo?.toLowerCase().includes(search) ||
        image.descripcion?.toLowerCase().includes(search)
    );
});

const eventoAction = (evento: number) => {
    switch (evento) {
        case 2: // Modo deslizador
            modoSlide.value = true;
            break;
        case 3: // Modo cuadrícula
            modoSlide.value = false;
            break;
        case 4: // Abrir modal para agregar una nueva imagen
            idModalForm.value = abrirModal({
                body: {
                    component: ImagenForm,
                    props: { albumId: props.albumId }
                },
                size: 'md'
            });
            break;
        default:
            break;
    }
}
</script>


<style scoped>
.galeria-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
}

.filter-galeria,
.cont-btns,
.actions-galeria {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
}

.filter-galeria {
    width: 100%;
    justify-content: space-between;
}

.busqueda-galeria {
    padding-left: 15px;
    width: 100%;
}

.actions-galeria {
    justify-content: flex-end;
}

.cont-btns {
    padding: 5px 10px;
    gap: 10px;
}

.item-action {
    font-size: 1.5rem;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    padding: 0px 5px;
    border-radius: 8px;
}

.item-action:hover,
.galeria-item:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.galeria-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    padding: 20px;
}

.galeria-item {
    flex: 1 1 200px;
    max-width: 200px;
    max-height: 200px;
    width: 100%;
    height: auto;
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

.slider-content {
    flex-wrap: wrap;
    justify-content: center;
    display: flex;
    position: relative;
    width: 100%;
    height: 90vh;
    background-color: rgba(0,0,0,0.02);
}

.content-img {
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    align-content: center;
}

.content-img .imagen, .content-img .texto-img{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
}

.slider-content img {
    object-fit: cover;
    border-radius: 15px;
    width: 80vh;
    max-height: 60vh;
    max-width: 80%;
}

.content-img .texto-img{
    padding: 1rem;
    display: flex;
    flex-wrap: wrap;
}

.content-img .texto-img h3, .content-img .texto-img p{
    width: 100%;
}

.content-img .texto-img p{
    text-align: justify;
    max-width: 50%;
}

.content-img .texto-img h3{
    text-align: center;
}
</style>