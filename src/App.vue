
<script setup>
  import { RouterView } from 'vue-router';
  import Header from './components/Header.vue';
  import Footer from './components/Footer.vue';

</script>

<template>
  <Header />

  <RouterView />

  <Footer />
</template>

<style>
/* Para usar Tailwind con @apply aqui. Cambia la dirección en otras carpetas! */
/* @reference "./assets/main.css"; */


</style>
