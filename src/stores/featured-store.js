import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { db } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import getFeatured from '../api/get-featured';


export const useFeaturedStore = defineStore('featured', () => {
    // State
    const featuredId = ref(null);
    const featuredData = ref(null);

    // Actions
    async function updateFeatured() {
        try {  
            const docSnap = await getDoc(doc(db, "featured", "current"));
            featuredId.value = docSnap.data().id;
        } catch (error) {
            console.log(`Error in updateFeatured(): ${error}`);
        }
    }

    async function changeFeatured(newId) {
        const docRef = doc(db, "featured", "current");
        await updateDoc(docRef, {
            id: newId
        })

        await updateFeatured();
    }

    function checkFeatured(productId) {
        return productId == featuredId.value;
    }

    async function call() {
        featuredData.value = await getFeatured(featuredId.value);
    }
    
    return { featuredId, featuredData, updateFeatured, changeFeatured, checkFeatured, call};

});







