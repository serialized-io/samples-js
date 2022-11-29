<template>
  <div>
    <nav>
      <ul>
        <li>
          <NuxtLink to="/">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/orders">All orders</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/orders/ready-to-ship">Ready to ship</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/orders/events">All events</NuxtLink>
        </li>
      </ul>
    </nav>
    <NuxtPage/>
  </div>
</template>
