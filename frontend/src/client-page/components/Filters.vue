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
const selectedCategories = ref([]);
</script>

<template>
  <div class="bg-white border border-gray-200 shadow-sm rounded-xl p-6 sticky top-4">
    <div class="flex items-center gap-2 mb-6 pb-2 border-b border-gray-100">
      <i class="pi pi-filter text-emerald-600"></i>
      <h2 class="text-xl font-bold text-gray-800">Фільтри</h2>
    </div>

    <div class="mb-8">
      <h3 class="font-semibold text-gray-700 mb-4">Категорії</h3>
      <div class="flex flex-col gap-3">
        <div v-for="category of categories" :key="category.key" class="flex items-center gap-3">
          <Checkbox
            v-model="selectedCategories"
            :inputId="category.key"
            name="category"
            :value="category.name"
          />
          <label
            :for="category.key"
            class="text-gray-600 cursor-pointer hover:text-emerald-600 transition-colors"
          >
            {{ category.name }}
          </label>
        </div>
      </div>
    </div>

    <div>
      <h3 class="font-semibold text-gray-700 mb-4">Ціна (грн)</h3>
      <div class="flex items-center justify-between text-sm text-gray-500 mb-6">
        <span class="bg-gray-50 px-3 py-1 rounded-md border border-gray-100"
          >{{ priceRange[0] }} ₴</span
        >
        <span class="bg-gray-50 px-3 py-1 rounded-md border border-gray-100"
          >{{ priceRange[1] }} ₴</span
        >
      </div>
      <div class="px-2">
        <Slider v-model="priceRange" :min="0" :max="2000" range class="w-full" />
      </div>
    </div>

    <div class="mt-8">
      <button
        class="w-full py-2 bg-emerald-50 text-emerald-700 rounded-lg font-medium hover:bg-emerald-100 transition-colors"
      >
        Скинути все
      </button>
    </div>
  </div>
</template>

<style scoped></style>
