<script setup>
    import { ref } from "vue";
    import { Star, Heart } from 'lucide-vue-next';

    import checkUser from "../services/check-user.js";
    import addToFavorites from "../services/add-to-favorites.js";
    import removeFromFavorites from "../services/remove-from-favorites.js";

    const active = ref(false)

    const props = defineProps({
        productId: {
            type: Number,
            required: true
        }
    })

    const addToFavListener = () => {
        const user = checkUser();

        if (!user) {
            // Mostrar mensaje
        } else if (user === "user") {
            
            if (active.value) {
                active.value = false;
                removeFromFavorites(id_de_producto);
                // cambiar icono vasio
            } else {
                active.value = true;
                addToFavorites(id_de_producto);
                // cambiar icono color

            }
                
        }
    }

</script>

<template>
    <div 
        @click="addToFavListener"
        class="favorite-button"
    >
        <Heart
        :size="24"
        :fill="active ? 'currentColor' : 'none'"
        :strokeWidth="active ? 'text-orange-500' : 'text-white'"
        class="transition-all duration-300"
        />
        {{active ? 'Added to Favorites' : 'Add to Favorites' }}
        
    </div>
</template>

<style scoped>
/* Para usar Tailwind con @apply aqui. Cambia la dirección en otras carpetas! */
@reference "../assets/main.css";

.favorite-button {
    font-family: 'Hanken Grotesk';
    @apply
        flex gap-3 cursor-pointer
        mr-60 py-3 px-4 rounded-sm
        bg-bg-input border border-border-default
        hover:bg-bg-brand-darker;
}


</style>
