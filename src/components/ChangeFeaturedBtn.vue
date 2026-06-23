<script setup>
    import { computed, onMounted } from "vue";
    import { Star } from 'lucide-vue-next';
    import { useFeaturedStore } from "@/stores/featured-store";
    
    const featuredStore = useFeaturedStore();
   
    const { changeFeatured, checkFeatured, call } = featuredStore;
   
    const props = defineProps({
        productId: {
            type: Number,
            required: true
        },
    })

    const active = computed( () => {
        return checkFeatured(props.productId);
    })

    const buttonListener = async () => {
        if (!active.value) {
            await changeFeatured(props.productId);
            await call();
        } 
    }

    // onMounted(async () => {
    //     await favoritesStore.initFavorites(authStore.user?.uid);
    // });

</script>

<template>
    <div 
        @click.stop="buttonListener"
        class="favorite-button-sm"
    >
        <Star 
            :size="24" 
            :fill="active ? 'currentColor' : 'none'" 
            :strokeWidth="2" 
        />
    </div>
</template>

<style scoped>
@reference "../assets/main.css";

.favorite-button-sm {
    @apply
        absolute top-4 left-4 rounded-full
        w-10 h-10 shadow-lg
        bg-bg-container text-text-default
        border border-border-default
        flex justify-center items-center

        transition-all duration-500
        hover:text-text-brand hover:border-border-brand
        active:bg-bg-brand active:text-text-on-brand
    ;
}


</style>
