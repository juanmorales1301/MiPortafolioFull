<template>
    <div class="cont-group">
      <label class="label-f" v-bind:for="idSelect">
        <span v-if="labelSelect">{{ labelSelect }}</span>
        <slot v-else></slot>
      </label>
      <select class="select-f" v-bind:id="idSelect" v-bind:value="modelValue" @change="onChange">
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
      <!-- Mostrar mensaje de error si existe -->
      <p v-if="error" class="error-message">{{ error }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, type Ref } from 'vue';
  
  // Props que recibe el componente
  const props = defineProps({
    id: {
      type: String || undefined,
      default: undefined,
    },
    label: {
      type: String || undefined,
      default: undefined,
    },
    modelValue: {
      type: String,
      default: '',
    },
    options: {
      type: Array as () => { label: string; value: string; [key: string]: any }[],
      required: true,
    },
    error: {
      type: String,
      default: '',
    }
  });
  
  // Variables reactivas
  const idSelect: Ref<string | undefined> = ref('select-' + Date.now());
  const labelSelect: Ref<string | undefined> = ref(undefined);
  
  // Asignar props cuando el componente está montado
  onMounted(() => {
    asignaParams();
  });
  
  const asignaParams = () => {
    if (props.id) idSelect.value = props.id;
    if (props.label) labelSelect.value = props.label;
  };
  
  // Emitir el evento cuando se selecciona una opción
  const emit = defineEmits(['update:modelValue']);
  
  const onChange = (event: Event) => {
    const value = (event.target as HTMLSelectElement).value;
    emit('update:modelValue', value);
  };
  </script>
  
  <style scoped>
  .cont-group {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
  
  .label-f {
    padding-bottom: 0.4rem;
  }
  
  .select-f {
    width: 100%;
    display: flex;
    border-radius: 10px;
    padding: 12px 15px;
    color: rgb(50, 50, 50);
    border: 1px solid rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
    transition: all 0.3s ease-in-out;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .select-f:focus {
    outline: none;
    border: 1px solid var(--primary-color);
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.4);
    background-color: #ffffff;
  }
  
  .error-message {
    color: red;
    font-size: 0.8rem;
    margin-top: 0.5rem;
  }
  </style>
  