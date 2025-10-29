<template>
  <div>
    <h2>Perfil</h2>
    <p v-if="user">Bienvenido, {{ user.name }} ({{ user.email }})</p>
    <button @click="handleLogout">Cerrar sesión</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getProfile, logout } from '../services/auth.js';
import { useRouter } from 'vue-router';

const user = ref(null);
const router = useRouter();

onMounted(async () => {
  user.value = await getProfile();
});

function handleLogout() {
  logout();
  router.push('/login');
}
</script>