<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const fullname = ref('')

async function submitHandler() {
  console.log('REGISTER CONNECTED')
  console.log(`Username: ${username.value}`)
  console.log(`Password: ${password.value}`)
  console.log(`Fullname: ${fullname.value}`)
}
</script>

<template>
  <div class="login-form">
    <div class="login-field">
      <label class="login-label">Email Address</label>
      <div class="login-input-wrap">
        <input v-model="username" type="email" placeholder="anime@nexus.com" class="login-input" />
        <span class="login-input-icon">✉</span>
      </div>
    </div>

    <div class="login-field">
      <label class="login-label">Full Name</label>
      <div class="login-input-wrap">
        <input v-model="fullname" type="text" placeholder="Naruto Udzumaki" class="login-input" />
        <span class="login-input-icon">✉</span>
      </div>
    </div>

    <div class="login-field">
      <div class="login-field-header">
        <label class="login-label">Password</label>
      </div>
      <div class="login-input-wrap">
        <input v-model="password" type="password" placeholder="••••••••" class="login-input" />
        <span class="login-input-icon">🔒</span>
      </div>
    </div>

    <div @click="submitHandler" class="login-submit">Access The Nexus →</div>
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

.login-input-icon {
  @apply absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-sm;
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
  @apply block w-full py-3 rounded-xl text-center font-bold text-text-on-brand no-underline bg-bg-brand hover:bg-bg-brand-hover transition-colors;
}
</style>
