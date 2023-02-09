<script setup lang="ts">

definePageMeta({
  layout: "admin",
});
</script>

<template>
  <AdminPageContent>
    <template #title>
      Order Management Admin
    </template>
    <template #default>
      <p>Welcome to the order management system</p>
      <p>
        This is where administrators can manage orders, view customer information, and perform other backoffice tasks.
      </p>
    </template>
  </AdminPageContent>
</template>
