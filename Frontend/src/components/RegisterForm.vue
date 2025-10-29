<template>
  <form @submit.prevent="register">
    <input v-model="name" placeholder="Nombre" />
    <input v-model="email" placeholder="Email" />
    <button type="submit">Registrar</button>
  </form>
</template>

<script>
export default {
  data() {
    return { name: '', email: '' };
  },
  methods: {
    async register() {
      await fetch('http://backend-api:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: this.name, email: this.email })
      });
    }
  }
};
</script>