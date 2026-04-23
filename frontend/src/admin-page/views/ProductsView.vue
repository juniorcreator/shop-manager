<script setup lang="ts">
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { products } from '@/client-page/utils/constants';

const filters = ref({
  global: { value: null, matchMode: 'contains' },
});
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    <DataTable
      :value="products"
      paginator
      :rows="5"
      tableStyle="min-width: 50rem"
      class="p-datatable-sm"
    >
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-4 p-2">
          <span class="text-xl font-bold text-gray-800">Управління товарами</span>
          <div class="flex gap-3">
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText placeholder="Пошук..." class="p-inputtext-sm" />
            </span>
            <Button
              label="Додати товар"
              icon="pi pi-plus"
              severity="success"
              class="p-button-sm rounded-lg"
            />
          </div>
        </div>
      </template>

      <Column field="id" header="ID" sortable style="width: 10%"></Column>
      <Column header="Зображення" style="width: 15%">
        <template #body="slotProps">
          <img
            :src="slotProps.data.image"
            :alt="slotProps.data.name"
            class="w-12 h-12 object-cover rounded-lg shadow-sm"
          />
        </template>
      </Column>
      <Column field="name" header="Назва" sortable style="width: 40%"></Column>
      <Column field="price" header="Ціна" sortable style="width: 15%">
        <template #body="slotProps">
          <span class="font-bold text-emerald-600">{{ slotProps.data.price }} ₴</span>
        </template>
      </Column>
      <Column header="Дії" style="width: 20%">
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

<style scoped>
:deep(.p-datatable-header) {
  background: white;
  border-bottom: 1px solid #f3f4f6;
}
</style>
