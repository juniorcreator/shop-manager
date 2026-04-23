<script setup lang="ts">
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Tag from 'primevue/tag';

const users = ref([
  {
    id: 1,
    name: 'Олександр',
    serName: 'Коваленко',
    email: 'alex@example.com',
    role: 'Admin',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Марія',
    serName: 'Петренко',
    email: 'maria@example.com',
    role: 'User',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Іван',
    serName: 'Сидоренко',
    email: 'ivan@example.com',
    role: 'User',
    status: 'Inactive',
  },
]);
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    <DataTable :value="users" tableStyle="min-width: 50rem">
      <template #header>
        <div class="flex items-center justify-between p-2">
          <span class="text-xl font-bold text-gray-800">Користувачі</span>
          <Button
            label="Запросити"
            icon="pi pi-user-plus"
            severity="primary"
            class="p-button-sm rounded-lg"
          />
        </div>
      </template>

      <Column field="id" header="ID" :sortable="true"></Column>
      <Column header="Ім'я">
        <template #body="slotProps">
          {{ slotProps.data.name }} {{ slotProps.data.serName }}
        </template>
      </Column>
      <Column field="email" header="Email"></Column>
      <Column field="role" header="Роль">
        <template #body="slotProps">
          <Tag
            :value="slotProps.data.role"
            :severity="slotProps.data.role === 'Admin' ? 'danger' : 'info'"
          />
        </template>
      </Column>
      <Column field="status" header="Статус">
        <template #body="slotProps">
          <Tag
            :value="slotProps.data.status"
            :severity="slotProps.data.status === 'Active' ? 'success' : 'warn'"
          />
        </template>
      </Column>
      <Column header="Дії">
        <template #body>
          <div class="flex gap-2">
            <Button icon="pi pi-user-edit" severity="secondary" rounded text />
            <Button icon="pi pi-ban" severity="danger" rounded text />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
