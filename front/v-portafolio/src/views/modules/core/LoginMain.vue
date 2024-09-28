<template>
    <div class="cont-login">
        <div class="tarj-login">
            <div class="tabs">
                <Suspense>
                    <template #default>
                        <TabsButton :options="tabsOptions" :activeIndex="0" tabBackgroundColor="#f9f9f9"
                            tabBorderColor="#ccc" tabTextColor="#333" tabActiveColor="#007bff" @click="handleTabClick"
                            tabBorderTopLeftRadius="15px" tabBorderTopRightRadius="15px" tabBorderBottomLeftRadius="0"
                            tabBorderBottomRightRadius="0" />
                    </template>
                    <template #fallback>
                        <div>Cargando Tabs...</div>
                    </template>
                </Suspense>
            </div>
            <div class="cont-tarj">
                <Suspense>
                    <template #default>
                        <FormLogin v-if="activeTab == 0" />
                        <FormRegUsuario v-else-if="activeTab == 1" />
                    </template>
                    <template #fallback>
                        <div>Cargando formulario...</div>
                    </template>
                </Suspense>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { defineAsyncComponent } from 'vue';

// Cargar dinámicamente los componentes para lazy loading
const FormLogin = defineAsyncComponent(() => import('@/components/modules/admin/login/FormLogin.vue'));
const FormRegUsuario = defineAsyncComponent(() => import('@/components/modules/admin/login/FormRegUsuario.vue'));
const TabsButton = defineAsyncComponent(() => import('@/components/shared/components/TabsButton.vue'));

const tabsOptions = [
    { label: 'Iniciar Sesión' },
    { label: 'Crear Usuario' },
];

const activeTab = ref(0);
const handleTabClick = (index: number) => {
    activeTab.value = index;
};
</script>


<style scoped>
.tabs {
    width: 100%;
}

.cont-login {
    display: flex;
    width: 100%;
    height: 100vh;
    background: linear-gradient(135deg, #0a2342, #02a8f3);
    align-content: center;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}

.tarj-login {
    display: flex;
    height: auto;
    max-width: 500px;
    width: 95%;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0px;
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding-bottom: 2rem;
}

.cont-tarj {
    padding: 2rem 2rem 0rem 2rem;
    height: 50vh;
    overflow-y: auto;
    display: flex;
    align-content: space-around;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}
</style>
