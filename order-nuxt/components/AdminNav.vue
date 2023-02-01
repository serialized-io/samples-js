<template>
  <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
    <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="border-b border-gray-700">
        <div class="flex h-16 items-center justify-between px-4 sm:px-0">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img class="h-8 w-8" src="/images/logo.svg" alt="Serialized"/>
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <a v-for="item in navigation" :key="item.name" :href="item.href"
                   :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium']"
                   :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <a href="/store"
                 class="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span class="sr-only">To go store</span>
                <ShoppingCartIcon class="h-6 w-6" aria-hidden="true"/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Disclosure>
</template>
<script setup lang="ts">
import {Disclosure} from '@headlessui/vue'
import {ShoppingCartIcon} from '@heroicons/vue/24/outline'

const route = useRoute();

const navigation = computed(() => ([
  {name: "Today's orders", href: '/admin/orders', current: route.path === '/admin/orders'},
  {name: 'Ready to ship', href: '/admin/orders/ready-to-ship', current: route.path === '/admin/orders/ready-to-ship'},
  {name: 'All orders', href: '/admin/orders/all', current: route.path === '/admin/orders/all'}
]))
</script>
