<template>
    <div class="form-login">
        <div class="content-header">
            <h3>Acceso a la plataforma</h3>
        </div>

        <div class="content-form">
            <FormGroup>
                <GroupInput flex="center-center">
                    <InputForm v-model="username">Usuario</InputForm>
                </GroupInput>
                <GroupInput>
                    <InputForm type="password" v-model="password">Contraseña</InputForm>
                </GroupInput>
                <GroupInput>
                    <ButtonForm @click="eventoLogin">Ingresar</ButtonForm>
                </GroupInput>
            </FormGroup>
        </div>
    </div>
</template>

<script setup lang="ts">
import FormGroup from '@/components/shared/forms/FormGroup.vue';
import GroupInput from '@/components/shared/forms/GroupInput.vue';
import InputForm from '@/components/shared/forms/InputForm.vue';
import ButtonForm from '@/components/shared/forms/ButtonForm.vue';
import { ref } from 'vue';
import { useHttp } from '@/composables/core/useHttp';


// Variables reactivas para capturar los datos
const username = ref('');
const password = ref('');

const { login } = useHttp();

// Función para manejar el envío del formulario
const eventoLogin = async () => {
  const credentials = {
    correoElectronico: username.value,
    contrasena: password.value,
  };

  try {
    // Llamar a la función de login y manejar la respuesta
    const response = await login(credentials);

  if (response.success) {
    console.log('Autenticación exitosa');
    // Redirigir al usuario o realizar otras acciones
  } else {
    console.error('Error al iniciar sesión:', response.message);
    // Mostrar el error al usuario
  }
  } catch (error) {
    console.error('Error en la petición de login', error);
  }
};
</script>


<style scoped>
.form-login {
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
