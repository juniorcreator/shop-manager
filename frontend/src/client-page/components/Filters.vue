<script setup lang="ts">
import Slider from "primevue/slider";
import Checkbox from "primevue/checkbox";
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import { onMounted, ref, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { useRoute, useRouter } from "vue-router";
import { fetchFilterData } from "@/client-page/utils/api.ts";

const {
  data: collection,
  isLoading,
  isError,
} = useQuery({ queryKey: ["categories"], queryFn: fetchFilterData, staleTime: 1000 * 60 * 5 });

const router = useRouter();
const route = useRoute();

const initialLoad = ref(true);
const priceRange = ref([0, 2000]);
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
  if (minPrice) {
    priceRange.value[0] = Number(minPrice);
  }
  if (maxPrice) {
    priceRange.value[1] = Number(maxPrice);
  }
});

watch(
  [searchQuery, selectedCategories, priceRange],
  () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (initialLoad.value) {
        initialLoad.value = false;
        return;
      }
      const query: Record<string, any> = {};

      if (searchQuery.value) query.search = searchQuery.value;
      if (selectedCategories.value.length) query.category = selectedCategories.value;

      if (collection.value?.prices) {
        const minP = Number(collection.value.prices.min_price);
        const maxP = Number(collection.value.prices.max_price);

        if (priceRange.value[0] !== minP) query.minPrice = priceRange.value[0];
        if (priceRange.value[1] !== maxP) query.maxPrice = priceRange.value[1];
      }

      router.push({ query }).catch((err) => {
        console.log("query error =>", err);
      });
    }, 400);
  },
  { deep: true },
);

watch(
  () => route.query,
  (query) => {
    const newSearch = (query.search as string) || "";
    if (searchQuery.value !== newSearch) {
      initialLoad.value = true;
      searchQuery.value = newSearch;
    }

    const newCategories = query.category
      ? Array.isArray(query.category)
        ? (query.category as string[])
        : [query.category as string]
      : [];
    if (JSON.stringify(selectedCategories.value) !== JSON.stringify(newCategories)) {
      initialLoad.value = true;
      selectedCategories.value = newCategories;
    }

    if (collection.value?.prices) {
      const minFromQuery = query.minPrice !== undefined ? Number(query.minPrice) : null;
      const maxFromQuery = query.maxPrice !== undefined ? Number(query.maxPrice) : null;

      const defaultMin = Number(collection.value.prices.min_price);
      const defaultMax = Number(collection.value.prices.max_price);

      const newMin = minFromQuery !== null ? minFromQuery : defaultMin;
      const newMax = maxFromQuery !== null ? maxFromQuery : defaultMax;

      if (priceRange.value[0] !== newMin || priceRange.value[1] !== newMax) {
        initialLoad.value = true;
        priceRange.value = [newMin, newMax];
      }
    }
  },
  { deep: true },
);

watch(
  collection,
  (newCollection) => {
    console.log(collection.value, " collection");
    if (newCollection?.prices) {
      const { minPrice, maxPrice } = route.query;
      if (!minPrice) {
        initialLoad.value = true;
        priceRange.value[0] = Number(newCollection.prices.min_price);
      }
      if (!maxPrice) {
        initialLoad.value = true;
        priceRange.value[1] = Number(newCollection.prices.max_price);
      }
    }
  },
  { immediate: true },
);

const resetFilters = () => {
  if (collection.value?.prices) {
    const minP = Number(collection.value.prices.min_price);
    const maxP = Number(collection.value.prices.max_price);
    if (priceRange.value[0] !== minP || priceRange.value[1] !== maxP) {
      initialLoad.value = false;
      priceRange.value = [minP, maxP];
    }
  }
  if (searchQuery.value !== "") {
    initialLoad.value = false;
    searchQuery.value = "";
  }
  if (selectedCategories.value.length > 0) {
    initialLoad.value = false;
    selectedCategories.value = [];
  }
};

console.log("render");
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
        <div v-for="category of collection?.categories" :key="category.slug" class="flex items-center gap-3">
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
      <div v-else>Loading...</div>
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
      <div v-if="!isLoading" v-show="!collapsedSections.price">
        <div class="flex items-center justify-between text-sm text-gray-500 mb-6">
          <span class="bg-gray-50 px-3 py-1 rounded-md border border-gray-100">{{ priceRange[0] }} ₴</span>
          <span class="bg-gray-50 px-3 py-1 rounded-md border border-gray-100">{{ priceRange[1] }} ₴</span>
        </div>
        <div class="px-2">
          <Slider
            v-model="priceRange"
            :min="Number(collection?.prices.min_price)"
            :max="Number(collection?.prices.max_price)"
            range
            class="w-full"
          />
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
