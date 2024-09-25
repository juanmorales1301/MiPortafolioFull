<template>
    <div class="cont-group">
        <label class="label-f" v-bind:for="idInput">
            <span v-if="labelInput">{{ labelInput }}</span>
            <slot v-else></slot>
        </label>
        <textarea :type="typeInput" v-if="typeInput == 'textarea'" class="input-f" v-bind:id="idInput"></textarea>
        <input :type="typeInput" v-else class="input-f" v-bind:id="idInput" :value="modelValue" @input="onInput" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
type InputType = "textarea" | "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week";

const genId = () => Date.now() + '-' + Math.floor(Math.random() * 1000);
const idInput: Ref<string | undefined> = ref('input-' + genId());
const labelInput: Ref<string | undefined> = ref(undefined);
const typeInput: Ref<string | undefined> = ref(undefined);

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
        default: 'input'
    },
    modelValue: {
        type: String,
        default: undefined
    }
});

onMounted(() => {
    asignaParams();
})

const asignaParams = () => {
    if (props.id) idInput.value = props.id;
    if (props.label) labelInput.value = props.label;
    if (props.type) typeInput.value = props.type;
}

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
</style>
