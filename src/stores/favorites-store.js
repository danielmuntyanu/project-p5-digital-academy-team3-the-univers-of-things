import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { db } from "@/firebase";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

export const useFavoritesStore = defineStore('favorites', () => {
    // State
    const favorites = ref([]);
    const currentUserUid = ref(null);


    // Getters


    // Actions
    async function updateFavotires() {
        const docSnap = await getDoc(doc(db, "users", currentUserUid.value));
        favorites.value = docSnap.data().favorites;
    }

    async function initFavorites(uid) {
        if (!uid) return;
        currentUserUid.value = uid;

        await updateFavotires();
    }

    async function addFavorite(productId) {
        const docRef = doc(db, "users", currentUserUid.value);
        await updateDoc(docRef, {
            favorites: arrayUnion(productId)
        });

        await updateFavotires();
    }

    async function removeFavorite(productId) {
        const docRef = doc(db, "users", currentUserUid.value);
        await updateDoc(docRef, {
            favorites: arrayRemove(productId)
        });

        await updateFavotires();
    }

    function checkFav(productId) {
        return favorites.value.includes(productId); 
    }

    return {favorites, initFavorites, checkFav, addFavorite, removeFavorite}

});







