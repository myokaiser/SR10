<script setup>
import { ref } from 'vue';
    const listItems = ref([]);
    async function getData() {
    const res = await fetch("http://localhost:3000/api/offres");
    const finalRes = await res.json();
    listItems.value = finalRes;
    }
    getData()
</script>
<template>
    <div>
    <h1> Liste des offres </h1>
    <table border="1">
    <thead>
    <tr>
    <th scope="col">Id</th>
    <th scope="col">Organisation</th>
    <th scope="col">titre</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in listItems">
    <td>{{ item.id }}</td>
    <td>{{ item.organisation }}</td>
    <td>{{ item.titre }}</td>
    </tr>
    </tbody>
    </table>
    </div>
</template>