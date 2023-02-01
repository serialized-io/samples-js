<script setup lang="ts">
import {useFetch} from "#app";
import {ref} from "@vue/reactivity";

const {data: data} = await useFetch('/api/admin/orders/ready-to-ship')
const orders = ref(data.value?.orders)

const shipOrder = async (orderId: string) => {
  await useFetch('/api/admin/commands/ship-order', {
    method: 'POST',
    body: {orderId}
  })
  orders.value = orders.value.filter((order: any) => {
    return order.orderId !== orderId
  })
}

definePageMeta({
  layout: "admin",
});
</script>

<template>
  <AdminPageContent>
    <template #title>
      Orders ready to ship
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
              class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900 text-right">Order
            amount
          </th>
          <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">Paid</th>
          <th scope="col" class="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-6">
            <span class="sr-only">Ship</span>
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
          <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{{ order.paidAtDate }}</td>
          <td class="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
            <button @click="shipOrder(order.orderId)" class="text-indigo-600 hover:text-indigo-900">Ship</button>
          </td>
        </tr>
        </tbody>
      </table>
    </template>
  </AdminPageContent>
</template>
