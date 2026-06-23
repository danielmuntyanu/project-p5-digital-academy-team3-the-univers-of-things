<script setup>
import { useAuthStore } from '../stores/auth-store.js'
import { useRouter } from 'vue-router'
const auth = useAuthStore()
const router = useRouter()

async function handleLogout() {
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

      <!-- Navegación (solo logueado) -->
      <nav v-if="auth.isLoggedIn" class="header-nav">
        <RouterLink to="/dashboard" class="header-btn-nav">Dashboard</RouterLink>
        <span class="header-nav-divider"></span>
        <RouterLink to="/favorites" class="header-btn-nav">Favorite List</RouterLink>
      </nav>

      <!-- Sin registrar -->
      <div v-if="!auth.isLoggedIn" class="header-actions">
        <RouterLink to="/Login" class="header-btn-login">Login</RouterLink>
        <RouterLink to="/register" class="header-btn-register">Register</RouterLink>
      </div>

      <!-- Registrado -->
      <div v-else class="header-actions">
        <button class="header-btn-avatar">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=nexus"
            alt="Avatar"
            class="header-avatar-img"
          />
        </button>
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
  </header>
</template>

<style scoped>
@reference "../assets/main.css";

.header {
  @apply sticky top-0 z-50 bg-bg-body border-b border-border-default;
}

.header-inner {
  @apply max-w-7xl mx-auto px-6 h-[60px] flex items-center justify-between;
}

.header-logo {
  @apply flex items-baseline gap-2 no-underline;
}

.header-logo-title {
  @apply text-[1.05rem] font-extrabold tracking-tight text-text-brand;
  text-shadow: 0 0 18px rgba(0, 240, 255, 0.5);
}

.header-logo-sub {
  @apply text-[0.7rem] font-medium uppercase tracking-widest text-text-muted border-b border-border-brand pb-px;
}

.header-nav {
  @apply flex items-center gap-3 mr-auto ml-6;
}

.header-nav-divider {
  @apply w-px h-4 bg-border-default opacity-50;
}

.header-actions {
  @apply flex items-center gap-2;
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

.header-btn-avatar {
  @apply w-[34px] h-[34px] rounded-full border border-border-default hover:border-border-brand bg-bg-container overflow-hidden transition-colors;
}

.header-avatar-img {
  @apply w-full h-full object-cover;
}

.header-btn-logout {
  @apply flex items-center justify-center w-9 h-9 rounded-lg text-text-muted hover:text-text-default hover:bg-bg-container transition-colors;
}
</style>
