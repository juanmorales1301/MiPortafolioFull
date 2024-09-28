import { ref, watch } from 'vue';

const modalData = ref<any>({
    header: null,
    body: null,
    footer: null
});
const visible = ref(false);
const eventReturn = ref<number | null>(null);

// Función para abrir el modal con la data
export function useModal() {
    const abrirModal = (data: any) => {
        modalData.value = data;
        visible.value = true;
    };

    const cerrarModal = (action: number) => {
        visible.value = false;
        eventReturn.value = action;
    };

    const escucharEvento = (callback: (action: number | null) => void) => {
        watch(eventReturn, (newValue) => {
            if (newValue !== null) {
                callback(newValue);
                eventReturn.value = null;
            }
        });
    };

    const abrirAlerta = (titulo: string, texto: string, type: string = 'success') => {
        abrirModal({
            header: {
                textHtml: `<h2>${titulo}</h2>`,
                type: `${type}`
            },
            body: {
                textHtml: `<p>${typeof texto == 'object' ? JSON.stringify(texto) : texto?.toString()}</p>`
            },
            footer: {
                buttons: [
                    { textHtml: 'Cancelar', color: 'danger', action: 2 },
                    { textHtml: 'Aceptar', color: 'success', action: 1, type: 'submit' },
                ]
            }
        });
    };

    // Función para abrir un modal de "Cargando" con la opción de bloquear el cierre
    const cargando = (texto: string, bloquear: boolean = true) => {
        abrirModal({
            header: null,  // Sin header
            body: {
                textHtml: `<div class="cargando-container">
                            <div class="spinner"></div>
                            <p>${texto}</p>
                           </div>`
            },
            footer: null,  // Sin footer
            bloquearCierre: bloquear  // Bloquear o no el cierre
        });
    };

    return {
        modalData,
        visible,
        abrirModal,
        cerrarModal,
        escucharEvento,
        abrirAlerta,
        cargando
    };
}
