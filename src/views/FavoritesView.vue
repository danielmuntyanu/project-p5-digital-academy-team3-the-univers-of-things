<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useFavoritesStore } from '@/stores/favorites-store'
import { useAuthStore } from '@/stores/auth-store'
import { storeToRefs } from 'pinia'
import ProductCard from '../components/ProductCard.vue'
import getAnimeById from '../api/product-by-id.js'

const router = useRouter()
const favoritesStore = useFavoritesStore()
const authStore = useAuthStore()
const { favorites } = storeToRefs(favoritesStore)

const animeList = ref([])
const loading = ref(false)
const error = ref(null)

onMounted(async () => {
    loading.value = true

    try {
        // Initialize favorites for current user
        await favoritesStore.initFavorites(authStore.user?.uid)

        // Fetch full anime data for each favorite ID
        const results = await Promise.all(
            favorites.value.map(id => getAnimeById(id))
        )

        // Filter out any nulls (failed requests)
        animeList.value = results.filter(anime => anime !== null)

    } catch (err) {
        error.value = err.message
    } finally {
        loading.value = false
    }
})

const goToDetail = (animeId) => {
    router.push({ name: 'detail', params: { id: animeId } })
}
</script>

<template>
    <section>
        <div class="profile-container">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=nexus" alt="Profile_Image" class="profile-icon">
            <p class="profile-name">{{ authStore.user.fullName }}</p>
        </div>
        <div class="sub-profile-container">
            <p class="sub-profile-status">

            </p>
        </div>
         <div class="profile-stats">
            <div class="stats-container">
                <h2>FAVORITE ANIMES</h2>
                <p>200</p> <!-- Placeholder number -->
            </div>
            <div class="stats-container">
                <h2>ANIMES VIEWED</h2>
                <p>400</p> <!-- Placeholder number -->
            </div>
        </div>
    </section>
    <div class="favorites-container">
        <h1>My Favorites</h1>

        <div v-if="loading">Loading...</div>

        <div v-else-if="error" class="text-red-400">
            Something went wrong. Please try again later.
        </div>

        <div v-else-if="!animeList.length" class="text-text-muted">
            You have no favorites yet.
        </div>

        <div v-else class="favorites-grid">
            <ProductCard v-for="anime in animeList" :key="anime.mal_id" :id="anime.mal_id"
                :imgUrl="anime.images?.jpg?.large_image_url" :title="anime.title" :score="anime.score"
                :category="anime.type" :genres="anime.genres?.map(g => g.name)" :episodes="anime.episodes"
                @click="goToDetail(anime.mal_id)" />
        </div>
    </div>
</template>

<style scoped>
@reference "../assets/main.css";

.profile-container {
    @apply
        flex ml-[120.5px] mt-10
        items-center
        gap-6
}

.profile-container img {
    @apply
        w-15 h-15 rounded-full
        border border-border-brand
        overflow-hidden
}

.profile-container p {
    font-family: 'Sora';
    @apply
        font-bold text-[32px]
}

.profile-stats {
    @apply
        flex gap-5
        mt-10 ml-[120.5px]
}

.stats-container {
    @apply
        bg-bg-container pt-6 pl-6 pb-3
        border border-border-default rounded-lg
        w-60
}

.stats-container h2 {
    font-family: 'JetBrains Mono';
    @apply
        text-[14px] font-normal
        mb-2
}

.stats-container p {
    font-family: 'Sora';
    @apply
        font-extrabold text-[48px]
}

.favorites-container {
    @apply p-8 flex flex-col gap-6;
}

.favorites-grid {
    @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6;
}
</style>