<script setup lang="ts">
import { navLinks } from '@/client-page/utils/constants.ts';
</script>

<template>
  <header class="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
    <div class="container mx-auto py-3 flex justify-between items-center">
      <div class="flex items-center gap-2">
        <RouterLink class="flex items-center gap-2" to="/">
          <i class="pi pi-shop text-emerald-600" style="font-size: 2.5rem"></i>
          <span class="text-2xl font-black text-gray-800 tracking-tight hidden sm:inline"
            >GARDEN<span class="text-emerald-600">SHOP</span></span
          >
        </RouterLink>
      </div>

      <nav class="hidden md:block">
        <ul class="flex gap-8 text-lg font-medium text-gray-600">
          <li v-for="link in navLinks" :key="link.name">
            <RouterLink
              active-class="bg-[#eee7d5]"
              class="hover:text-lime-800 transition-colors p-1 rounded-md"
              :to="{ name: link.to }"
              >{{ link.name }}</RouterLink
            >
          </li>
        </ul>
      </nav>

      <div class="flex items-center gap-4 text-gray-700">
        <button class="p-2 hover:bg-gray-50 rounded-full transition-colors relative">
          <i class="pi pi-search text-xl"></i>
        </button>

        <div class="hidden sm:flex items-center gap-4 border-l border-gray-200 ml-2 pl-6">
          <RouterLink class="text-sm font-semibold hover:text-emerald-600" to="/login"
            >Вхід</RouterLink
          >
          <RouterLink
            class="text-sm font-semibold bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
            to="/register"
            >Реєстрація</RouterLink
          >
        </div>

        <button class="p-2 hover:bg-gray-50 rounded-full transition-colors relative ml-2">
          <i class="pi pi-shopping-cart" style="font-size: 1.8rem"></i>
          <span
            class="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white"
            >0</span
          >
        </button>

        <RouterLink class="md:hidden p-2 hover:bg-gray-50 rounded-full" to="/admin">
          <i class="pi pi-cog text-xl"></i>
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<style scoped></style>
