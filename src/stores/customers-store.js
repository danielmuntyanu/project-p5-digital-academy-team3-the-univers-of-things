import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { db } from '@/firebase'
import { collection, getDocs } from 'firebase/firestore'
// import { doc, setDoc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'


export const useCustomersStore = defineStore("customers", () => {
    const customers = ref([])

    async function updateCustomersList() {
        console.log("updateCustomersList()");
        
    }

    async function addBlacklisted(uid) {
        console.log("addBlacklisted()");

    }

    async function removeBlacklisted(uid) {
        console.log("removeBlacklisted()");
    }



    return {
        customers, 
        updateCustomersList,
        addBlacklisted,
        removeBlacklisted
    }
})