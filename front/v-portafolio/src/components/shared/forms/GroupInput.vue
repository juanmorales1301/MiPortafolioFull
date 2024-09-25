<template>
    <div :class="flexClass" class="group-input">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
type FlexOptions = 'start-start' | 'start-center' | 'start-end' | 'center-start' | 'center-center' | 'center-end' | 'end-start' | 'end-center' | 'end-end' | 'space-between-start' | 'space-between-center' | 'space-between-end' | 'space-around-start' | 'space-around-center' | 'space-around-end';

// Definir la propiedad de entrada
const props = defineProps({
  flex: {
    type: String as ()=> FlexOptions,
    default: 'center-center'
  }
});

// Computar clases basadas en la propiedad flex
const flexClass = computed(() => {
  const [justify, align] = props.flex.split('-');
  return {
    'justify-start': justify === 'start',
    'justify-center': justify === 'center',
    'justify-end': justify === 'end',
    'justify-space-between': justify === 'space-between',
    'justify-space-around': justify === 'space-around',
    'align-start': align === 'start',
    'align-center': align === 'center',
    'align-end': align === 'end',
    'align-stretch': align === 'stretch'
  };
});
</script>


<style scoped>
.group-input {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    padding-top: 1rem;
}

.justify-start {
    justify-content: flex-start;
}

.justify-center {
    justify-content: center;
}

.justify-end {
    justify-content: flex-end;
}

.justify-space-between {
    justify-content: space-between;
}

.justify-space-around {
    justify-content: space-around;
}

.align-start {
    align-items: flex-start;
}

.align-center {
    align-items: center;
}

.align-end {
    align-items: flex-end;
}

.align-stretch {
    align-items: stretch;
}
</style>
