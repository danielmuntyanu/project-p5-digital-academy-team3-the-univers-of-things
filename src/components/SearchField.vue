<script setup>

const model = defineModel();

</script>

<template>

    <div class="search_container">
        <h3 class="search_title">Search:</h3>
        <input 
            type="text"
            placeholder="Search by name..."
            v-model="model"
        />
    </div>
    
    
</template>

<style scoped>
@reference '../assets/main.css';


.search_container {
    @apply
        gap-2 flex flex-row flex-wrap justify-start items-center
    ;
}

.search_title {
    @apply 
        p-1
    ;
}

input {
    @apply 
        w-full h-auto p-2 rounded-lg
        bg-bg-input border border-border-default
        active:border-border-brand text-text-default 
    ;
}



</style>