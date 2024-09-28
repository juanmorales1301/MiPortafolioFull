<template>
  <div class="container-home">
    <div class="panel-left">
      <div class="cont-header-action">
        <ButtonForm>Agregar Album &nbsp;<i class="fa-solid fa-plus"></i> </ButtonForm>
        <h2>Albums</h2>
      </div>
      <div class="content-albums">
        <div class="cont-lista">
          <MenuAlbum></MenuAlbum>
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
        <GaleriaDesing></GaleriaDesing>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MenuAlbum from '@/components/modules/admin/galeria/MenuAlbum.vue';
import ButtonForm from '@/components/shared/forms/ButtonForm.vue';
import GaleriaDesing from '@/components/modules/admin/galeria/GaleriaDesing.vue';
import { useSessionStore } from '@/stores/core/auth';
import router from '@/router';

const sessionStore = useSessionStore();

const cerrarSesion = () => {
  sessionStore.logout();
  router.push({ name: 'login' });
  window.location.reload();
}

</script>

<style scoped>
.container-home {
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
}

.panel-left {
  max-width: 30vw;
  background-color: rgb(245, 245, 245);
  height: 100vh;
  overflow-y: auto;
}

.panel-right {
  max-width: 70vw;
  height: 100vh;
  overflow-y: auto;
}

.panel-left,
.panel-right {
  width: 100%;
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
</style>