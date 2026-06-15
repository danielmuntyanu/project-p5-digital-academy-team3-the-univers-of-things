<script setup>
import { ref } from 'vue';

const username = ref("");
const password = ref("");

async function login () {
    console.log("LOGIN CONNECTED");
}

</script>



<template>
    
    <h3>(Login)</h3>

    <form @submit.prevent="login">
        <label for="username">Username</label>
        <input type="text" name="username" id="username" v-model="username">

        <label for="password">Password</label>
        <input type="password" name="password" id="password" v-model="password">

        <button type="submit">Submit</button>
    </form>

</template>

<style scoped>
@reference "../assets/main.css";

form {
    @apply 
        flex flex-col justify-around gap-4 items-left
        bg-bg-container p-4 rounded-lg shadow-md;
}

input {
    @apply bg-bg-input p-2 text-left;
}

button {
    @apply text-center bg-bg-brand p-2 rounded-md shadow-md;
}
</style>