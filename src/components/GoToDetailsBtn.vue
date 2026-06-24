<script setup>
    import { useRouter } from 'vue-router';
    import { ChevronRight } from 'lucide-vue-next';

    const router = useRouter();

    const props = defineProps({
        animeId: {
            type: Number,
            required: true
        }
    })

    const goToDetail = () => {
        router.push({ name: 'detail', params: { id: props.animeId } })
    }
</script>

<template>
    <div @click.stop="goToDetail" class="go-to-detail-btn">
        <ChevronRight />
        View Details    
    </div>
</template>

<style scoped>
@reference '../assets/main.css';

.go-to-detail-btn {
    font-family: 'Hanken Grotesk';
    @apply
        flex items-center gap-2 cursor-pointer
        py-3 px-4 rounded-sm
        bg-bg-special border border-border-default
        hover:bg-bg-special-hover
}
</style>