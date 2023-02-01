<script setup lang="ts">
import StorePageContent from "~/components/StorePageContent.vue";
import {useFetch, useNuxtApp} from "#app";

const {data: data} = await useFetch(`/api/store/items`)
const products = computed(() => data.value?.items ?? [])

const {$user} = useNuxtApp()
const customerId = $user ? $user().customerId : ''

const orderPlaced = ref(false)
const orderId = ref('')
const placeOrder = async (sku: string) => {
  const response = await useFetch('/api/store/commands/place-order', {
    method: 'POST',
    body: {sku, customerId}
  })
  orderId.value = response.data?.value?.orderId ?? ''
  orderPlaced.value = true
}

</script>

<template>
  <StorePageContent>
    <template #default>
      <OrderPlaced :open="orderPlaced" @close="orderPlaced = false" :order-id="orderId"/>
      <div class="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
        <div v-for="product in products" :key="product.sku">
          <div class="aspect-w-1 aspect-h-1 min-h-80 lg:aspect-none lg:h-80 rounded-lg bg-gray-100">
            <img :src="`/images/store/products/${product.sku}.jpg`" :alt="product.description" class="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
          </div>
          <div class="mt-4 flex items-center justify-between space-x-8 text-base font-medium text-gray-900">
            <h3>{{ product.name }}</h3>
            <p>{{ product.formattedPrice }}</p>
          </div>
          <button @click.prevent="placeOrder(product.sku)" class="text-blue-600 hover:text-blue-900">Place order</button>
        </div>
      </div>
    </template>
  </StorePageContent>
</template>
