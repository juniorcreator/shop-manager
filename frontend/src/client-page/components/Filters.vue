<script setup lang="ts">
import Slider from "primevue/slider";
import Checkbox from "primevue/checkbox";
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import { computed, onMounted, ref, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { useRoute, useRouter } from "vue-router";
import api from "@/api";

const fetchAllCategories = async () => {
  const { data } = await api.get("/categories");
  console.log("fetchAllCategories 1", data);
  console.log("fetchAllCategories 2", data.data.categories);
  return data.data;
};
const {
  data: collection,
  isLoading,
  isError,
} = useQuery({ queryKey: ["categories"], queryFn: fetchAllCategories, staleTime: 1000 * 60 * 5 });

const router = useRouter();
const route = useRoute();
const defaultPrice = [0, 2000];
const priceRange = ref([...defaultPrice]);
const searchQuery = ref("");
const selectedCategories = ref<string[]>([]);
let debounceTimer: ReturnType<typeof setTimeout>;

const collapsedSections = ref({ search: false, categories: false, price: false });
const toggleSection = (section: keyof typeof collapsedSections.value) => {
  collapsedSections.value[section] = !collapsedSections.value[section];
};

onMounted(() => {
  const { search, category, minPrice, maxPrice } = route.query;
  if (search) searchQuery.value = search as string;
  if (category) {
    selectedCategories.value = Array.isArray(category) ? (category as string[]) : [category as string];
  }
  if (minPrice && maxPrice) {
    priceRange.value = [Number(minPrice), Number(maxPrice)];
  }
});

watch(
  [searchQuery, selectedCategories, priceRange],
  () => {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      const query: Record<string, any> = {};

      if (searchQuery.value) query.search = searchQuery.value;
      if (selectedCategories.value.length) query.category = selectedCategories.value;
      if (priceRange.value[0] !== 0) query.minPrice = priceRange.value[0];
      if (priceRange.value[1] !== 2000) query.maxPrice = priceRange.value[1];

      router.push({ query }).catch((err) => {
        console.log(err);
      });
    }, 500);
  },
  { deep: true },
);

const resetFilters = () => {
  priceRange.value = [...defaultPrice];
  searchQuery.value = "";
  selectedCategories.value = [];
};
</script>

<template>
  <div class="bg-white border border-gray-200 shadow-sm rounded-xl p-6 sticky top-4">
    <div class="flex items-center gap-2 mb-6 pb-2 border-b border-gray-100">
      <i class="pi pi-filter text-emerald-600"></i>
      <h2 class="text-xl font-bold text-gray-800">Фільтри</h2>
    </div>
    <div v-if="isError">{{ isError }}</div>
    <!-- search -->
    <div class="mb-4">
      <div
        class="flex items-center justify-between cursor-pointer mb-4 hover:text-emerald-600 transition-colors"
        @click="toggleSection('search')"
      >
        <h3 class="font-semibold text-gray-700">Пошук</h3>
        <i
          :class="[
            'pi text-xs text-gray-400 transition-transform duration-200',
            collapsedSections.search ? 'pi-chevron-down' : 'pi-chevron-up',
          ]"
        ></i>
      </div>
      <div v-show="!collapsedSections.search">
        <IconField>
          <InputIcon class="pi pi-search" />
          <InputText v-model="searchQuery" placeholder="Пошук товару..." class="w-full" />
        </IconField>
      </div>
    </div>
    <!-- categories -->
    <div class="mb-4">
      <div
        class="flex items-center justify-between cursor-pointer mb-4 hover:text-emerald-600 transition-colors"
        @click="toggleSection('categories')"
      >
        <h3 class="font-semibold text-gray-700">Категорії</h3>
        <i
          :class="[
            'pi text-xs text-gray-400 transition-transform duration-200',
            collapsedSections.categories ? 'pi-chevron-down' : 'pi-chevron-up',
          ]"
        ></i>
      </div>
      <div v-if="!isLoading" v-show="!collapsedSections.categories" class="flex flex-col gap-3">
        <div v-for="category of collection.categories" :key="category.slug" class="flex items-center gap-3">
          <Checkbox
            v-model="selectedCategories"
            :inputId="category.slug"
            name="category"
            :value="category.slug"
          />
          <label
            :for="category.slug"
            class="text-gray-600 cursor-pointer hover:text-emerald-600 transition-colors"
          >
            {{ category.name }}
          </label>
        </div>
      </div>
    </div>
    <!-- price -->
    <div class="mb-4">
      <div
        class="flex items-center justify-between cursor-pointer mb-4 hover:text-emerald-600 transition-colors"
        @click="toggleSection('price')"
      >
        <h3 class="font-semibold text-gray-700">Ціна (грн)</h3>
        <i
          :class="[
            'pi text-xs text-gray-400 transition-transform duration-200',
            collapsedSections.price ? 'pi-chevron-down' : 'pi-chevron-up',
          ]"
        ></i>
      </div>
      <div v-show="!collapsedSections.price">
        <div class="flex items-center justify-between text-sm text-gray-500 mb-6">
          <span class="bg-gray-50 px-3 py-1 rounded-md border border-gray-100">{{ priceRange[0] }} ₴</span>
          <span class="bg-gray-50 px-3 py-1 rounded-md border border-gray-100">{{ priceRange[1] }} ₴</span>
        </div>
        <div class="px-2">
          <Slider v-model="priceRange" :min="0" :max="2000" range class="w-full" />
        </div>
      </div>
    </div>
    <div class="mt-4">
      <button
        @click="resetFilters"
        class="w-full cursor-pointer py-2 bg-emerald-50 text-emerald-700 rounded-lg font-medium hover:bg-emerald-100 transition-colors"
      >
        Скинути все
      </button>
    </div>
  </div>
</template>

<style scoped></style>
