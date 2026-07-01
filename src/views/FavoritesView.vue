<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { useFavoritesStore } from '@/stores/favorites-store'
import { useAuthStore } from '@/stores/auth-store'
import { storeToRefs } from 'pinia'
import ProductCard from '../components/ProductCard.vue'
import getAnimeById from '../api/product-by-id.js'
import PaginationControls from '../components/PaginationControls.vue'
import { X } from 'lucide-vue-next'

const router = useRouter()
const favoritesStore = useFavoritesStore()
const authStore = useAuthStore()
const { favorites } = storeToRefs(favoritesStore)

const animeList = ref([])
const loading = ref(false)
const error = ref(null)
const animesViewed = ref(0)

const pagCurrentPage = ref(0)
const itemsPerPage = ref(8)

const paginatedAnimeList = computed (() => {
    const start = pagCurrentPage.value * itemsPerPage.value
    return animeList.value.slice(start, start + itemsPerPage.value)
})

const pagPagesCount = computed(() =>
    Math.ceil(animeList.value.length / itemsPerPage.value)
)

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

        if (authStore.user?.uid) {
            const docSnap = await getDoc(doc(db, "users", authStore.user.uid))
            animesViewed.value = docSnap.data()?.animesViewed ?? 0
        }

    } catch (err) {
        error.value = err.message
    } finally {
        loading.value = false
    }
})

const goToDetail = (animeId) => {
    router.push({ name: 'detail', params: { id: animeId } })
}

const removeFromFavorites = async (animeId) => {
    await favoritesStore.removeFavorite(animeId)
    animeList.value = animeList.value.filter(anime => anime.mal_id !== animeId)
}
</script>

<template>
    <section>
        <div class="profile-container">
            <img
            :src="authStore.avatarURL"
            alt="Profile_Image" class="profile-icon">
            <p class="profile-name">{{ authStore.user?.fullName }}</p>
        </div>
        <div class="sub-profile-container">
            <span v-if="authStore.userType == 'admin'" class="admin-badge">Admin</span>
            <span v-else class="user-badge">User</span>
            <span class="sub-profile-container-separator">·</span>
            <p class="sub-profile-status">Member since {{ authStore.user?.registerDate.getFullYear() }}</p>
        </div>
        <div class="profile-stats">
            <div class="stats-container">
                <h2>FAVORITE ANIMES</h2>
                <p>{{ favorites.length }}</p> <!-- Real count number -->
            </div>
            <div class="stats-container">
                <h2>ANIMES VIEWED</h2>
                <p>{{ animesViewed }}</p> <!-- Real count number -->
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

        <!-- <div v-else class="favorites-grid">
            <ProductCard
            v-for="anime in animeList"
            :key="anime.mal_id"
            :id="anime.mal_id"
            :imgUrl="anime.images?.jpg?.large_image_url"
            :title="anime.title"
            :score="anime.score"
            :scoredBy="anime.score_by"
            :category="anime.type"
            :genres="anime.genres?.map(g => g.name)"
            :episodes="anime.episodes"
            @click="goToDetail(anime.mal_id)" />
        </div> -->
        <div v-else class="favorites-list">
            <div v-for="anime in paginatedAnimeList" :key="anime.mal_id" class="favorite-row" @click="goToDetail(anime.mal_id)">
                <img :src="anime.images?.jpg?.image_url" :alt="anime.title" class="row-image" />

                <div class="row-content">
                    <h3>{{ anime.title_english ? anime.title_english : anime.title }}</h3>
                    <div class="row-genres">
                        <span v-for="genre in anime.genres" :key="genre.mal_id" class="row-genre">
                            {{ genre.name }}
                        </span>
                    </div>
                    <div class="row-meta">
                        <span>Episodes: {{ anime.episodes }}</span>
                        <span>{{ anime.type }}</span>
                    </div>
                </div>

                <div class="row-score">
                    ⭐ {{ anime.score }}
                </div>
                <button
                    @click.stop="removeFromFavorites(anime.mal_id)"
                    class="remove-btn">
                        <X :size="18" />
                </button>
            </div>
        </div>
        <PaginationControls
            v-model="pagCurrentPage"
            :totalPages="pagPagesCount"
        />
    </div>
</template>

<style scoped>
@reference "../assets/main.css";

.profile-container {
    @apply flex ml-[120.5px] mt-10 items-center gap-6
}

.profile-container img {
    @apply w-15 h-15 rounded-full border border-border-brand overflow-hidden
}

.profile-container p {
    font-family: 'Sora';
    @apply font-bold text-[32px]
}

.sub-profile-container {
    @apply
        flex items-center gap-8
        ml-[195px] mt-5
}

.sub-profile-container p {
    font-family: 'Sora';
    @apply
        text-text-muted text-sm
        ;
}

.sub-profile-container-separator {
    @apply
        text-text-muted
}

.admin-badge {
    @apply
        ml-2 px-2 py-1
        text-xs rounded-full
        bg-bg-brand-darker text-text-brand border border-border-brand
        ;
}

.user-badge {
    @apply
        ml-2 px-2 py-1
        text-xs rounded-full
        bg-bg-input text-text-muted border border-border-default
        ;
}

.profile-stats {
    @apply flex gap-5 mt-10 ml-[120.5px]
}

.stats-container {
    @apply bg-bg-container pt-6 pl-6 pb-3 border border-border-default rounded-lg w-60
}

.stats-container h2 {
    font-family: 'JetBrains Mono';
    @apply text-[14px] font-normal mb-2
}

.stats-container p {
    font-family: 'Sora';
    @apply font-extrabold text-[48px]
}

.favorites-container {
    @apply 
        mt-10 ml-[120.5px] mr-40
}

 .favorites-list {
  @apply
    flex flex-col gap-4
    mt-5;
}

.favorite-row {
  @apply
    flex items-center gap-4 p-4
    bg-bg-container border border-border-default rounded-lg
    cursor-pointer hover:bg-bg-brand-darker transition-colors
    relative;
}

.row-image {
  @apply
    w-20 h-28 object-cover rounded-md shrink-0;
}

.row-content {
  @apply
    flex-1 flex flex-col gap-2;
}

.row-genres {
  @apply
    flex flex-wrap gap-2;
}

.row-genre {
  @apply
    px-2 py-1 text-xs
    rounded-full border border-border-default bg-bg-input;
}

.row-meta {
  @apply
    flex gap-4 text-sm text-text-muted;
}

.row-score {
  @apply
    shrink-0 text-lg font-bold
    pr-8;
}

.remove-btn {
    @apply
        w-7 h-7 rounded-full
        absolute top-2 right-2
        flex items-center justify-center
        bg-bg-input border border-border-default
        text-text-muted
        hover:text-text-brand hover:border-border-brand
        transition-colors
        hover:cursor-pointer;
}
</style>