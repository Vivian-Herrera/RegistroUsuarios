<template>
  <div>
    <h2>Iniciar sesión</h2>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Contraseña" />
    <button @click="handleLogin">Entrar</button>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { login } from '../services/auth.js';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

async function handleLogin() {
  const res = await login(email.value, password.value);
  if (res.token) {
    router.push('/profile');
  } else {
    error.value = res.error || 'Error al iniciar sesión';
  }
}
</script>