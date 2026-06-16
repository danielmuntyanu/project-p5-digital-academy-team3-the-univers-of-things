<script setup>


const model = defineModel();

const props = defineProps([
    "filterList",
])


</script>


<template>

    <div class="filters_controls">
        <h3>Filters:</h3>
        <template v-for="(genre, key) in filterList" :key="key">
            <div 
                @click="model = genre"
                class="genre_filter"
            >{{ genre }}</div>
        </template>
        
    </div>

</template>

<style scoped>
@reference '../assets/main.css';

.filters_controls {
    @apply 
        gap-2 flex flex-row flex-wrap justify-start items-center
    ;
}

.genre_filter {
    @apply 
        p-2 rounded-sm text-sm cursor-pointer
        border border-border-default bg-bg-input
        hover:bg-bg-brand-hover hover:text-text-on-brand
        
    ;
}

</style>