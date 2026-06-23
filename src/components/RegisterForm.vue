<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth-store'

const router = useRouter()
const authStore = useAuthStore()
const { register, logout } = authStore

const username = ref('')
const password = ref('')
const fullname = ref('')
const errorMessage = ref('')
const isLoading = ref(false)
const showPassword = ref(false)

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value
}

async function submitHandler() {
  errorMessage.value = ''
  isLoading.value = true

  try {
    await register(username.value, password.value, fullname.value)
    await logout()

    router.push({ path: '/login', query: { registered: 'true' } })
  } catch (error) {
    console.log(error)
    errorMessage.value = 'No se pudo completar el registro. Revisa tus datos e inténtalo de nuevo.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="login-form">
    <div class="login-field">
      <label class="login-label">Email Address</label>
      <div class="login-input-wrap">
        <input
          v-model="username"
          type="email"
          placeholder="anime@nexus.com"
          class="login-input"
          :class="{ 'login-input-error': errorMessage }"
        />
        <span class="login-input-icon">✉</span>
      </div>
    </div>

    <div class="login-field">
      <label class="login-label">Full Name</label>
      <div class="login-input-wrap">
        <input
          v-model="fullname"
          type="text"
          placeholder="Naruto Udzumaki"
          class="login-input"
          :class="{ 'login-input-error': errorMessage }"
        />
        <span class="login-input-icon">✉</span>
      </div>
    </div>

    <div class="login-field">
      <div class="login-field-header">
        <label class="login-label">Password</label>
      </div>
      <div class="login-input-wrap">
        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="••••••••"
          class="login-input"
          :class="{ 'login-input-error': errorMessage }"
        />
        <button
          type="button"
          @click="togglePasswordVisibility"
          class="login-input-icon login-toggle-password"
          :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
        >
          {{ showPassword ? '🙈' : '👁' }}
        </button>
      </div>
    </div>

    <p v-if="errorMessage" class="login-error">{{ errorMessage }}</p>

    <button @click="submitHandler" type="button" class="login-submit" :disabled="isLoading">
      {{ isLoading ? 'Creando cuenta...' : 'Access The Nexus →' }}
    </button>
  </div>
</template>

<style scoped>
@reference "../assets/main.css";

.login-form {
  @apply flex flex-col gap-5;
}

.login-field {
  @apply flex flex-col gap-1.5;
}

.login-field-header {
  @apply flex items-center justify-between;
}

.login-label {
  @apply text-sm text-text-default font-medium;
}

.login-forgot {
  @apply text-sm text-text-brand no-underline hover:opacity-80 transition-opacity;
}

.login-input-wrap {
  @apply relative;
}

.login-input {
  @apply w-full bg-bg-input border border-border-default rounded-lg px-4 py-3 text-sm text-text-default placeholder:text-text-muted outline-none focus:border-border-brand transition-colors pr-10;
}

.login-input-error {
  @apply border-red-500 focus:border-red-500;
}

.login-input-icon {
  @apply absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-sm;
}

.login-toggle-password {
  @apply cursor-pointer hover:opacity-80 transition-opacity bg-transparent border-none p-0;
}

.login-error {
  @apply text-sm text-red-500 -mt-1;
}

.login-remember {
  @apply flex items-center gap-2;
}

.login-checkbox {
  @apply w-4 h-4 accent-bg-brand;
}

.login-remember-label {
  @apply text-sm text-text-muted;
}

.login-submit {
  @apply block w-full py-3 rounded-xl text-center font-bold text-text-on-brand no-underline bg-bg-brand hover:bg-bg-brand-hover transition-colors active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed;
}
</style>
