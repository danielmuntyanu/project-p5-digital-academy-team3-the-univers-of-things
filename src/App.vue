<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Cookiesnogalletas from './components/Cookiesnogalletas.vue'

import { storeToRefs } from 'pinia'
import { useAuthStore } from './stores/auth-store.js'
import { onMounted } from 'vue'
import { userProductsStore } from './stores/user-products-store.js'

const { isLoading } = storeToRefs(useAuthStore())

const { call, callMOre } = userProductsStore()

onMounted(async () => {
  await call()
  callMOre(500)
})
</script>

<template>
  <template v-if="isLoading">
    <div class="min-h-screen flex flex-col justify-center items-center">
      <h1 class="text-center">Loading...</h1>
    </div>
  </template>

  <template v-else>
    <Header />

    <RouterView />

    <Footer />

    <Cookiesnogalletas />
  </template>
</template>

<style>
/* Para usar Tailwind con @apply aqui. Cambia la dirección en otras carpetas! */
/* @reference "./assets/main.css"; */
</style>
