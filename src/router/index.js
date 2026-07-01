import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth-store.js'
import HomeView from '../views/HomeView.vue'

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
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/user-dashboard',
      name: 'user-dashboard',
      component: () => import('../views/FavoritesView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/SettingsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/admin-dashboard',
      name: 'admin-dashboard',
      component: () => import('../views/AdminDashboardView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('../views/FavoritesView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/user-blocked',
      name: 'user-blocked',
      component: () => import('../views/UserBlockedView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()

  await authStore.authReady

  if (to.name != 'user-blocked' && authStore.user?.blackListed) {
    return { name: 'user-blocked' }
  }

  if (to.meta.requiresAuth && !authStore.user) {
    return { name: 'login' }
  }

  if (to.meta.requiresAdmin && authStore.userType !== 'admin') {
    return { name: 'user-dashboard' }
  }

  // Si venimos del login hacia home, forzar recarga completa de la página
  if (to.name === 'home' && from.name === 'login') {
    window.location.href = to.fullPath
    return false
  }
})

export default router
