<template>
  <div>
    <h2>Registro</h2>
    <input v-model="name" placeholder="Nombre" :class="{ invalid: !nameValid }" />
    <input v-model="email" placeholder="Email" :class="{ invalid: !emailValid }" />
    <input v-model="password" type="password" placeholder="Contraseña" :class="{ invalid: !passwordValid }" />
    <button @click="handleRegister">Registrar</button>
    <p v-if="message">{{ message }}</p>
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
    message.value = 'Corrige los campos marcados';
    return;
  }
  const res = await register(name.value, email.value, password.value);
  message.value = res.message || res.error;
}
</script>

<style scoped>
.invalid {
  border: 1px solid red;
}
</style>