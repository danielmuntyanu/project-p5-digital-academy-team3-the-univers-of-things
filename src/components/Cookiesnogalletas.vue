<script setup>
import { ref, onMounted } from 'vue'

const STORAGE_KEY = 'nexus-cookies-accepted'

const showCookieModal = ref(false)

onMounted(() => {
  const alreadyAccepted = localStorage.getItem(STORAGE_KEY)
  if (!alreadyAccepted) {
    showCookieModal.value = true
  }
})

function acceptCookies() {
  localStorage.setItem(STORAGE_KEY, 'true')
  showCookieModal.value = false
}
</script>

<template>
  <div v-if="showCookieModal" class="cookie-overlay">
    <div class="cookie-modal">
      <h3 class="cookie-title">Usamos cookies</h3>
      <p class="cookie-text">
        Usamos cookies para mejorar tu experiencia en Nexus Anime y mantener tu sesión activa. Al
        continuar navegando, aceptas su uso.
      </p>
      <button type="button" class="cookie-btn-accept" @click="acceptCookies">Aceptar</button>
    </div>
  </div>
</template>

<style scoped>
@reference "../assets/main.css";

.cookie-overlay {
  @apply fixed inset-0 bg-black/70 flex items-center justify-center z-[100] px-6;
}

.cookie-modal {
  @apply flex flex-col gap-4 bg-bg-surface border border-border-default rounded-2xl p-6 max-w-sm w-full;
}

.cookie-title {
  @apply text-lg font-bold text-text-default;
}

.cookie-text {
  @apply text-sm text-text-muted leading-relaxed;
}

.cookie-btn-accept {
  @apply self-center px-5 py-2.5 rounded-xl text-sm font-bold text-text-on-brand bg-bg-brand hover:bg-bg-brand-hover transition-colors active:scale-[0.97];
}
</style>
