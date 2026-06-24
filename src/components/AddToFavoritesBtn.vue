<script setup>
    import { ref, computed, onMounted } from "vue";
    import { Heart } from 'lucide-vue-next';

    import { useAuthStore } from "@/stores/auth-store";
    import { useFavoritesStore } from "@/stores/favorites-store";
    
    const authStore = useAuthStore();
    const favoritesStore = useFavoritesStore();
   
    const { checkFav, removeFavorite, addFavorite } = favoritesStore;


    const props = defineProps({
        productId: {
            type: Number,
            required: true
        },
        size: {
            type: String,
            required: false,
        }
    })

    const active = computed( () => {
        return checkFav(props.productId);
    })

    const buttonListener = async () => {
        
        const userType = authStore.userType;
        
        if (!userType) {
            
            
            
            // Mostrar mensaje
            console.log("MOSTRAMOS MENSAJE QUE NECESITAN LOGIN");
            


        } else if (userType === "customer") {
            if (active.value) {
                await removeFavorite(props.productId);
            } else {
                await addFavorite(props.productId);
            }
        }
    }

    onMounted(async () => {
        await favoritesStore.initFavorites(authStore.user?.uid);
    });

</script>

<template>
    <template v-if="size && size == 'sm'">
        <div 
            @click.stop="buttonListener"
            class="favorite-button-sm"
        >
            <Heart 
                :size="24" 
                :fill="active ? 'currentColor' : 'none'" 
                :strokeWidth="2" 
            />
        </div>
    </template>
    <template v-else>
        <div 
            @click="buttonListener"
            class="favorite-button-lg"
        >
            <Heart
            :size="24"
            :fill="active ? 'currentColor' : 'none'"
            :strokeWidth="active ? 'text-orange-500' : 'text-white'"
            />
            {{active ? 'Added to Favorites' : 'Add to Favorites' }}
            
        </div>
    </template>
    
</template>

<style scoped>
@reference "../assets/main.css";

.favorite-button-lg {
    font-family: 'Hanken Grotesk';
    @apply
        flex gap-3 cursor-pointer
        py-3 px-4 rounded-sm
        bg-bg-input border border-border-default
        hover:bg-bg-brand-darker

        transition-all duration-300
    ;
}

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
