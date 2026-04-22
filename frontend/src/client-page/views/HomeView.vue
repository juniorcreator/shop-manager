<script setup lang="ts">
import HeaderGallery from '@/client-page/components/HeaderGallery.vue';
import Filters from '@/client-page/components/Filters.vue';
import CardItem from '@/client-page/components/CardItem.vue';
</script>

<template>
  <HeaderGallery />
  <div class="flex w-full gap-4 mb-30">
    <div class="filters w-1/5"><Filters /></div>
    <div class="filters w-4/5 flex flex-wrap gap-2">
      <CardItem v-for="n in 10" />
    </div>
  </div>
  <div class="footer h-100">
    <h1>footer</h1>
  </div>
</template>

<style scoped></style>
