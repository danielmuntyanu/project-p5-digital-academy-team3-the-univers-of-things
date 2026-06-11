
<script setup>
  import HomeView from './views/HomeView.vue';
  import Header from './components/Header.vue';
  import Footer from './components/Footer.vue';

</script>

<template>
  <Header />

  <h1>App</h1>

  <HomeView />

  <Footer />
</template>

<style scoped>
/* Para usar Tailwind con @apply aqui. Cambia la dirección en otras carpetas! */
@reference "./assets/main.css";



</style>
