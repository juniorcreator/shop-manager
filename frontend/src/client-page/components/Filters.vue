<script setup lang="ts">
import Slider from "primevue/slider";
import Checkbox from "primevue/checkbox";
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import { computed, onMounted, ref, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { useRoute, useRouter } from "vue-router";
import { fetchFilterData } from "@/client-page/utils/api.ts";

const router = useRouter();
const route = useRoute();

const {
  data: collection,
  isLoading,
  isError,
} = useQuery({ queryKey: ["categories"], queryFn: fetchFilterData, staleTime: 1000 * 60 * 5 });

const minBound = computed(() => Number(collection.value?.prices?.min_price ?? 0));
const maxBound = computed(() => Number(collection.value?.prices?.max_price ?? 2000));

const searchQuery = computed({
  get: () => (route.query.search as string) || "",
  set: (val) => updateQuery({ search: val || undefined }),
});

const selectedCategories = computed({
  get: () => {
    const category = route.query.category;
    return category ? ((Array.isArray(category) ? category : [category]) as string[]) : [];
  },
  set: (val) => updateQuery({ category: val.length ? val : undefined }),
});

const priceRange = computed({
  get: () => [
    route.query.minPrice !== undefined ? Number(route.query.minPrice) : minBound.value,
    route.query.maxPrice !== undefined ? Number(route.query.maxPrice) : maxBound.value,
  ],
  set: ([min, max]) =>
    updateQuery({
      minPrice: min !== minBound.value ? min : undefined,
      maxPrice: max !== maxBound.value ? max : undefined,
    }),
});

let debounceTimer: ReturnType<typeof setTimeout>;
const updateQuery = (patch: Record<string, any>) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    router.push({ query: { ...route.query, ...patch } });
  }, 400);
};

const resetFilters = () => {
  router.push({ query: {} });
};

const collapsedSections = ref({ search: false, categories: false, price: false });
const toggleSection = (section: keyof typeof collapsedSections.value) => {
  collapsedSections.value[section] = !collapsedSections.value[section];
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
