<template>
    <div class="tabs-container">
      <div class="tabs" :style="containerStyle">
        <div
          v-for="(option, index) in options"
          :key="index"
          class="tab"
          :style="getTabStyle(index)"
          @click="handleTabClick(index)"
        >
          {{ option.label }}
        </div>
      </div>
      <slot :activeTab="activeTab"></slot>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  
  // Definir los eventos que va a emitir el componente
  const emit = defineEmits(['click']);
  
  // Definir las propiedades del componente
  const props = defineProps({
    options: {
      type: Array as () => { label: string }[],
      required: true,
    },
    activeIndex: {
      type: Number,
      default: 0,
    },
    tabBackgroundColor: {
      type: String,
      default: '#ffffff',
    },
    tabBorderColor: {
      type: String,
      default: '#dcdcdc',
    },
    tabTextColor: {
      type: String,
      default: '#000000',
    },
    tabActiveColor: {
      type: String,
      default: '#007bff',
    },
    // Nuevas propiedades para definir los radios de cada esquina del tab
    tabBorderTopLeftRadius: {
      type: String,
      default: '0',
    },
    tabBorderTopRightRadius: {
      type: String,
      default: '0',
    },
    tabBorderBottomLeftRadius: {
      type: String,
      default: '0',
    },
    tabBorderBottomRightRadius: {
      type: String,
      default: '0',
    }
  });
  
  // Variable reactiva para el índice del tab activo
  const activeTab = ref(props.activeIndex);
  
  // Método para manejar el click en un tab
  const handleTabClick = (index: number) => {
    activeTab.value = index;
    emit('click', index);
  };
  
  // Computar el estilo dinámico del contenedor de los tabs
  const containerStyle = computed(() => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    borderBottom: `1px solid ${props.tabBorderColor}`,
  }));
  
  // Estilo dinámico para los tabs
  const getTabStyle = (index: number) => {
    // Objeto para almacenar el estilo del border-radius dinámico
    const borderRadiusStyle: Record<string, string> = {};
  
    // Aplicar border-radius basado en el primer y último tab
    if (index === 0) {
      // Primer tab
      borderRadiusStyle.borderTopLeftRadius = props.tabBorderTopLeftRadius;
      borderRadiusStyle.borderBottomLeftRadius = props.tabBorderBottomLeftRadius;
    } else if (index === props.options.length - 1) {
      // Último tab
      borderRadiusStyle.borderTopRightRadius = props.tabBorderTopRightRadius;
      borderRadiusStyle.borderBottomRightRadius = props.tabBorderBottomRightRadius;
    }
  
    // Combinar los estilos básicos con el estilo del border-radius
    return {
      padding: '1rem',
      cursor: 'pointer',
      backgroundColor: activeTab.value === index ? props.tabActiveColor : props.tabBackgroundColor,
      color: activeTab.value === index ? '#fff' : props.tabTextColor,
      borderBottom: activeTab.value === index ? `1px solid ${props.tabActiveColor}` : `1px solid ${props.tabBackgroundColor}`,
      transition: 'all 0.3s ease',
      ...borderRadiusStyle, // Incluir el estilo de border-radius personalizado
    };
  };
  </script>
  
  <style scoped>
  .tabs-container {
    width: 100%;
  }
  
  .tabs {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  
  .tab {
    flex: 1;
    text-align: center;
    padding: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  </style>
  