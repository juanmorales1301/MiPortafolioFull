<template>
    <div class="cont-group">
        <label class="label-f" v-bind:for="idInput">
            <span v-if="labelInput">{{ labelInput }}</span>
            <slot v-else></slot>
        </label>
        <textarea v-if="typeInput === 'textarea'" class="input-f" v-bind:id="idInput" :value="modelValue"
            @input="onInput" />
        <input v-else :type="typeInput" class="input-f" v-bind:id="idInput" :value="modelValue" @input="onInput" />
        <!-- Mostrar mensaje de error si existe -->
        <p v-if="error" class="error-message">{{ error }}</p>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';

// Definir el tipo de input
type InputType = | "textarea" | "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week";

// Generar un ID único para el input
const genId = () => Date.now() + '-' + Math.floor(Math.random() * 1000);
const idInput: Ref<string | undefined> = ref('input-' + genId());
const labelInput: Ref<string | undefined> = ref(undefined);
const typeInput: Ref<string | undefined> = ref(undefined);

// Props del componente
const props = defineProps({
    id: {
        type: String || undefined,
        default: undefined
    },
    label: {
        type: String || undefined,
        default: undefined
    },
    type: {
        type: String as () => InputType,
        default: 'text'
    },
    modelValue: {
        type: String,
        default: undefined
    },
    error: {
        type: String,
        default: ''
    }
});

// Asignar las propiedades cuando el componente se monta
onMounted(() => {
    asignaParams();
});

// Función para asignar los valores iniciales de las props
const asignaParams = () => {
    if (props.id) idInput.value = props.id;
    if (props.label) labelInput.value = props.label;
    if (props.type) typeInput.value = props.type;
};

// Emitir el evento para actualizar el valor del input
const emit = defineEmits(['update:modelValue']);
const onInput = (event: Event) => {
    emit('update:modelValue', (event.target as HTMLInputElement).value);
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

.input-f {
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

.input-f:focus {
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