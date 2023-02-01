<template>
  <nav class="fixed left-10 top-20 bg-slate-200 rounded p-8">
    <ul>
      <li>
        <NuxtLink to="/admin">Home</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/admin/orders">All orders</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/admin/orders/ready-to-ship">Ready to ship</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/admin/orders/events">All events</NuxtLink>
      </li>
    </ul>
  </nav>
</template>
