import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth-store.js';
import HomeView from '../views/HomeView.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import('../views/DetailView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/user-dashboard',
      name: 'user-dashboard',
      component: () => import('../views/UserDashboardView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/admin-dashboard',
      name: 'admin-dashboard',
      component: () => import('../views/AdminDashboardView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.user) {
    return { name: "login"};
  }

  if (to.meta.requiresAdmin && authStore.userType !== "admin") {
    return { name: "user-dashboard" };
  }
})

export default router
