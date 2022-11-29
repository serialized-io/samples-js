<script setup lang="ts">
import {useFetch} from "#app";

const {data: data} = await useFetch('/api/orders/ready-to-ship')
const orders = data.value?.orders

</script>

<template>
  <h1>Ready to ship</h1>
  <ul>
    <li v-for="order in orders">{{ order }}</li>
  </ul>
</template>
