import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import getProducts from '../api/get-products'

export const useProductsStore = defineStore('products', () => {
  
  // State = data
  const products = ref([]);

  // Getters
  
  
  // Actions
  async function call() {
    products.value = await getProducts(1);
  }

  async function callMore(totalProducts = 200) {
    // Helper for waiting between requests
    function wait(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }

    const pagesCount = Math.ceil(totalProducts / 25) - 1;


    for (let i = 1; i <= pagesCount; i++) {
      products.value = [...products.value, ...(await getProducts(i + 1))];
      console.log(`${i} of ${pagesCount} added`);
      await wait(1000)
    }


  }

  return { products, call, callMore }
})
