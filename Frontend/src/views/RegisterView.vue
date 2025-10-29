<template>
  <div class="register-container">
    <div class="register-card">
      <h2>Registro de Usuario</h2>
      <div class="form-group">
        <label>Nombre</label>
        <input v-model="name" placeholder="Tu nombre completo" :class="{ invalid: !nameValid }" />
      </div>

      <div class="form-group">
        <label>Correo electrónico</label>
        <input v-model="email" placeholder="usuario@ejemplo.com" :class="{ invalid: !emailValid }" />
      </div>

      <div class="form-group">
        <label>Contraseña</label>
        <input v-model="password" type="password" placeholder="Mínimo 6 caracteres" :class="{ invalid: !passwordValid }" />
      </div>

      <button class="btn-primary" @click="handleRegister">Registrar</button>

      <p v-if="message" class="message">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { register } from '../services/auth.js';

const name = ref('');
const email = ref('');
const password = ref('');
const message = ref('');

const nameValid = ref(true);
const emailValid = ref(true);
const passwordValid = ref(true);

function validate() {
  nameValid.value = name.value.length >= 2;
  emailValid.value = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
  passwordValid.value = password.value.length >= 6;
  return nameValid.value && emailValid.value && passwordValid.value;
}

async function handleRegister() {
  if (!validate()) {
    message.value = '⚠️ Corrige los campos marcados antes de continuar.';
    return;
  }
  const res = await register(name.value, email.value, password.value);
  message.value = res.message || res.error;
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #0078d4, #00b4d8);
  font-family: 'Inter', sans-serif;
}

.register-card {
  background: #fff;
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
  animation: fadeIn 0.4s ease;
}

h2 {
  color: #1b4965;
  margin-bottom: 1.5rem;
}

.form-group {
  text-align: left;
  margin-bottom: 1rem;
}

label {
  font-weight: 600;
  font-size: 0.9rem;
  color: #1b4965;
}

input {
  width: 100%;
  padding: 0.75rem;
  margin-top: 0.25rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s;
}

input:focus {
  outline: none;
  border-color: #0078d4;
  box-shadow: 0 0 0 3px rgba(0, 120, 212, 0.1);
}

.invalid {
  border-color: #e63946 !important;
  background: #ffe8e8;
}

.btn-primary {
  width: 100%;
  padding: 0.9rem;
  margin-top: 1rem;
  background: #0078d4;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-primary:hover {
  background: #005fa3;
}

.message {
  margin-top: 1rem;
  color: #1b4965;
  font-weight: 500;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
