<script setup lang="ts">
import {useFetch} from "#app";

const {data: data, refresh} = await useFetch('/api/admin/orders')
let orders = data.value?.orders
const cancelOrder = async (orderId: string) => {
  await useFetch('/api/admin/commands/cancel-order', {
    method: 'POST',
    body: {orderId}
  })
  await refresh()
}

definePageMeta({
  layout: "admin",
});
</script>

<template>
  <AdminPageContent>
    <template #title>
      Active orders
    </template>
    <template #default>
      <table class="min-w-full divide-y">
        <thead>
        <tr>
          <th scope="col"
              class="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Order
            ID
          </th>
          <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">Customer
            ID
          </th>
          <th scope="col"
              class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900 text-right">
            Order
            amount
          </th>
          <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">Placed
          </th>
          <th scope="col" class="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-6">
            <span class="sr-only">Cancel</span>
          </th>
        </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
        <tr v-for="order in orders" :key="order.orderId">
          <td class="whitespace-nowrap px-2 py-2 text-sm text-indigo-600 hover:text-indigo-900"><a
              :href="`/admin/orders/${order.orderId}`">{{ order.orderId }}</a></td>
          <td class="whitespace-nowrap px-2 py-2 text-sm text-indigo-600 hover:text-indigo-900"><a
              :href="`/admin/customers/${order.customerId}`">{{ order.customerId }}</a></td>
          <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-900 text-right">{{
              order.orderAmountFormatted
            }}
          </td>
          <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{{ order.placedAtDate }}</td>
          <td class="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
            <button @click="cancelOrder(order.orderId)" class="text-red-600 hover:text-red-900">Cancel</button>
          </td>
        </tr>
        </tbody>
      </table>
    </template>
  </AdminPageContent>
</template>
