<script setup>
import { computed, ref, onMounted } from 'vue';
import { Star } from 'lucide-vue-next';
import { useScoreStore } from '@/stores/score-store';
import { useAuthStore } from '@/stores/auth-store';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore()
const { userType } = storeToRefs(authStore)

const props = defineProps([
    "id"
])

const availableRates = ref([
    1, 2, 3, 4, 5,
    6, 7, 8, 9, 10
])

const chosen = ref(null)
const disabled = ref(false)
const hovered = ref(null)
const bouncing = ref(null)

const { addScore, getLocalScore } = useScoreStore();

async function buttonHandler(score) {
    if (disabled.value) return;
    bouncing.value = score;
    await addScore(props.id, score, userType.value);
    chosen.value = score;
    disabled.value = true;
}

onMounted(() => {
    const localScore = getLocalScore(Number(props.id))
    
    if(localScore) {
        disabled.value = true;
        chosen.value = localScore;
    }
})

</script>

<template>
    <div
        class="stars_container"
        @mouseleave="hovered = null"
    >
        <div 
            v-for="n in availableRates" 
            :key="n" 
            @click="buttonHandler(n)"
            @mouseenter="hovered = n"
            class="star"
            :class="!disabled ? 'available' : ''"
        >
            <Star 
                size="18"
                stroke-width="2"
                :fill="n <= (hovered !== null ? hovered : (chosen ?? 0)) ? 'currentColor' : 'none'"
                :class="n === bouncing ? 'pop' : '', !disabled ? 'available': ''"
                @animationend="bouncing = null"
            /> 
        </div>
    </div> 
</template>

<style scoped>
@reference "../assets/main.css";

.stars_container {
    @apply 
        flex flex-row justify-between items-center
        w-full 
        my-2
    ;
}

.star {
    @apply
        p-1 md:p-2 lg:p-1 text-text-brand
    ;
}

.available {
    @apply
        hover:text-text-default hover:scale-125
    ;
}

@keyframes pop {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.5);
    }
    100% {
        transform: scale(1);
    }
}

.pop {
    animation: pop 0.3s ease;
}

</style>