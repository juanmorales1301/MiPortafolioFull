<template>
    <div class="cont-login">
        <div class="tarj-login">
            <FormLogin />
        </div>
    </div>
</template>

<script setup lang="ts">
import FormLogin from '@/components/modules/admin/login/FormLogin.vue';
</script>


<style scoped>
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
    justify-content: center;
    padding: 2rem;
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
