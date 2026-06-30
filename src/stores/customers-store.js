import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { db } from '@/firebase'
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'


export const useCustomersStore = defineStore("customers", () => {
    const customers = ref([])

    async function updateCustomersList() {
        const querySnapshot = await getDocs(collection(db, "users"))

        const customersList = querySnapshot.docs.filter(
            doc => doc.data().type != "admin"
        )
        
        // querySnapshot.docs
        customers.value = customersList.map(
            doc => ({
                uid: doc.id,
                ...doc.data(),
                createdAt: doc.data().registerDate?.toDate()
            })
        )
    }

    async function changeBlacklisted(uid, changeBoolean) {
        const docRef = doc(db, "users", uid)
        await updateDoc(docRef, {
            blackListed: changeBoolean
        })

        await updateCustomersList();
    }

    async function addBlacklisted(uid) {
        await changeBlacklisted(uid, true)
    }

    async function removeBlacklisted(uid) {
        await changeBlacklisted(uid, false)
    }

    return {
        customers, 
        updateCustomersList,
        addBlacklisted,
        removeBlacklisted
    }
})