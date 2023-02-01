<template>
  <StorePageContent>
    <template #title>
      Serialized Store Demo
    </template>
    <template #default>
      Welcome to the store demo. This is where you can buy stuff. You are logged in as {{ name }} with customer ID
      ({{ customerId }}).
    </template>
  </StorePageContent>
</template>
<script setup lang="ts">
import {useNuxtApp} from "#app";

const {$user} = useNuxtApp()
const customerId = $user ? $user().customerId : ''
const name = $user ? $user().name : ''
</script>
