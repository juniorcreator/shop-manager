<script setup lang="ts">
import { ref } from 'vue';

const stats = ref([
  { label: 'Продажі', value: '₴45,200', icon: 'pi pi-shopping-cart', color: 'bg-blue-500' },
  { label: 'Нові замовлення', value: '12', icon: 'pi pi-plus-circle', color: 'bg-emerald-500' },
  { label: 'Клієнти', value: '1,240', icon: 'pi pi-users', color: 'bg-purple-500' },
  { label: 'Товари', value: '48', icon: 'pi pi-box', color: 'bg-orange-500' },
]);
</script>

<template>
  <div class="space-y-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4"
      >
        <div
          :class="[stat.color, 'w-12 h-12 rounded-xl flex items-center justify-center text-white']"
        >
          <i :class="[stat.icon, 'text-xl']"></i>
        </div>
        <div>
          <p class="text-sm text-gray-500 font-medium">{{ stat.label }}</p>
          <p class="text-2xl font-bold text-gray-800">{{ stat.value }}</p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[300px]">
        <h3 class="text-lg font-bold text-gray-800 mb-4">Останні замовлення</h3>
        <p class="text-gray-400 text-center py-12 italic">Тут буде графік або список замовлень</p>
      </div>
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[300px]">
        <h3 class="text-lg font-bold text-gray-800 mb-4">Популярні товари</h3>
        <p class="text-gray-400 text-center py-12 italic">Тут буде список популярних товарів</p>
      </div>
    </div>
  </div>
</template>
