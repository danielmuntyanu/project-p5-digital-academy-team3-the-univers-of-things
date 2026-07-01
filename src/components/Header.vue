<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth-store.js'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

const auth = useAuthStore()
const { userType, avatarURL, username } = storeToRefs(auth)
const router = useRouter()

const mobileMenuOpen = ref(false)

const dashboardLink = computed(() => {
  if (userType.value == 'customer') {
    return '/user-dashboard'
  } else if (userType.value == 'admin') {
    return '/admin-dashboard'
  } else {
    return '/login'
  }
})

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

function closeMobileMenu() {
  mobileMenuOpen.value = false
}

async function handleLogout() {
  closeMobileMenu()
  await auth.logout()
  router.go(0) // Recarga la página para reflejar el estado de autenticación
}
</script>

<template>
  <header class="header">
    <div class="header-inner">
      <!-- Logo -->
      <a href="/" class="header-logo">
        <span class="header-logo-title">Nexus Anime</span>
        <span class="header-logo-sub">Anime</span>
      </a>

      <!-- Navegación escritorio -->
      <nav class="header-nav">
        <RouterLink v-if="auth.isLoggedIn" :to="dashboardLink" class="header-btn-nav"
          >Dashboard</RouterLink
        >
        <span v-if="auth.isLoggedIn" class="header-nav-divider"></span>

        <RouterLink to="/" class="header-btn-home" title="Inicio">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </RouterLink>

        <span v-if="auth.isLoggedIn" class="header-nav-divider"></span>
        <RouterLink v-if="auth.isLoggedIn" to="/favorites" class="header-btn-nav"
          >Favorite List</RouterLink
        >
      </nav>

      <!-- Botón hamburguesa (solo móvil, ocupa el hueco de la navegación central) -->
      <button
        class="header-hamburger"
        @click="toggleMobileMenu"
        title="Menú"
        :aria-expanded="mobileMenuOpen"
      >
        <svg
          v-if="!mobileMenuOpen"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
        <svg
          v-else
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <!-- Sin registrar -->
      <div v-if="!auth.isLoggedIn" class="header-actions">
        <RouterLink to="/Login" class="header-btn-login">Login</RouterLink>
        <RouterLink to="/register" class="header-btn-register">Register</RouterLink>
      </div>

      <!-- Registrado -->
      <div v-else class="header-actions">
        <span class="header-username">{{ username }}</span>
        <RouterLink to="/settings" class="header-btn-avatar">
          <img
            :src="avatarURL ? avatarURL : 'https://api.dicebear.com/7.x/avataaars/svg?seed=nexus'"
            alt="Avatar"
            class="header-avatar-img"
          />
        </RouterLink>
        <button class="header-btn-logout" @click="handleLogout" title="Cerrar sesión">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Menú móvil desplegable -->
    <Transition name="mobile-menu">
      <nav v-if="mobileMenuOpen" class="mobile-nav">
        <RouterLink to="/" class="mobile-nav-link" @click="closeMobileMenu">Home</RouterLink>
        <RouterLink
          v-if="auth.isLoggedIn"
          :to="dashboardLink"
          class="mobile-nav-link"
          @click="closeMobileMenu"
          >Dashboard</RouterLink
        >
        <RouterLink
          v-if="auth.isLoggedIn"
          to="/favorites"
          class="mobile-nav-link"
          @click="closeMobileMenu"
          >Favorite List</RouterLink
        >
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
@reference "../assets/main.css";

.header {
  @apply sticky top-0 z-50 bg-bg-body border-b border-border-default;
}

.header-inner {
  @apply max-w-7xl mx-auto px-6 h-[60px] grid grid-cols-3 items-center;
}

.header-logo {
  @apply flex items-baseline gap-2 no-underline justify-self-start;
}

.header-logo-title {
  @apply text-[1.05rem] font-extrabold tracking-tight text-text-brand;
  text-shadow: 0 0 18px rgba(0, 240, 255, 0.5);
}

.header-logo-sub {
  @apply text-[0.7rem] font-medium uppercase tracking-widest text-text-muted border-b border-border-brand pb-px;
}

/* Nav de escritorio: oculta en móvil, visible desde md */
.header-nav {
  @apply hidden md:flex items-center gap-3 justify-self-center;
}

.header-nav-divider {
  @apply w-px h-4 bg-border-default opacity-50;
}

/* Acciones (login/register o username/avatar/logout): en su sitio de siempre, SIEMPRE visibles */
.header-actions {
  @apply flex items-center gap-2 justify-self-end;
}

.header-btn-login {
  @apply px-4 py-1.5 rounded-lg text-sm text-text-muted hover:text-text-default hover:bg-bg-container transition-colors;
}

.header-btn-register {
  @apply px-4 py-1.5 rounded-lg text-sm font-semibold text-bg-body bg-text-brand hover:opacity-90 transition-opacity;
}

.header-btn-nav {
  @apply px-2 py-1.5 rounded-lg text-sm text-text-muted hover:text-text-default hover:bg-bg-container transition-colors no-underline;
}

.header-btn-home {
  @apply flex items-center justify-center w-9 h-9 rounded-lg text-text-muted hover:text-text-brand hover:bg-bg-container transition-colors;
}

.header-username {
  @apply text-sm text-text-default font-medium max-w-[90px] sm:max-w-[140px] truncate;
}

.header-btn-avatar {
  @apply w-[34px] h-[34px] rounded-full border border-border-default hover:border-border-brand bg-bg-container overflow-hidden transition-colors;
}

.header-avatar-img {
  @apply w-full h-full object-cover;
}

.header-btn-logout {
  @apply flex items-center justify-center w-9 h-9 rounded-lg text-text-muted hover:text-text-default hover:bg-bg-container transition-colors;
}

/* Botón hamburguesa: ocupa el hueco central (donde va la nav en escritorio), solo visible en móvil */
.header-hamburger {
  @apply flex md:hidden items-center justify-center w-9 h-9 rounded-lg text-text-muted hover:text-text-default hover:bg-bg-container transition-colors justify-self-center;
}

/* Menú desplegable móvil: opciones centradas, con relleno y resaltadas */
.mobile-nav {
  @apply md:hidden flex flex-col gap-2 px-4 py-4 border-t border-border-default bg-bg-body;
}

.mobile-nav-link {
  @apply flex items-center justify-center text-center px-4 py-3 rounded-xl text-base font-semibold text-text-default bg-bg-container border border-border-default hover:border-border-brand hover:text-text-brand transition-colors no-underline;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
