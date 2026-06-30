<script setup>
import { computed, onMounted, ref } from "vue";
import { useCustomersStore } from "@/stores/customers-store";
import { storeToRefs } from "pinia";
import paginateProducts from "@/services/paginate-products";
import PaginationControls from "./PaginationControls.vue";

const customerStore = useCustomersStore();
const {updateCustomersList, addBlacklisted, removeBlacklisted} = customerStore;
const { customers } = storeToRefs(customerStore);

// Pagination
const itemsPerPage = ref(8);
const pagCurrentPage = ref(0);

const paginatedCustomers = computed(() => {
    let result = customers.value;

    if (!result?.length) {
        return result;
    };

    result = paginateProducts(result, itemsPerPage.value);

    return result;
})

 // Giving a number of product pages to pagination component
const pagPagesCount = computed(() => {
    if (paginatedCustomers.value) {
        return paginatedCustomers.value.length
    } else {
        return 0;
    }
});

onMounted(async () => {
    await updateCustomersList();
})

const statusBtnHandler = async (index) => {
    const curButton = document.querySelector(`#statusButton${index}`)
    curButton.innerHTML = 'Process'
    curButton.classList.add("status_process");

    const item = customers.value[index];
    
    if (item.blackListed) {
        await removeBlacklisted(item.uid);
    } else if (!item.blackListed) {
        await addBlacklisted(item.uid);
    }

    curButton.classList.remove("status_process");
}

</script>

<template>
    <section>
        <h2>
            Customers
        </h2>

        <table>
            <thead>
                <tr>
                    <th class="n_column">№</th>
                    <th>Email</th>
                    <th>Full Name</th>
                    <th>Create Date</th>
                    <!-- <th>UID</th> -->
                    <th class="status_head">Status</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="item, index in paginatedCustomers[pagCurrentPage]" :key="index">
                    <tr>
                        <td class="n_column">{{ index }}</td>
                        <td class="email_column">
                            <a  
                                class="email_link"
                                :href="`mailto:${item.email}?Subject=Where20%my20%money20%${item.fullName.replace(' ', '20%')}`"
                            >
                                {{ item.email }}
                            </a>
                        </td>
                        <td>{{ item.fullName }}</td>
                        <td>{{ item.createdAt?.toDateString() }}</td>
                        <!-- <td>{{ item.uid }}</td> -->
                        <td class="btn_column">
                            <button 
                                :id="`statusButton${index}`"
                                class="status_button"
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

        <PaginationControls 
            v-model="pagCurrentPage"
            :total-pages="pagPagesCount"
        />
    </section>

</template>

<style scoped>
@reference "../assets/main.css";


section {
    @apply 
        p-4 min-h-screen gap-8 xl:px-8
        flex flex-col items-center justify-start
    ;
}

h2 {
    @apply 
        text-left w-full text-text-muted
    ;
}

table {
    @apply 
        w-full border border-border-default
        text-left 
        text-sm md:text-base
    ;
}

thead {
    @apply 
        font-bold bg-bg-input
    ;
}

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

.status_head {
    @apply 
        text-center
    ;
}

td {
    @apply 
        p-2 border border-border-default h-px
    ;
}

.email_column {
    @apply 
        max-w-[20vw] wrap-break-word
    ;
}

.email_link {
    @apply 
        underline hover:text-text-brand
        transition-all duration-300
    ;
}

.btn_column {
    @apply 
        w-20
    ;
} 


.status_button {
    @apply 
        p-1 w-20 rounded-lg 
        flex justify-center items-center
        border border-border-brand shadow-md
        hover:scale-110 transition-all duration-300
    ;
}


.status_active{
    @apply 
        hover:text-text-on-brand bg-bg-brand-darker hover:bg-bg-brand-hover
    ;
}

.status_blocked {
    @apply 
        hover:text-text-on-special bg-bg-special hover:bg-bg-special-hover
    ;
} 

.status_process {
    @apply 
        bg-bg-process hover:bg-bg-process
    ;
}

</style>