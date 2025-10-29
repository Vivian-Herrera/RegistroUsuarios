<template>
  <div class="form-container">
    <div class="form-card">
      <h2 class="form-title">Iniciar sesión</h2>

      <input
        v-model="email"
        type="email"
        placeholder="Correo electrónico"
        class="input-field"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Contraseña"
        class="input-field"
      />

      <button class="btn" @click="handleLogin">Entrar</button>

      <p v-if="error" class="error-text">{{ error }}</p>

      <p class="extra-text">
        ¿No tienes una cuenta?
        <router-link to="/register" class="link">Regístrate aquí</router-link>
      </p>
    </div>
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

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f0f4f8;
  padding: 1rem;
}

.form-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.form-title {
  font-size: 1.8rem;
  color: #2d3748;
  margin-bottom: 1.5rem;
}

.input-field {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border 0.3s ease;
}

.input-field:focus {
  border-color: #4a90e2;
}

.btn {
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
  width: 100%;
  font-size: 1rem;
}

.btn:hover {
  background-color: #357ab8;
}

.btn:active {
  transform: scale(0.98);
}

.error-text {
  color: #e53e3e;
  margin-top: 0.75rem;
}

.extra-text {
  margin-top: 1.2rem;
  font-size: 0.95rem;
  color: #4a5568;
}

.link {
  color: #4a90e2;
  font-weight: 500;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
