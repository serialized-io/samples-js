<script setup lang="ts">
import {useFetch, useNuxtApp} from "#app";

const {$user} = useNuxtApp()
const customerId = $user ? $user().customerId : ''
const {data: data, refresh} = await useFetch(`/api/store/customers/${customerId}/orders-to-pay`)
const orders = computed(() => data.value?.orders ?? [])

const orderPaid = ref(false)
const orderId = ref('')
const payOrder = async (id: string) => {
  await useFetch('/api/store/commands/pay-order', {
    method: 'POST',
    body: {orderId: id, customerId}
  })
  orderId.value = id
  orderPaid.value = true
}

const onClose = () => {
  orderPaid.value = false
  refresh()
}

</script>

<template>
  <StorePageContent>
    <template #title>
      My orders
    </template>
    <template #default>
      <OrderPaid :open="orderPaid" @close="onClose()" :order-id="orderId"/>
      <table class="min-w-full divide-y">
        <thead>
        <tr>
          <th scope="col"
              class="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Order
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
            <span class="sr-only">Action</span>
          </th>
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
          <td class="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
            <button @click="payOrder(order.orderId)" class="text-blue-600 hover:text-blue-900">Pay order</button>
          </td>
        </tr>
        </tbody>
      </table>
    </template>
  </StorePageContent>
</template>
