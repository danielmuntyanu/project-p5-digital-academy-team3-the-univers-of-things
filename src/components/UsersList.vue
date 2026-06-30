<script setup>
import { ref } from "vue";


const customers = ref([])
</script>

<!-- 
num incr | email | fullname | create date | status btn[ active , blocked ] | uid


-->
<template>
    <h1>USERs LIsT</h1>

    <table>
        <thead>
            <tr>
                <th class="n_column">№</th>
                <th>Email</th>
                <th>Full Name</th>
                <th>Create Date</th>
                <th>UID</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="item, index in customers" :key="index">
                <tr>
                    <td>{{ index }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.fullName }}</td>
                    <td>{{ item.registerDate }}</td>
                    <td>{{ item.uid }}</td>
                    <td>
                        <button 
                            class="status_button"
                            :class="item.status == 'active' ? 'status_active' : 'status_blocked'"
                            @click="statusBtnHandler"
                        >
                            {{ item.status }}
                        </button>
                    </td>
                </tr>
            </template>
            

        </tbody>
    </table>

</template>

<style scoped>
@referense "../assets/main.css";


table {

}

thead {

}

tbody {

}

tr {

}

th {
    
}

td {

}



.status_button {

}

.status_active{

}

.status_blocked {

}

</style>