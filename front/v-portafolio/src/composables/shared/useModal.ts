import type { ButtomColor, ButtomType } from '@/components/shared/forms/ButtonForm.vue';
import { computed, ref, watch } from 'vue';

export interface ModalData {
    header?: {
        component?: any;
        textHtml?: string;
        type?: string;
        props?: any;
    };
    body?: {
        component?: any;
        textHtml?: string;
        props?: any;
    };
    footer?: {
        component?: any;
        textHtml?: string;
        buttons?: Array<{ textHtml: string; color: ButtomColor; action: number; type?: ButtomType; class?: string }>;
        props?: any;
    };
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    bloquearCierre?: boolean;
}

// Estado global para múltiples modales
const modals = ref<Array<{ id: number; data: ModalData; visible: boolean; eventReturn: number | null }>>([]);
let modalIdCounter = 0;

export function useModal() {
    // Abrir modal con data
    const abrirModal = (data: ModalData) => {
        const modalId = modalIdCounter++;
        modals.value.push({
            id: modalId,
            data,
            visible: true,
            eventReturn: null
        });
        return modalId;
    };

    // Cerrar un modal específico
    const cerrarModal = (modalId: number, action: number) => {
        const modalIndex = modals.value.findIndex(modal => modal.id === modalId);
        if (modalIndex !== -1) {
            modals.value[modalIndex].visible = false;
            modals.value[modalIndex].eventReturn = action;
        }
    };

    // Cerrar el último modal en la pila
    const cerrarUltimoModal = () => {
        if (modals.value.length > 0) {
            const ultimoModal = modals.value[modals.value.length - 1];
            cerrarModal(ultimoModal.id, -1);
        }
    };

    // Escuchar el evento de retorno para un modal específico
    const escucharEvento = (modalId: number, callback: (action: number | null) => void) => {
        const modal = modals.value.find(modal => modal.id === modalId);
        if (modal) {
            watch(() => modal.eventReturn, (newValue) => {
                if (newValue !== null) {
                    callback(newValue);
                    modal.eventReturn = null;
                }
            });
        }
    };

    // Función para definir tamaños del modal
    const modalSizeClass = (modalId: number) => {
        const modal = modals.value.find(modal => modal.id === modalId);
        const size = modal?.data.size;
        switch (size) {
            case 'xs':
            case 'sm':
                return { width: 'calc(100% - 30px)', maxWidth: '340px', margin: '15px' };
            case 'md':
                return { width: '50vw', maxWidth: '600px' };
            case 'lg':
                return { width: '70vw', maxWidth: '900px' };
            case 'xl':
                return { width: '90vw', maxWidth: '1200px' };
            case 'xxl':
                return { width: '100vw', maxWidth: '1400px' };
            default:
                return { width: '50vw', maxWidth: '600px' };
        }
    };

    // Abrir una alerta genérica
    const abrirAlerta = (titulo: string, texto: any, type: string = 'success') => {
        return abrirModal({
            header: {
                textHtml: `<h2>${titulo}</h2>`,
                type: type
            },
            body: {
                textHtml: `<p>${typeof texto === 'object' ? JSON.stringify(texto) : texto?.toString()}</p>`
            },
            footer: {
                buttons: [
                    { textHtml: 'Cancelar', color: 'danger', action: 2 },
                    { textHtml: 'Aceptar', color: 'success', action: 1, type: 'submit' }
                ]
            },
            size: 'xs'
        });
    };

    // Abrir un modal de "Cargando" con opción de bloquear cierre
    const abrirCargador = (texto: string, bloquear: boolean = true) => {
        return abrirModal({
            header: {},  // Sin header
            body: {
                textHtml: `<div class="cargando-container">
                            <div class="spinner"></div>
                            <p>${texto}</p>
                           </div>`
            },
            footer: {},  // Sin footer
            bloquearCierre: bloquear,
            size: 'xs'
        });
    };

    return {
        modals,
        abrirModal,
        cerrarModal,
        cerrarUltimoModal,
        escucharEvento,
        modalSizeClass,
        abrirAlerta,
        abrirCargador
    };
}
