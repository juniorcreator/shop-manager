<script setup lang="ts">
import Card from 'primevue/card';
import Button from 'primevue/button';
import type { Product } from '@/types';

defineProps<{
  product: Product;
}>();
</script>

<template>
  <Card
    class="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col justify-between overflow-hidden"
  >
    <template #header>
      <img :alt="product.name" :src="product.image" class="w-full h-48 object-cover" />
    </template>
    <template #title>
      <span class="text-lg font-bold">{{ product.name }}</span>
    </template>
    <template #content>
      <p class="m-0 font-black text-xl text-emerald-700">{{ product.price }} грн</p>
    </template>
    <template #footer>
      <div class="flex justify-between gap-2 mt-auto">
        <Button severity="secondary" icon="pi pi-heart" outlined />
        <Button severity="success" icon="pi pi-shopping-cart" label="В кошик" class="grow" />
      </div>
    </template>
  </Card>
</template>

<style scoped></style>
