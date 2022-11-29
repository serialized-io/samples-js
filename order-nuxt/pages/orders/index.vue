<script setup lang="ts">
import {useFetch} from "#app";

const {data: data} = await useFetch('/api/orders')
const orders = data.value?.orders

</script>

<template>
  <h1>Orders</h1>
  <ul>
    <li v-for="order in orders"><a :href="`/orders/${order.orderId}`">{{ order.orderId }}</a></li>
  </ul>
</template>
