<script setup>

const props = defineProps([
    "id", "imgUrl", "title",
    "description", "score",
    "category", "genres",
    "episodes"
])

</script>

<template>
    <div :id="id" class="container">
        
        <div class="image_container">
            <img class="image" :src="imgUrl" :alt="title"/>
        </div>

        <div class="content_container">

            <h3 class="title">{{ title }}</h3>

            <p class="description">{{ description }}</p>

            <div class="genres_container">
                <template v-for="(genre, key) in genres" :key="key">
                    <div class="genre">{{ genre }}</div>
                </template>
            </div>

            <div class="bottom_container">
                <span>Episodes: {{ episodes }}</span>

                <span class="category">{{ category }}</span>
            </div>
        </div>
    </div>
</template>


<style scoped>
@reference '../assets/main.css';

.container {
    @apply 
        max-h-[70vh] bg-bg-container rounded-lg shadow-lg
        border border-border-default
        grid grid-rows-2 gap-0
        ;

}

.image_container {
    @apply
        bg-bg-body rounded-lg 
        flex flex-col justify-center items-center 
        w-full
        ;
}

.image {
    @apply
        h-full object-contain
        ;
}

.content_container {
    @apply 
        p-4 gap-2 flex flex-col justify-between items-start
        ;
}


.title {
    @apply 
        text-left w-full
        ;

}

.description {
    @apply
        line-clamp-2
    ;
}

.genres_container {
    @apply 
        gap-2 flex flex-row flex-wrap justify-start items-center
    ;
}

.genre {
    @apply 
        p-2 rounded-sm 
        border border-border-default bg-bg-input
    ;
}
.bottom_container {
    @apply 
        w-full flex flex-row justify-between items-center
    ;
}

.category {
    @apply 
        text-text-special
    ;
}

</style>