<script setup>
    import { ref, computed, onMounted } from 'vue';
    import ProductCard from './ProductCard.vue';
    import FilterControls from './FilterControls.vue';
    import SearchField from './SearchField.vue';
    import PaginationControls from './PaginationControls.vue';
    import searchProducts from '@/services/search-products.js';
    import filterProducts from '@/services/filter-products.js';
    import paginateProducts from '@/services/paginate-products.js';
    import { useProductsStore } from '@/stores/products-store';
    import { storeToRefs } from 'pinia';

    const filter = ref("");
    const searchInput = ref("");

    const itemsPerPage = ref(8);
    const pagCurrentPage = ref(0);

    const productsStore = useProductsStore();
    const { products } = storeToRefs(productsStore);
    const { call } = productsStore;

    const noItemsMessage = ref("No items found")

    // Download products from the API
    onMounted( async () => {
        noItemsMessage.value = "Loading...";
        await call();
        noItemsMessage.value = "No items found";
    });

    const filteredProducts = computed(() => {
        let result = products.value;

        if (!result.length) {
            return result;
        };

        // Recall first page when filter or search entried
        pagCurrentPage.value = 0;

        // Apply category filter
        result = filterProducts(result, filter.value);

        // Apply search by name
        result = searchProducts(result, searchInput.value);

        // Separate products to pages in a new array: [ [8 items], [8 items], [rest of items] ]
        result = paginateProducts(result, itemsPerPage.value);

        return result;
    });

    // Giving a number of product pages to pagination component
    const pagPagesCount = computed(() => filteredProducts.value.length);

    const filterList = computed(() => {
        let result = new Set([]);

        products.value.forEach(
            (item) => item.genres?.map(
                (genre) => result.add(genre.name)
            )
        )

        return [...result];
    });

</script>

<template>
    <section class="section">
    
        <!-- FILTERS CONTAINER -->
        <div class="filters_container"> 
            <SearchField class="search_field" v-model="searchInput" />
            <FilterControls class="filter_controls" v-model="filter" :filterList="filterList"/>
        </div>

        <h1>Animes</h1>
        
        <!-- ITEMS GRID -->
        <div class="products_grid">
            <template v-for="(item, key) in filteredProducts[pagCurrentPage]" :key="key">
                <ProductCard 
                    :id="item.mal_id"
                    :imgUrl="item.images?.jpg?.large_image_url"
                    :title="item.title"
                    :description="item.synopsis"
                    :score="item.score"
                    :category="item.type"
                    :genres="item.genres?.map((genre) => genre.name)"
                    :episodes="item.episodes"
                />
            </template>
        </div>

        <span 
            class="no_items_message" 
            :class="!filteredProducts.length ? 'block' : 'hidden'">
            {{ noItemsMessage }}
        </span>

        <!-- PAGINATION -->
        <PaginationControls 
            v-model="pagCurrentPage" 
            :totalPages="pagPagesCount" 
        />

    </section>
</template>

<style scoped>
/* Para usar Tailwind con @apply aqui. Cambia la dirección en otras carpetas! */
@reference "../assets/main.css";

.section {
    @apply 
        min-h-screen
        w-full bg-bg-surface p-4 flex flex-col gap-8
    ;
}

.filters_container {
    @apply 
        w-full flex flex-col md:justify-between md:items-start
        md:flex-row gap-4 p-4
        bg-bg-container rounded-lg shadow-lg
        border border-border-default
    ;
}

.search_field {
    @apply 
        md:w-[30%]
    ;
}
.filter_controls {
    @apply
        md:w-[70%]
    ;
}

.products_grid {
    @apply 
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
        gap-8 
        justify-items-center md:justify-items-normal
        ;
}

.no_items_message {
    /* font-family: 'JetBrains Mono', monospace; */
    @apply text-center text-3xl text-text-muted;
}



</style>
