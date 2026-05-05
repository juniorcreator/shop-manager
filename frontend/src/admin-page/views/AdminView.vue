<script setup lang="ts">
import { useRoute } from 'vue-router';
import Button from 'primevue/button';
import { useUserStore } from '@/stores/user.ts';

const route = useRoute();
const userStore = useUserStore();

const menuItems = [
  { label: 'Дашборд', icon: 'pi pi-home', to: 'admin-dashboard' },
  { label: 'Товари', icon: 'pi pi-shopping-bag', to: 'admin-products' },
  { label: 'Замовлення', icon: 'pi pi-shopping-cart', to: 'admin-orders' },
  { label: 'Категорії', icon: 'pi pi-tags', to: 'admin-categories' },
  { label: 'Користувачі', icon: 'pi pi-users', to: 'admin-users' },
  { label: 'Блог', icon: 'pi pi-pencil', to: 'admin-blog' },
];
</script>

<template>
  <div class="flex h-screen bg-gray-50 overflow-hidden font-sans">
    <aside class="w-64 bg-white border-r border-gray-200 flex flex-col z-20">
      <div class="p-6 border-b border-gray-100 flex items-center gap-3">
        <i class="pi pi-cog text-emerald-600 text-2xl"></i>
        <span class="text-xl font-bold text-gray-800">CRM</span>
      </div>

      <nav class="flex-1 p-4 space-y-2">
        <RouterLink
          v-for="item in menuItems"
          :key="item.to"
          :to="{ name: item.to }"
          class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
          :class="[
            route.name === item.to
              ? 'bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-100'
              : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600 border border-transparent',
          ]"
        >
          <i :class="item.icon"></i>
          <span class="font-medium">{{ item.label }}</span>
        </RouterLink>
      </nav>

      <div class="p-4 border-t border-gray-100">
        <RouterLink
          to="/"
          class="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-emerald-600 transition-colors"
        >
          <i class="pi pi-external-link"></i>
          <span class="font-medium">На сайт</span>
        </RouterLink>
      </div>
    </aside>

    <div class="flex-1 flex flex-col overflow-hidden relative">
      <header
        class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10"
      >
        <h2 class="text-xl font-semibold text-gray-800">
          {{ menuItems.find((m) => m.to === route.name)?.label || 'Панель керування' }}
        </h2>

        <div v-if="userStore.user" class="flex items-center gap-4">
          <Button icon="pi pi-bell" severity="secondary" rounded text />
          <div class="flex items-center gap-3 pl-4 border-l border-gray-100">
            <div class="text-right">
              <p class="text-sm font-bold text-gray-800 leading-tight">
                {{ userStore.user.name }} {{ userStore.user.surname }}
              </p>
              <p class="text-xs text-gray-500">{{ userStore.user.email }}}</p>
            </div>
            <div
              class="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold"
            >
              A
            </div>
          </div>
        </div>
      </header>

      <main class="flex-1 overflow-y-auto p-8 bg-gray-50">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<style scoped></style>
