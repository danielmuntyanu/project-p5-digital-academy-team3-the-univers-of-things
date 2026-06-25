<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth-store.js'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

const auth = useAuthStore()
const {userType, avatarURL} = storeToRefs(auth)
const router = useRouter()



const dashboardLink = computed( () => {
  if (userType.value == "customer") {
    return "/user-dashboard"
  } else if (userType.value == "admin") {
    return "/admin-dashboard"
  } else {
    return "/login"
  }
});

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

      <!-- Navegación -->
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

      <!-- Sin registrar -->
      <div v-if="!auth.isLoggedIn" class="header-actions">
        <RouterLink to="/Login" class="header-btn-login">Login</RouterLink>
        <RouterLink to="/register" class="header-btn-register">Register</RouterLink>
      </div>

      <!-- Registrado -->
      <div v-else class="header-actions">
        <RouterLink to="/settings" class="header-btn-avatar">
          <img
            :src="avatarURL"
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
  </header>
</template>

<style scoped>
@reference "../assets/main.css";

.header {
  @apply sticky top-0 z-50 bg-bg-body border-b border-border-default;
}

.header-inner {
  @apply max-w-7xl mx-auto px-6 h-[60px] grid grid-cols-3 items-center;
  @apply max-w-7xl mx-auto px-6 h-[60px] grid grid-cols-3 items-center;
}

.header-logo {
  @apply flex items-baseline gap-2 no-underline justify-self-start;
  @apply flex items-baseline gap-2 no-underline justify-self-start;
}

.header-logo-title {
  @apply text-[1.05rem] font-extrabold tracking-tight text-text-brand;
  text-shadow: 0 0 18px rgba(0, 240, 255, 0.5);
}

.header-logo-sub {
  @apply text-[0.7rem] font-medium uppercase tracking-widest text-text-muted border-b border-border-brand pb-px;
}

.header-nav {
  @apply flex items-center gap-3 justify-self-center;
  @apply flex items-center gap-3 justify-self-center;
}

.header-nav-divider {
  @apply w-px h-4 bg-border-default opacity-50;
}

.header-actions {
  @apply flex items-center gap-2 justify-self-end;
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

.header-btn-home {
  @apply flex items-center justify-center w-9 h-9 rounded-lg text-text-muted hover:text-text-brand hover:bg-bg-container transition-colors;
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
