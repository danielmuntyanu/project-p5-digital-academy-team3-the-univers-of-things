<script setup>


const model = defineModel();

const props = defineProps([
    "filterList",
])


</script>


<template>

    <div class="filters_controls">
        <h3 class="filters_title">Filters:</h3>
        <div @click="model = '' "
            class="genre_filter filter_all"
            :class="{'active': !model }"
        >All</div>
        <template v-for="(genre, key) in filterList" :key="key">
            <div 
                @click="model = genre"
                class="genre_filter"
                :class="{'active': genre === model}"
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

.filters_title {
    @apply 
        uppercase font-light text-lg text-text-default/70
    ;
}

.genre_filter {
    @apply 
        p-2 rounded-xl text-sm cursor-pointer
        border border-border-default bg-bg-input
        hover:bg-bg-brand-darker hover:border-border-brand hover:text-text-brand
        active:bg-bg-brand-hover active:text-text-on-brand
        
    ;
}

.filter_all {
    @apply 
        px-4
    ;
}

.active {
    @apply
        bg-bg-brand-darker text-text-brand border-border-brand
    ;
}

</style>