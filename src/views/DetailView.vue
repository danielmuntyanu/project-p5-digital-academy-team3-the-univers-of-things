<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import getAnimeById from '../api/product-by-id.js';
import ProductCard from '../components/ProductCard.vue';
import getAnimeByGenre from '../api/product-by-genre.js';


const route = useRoute()
const animeData = ref(null)
const loading = ref(false)
const error = ref(null)
const router = useRouter()

const airedFrom = computed(() => {
  if (!animeData.value?.aired?.from) return null
  return new Date(animeData.value.aired.from).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
})

const fetchAnime = async (id) => {
  loading.value = true
  error.value = null

  try {
    animeData.value = await getAnimeById(id)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  fetchAnime(route.params.id)
})

watch(() => route.params.id, (newId) => {
  if (newId) fetchAnime(newId)
})

onMounted(async () => {
  loading.value = true

  try {
    const id = route.params.id
    animeData.value = await getAnimeById(id)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})

const recommendations = ref([])

watch(animeData, async (newData) => {
  if (!newData) return

  const genreId = newData.genres?.[0]?.mal_id
  if (!genreId) return
  console.log('Genre ID:', genreId);
  

  const results = await getAnimeByGenre(genreId)
  console.log('Recommendations:', results);
  

  recommendations.value = results?.filter(item => item.mal_id !== newData.mal_id) ?? []
  console.log('Final recommendations:', recommendations.value);
  
})  

const goToDetail = (animeId) => {
  console.log('Clicked, navigation to:', animeId);
  
  router.push({ name: 'detail', params: { id: animeId } })
}

</script>

<template>
  <div v-if="loading">Loading...</div>
  
  <div v-else-if="error" class="text-center py-12">
    <p class="text-red-400">Something went wrong. Please try again later.</p>
  </div>

  <div v-else-if="!animeData" class="text-center py-12">
    <p class="text-text-muted">Anime not found.</p>
  </div>
  <div v-else class="detail-container">
    <div class="detail-left">
      <div class="detail-image">
        <img :src="animeData?.images?.jpg?.large_image_url" :alt="animeData?.title" class="w-full h-full object-cover"/>
      </div>
      <div class="detail-data-log">
        <h2>Data Log</h2>
        <div class="data-log-grid">
          <span class="datalog-key">Type</span>
          <span class="datalog-value">{{ animeData?.type }}</span>

          <span class="datalog-key">Episodes</span>
          <span :class="animeData?.episodes === 'null' " class="datalog-value">{{ animeData?.episodes }}</span>

          <span class="datalog-key">Status</span>
          <span :class="animeData?.status === 'Finished Airing' || 'Currently Airing' ? 'text-text-brand' : 'text-white'" class="datalog-value">{{ animeData?.status }}</span>

            <span class="datalog-key">Aired</span>
            <span class="datalog-value">{{ airedFrom }}</span>

            <span class="datalog-key">Studio</span>
            <span class="datalog-value">{{ animeData?.studios?.[0]?.name }}</span>
        </div>
      </div>
    </div>
    <div class="detail-content-container">
      <div class="detail-content">
        <section class="detail-synopsis">
          <h2>Synopsis</h2>
          <p>{{ animeData?.synopsis }}</p>
          <div class="details-genre">
            <span v-for="genre in animeData?.genres" :key="genre.mal_id" class="synopsis-genre">
              {{ genre.name }}
            </span>
          </div>
        </section>
      </div>
      <div class="detail-recommendations">
        <h2>Related Recommendations</h2>
        <div class="recommendations-cards">
          <ProductCard
          v-for="item in recommendations"
          :key="item.mal_id"
          :id="item.mal_id"
          :imgUrl="item.images?.jpg?.large_image_url"
          :title="item.title"
          :score="item.score"
          :category="item.type"
          :genres="item.genres?.map(g => g.name)"
          :episodes="item.episodes"
          @click="goToDetail(item.mal_id)"
          />
        </div>
      </div>
    </div>
  </div>
  
</template>

<style scoped>
/* Para usar Tailwind con @apply aqui. Cambia la dirección en otras carpetas! */
@reference "../assets/main.css";

.detail-image {
  @apply border border-border-default
    rounded-lg overflow-hidden
    w-full;
}

h2 {
  font-family: 'Hanken Grotesk';
  @apply font-semibold;
}

.detail-container {
  @apply flex flex-col lg:flex-row gap-8 p-4 lg:p-8 lg:pl-5
  ;
}

.detail-left {
  @apply
    w-full
    lg:w-1/3 shrink-0;
}

.detail-data-log {
  @apply mt-6 lg:mt-10 bg-bg-container border border-border-default
    px-5 py-3
    rounded-md;
}

.data-log-grid {
  @apply grid grid-cols-2 gap-y-3 gap-x-2
    mt-4;
}

.datalog-key {
  font-family: 'Hanken Grotesk';
  @apply text-text-muted;
}

.datalog-value {
  font-family: 'Hanken Grotesk';
  @apply text-end;
}

.detail-content-container {
  @apply
    flex flex-col gap-8
    w-full
    lg:w-2/3;
    ;
}

.detail-content {
  @apply
    bg-bg-container border border-border-default rounded-lg
    p-6
    lg:p-20;

}

.detail-recommendations {
  @apply
    bg-bg-container border border-border-default rounded-lg 
    p-8;
}

.detail-synopsis h2 {
  font-family: 'Hanken Grotesk';
  @apply
    border-l-4 border-white pl-3
    mb-5
    text-2xl
    lg:text-4xl;
}

.detail-synopsis p {
  font-family: 'Hanken Grotesk';
  @apply text-base lg:text-xl text-text-muted;
}

.details-genre {
  @apply flex flex-wrap gap-2 mt-4;
}

.synopsis-genre {
  font-family: 'Hanken Grotesk';
  @apply px-5 py-1 rounded-xl
    border border-border-default bg-bg-input
    text-text-muted;
}

.recommendations-cards :deep(.container) {
  @apply
    max-h-[400px] w-full
    hover:scale-105
    mt-10;
}

.recommendations-cards {
   @apply grid grid-cols-1
   sm:grid-cols-2
   lg:grid-cols-3
   gap-4
   cursor-pointer;
}

</style>
