<script setup lang="ts">
import HeaderGallery from '@/client-page/components/HeaderGallery.vue';
import Filters from '@/client-page/components/Filters.vue';
import CardItem from '@/client-page/components/CardItem.vue';
import { products } from '@/client-page/utils/constants.ts';
import Footer from '@/client-page/components/Footer.vue';
</script>

<template>
  <HeaderGallery />
  <div class="flex flex-col md:flex-row w-full gap-6 mb-20 max-w-300 mx-auto">
    <aside class="w-full md:w-1/4 lg:w-1/5">
      <Filters />
    </aside>
    <main
      class="w-full md:w-3/4 lg:w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <CardItem v-for="product in products" :key="product.id" :product="product" />
    </main>
  </div>
  <Footer />
</template>

<style scoped></style>
