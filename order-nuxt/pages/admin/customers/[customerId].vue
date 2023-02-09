<script setup lang="ts">
import {useFetch, useRoute} from "#app";

const customerId = useRoute().params.customerId
const {data: data} = await useFetch(`/api/admin/customers/${customerId}/orders`)
let orders = data.value?.orders

definePageMeta({
  layout: "admin",
});
</script>

<template>
  <AdminPageContent>
    <template #title>
      Customer {{ customerId }}
    </template>
    <template #default>
      <table class="min-w-full divide-y">
        <thead>
        <tr>
          <th scope="col"
              class="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Order
            ID
          </th>
          <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900 text-right">
            Order
            amount
          </th>
          <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">Placed</th>
        </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
        <tr v-for="order in orders" :key="order.orderId">
          <td class="whitespace-nowrap px-2 py-2 text-sm text-indigo-600 hover:text-indigo-900"><a
              :href="`/admin/orders/${order.orderId}`">{{ order.orderId }}</a></td>
          <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-900 text-right">{{
              order.orderAmountFormatted
            }}
          </td>
          <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{{ order.placedAtDate }}</td>
        </tr>
        </tbody>
      </table>
    </template>
  </AdminPageContent>
</template>
