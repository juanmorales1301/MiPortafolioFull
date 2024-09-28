<template>
    <div :class="{ 'cont-button-block': block, 'cont-button': !block }">
        <button :class="['button-f', colorClass]" @click="eventoClick" :type="typeButton">
            <div class="text-button">
                <slot></slot>
            </div>
        </button>
    </div>
</template>

<script setup lang="ts">
import { defineEmits, computed } from 'vue';

// Define el tipo correcto para el botón
type InputType = 'submit' | 'button' | 'reset' | undefined;
type Color = 'primary' | 'success' | 'warning' | 'danger';

const emit = defineEmits(['click']);

// Define las propiedades del componente, incluyendo la propiedad block, type y color
const props = defineProps({
    type: {
        type: String as () => InputType,
        default: 'button',
    },
    block: {
        type: Boolean,
        default: false,
    },
    color: {
        type: String as () => Color,
        default: 'primary',  // Estilo por defecto
    }
});

// Computa el tipo del botón para asegurar que sea válido
const typeButton = computed(() => props.type);

// Computa la clase del botón según la propiedad `color`
const colorClass = computed(() => {
    switch (props.color) {
        case 'success':
            return 'btn-success';
        case 'warning':
            return 'btn-warning';
        case 'danger':
            return 'btn-danger';
        default:
            return 'btn-primary';
    }
});

const eventoClick = () => {
    emit('click');
};
</script>

<style scoped>
/* Estilos generales para todos los botones */
.button-f {
    width: 100%;
    margin-top: 10px;
    border-radius: 20px;
    color: white;
    border: none;
    padding: 1rem 2rem;
    transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.button-f:hover {
    cursor: pointer;
    transform: scale(1.05);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

/* Estilos específicos para cada tipo de botón */
.btn-primary {
    background-color: #3498db;
}

.btn-primary:hover {
    background-color: #2980b9;
}

.btn-success {
    background-color: #1abc9c;
}

.btn-success:hover {
    background-color: #16a085;
}

.btn-warning {
    background-color: #f39c12;
}

.btn-warning:hover {
    background-color: #e67e22;
}

.btn-danger {
    background-color: #e74c3c;
}

.btn-danger:hover {
    background-color: #c0392b;
}

.text-button {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    align-items: center;
}

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
</style>