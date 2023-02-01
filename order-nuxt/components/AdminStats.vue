<script setup lang="ts">
import {useFetch, useRoute} from "#app";

const orderId = useRoute().params.orderId
const {data: data} = await useFetch(`/api/admin/orders/stats`)
</script>

<template>
  <div class="bg-white rounded p-8 my-4">
    <h3 class="text-sm font-bold">Shipped orders: {{ data?.shippedOrders ?? 0 }}</h3>
    <h3 class="text-sm font-bold">Total revenue: {{ data?.totalRevenue ?? 0 }}</h3>
  </div>
</template>
