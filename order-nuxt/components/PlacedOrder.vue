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
  <OrderStatus :status="order.status"/>
</template>
