<script setup>
import { ArrowLeft, ArrowRight } from 'lucide-vue-next';
import { computed } from 'vue';

const model = defineModel();

const props = defineProps([
    "totalPages"
])

const arrowLeftDisabled = computed(() => {
    return model.value == 0; 
})

const arrowRightDisabled = computed(() => {
    return model.value + 1 == props.totalPages || !props.totalPages; 
})

function prevPage () {
    if (!arrowLeftDisabled.value) {
        model.value--;
    }
}

function nextPage () {
    if (!arrowRightDisabled.value) {
        model.value++;
    }
}

</script>

<template>

    <div class="pag_container">

        <div 
            class="pag_arrows"
            @click="prevPage"
            :class="{'disabled': arrowLeftDisabled}"
        >
            <ArrowLeft />
        </div>

        <template v-if="!totalPages">
            <div
                class="pag_page disabled"
            >
                0
            </div>
        </template>

        <template v-for="n in totalPages" :key="n">
            <div 
                class="pag_page"
                :class="{'active': model == n - 1}"
                @click="model = n - 1"
            >
                {{ n }}
            </div>
        </template>


        <div 
            class="pag_arrows"
            @click="nextPage"
            :class="{'disabled': arrowRightDisabled}"
        >
            <ArrowRight />
        </div>
    </div>

</template>


<style scoped>
@reference '../assets/main.css';

.pag_container {
    @apply 
        w-full my-8
        flex flex-row gap-3 sm:gap-4 justify-center items-center select-none
    ;
}

.pag_page {
    @apply
        p-2 px-4 flex justify-center items-center 
        rounded-lg border border-bg-surface
        
        transition-all duration-300
        hover:border hover:border-border-brand hover:text-text-brand
        hover:shadow-lg
        active:bg-bg-brand active:text-text-on-brand
        
    ;
}

.pag_arrows {
    @apply
        p-2 flex justify-center items-center 
        rounded-lg shadow-lg
        border border-border-default

        transition-all duration-300
        hover:border-border-brand hover:text-text-brand
        active:bg-bg-brand active:text-text-on-brand
    ;
}

.active {
    @apply
        bg-bg-brand-darker text-text-brand border-border-brand
    ;
}

.disabled {
    @apply 
        opacity-25 hover:border-border-default hover:text-text-default
    ;
}


</style>