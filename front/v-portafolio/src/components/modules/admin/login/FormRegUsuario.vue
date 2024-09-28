<template>
  <div class="form-register">
    <div class="content-header">
      <h3>Registro de Usuario</h3>
    </div>

    <div class="content-form">
      <FormGroup>
        <GroupInput>
          <InputForm v-model="nombre" :error="errors.nombre">Nombre</InputForm>
        </GroupInput>
        <GroupInput>
          <InputForm v-model="apellido" :error="errors.apellido">Apellido</InputForm>
        </GroupInput>
        <GroupInput>
          <SelectForm v-model="tipoIdentificacion" :options="tipoIdentificacionOptions" label="Tipo de Identificación"
            :error="errors.tipoIdentificacion" />
        </GroupInput>
        <GroupInput>
          <InputForm v-model="identificacion" :error="errors.identificacion" type="number">Número de Identificación
          </InputForm>
        </GroupInput>
        <GroupInput>
          <InputForm v-model="direccion" :error="errors.direccion">Dirección</InputForm>
        </GroupInput>
        <GroupInput>
          <InputForm v-model="correoElectronico" :error="errors.correoElectronico" type="email">Correo Electrónico
          </InputForm>
        </GroupInput>
        <GroupInput>
          <InputForm type="password" v-model="contrasena" :error="errors.contrasena">Contraseña</InputForm>
        </GroupInput>
        <GroupInput>
          <InputForm v-model="telefono" :error="errors.telefono" type="tel">Teléfono</InputForm>
        </GroupInput>
        <GroupInput>
          <ButtonForm @click="eventoRegistro">Registrar Usuario</ButtonForm>
        </GroupInput>
      </FormGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue';
import { useUsuario } from '@/composables/modules/administracion/useUsuario';

// Lazy loading de los componentes
const FormGroup = defineAsyncComponent(() => import('@/components/shared/forms/FormGroup.vue'));
const GroupInput = defineAsyncComponent(() => import('@/components/shared/forms/GroupInput.vue'));
const InputForm = defineAsyncComponent(() => import('@/components/shared/forms/InputForm.vue'));
const SelectForm = defineAsyncComponent(() => import('@/components/shared/forms/SelectForm.vue'));
const ButtonForm = defineAsyncComponent(() => import('@/components/shared/forms/ButtonForm.vue'));

// Variables reactivas para capturar los datos del usuario
const nombre = ref('');
const apellido = ref('');
const tipoIdentificacion = ref('');
const identificacion = ref('');
const direccion = ref('');
const correoElectronico = ref('');
const contrasena = ref('');
const telefono = ref('');

const errors = ref({
  nombre: '',
  apellido: '',
  tipoIdentificacion: '',
  identificacion: '',
  direccion: '',
  correoElectronico: '',
  contrasena: '',
  telefono: ''
});

// Opciones del select para tipo de identificación
const tipoIdentificacionOptions = [
  { label: 'Cédula de Ciudadanía', value: 'Cédula de Ciudadanía' },
  { label: 'Cédula de Extranjería', value: 'Cédula de Extranjería' },
  { label: 'Pasaporte', value: 'Pasaporte' },
  { label: 'Otro', value: 'Otro' },
];

const { crearUsuario } = useUsuario();

// Función para validar el formulario
const validarFormulario = () => {
  errors.value = {
    nombre: nombre.value ? '' : 'El nombre es obligatorio',
    apellido: apellido.value ? '' : 'El apellido es obligatorio',
    tipoIdentificacion: tipoIdentificacion.value ? '' : 'El tipo de identificación es obligatorio',
    identificacion: identificacion.value ? '' : 'El número de identificación es obligatorio',
    direccion: direccion.value ? '' : 'La dirección es obligatoria',
    correoElectronico: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(correoElectronico.value)
      ? ''
      : 'Ingrese un correo electrónico válido',
    contrasena: contrasena.value ? '' : 'La contraseña es obligatoria',
    telefono: telefono.value ? '' : 'El teléfono es obligatorio',
  };

  // Retornar true si no hay errores
  return Object.values(errors.value).every((error) => !error);
};

// Función para manejar el envío del formulario
const eventoRegistro = async () => {
  if (!validarFormulario()) {
    console.error('Errores en el formulario', errors.value);
    return;
  }

  const nuevoUsuario = {
    nombre: nombre.value,
    apellido: apellido.value,
    tipoIdentificacion: tipoIdentificacion.value,
    identificacion: identificacion.value,
    direccion: direccion.value,
    correoElectronico: correoElectronico.value,
    contrasena: contrasena.value,
    telefono: telefono.value,
  };

  try {
    const response = await crearUsuario(nuevoUsuario);

    if (response.success) {
      console.log('Usuario creado exitosamente');
    } else {
      console.error('Error al crear el usuario:', response.message);
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