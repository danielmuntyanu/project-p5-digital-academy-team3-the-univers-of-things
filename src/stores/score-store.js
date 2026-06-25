import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { db } from "@/firebase";
import { doc, getDoc, arrayUnion, setDoc } from "firebase/firestore";

export const useScoreStore = defineStore('score', () => {
    
    // Actions
    async function calculateScore (id, apiScore, scoredBy) {
        const docRef = doc(db, "scores", String(id));
        const docSnap = await getDoc(docRef);
        const itemUserScores = docSnap.data()?.scores;
        
        if (!docSnap.exists() || !itemUserScores) return apiScore;

        const scoredByTotal = itemUserScores.length + scoredBy;

        const scoresSum = itemUserScores.reduce(
            (acc, item) => {
                return acc + item;
            }, 
            apiScore * scoredBy
        );

        const combinedScore = scoresSum / scoredByTotal;
        
        const result = Math.trunc(combinedScore * 100) / 100;

        return result;
    }

    async function addScore (id, scoreVAlue, userType) {
        if (!id || !scoreVAlue || !userType) return;
        
        scoreVAlue = Number(scoreVAlue);

        const docRef = doc(db, "scores", String(id));
        await setDoc(docRef,
            { scores: arrayUnion(scoreVAlue)},
            { merge: true }
        )

        // LOCAL STORAGE
        const userScoresEnLocal = JSON.parse(
            localStorage.getItem("user-scores") || '[]'
        );

        const curAnimeIndex = userScoresEnLocal.findIndex((item)=> item.id == id)
        if (curAnimeIndex != -1) {
            userScoresEnLocal[curAnimeIndex].score = scoreVAlue;
        } else {
            userScoresEnLocal.push({
                id: id,
                score: scoreVAlue
            });
        }
    
        localStorage.setItem("user-scores", JSON.stringify(
            userScoresEnLocal
        ));
    }

    function getLocalScore(id) {
        // return score value or undefined, check with (!getLocalScore(animeId))
        const localScoresList = JSON.parse(localStorage.getItem("user-scores") || '[]');
        if (!localScoresList.length) return null;

        const animeItem = localScoresList.find((item) => id == item.id);
        return animeItem?.score;
    }
    
    return {calculateScore, addScore, getLocalScore}

});