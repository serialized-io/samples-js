<script setup lang="ts">
import {useFetch, useRoute} from "#app";

const orderId = useRoute().params.orderId
const {data: data} = await useFetch(`/api/admin/orders/${orderId}`)

definePageMeta({
  layout: "admin",
});
</script>

<template>
  <AdminPageContent>
    <template #title>
      Order {{ orderId }}
    </template>
    <template #default>
      {{data}}
    </template>
  </AdminPageContent>
</template>
