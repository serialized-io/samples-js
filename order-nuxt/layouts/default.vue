<template>
  <Body class="h-full bg-blue-800">
  <div class="min-h-full">
    <client-only>
      <StoreNav/>
    </client-only>
    <slot/>
  </div>
  </Body>
</template>
