<script setup lang="ts">

import OrderStatus from "~/components/OrderStatus.vue";

const props = defineProps({
  order: {
    type: Object,
    required: true
  }
});

</script>
<template>
  <div class="flex p-8 border-solid border-slate-500 border rounded">
    <OrderStatus :status="order.status"/>
  </div>
</template>
