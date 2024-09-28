<template>
    <div class="form-register">
        <div class="content-header">
            <h3>Registrar Nuevo Álbum</h3>
        </div>

        <div class="content-form">
            <FormGroup>
                <GroupInput>
                    <InputForm v-model="nombre" :error="errors.nombre">Nombre del Álbum</InputForm>
                </GroupInput>
                <GroupInput>
                    <InputForm v-model="descripcion" :error="errors.descripcion" type="textarea">Descripción del Álbum</InputForm>
                </GroupInput>
                <GroupInput>
                    <SelectForm v-model="estado" :options="estadoOptions" label="Estado" :error="errors.estado" />
                </GroupInput>
                <GroupInput>
                    <ButtonForm @click="eventoRegistroAlbum">Registrar Álbum</ButtonForm>
                </GroupInput>
            </FormGroup>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue';
import { useAlbum, type albumModel } from '@/composables/modules/administracion/useAlbum';
import { useModal } from '@/composables/shared/useModal';
import { useSessionStore } from '@/stores/core/auth';

// Lazy loading de los componentes
const FormGroup = defineAsyncComponent(() => import('@/components/shared/forms/FormGroup.vue'));
const GroupInput = defineAsyncComponent(() => import('@/components/shared/forms/GroupInput.vue'));
const InputForm = defineAsyncComponent(() => import('@/components/shared/forms/InputForm.vue'));
const SelectForm = defineAsyncComponent(() => import('@/components/shared/forms/SelectForm.vue'));
const ButtonForm = defineAsyncComponent(() => import('@/components/shared/forms/ButtonForm.vue'));

// Variables reactivas para capturar los datos del álbum
const nombre = ref('');
const descripcion = ref('');
const numeroImagenes = ref(0);
const estado = ref('activo');
const {abrirAlerta} = useModal();
const sessionStore = useSessionStore();

// Opciones para el campo de estado
const estadoOptions = [
    { label: 'Activo', value: 'activo' },
    { label: 'Eliminado', value: 'eliminado' }
];

// Errores en los campos
const errors = ref({
    nombre: '',
    descripcion: '',
    numeroImagenes: '',
    estado: ''
});

const { crearAlbum } = useAlbum();

// Validar el formulario
const validarFormulario = () => {
    errors.value = {
        nombre: nombre.value ? '' : 'El nombre del álbum es obligatorio',
        descripcion: descripcion.value ? '' : 'La descripción del álbum es obligatoria',
        numeroImagenes: numeroImagenes.value && Number(numeroImagenes.value) >= 0 ? '' : 'El número de imágenes debe ser un valor positivo',
        estado: estado.value ? '' : 'El estado es obligatorio'
    };

    return Object.values(errors.value).every((error) => !error);
};

// Función para manejar el envío del formulario
const eventoRegistroAlbum = async () => {
    if (!validarFormulario()) {
        console.log(errors.value);        
        const idModal = abrirAlerta('Errores en el formulario', errors.value?.descripcion || errors.value);
        return;
    }

    const nuevoAlbum: albumModel = {
        nombre: nombre.value,
        descripcion: descripcion.value,
        usuario_id: sessionStore.id_usuario,
        numero_imagenes: Number(numeroImagenes.value),
        estado: estado.value
    };

    try {
        const response = await crearAlbum(nuevoAlbum);

        if (response.success) {
            console.log('Álbum creado exitosamente');
        } else {
            console.error('Error al crear el álbum:', response.message);
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