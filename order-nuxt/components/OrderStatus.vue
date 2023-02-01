<script setup lang="ts">

const props = defineProps({
  status: {
    type: String,
    required: true
  }
});

const classes = {
  'bg-blue-400': props.status === 'PLACED',
  'bg-orange-400': props.status === 'SHIPPED',
  'bg-green-400': props.status === 'PAID',
  'bg-red-400': props.status === 'CANCELED',
}

</script>
<template>
  <div :class="classes" class="rounded px-2 py-1 text-xs mx-auto text-white">{{ status }}</div>
</template>
