<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import { blogPosts } from '@/client-page/utils/constants.ts';
import Button from 'primevue/button';
import Footer from '@/client-page/components/Footer.vue';

const route = useRoute();
const router = useRouter();

const blogId = computed(() => Number(route.params.id));
const blog = computed(() => blogPosts.value.find((b) => b.id === blogId.value));

const goBack = () => {
  router.push({ name: 'blog' });
};
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <main class="grow container mx-auto px-4 py-12">
      <div v-if="blog" class="max-w-4xl mx-auto">
        <Button
          icon="pi pi-arrow-left"
          label="Назад до блогу"
          class="mb-8 p-button-text text-emerald-600 font-bold"
          @click="goBack"
        />

        <div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <img :src="blog.image" :alt="blog.title" class="w-full h-100 object-cover" />

          <div class="p-8 md:p-12">
            <div class="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <span class="flex items-center gap-1">
                <i class="pi pi-calendar"></i> {{ blog.date }}
              </span>
              <span class="flex items-center gap-1">
                <i class="pi pi-user"></i> {{ blog.author }}
              </span>
            </div>

            <h1 class="text-4xl md:text-5xl font-black text-gray-800 mb-8 leading-tight">
              {{ blog.title }}
            </h1>

            <div
              class="prose prose-emerald max-w-none text-gray-600 text-lg leading-relaxed"
              v-html="blog.content"
            ></div>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-20">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Статтю не знайдено</h2>
        <Button label="Повернутися до блогу" severity="success" @click="goBack" />
      </div>
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.prose :deep(h3) {
  color: #1f2937;
  margin-top: 2rem;
}
.prose :deep(p) {
  margin-bottom: 1.5rem;
}
.prose :deep(ul) {
  margin-bottom: 1.5rem;
}
</style>
