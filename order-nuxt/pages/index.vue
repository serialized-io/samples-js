<script setup lang="ts">
import {useFetch, useRoute} from "#app";

const orderId = useRoute().params.orderId
const {data: data} = await useFetch(`/api/orders/stats`)
</script>

<template>
  <h1>Order Management Home</h1>
  <p>Welcome to the order management system</p>
  <h3>Shipped orders: {{data.shippedOrders}}</h3>
  <h3>Total revenue: {{data.totalRevenue}}</h3>
</template>
