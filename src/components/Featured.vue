<script setup>
import { ref, onMounted, computed, reactive } from 'vue';
import AddToFavoritesBtn from '../components/AddToFavoritesBtn.vue';
import GoToDetailsBtn from '../components/GoToDetailsBtn.vue';
import { useFeaturedStore } from '@/stores/featured-store';
import { storeToRefs } from 'pinia';
import { Sparkles } from 'lucide-vue-next';

const featuredStore = useFeaturedStore()
const { featuredData } = storeToRefs(featuredStore)
const { call } = featuredStore

const anime = computed(() => {
  return featuredData.value
})

const loading = ref(true)
const error = computed(() => {
  if (!anime.value) {
    return 'No se pudo cargar el anime destacado.'
  }
})

onMounted(async () => {
  await call()
  loading.value = false
})

const videoURL = computed(() => {
  const rawURL = anime.value?.trailer?.embed_url
  if (!rawURL) return null;
  
  const videoSettings = '&mute=1&loop=1&controls=0&showinfo=0&rel&cc_load_policy=0&modestbranding=1&iv_load_policy=3'

  return rawURL + videoSettings
})  

const bgImage = computed(() => {
    if (videoURL.value) return {}
    
    const url = anime.value?.images?.jpg?.large_image_url 
             || anime.value?.images?.jpg?.image_url
    
    if (!url) return {}
    
    return { backgroundImage: `url(${url})` }
})
</script>

<template>
  <section class="featured-section">
    <p v-if="loading" class="featured-loading">Cargando...</p>
    <p v-else-if="error" class="featured-error">{{ error }}</p>

    <div 
      v-else-if="anime" 
      class="featured-card" 
      :style="bgImage"
    >

      <iframe v-if="videoURL" class="featured-video" :src="videoURL" width="420" height="315"></iframe>

      <div class="featured-overlay"></div>

      <div class="featured-info">
        <!-- <Sparkles class="sparkles-badge" /> -->
        <label class="featured-anime-badge" for="">Anime of the week</label>
        <h3 class="featured-anime-title">{{ anime.title_english ? anime.title_english : anime.title }}</h3>
        <p v-if="anime.title" class="featured-anime-subtitle">{{ anime.title }}</p>

        <p class="featured-synopsis">{{ anime.synopsis }}</p>
        <div class="button-container">
          <AddToFavoritesBtn :productId="anime.mal_id" />
          <GoToDetailsBtn v-if="anime?.mal_id" :animeId="anime.mal_id" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference "../assets/main.css";

/* .featured-section {
  @apply w-full flex flex-col gap-4 p-6;
} */

.featured-title {
  @apply font-(family-name:--JetBrains-Mono);
}

.featured-loading,
.featured-error {
  @apply text-text-special;
}

.featured-card {
  @apply relative rounded-lg overflow-hidden w-full h-[400px] md:h-[500px] lg:h-190 bg-cover bg-center;
}

.featured-anime-badge {
  @apply bg-bg-special py-0.5 px-4 rounded-lg text-[10px] text-[#531900] mr-60 md:mr-75;
}

.featured-overlay {
  @apply absolute inset-0;
  background: absolute inset-0;
  background: linear-gradient(to right,
      rgba(0, 0, 0, 0.92) 0%,
      rgba(0, 0, 0, 0.75) 50%,
      rgba(0, 0, 0, 0.4) 100%);
}

.featured-image {
  @apply rounded-lg object-cover w-48 h-auto bg-none;
}

.featured-info {
  @apply absolute bottom-6 left-6 flex flex-col gap-3 z-10 ml-2 md:ml-10 max-w-[90%] md:max-w-md;
}

.featured-anime-title {
  @apply text-xl font-bold;
}

.featured-anime-subtitle {
  @apply text-text-special text-sm;
}

.featured-synopsis {
  font-family: 'Hanken Grotesk';
  @apply line-clamp-3 md:line-clamp-4 leading-relaxed text-[#b9cacb] mr-0 md:-mr-20;
}

.featured-genres {
  @apply flex flex-row flex-wrap gap-2;
}

.featured-genre-tag {
  @apply px-2 py-1 rounded-sm border border-border-default text-sm;
}

.featured-video {
  @apply
    absolute inset-0 w-full h-full
    object-cover
    ;
}

.featured-meta {
  @apply flex flex-row flex-wrap gap-4 mt-auto pt-2;
}

.featured-meta-item {
  @apply text-sm;
}

.featured-status {
  @apply text-text-special;
}

.button-container {
  @apply flex flex-col md:flex-row gap-4
}
</style>
