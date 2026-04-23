<script setup lang="ts">
import Card from 'primevue/card';
import Button from 'primevue/button';
import Footer from '@/client-page/components/Footer.vue';
import { blogPosts } from '@/client-page/utils/constants.ts';

const blogs = blogPosts;
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <main class="grow container mx-auto px-4 py-12">
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-black text-gray-800 mb-4">
          Наш <span class="text-emerald-600">БЛОГ</span>
        </h1>
        <p class="text-gray-600 max-w-2xl mx-auto text-lg">
          Корисні поради, тренди садівництва та новинки нашого магазину в одному місці.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <Card
          v-for="blog in blogs"
          :key="blog.id"
          class="overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col"
        >
          <template #header>
            <div class="h-64 overflow-hidden">
              <img
                :src="blog.image"
                :alt="blog.title"
                class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </template>
          <template #title>
            <h2 class="text-2xl font-bold text-gray-800 leading-tight">
              {{ blog.title }}
            </h2>
          </template>
          <template #subtitle>
            <div class="flex items-center gap-4 text-sm text-gray-500 mt-2">
              <span class="flex items-center gap-1">
                <i class="pi pi-calendar"></i> {{ blog.date }}
              </span>
              <span class="flex items-center gap-1">
                <i class="pi pi-user"></i> {{ blog.author }}
              </span>
            </div>
          </template>
          <template #content>
            <p class="text-gray-600 leading-relaxed">
              {{ blog.excerpt }}
            </p>
          </template>
          <template #footer>
            <div class="pt-4 border-t border-gray-50 mt-auto">
              <RouterLink :to="{ name: 'blog-post', params: { id: blog.id } }">
                <Button
                  label="Читати далі"
                  link
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  class="p-0 text-emerald-600 font-bold"
                />
              </RouterLink>
            </div>
          </template>
        </Card>
      </div>
    </main>
    <Footer />
  </div>
</template>

<style scoped>
:deep(.p-card) {
  display: flex;
  flex-direction: column;
}
:deep(.p-card-body) {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
:deep(.p-card-footer) {
  margin-top: auto;
}
</style>
