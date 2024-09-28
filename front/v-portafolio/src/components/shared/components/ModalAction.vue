<template>
    <div v-for="modal in modals" :key="modal.id">
        <div v-if="modal.visible" class="modal-overlay" @click="eventoOverlayClick(modal.id)">
            <div class="modal-container" :style="modalSizeClass(modal.id)" @click.stop>
                <!-- Header del modal -->
                <div v-if="modal.data.header" :class="['modal-header', headerClass(modal.data)]">
                    <div v-if="modal.data.header.component">
                        <!-- Renderiza el componente del header si se proporciona -->
                        <component :is="modal.data.header.component" v-bind="modal.data.header.props" />
                    </div>
                    <div v-else v-html="modal.data.header.textHtml" class="cont-header"></div>
                    <div v-if="!modal.data.bloquearCierre" class="cont-btn-close" @click="cerrarModal(modal.id, 0)">
                        <button class="close-button">X</button>
                    </div>
                </div>

                <!-- Cuerpo del modal -->
                <div class="modal-body" v-if="modal.data.body">
                    <div v-if="modal.data.body.component">
                        <!-- Renderiza el componente del body si se proporciona -->
                        <component :is="modal.data.body.component" v-bind="modal.data.body.props" />
                    </div>
                    <div v-else v-html="modal.data.body?.textHtml"></div>
                </div>

                <!-- Footer del modal -->
                <div v-if="modal.data.footer" :class="footerClass(modal.data)">
                    <div v-if="modal.data.footer.component">
                        <!-- Renderiza el componente del footer si se proporciona -->
                        <component :is="modal.data.footer.component" v-bind="modal.data.footer.props" />
                    </div>
                    <div v-else class="btns-footer-modal">
                        <Suspense>
                            <template #default>
                                <ButtonForm v-for="(button, index) in modal.data.footer.buttons" :key="index"
                                    :color="button.color" :type="button.type || 'button'"
                                    @click="cerrarModal(modal.id, button.action)" :class="button.class">
                                    <div v-html="button.textHtml"></div>
                                </ButtonForm>
                            </template>
                            <template #fallback>
                                <div>Cargando botones...</div>
                            </template>
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { defineAsyncComponent } from 'vue';
import { useModal, type ModalData } from '@/composables/shared/useModal';

// Cargar dinámicamente el componente ButtonForm solo si se necesita
const ButtonForm = defineAsyncComponent(() =>
    import('@/components/shared/forms/ButtonForm.vue')
);

const { modals, cerrarModal, modalSizeClass } = useModal();

// Estilo dinámico para el header dependiendo del tipo de alerta
const headerClass = (modalData: ModalData) => {
    const type = modalData.header?.type;
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
};

// Estilo dinámico para el footer
const footerClass = (modalData: ModalData) => {
    const hasHeader = !!modalData.header;
    return hasHeader ? 'modal-footer-rounded' : 'modal-footer';
};

// Cerrar el modal solo si no está bloqueado
const eventoOverlayClick = (id: number) => {
    const modal = modals.value.find(modal => modal.id === id);
    if (modal && !modal.data.bloquearCierre) {
        cerrarModal(id, -1);
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
    background-color: rgba(0, 0, 0, 0.45);
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
.modal-footer-rounded,
.btns-footer-modal {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}

.btns-footer-modal {
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
