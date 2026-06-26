<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Cookiesnogalletas from './components/Cookiesnogalletas.vue'

import { storeToRefs } from 'pinia'
import { useAuthStore } from './stores/auth-store.js'
import { onMounted } from 'vue'
import { useProductsStore } from './stores/products-store.js'

const { isLoading } = storeToRefs(useAuthStore())

const productsStore = useProductsStore()
const {api_error} = storeToRefs(productsStore);
const { call, callMore } = productsStore;

onMounted(async () => {
  try {
    await call()
    callMore(500)
  } catch (error) {
    console.log(`Error in App.vue onMounted(): ${error}`);
    api_error.value = error;
  }
  
  
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
</style>
