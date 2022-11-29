<script setup lang="ts">
import {useFetch, useRoute} from "#app";

const orderId = useRoute().params.orderId
const {data: data} = await useFetch(`/api/orders/${orderId}`)
</script>

<template>
  <h1>Order {{ orderId }}</h1>
  {{ data }}
</template>
