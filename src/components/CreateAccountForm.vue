<script setup>
import { ref } from 'vue';

const username = ref("");
const password = ref("");
const reEnterPassword = ref("");

async function createAccount () {
    console.log("CREATE ACCOUNT CONNECTED");
}

</script>



<template>

    <h3>(Create Account)</h3>

    <form @submit.prevent="createAccount">
        <label for="username">Your valid email:</label>
        <input type="text" name="username" id="username" v-model="username">

        <label for="password">New Password:</label>
        <input type="password" name="password" id="password" v-model="password">

        <label for="re-enter-password">Re-enter Password:</label>
        <input type="password" name="re-enter-password" id="reEnterPassword" v-model="reEnterPassword">

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