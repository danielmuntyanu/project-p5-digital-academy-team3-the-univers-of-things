<script setup>
import { onMounted, ref } from "vue";
import { useCustomersStore } from "@/stores/customers-store";
import { storeToRefs } from "pinia";

const customerStore = useCustomersStore();
const {updateCustomersList, addBlacklisted, removeBlacklisted} = customerStore;
const { customers } = storeToRefs(customerStore);

new Date().toDateString()

onMounted(async () => {
    await updateCustomersList();
})

const statusBtnHandler = async (index) => {
    
    const item = customers.value[index];
    
    if (item.blackListed) {
        await removeBlacklisted(item.uid)
    } else if (!item.blackListed) {
        await addBlacklisted(item.uid)
    }
}

</script>

<template>
    <h1>USERs LIsT</h1>

    <section>
        <table>
            <thead>
                <tr>
                    <th class="n_column">№</th>
                    <th>Email</th>
                    <th>Full Name</th>
                    <th>Create Date</th>
                    <!-- <th>UID</th> -->
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="item, index in customers" :key="index">
                    <tr>
                        <td class="n_column">{{ index }}</td>
                        <td>{{ item.email }}</td>
                        <td>{{ item.fullName }}</td>
                        <td>{{ item.createdAt?.toDateString() }}</td>
                        <!-- <td>{{ item.uid }}</td> -->
                        <td>
                            <button 
                                id="statusButton"
                                :class="item.blackListed ? 'status_blocked' : 'status_active'"
                                @click="statusBtnHandler(index)"
                            >
                                {{ item.blackListed ? 'Blocked' : 'Active' }}
                            </button>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </section>

</template>

<style scoped>
@reference "../assets/main.css";


section {
    @apply 
        p-4 min-h-screen
    ;
}
table {
    @apply 
        w-full border border-border-default
        text-left text-base
    ;
}

thead {
    @apply 
        font-bold bg-bg-input
    ;
}

/*
tbody {
    @apply 
        
    ;
}

tr {
    @apply 
        
    ;
}
 */
.n_column {
    @apply  
        w-5
    ;
} 

th {
    @apply 
        p-2 border border-border-strong
    ;
}


td {
    @apply 
        p-2 border border-border-default
    ;
}
/* 


#statusButton {
    @apply 
        
    ;
}

.status_active{
    @apply 
        
    ;
}

.status_blocked {
    @apply 
        
    ;
} */

</style>