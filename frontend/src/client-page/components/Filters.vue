<script setup lang="ts">
import Slider from 'primevue/slider';
import Checkbox from 'primevue/checkbox';
import { ref } from 'vue';

const priceRange = ref([20, 80]);
const categories = ref([
  { name: 'Насіння', key: 'seed' },
  { name: 'Інструменти', key: 'tools' },
  { name: 'Полив', key: 'poliv' },
]);
const selectedCategories = ref(['Marketing']);
</script>

<template>
  <div class="border-2 border-emerald-600 rounded-md p-1 sticky top-0">
    <div class="border-b-2 border-b-emerald-600">Filters</div>
    <div class="mb-1">Category</div>
    <div class="flex flex-col gap-2">
      <div v-for="category of categories" :key="category.key" class="flex items-center gap-2">
        <Checkbox
          v-model="selectedCategories"
          :inputId="category.key"
          name="category"
          :value="category.name"
        />
        <label :for="category.key">{{ category.name }}</label>
      </div>
    </div>
    <div class="border-b-2 border-b-emerald-600 mb-1">
      <div class="mb-4">Price</div>
      <div class="flex items-center gap-2 mb-3">
        <span>From {{ priceRange[0] }}$</span>
        <span>To {{ priceRange[1] }}$</span>
      </div>
      <div class="flex justify-center">
        <Slider v-model="priceRange" :min="0" :max="200" range class="w-56 mb-4" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
