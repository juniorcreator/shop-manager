<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import { categories } from '@/client-page/utils/constants';
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    <DataTable :value="categories" tableStyle="min-width: 50rem">
      <template #header>
        <div class="flex items-center justify-between p-2">
          <span class="text-xl font-bold text-gray-800">Категорії</span>
          <Button
            label="Нова категорія"
            icon="pi pi-plus"
            severity="success"
            class="p-button-sm rounded-lg"
          />
        </div>
      </template>

      <Column field="name" header="Назва" :sortable="true"></Column>
      <Column field="slug" header="Slug"></Column>
      <Column header="Підкатегорії">
        <template #body="slotProps">
          <div class="flex flex-wrap gap-2">
            <span
              v-for="sub in slotProps.data.subcategories"
              :key="sub.id"
              class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
            >
              {{ sub.name }}
            </span>
          </div>
        </template>
      </Column>
      <Column header="Дії">
        <template #body>
          <div class="flex gap-2">
            <Button icon="pi pi-pencil" severity="secondary" rounded text />
            <Button icon="pi pi-trash" severity="danger" rounded text />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
