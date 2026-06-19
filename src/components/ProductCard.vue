<script setup>
import { Star, Heart } from 'lucide-vue-next';
import AddToFavoritesBtn from './AddToFavoritesBtn.vue';

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
            <div class="score">
                <Star :size="12" fill="currentColor" :strokeWidth="2" /> {{ score }}
            </div>

            <AddToFavoritesBtn size="sm" :productId="id"/>
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
        max-h-[70vh] max-w-[320px]
        bg-bg-container rounded-lg shadow-lg
        border border-border-default
        grid grid-rows-2 gap-0
        xl:max-w-[20vw]
    ;

}

.image_container {
    @apply
        bg-bg-body rounded-lg 
        flex flex-col justify-center items-center 
        w-full relative
    ;
}

.image {
    @apply
        h-full object-contain z-0
    ;
}

.favorite_active {
    @apply
        text-text-brand bg-bg-brand-darker border-border-brand shadow-md
    ;
}

.score {
    @apply
        absolute top-4 right-4 rounded-md
        inline-flex flex-row gap-1 items-center
        px-2 py-1 text-sm shadow-lg
        bg-bg-container border border-border-default
    ;
}

.content_container {
    @apply 
        p-4 gap-2 flex flex-col justify-between items-start
    ;
}


.title {
    @apply 
        text-left w-full text-lg
    ;
}

.description {
    @apply
        line-clamp-2 text-sm text-text-default/70
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