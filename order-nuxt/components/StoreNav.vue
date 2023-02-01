<template>
  <Disclosure as="nav" class="bg-blue-800" v-slot="{ open }">
    <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="border-b border-blue-700">
        <div class="flex h-16 items-center justify-between px-4 sm:px-0">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img class="h-8 w-8" src="/images/logo.svg" alt="Serialized"/>
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <nuxt-link v-for="item in navigation" :key="item.name" :to="item.href"
                           :class="[item.current ? 'bg-blue-900 text-white' : 'text-blue-300 hover:bg-blue-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium']"
                           :aria-current="item.current ? 'page' : undefined">{{ item.name }}
                </nuxt-link>
              </div>
            </div>
          </div>

          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <div class="text-blue-300 text-sm flex flex-col text-white mr-4">
                <div class="text-right">{{ name }}</div>
                <div>{{ customerId }}</div>
              </div>
              <a href="/admin"
                 class="rounded-full bg-blue-800 p-1 text-blue-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800">
                <span class="sr-only">To go admin</span>
                <LockClosedIcon class="h-6 w-6" aria-hidden="true"/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Disclosure>
</template>
<script setup>
import {Disclosure} from '@headlessui/vue'
import {LockClosedIcon} from '@heroicons/vue/24/outline'
import {useNuxtApp} from "#app";

const {$user} = useNuxtApp()
const customerId = $user().customerId
const name = $user().name
const route = useRoute();

const navigation = computed(() => {
  return [
    {name: 'Shop items', href: '/store', current: route.path === '/store'},
    {name: 'My orders', href: '/store/orders', current: route.path === '/store/orders'}
  ]
})
</script>
