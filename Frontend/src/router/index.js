import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import ProfileView from '../views/ProfileView.vue';
import { jwtDecode } from 'jwt-decode';


const routes = [
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  {
    path: '/profile',
    component: ProfileView,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

function isTokenExpired(token) {
  try {
    const { exp } = jwtDecode(token);
    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
}
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth) {
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem('token');
      return next('/login');
    }
  }
  next();
});


export default router;