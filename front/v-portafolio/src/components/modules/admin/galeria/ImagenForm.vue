<template>
    <div class="form-register">
        <div class="content-header">
            <h3>Registrar Nueva Imagen</h3>
        </div>

        <div class="content-form">
            <FormGroup>
                <GroupInput>
                    <InputForm v-model="titulo" :error="errors.titulo">Título de la Imagen</InputForm>
                </GroupInput>
                <GroupInput>
                    <InputForm v-model="descripcion" :error="errors.descripcion" type="textarea">
                        Descripción de la Imagen
                    </InputForm>
                </GroupInput>
                <GroupInput>
                    <InputForm v-model="url" :error="errors.url">URL de la Imagen</InputForm>
                </GroupInput>
                <GroupInput>
                    <SelectForm v-model="estado" :options="estadoOptions" label="Estado" :error="errors.estado" />
                </GroupInput>
                <GroupInput>
                    <ButtonForm @click="eventoRegistroImagen">Registrar Imagen</ButtonForm>
                </GroupInput>
            </FormGroup>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue';
import { useGaleria } from '@/composables/modules/administracion/useGaleria';
import { useModal } from '@/composables/shared/useModal';
import type { imagenModel } from '@/models/administracion/galeria.model';
import { useAlbumStore } from '@/stores/galeria/albumStore';

// Lazy loading de los componentes
const FormGroup = defineAsyncComponent(() => import('@/components/shared/forms/FormGroup.vue'));
const GroupInput = defineAsyncComponent(() => import('@/components/shared/forms/GroupInput.vue'));
const InputForm = defineAsyncComponent(() => import('@/components/shared/forms/InputForm.vue'));
const SelectForm = defineAsyncComponent(() => import('@/components/shared/forms/SelectForm.vue'));
const ButtonForm = defineAsyncComponent(() => import('@/components/shared/forms/ButtonForm.vue'));

// Variables reactivas para capturar los datos de la imagen
const titulo = ref('');
const descripcion = ref('');
const url = ref('');
const estado = ref('visible');
const { abrirAlerta } = useModal();
const { crearImagen } = useGaleria();
const albumStore = useAlbumStore();

// Opciones para el campo de estado
const estadoOptions = [
    { label: 'Visible', value: 'visible' },
    { label: 'Eliminado', value: 'eliminado' }
];

// Errores en los campos
const errors = ref({
    titulo: '',
    descripcion: '',
    url: '',
    estado: ''
});


const props = defineProps<{ albumId: string }>()

// Validar el formulario
const validarFormulario = () => {
    errors.value = {
        titulo: titulo.value ? '' : 'El título de la imagen es obligatorio',
        descripcion: descripcion.value ? '' : 'La descripción de la imagen es obligatoria',
        url: url.value ? '' : 'La URL de la imagen es obligatoria',
        estado: estado.value ? '' : 'El estado es obligatorio'
    };

    return Object.values(errors.value).every((error) => !error);
};

// Función para manejar el envío del formulario
const eventoRegistroImagen = async () => {
    if (!validarFormulario()) {
        let objValid = JSON.parse(JSON.stringify(errors.value));
        for (let key in objValid) {
            if (objValid[key] !== "") {
                abrirAlerta('Errores en el formulario', objValid[key], 'warning');
            }
        }
        return;
    }

    const nuevaImagen: imagenModel = {
        titulo: titulo.value,
        descripcion: descripcion.value,
        url: url.value,
        estado: estado.value,
        album_id: props.albumId
    };

    try {
        const response = await crearImagen(nuevaImagen);
        if (response.success) {
            await albumStore.cargarImagenesAlbum(props.albumId);
        } else {
            abrirAlerta('Error al crear imagen', response.message, 'warning');
        }
    } catch (error) {
        console.error('Error en la petición de registro', error);
    }
};
</script>

<style scoped>
.form-register {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
}

.content-header,
.content-form {
    display: flex;
    width: 100%;
}

.content-header {
    text-align: center;
    align-items: center;
    justify-content: center;
}

.content-header h3 {
    font-size: 1.6rem;
}

.content-form {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
}
</style>
