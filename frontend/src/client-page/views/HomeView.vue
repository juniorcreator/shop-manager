<script setup lang="ts">
import HeaderGallery from "@/client-page/components/HeaderGallery.vue";
import Filters from "@/client-page/components/Filters.vue";
import CardItem from "@/client-page/components/CardItem.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import api from "@/api";
import Footer from "@/client-page/components/Footer.vue";

const route = useRoute();
const fetchProducts = async ({ queryKey }: any) => {
  const params = queryKey[1];
  const queryParams = new URLSearchParams(params).toString();
  const { data } = await api.get(`/products?${queryParams}`);
  return data.data;
};

const {
  data: products,
  isLoading,
  isError,
} = useQuery({
  queryKey: computed(() => ["products", route.query]),
  queryFn: fetchProducts,
  staleTime: 1000 * 60 * 5,
  placeholderData: (prev) => prev,
});
</script>

<template>
  <HeaderGallery />
  <div class="flex flex-col items-start md:flex-row w-full gap-6 mb-20 max-w-300 mx-auto">
    <aside class="w-full md:w-1/4 lg:w-1/5">
      <Filters />
    </aside>
    <main
      class="w-full md:w-3/4 lg:w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <div v-if="isLoading" class="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
        <i class="pi pi-spin pi-spinner text-4xl text-emerald-600"></i>
      </div>
      <div v-else-if="isError" class="text-center text-red-500 py-10">
        Виникла помилка при завантаженні товарів. Спробуйте пізніше.
      </div>
      <CardItem v-for="product in products || []" :key="product.id" :product="product" />
      <div
        v-if="!isLoading && !isError && products?.length === 0"
        class="text-center text-gray-500 py-10 w-full"
      >
        Товарів не знайдено за вашими критеріями.
      </div>
    </main>
  </div>
  <Footer />
</template>

<style scoped></style>
