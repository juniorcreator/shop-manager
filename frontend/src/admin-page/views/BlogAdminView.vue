<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import { blogPosts } from '@/client-page/utils/constants';
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    <DataTable :value="blogPosts" paginator :rows="5">
      <template #header>
        <div class="flex items-center justify-between p-2">
          <span class="text-xl font-bold text-gray-800">Блог / Статті</span>
          <Button
            label="Написати пост"
            icon="pi pi-pencil"
            severity="success"
            class="p-button-sm rounded-lg"
          />
        </div>
      </template>

      <Column field="title" header="Заголовок" :sortable="true" style="width: 40%"></Column>
      <Column field="author" header="Автор" :sortable="true" style="width: 20%"></Column>
      <Column field="date" header="Дата" :sortable="true" style="width: 20%"></Column>
      <Column header="Дії" style="width: 20%">
        <template #body>
          <div class="flex gap-2">
            <Button icon="pi pi-eye" severity="secondary" rounded text />
            <Button icon="pi pi-file-edit" severity="secondary" rounded text />
            <Button icon="pi pi-trash" severity="danger" rounded text />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
