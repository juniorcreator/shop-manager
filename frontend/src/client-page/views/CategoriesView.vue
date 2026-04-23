<script setup lang="ts">
import { useRouter } from 'vue-router';
import { categories } from '@/client-page/utils/constants';
import Footer from '@/client-page/components/Footer.vue';

const router = useRouter();

const handleSubcategoryClick = (categorySlug: string, subcategorySlug: string) => {
  router.push({
    name: 'home',
    query: { category: categorySlug, subcategory: subcategorySlug },
  });
};
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8 text-gray-800">Категорії</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="category in categories"
        :key="category.id"
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100 flex flex-col"
      >
        <div class="h-48 overflow-hidden">
          <img
            :src="category.image"
            :alt="category.name"
            class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div class="p-6">
          <h2 class="text-xl font-semibold mb-4 text-green-700 border-b pb-2">
            {{ category.name }}
          </h2>

          <ul class="space-y-2">
            <li v-for="sub in category.subcategories" :key="sub.id">
              <button
                @click="handleSubcategoryClick(category.slug, sub.slug)"
                class="text-gray-600 hover:text-green-600 hover:translate-x-1 transition-all duration-200 text-left w-full flex items-center"
              >
                <span class="mr-2">›</span>
                {{ sub.name }}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped></style>
