<template>
    <div v-if="visible" class="modal-overlay" @click="eventoOverlayClick">
        <div class="modal-container" @click.stop>
            <!-- Header del modal -->
            <div v-if="modalData.header" :class="['modal-header', headerClass]">
                <div v-html="modalData.header.textHtml" class="cont-header"></div>
                <div v-if="!bloquearCierre" class="cont-btn-close" @click="cerrarModal(0)">
                    <button class="close-button">X</button>
                </div>
            </div>

            <!-- Cuerpo del modal -->
            <div class="modal-body" v-html="modalData.body?.textHtml"></div>

            <!-- Footer del modal con botones dinámicos -->
            <div v-if="modalData.footer" :class="footerClass">
                <ButtonForm v-for="(button, index) in modalData.footer.buttons" :key="index" :color="button.color"
                    :type="button.type || 'button'" @click="cerrarModal(button.action)" :class="button.class">
                    <div v-html="button.textHtml"></div>
                </ButtonForm>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useModal } from '@/composables/shared/useModal';
import ButtonForm from '@/components/shared/forms/ButtonForm.vue';

// Obtener los datos del modal y su visibilidad desde el composable
const { modalData, visible, cerrarModal } = useModal();
const bloquearCierre = computed(() => modalData.value.bloquearCierre);

// Estilo dinámico para el header dependiendo del tipo de alerta
const headerClass = computed(() => {
    const type = modalData.value.header?.type;
    switch (type) {
        case 'success':
            return 'modal-header-success';
        case 'warning':
            return 'modal-header-warning';
        case 'danger':
            return 'modal-header-danger';
        default:
            return '';
    }
});

// Estilo dinámico para el footer (si hay header o footer)
const footerClass = computed(() => {
    const hasHeader = !!modalData.value.header;
    return hasHeader ? 'modal-footer-rounded' : 'modal-footer';
});

// Cerrar el modal solo si no está bloqueado
const eventoOverlayClick = () => {
    if (!bloquearCierre.value) {
        cerrarModal(-1);
    }
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.modal-container {
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    width: 50vw;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
}

.modal-header {
    padding: 15px;
    color: white;
    text-align: center;
    border-radius: 10px 10px 0 0;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
}

.cont-header {
    display: flex;
    width: 100%;
}

.modal-header-success {
    background-color: #1abc9c;
}

.modal-header-warning {
    background-color: #f39c12;
}

.modal-header-danger {
    background-color: #fb323c !important;
    color: #fff !important;
}

.modal-body {
    padding: 20px;
    overflow-y: auto;
    max-height: 70vh;
    flex: 1;
}

.modal-footer {
    padding: 15px;
    text-align: center;
}

.modal-footer-rounded {
    padding: 15px;
    border-radius: 0 0 10px 10px;
}

.modal-footer,
.modal-footer-rounded {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    align-items: center;
    justify-content: center;
}

button.close-button {
    color: white;
    position: relative;
    display: flex;
    background: none;
    border: none;
    font-size: 1.2rem;
}

.cont-btn-close:hover button.close-button {
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
}

.cont-btn-close {
    width: 1.7rem;
    height: 1.7rem;
    border-radius: 8px;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    align-items: center;
}

.cont-btn-close:hover {
    cursor: pointer;
    display: flex;
    background-color: rgba(255, 255, 255, 0.2);
}
</style>
