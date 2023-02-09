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
  <div class="bg-green-200">
    <OrderStatus :status="order.status"/>
  </div>
</template>
