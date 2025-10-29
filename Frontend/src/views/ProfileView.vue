<template>
  <div class="form-container">
    <div class="form-card">
      <h2 class="form-title">Perfil</h2>

      <div v-if="user" class="profile-info">
        <p class="welcome-text">
          Bienvenido, <span class="user-name">{{ user.name }}</span>
        </p>
        <p class="user-email">{{ user.email }}</p>
      </div>

      <button class="btn" @click="handleLogout">Cerrar sesión</button>
    </div>
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

.profile-info {
  margin-bottom: 1.5rem;
}

.welcome-text {
  font-size: 1.2rem;
  color: #2d3748;
  margin-bottom: 0.3rem;
}

.user-name {
  font-weight: 600;
  color: #4a90e2;
}

.user-email {
  color: #718096;
  font-size: 0.95rem;
  margin-bottom: 1rem;
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
}

.btn:hover {
  background-color: #357ab8;
}

.btn:active {
  transform: scale(0.98);
}
</style>
