<script setup lang="ts">
import {useFetch} from "#app";
import {ref} from "@vue/reactivity";

const {data: data} = await useFetch('/api/orders/ready-to-ship')
let orders = ref(data.value?.orders)

const shipOrder = async (orderId: string) => {
  await useFetch('/api/orders/ship-order', {
    method: 'POST',
    body: {orderId}
  })
  orders.value = orders.value.filter((order: any) => {
    return order.orderId !== orderId
  })
}

</script>

<template>
  <h1>Ready to ship</h1>
  <ul>
    <li v-for="order in orders">{{ order.orderId }}
      <button @click="shipOrder(order.orderId)">Ship it</button>
    </li>
  </ul>
</template>
