<template>
    <div :class="{'cont-button-block': block, 'cont-button': !block}">
        <button class="button-f" @click="eventoClick" :type="typeButton">
            <div class="text-button">
                <slot></slot>
            </div>
        </button>
    </div>
</template>

<script setup lang="ts">
import { defineEmits, ref, computed } from 'vue';

// Definir el tipo correcto para el botón
type InputType = 'submit' | 'button' | 'reset' | undefined;

const emit = defineEmits(['click']);

// Definir las propiedades del componente, incluyendo la propiedad block y type
const props = defineProps({
    type: {
        type: String as () => InputType,
        default: 'button'
    },
    block: {
        type: Boolean,
        default: false
    }
});

// Computar el tipo del botón para asegurar que sea válido
const typeButton = computed(() => props.type);

const eventoClick = () => {
    emit('click');
};
</script>

<style scoped>
.cont-button {
    display: flex;
    width: auto;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    align-items: center;
}

.cont-button-block {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    align-items: center;
}

.button-f {
    width: 100%;
    margin-top: 10px;
    border-radius: 20px;
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 1rem 2rem;
    transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.button-f:hover {
    cursor: pointer;
    background-color: var(--primary-color-dark);
    transform: scale(1.1);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.text-button {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    align-items: center;
}

.d-block {
    width: 100%;
}
</style>
