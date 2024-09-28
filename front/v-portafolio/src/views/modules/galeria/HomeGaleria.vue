<template>
  <div class="container-home">
    <div class="panel-left">
      <div class="cont-header-action">
        <Suspense>
          <template #default>
            <AlbumAction></AlbumAction>
          </template>
          <template #fallback>
            <div>Cargando acciones...</div>
          </template>
        </Suspense>
        <h2>Albums</h2>
      </div>
      <div class="content-albums">
        <div class="cont-lista">
          <Suspense>
            <template #default>
              <MenuAlbum @galeriaSeleccionada="actualizarImagenes"></MenuAlbum>
            </template>
            <template #fallback>
              <div>Cargando albums...</div>
            </template>
          </Suspense>
        </div>
      </div>
    </div>
    <div class="panel-right">
      <div class="contenedor-header">
        <header>
          <h2>Galeria de imagenes</h2>
        </header>
        <div class="cont-user" title="Cerrar Sesión" @click="cerrarSesion()">
          <i class="fa-solid fa-power-off"></i>
        </div>
      </div>
      <div class="contenedor-body">
        <Suspense>
          <template #default>
            <GaleriaDesing :albumId="albumIdSeleccionado"></GaleriaDesing>
          </template>
          <template #fallback>
            <div>Cargando galeria...</div>
          </template>
        </Suspense>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, ref } from 'vue';
import { useSessionStore } from '@/stores/core/auth';
import router from '@/router';

// Lazy loading de los componentes
const MenuAlbum = defineAsyncComponent(() => import('@/components/modules/admin/galeria/MenuAlbum.vue'));
const AlbumAction = defineAsyncComponent(() => import('@/components/modules/admin/galeria/AlbumAction.vue'));
const GaleriaDesing = defineAsyncComponent(() => import('@/components/modules/admin/galeria/GaleriaDesing.vue'));

const sessionStore = useSessionStore();

const cerrarSesion = () => {
  sessionStore.logout();
  router.push({ name: 'login' });
  window.location.reload();
};

const albumIdSeleccionado = ref<string>('');

const actualizarImagenes = (albumId: string) => {
  albumIdSeleccionado.value = albumId; // Actualiza el ID del álbum seleccionado
};
</script>


<style scoped>
.container-home {
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
}

.panel-left {
  width: 30vw;
  max-width: 320px;
  background-color: rgb(245, 245, 245);
  height: 100vh;
  overflow-y: auto;
}

.panel-right {
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
}

.cont-header-action {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  position: sticky;
  padding: 0.2rem 0.9rem;
  top: 0;
  background-color: rgb(245, 245, 245);
}

.cont-header-action h2 {
  width: 100%;
  border-bottom: 2px solid rgb(200, 200, 200);
  text-align: center;
}

.contenedor-header {
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  background-color: var(--primary-color);
  color: var(--primary-text-color);
  align-content: center;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
}

.contenedor-header header {
  padding: 0.2rem 0.9rem;
  width: 100%;
  text-align: center;
}

.contenedor-header .cont-user {
  padding: 0.2rem 0.9rem;
  font-size: 1.5rem;
  cursor: pointer;
}

.contenedor-header .cont-user:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.contenedor-body{
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
}

.content-albums {
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  align-items: center;
}

.content-albums .cont-lista {
  width: 100%;
}

@media (max-width: 1250px) {
  .panel-left {
    width: 40vw;
    max-width: 320px;
    min-width: 300px;
  }

  .panel-right {
    width: 100%;
  }
}

@media (max-width: 750px) {
  .panel-left {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
  }

  .panel-right {
    width: 100%;
  }

  .container-home {
    flex-wrap: wrap;
  }
}
</style>