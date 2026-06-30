<script setup>
import UsersList from '@/components/UsersList.vue';

</script>

<template>
  <h1>Admin Dashboard</h1>

  <UsersList />

</template>

<style scoped>
/* Para usar Tailwind con @apply aqui. Cambia la dirección en otras carpetas! */
@reference "../assets/main.css";

h1 {
  @apply 
    text-left w-full pt-4 px-4 xl:px-8
  ;
}

</style>
