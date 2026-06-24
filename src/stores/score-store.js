import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { db } from "@/firebase";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

export const useScoreStore = defineStore('score', () => {
    // State
    const userScores = ref([]);
    const scores = ref([]);


    // Getters

    // Actions
    function calculateScore(id, apiScore, scoredBy) {
        const curUserScore = userScores.find((item) => item.id == id);
        
    }

    function getScore(id) {
        return 
    } 


    async function initScores () {
        const docSnap = await getDoc(doc(db, 'scores', 'base'));
        userScores.value = docSnap.data().data;
        console.log(JSON.stringify(userScores.value));
    }
    
    return {initScores}

});







