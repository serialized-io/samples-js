<script setup lang="ts">
import {useFetch} from "#app";

const {data: data} = await useFetch('/api/orders/events')
const events = data.value?.orderEvents

</script>

<template>
  <div>
    <h1>All order events</h1>
    <table>
      <tr>
        <th>Event type</th>
        <th>Event id</th>
        <th>OrderId</th>
      </tr>
      <tr v-for="orderEvent in events" :key="orderEvent.eventId">
        <td>{{ orderEvent.eventType }}</td>
        <td>{{ orderEvent.eventId }}</td>
        <td>{{ orderEvent.data.orderId }}</td>
      </tr>
    </table>
  </div>
</template>
