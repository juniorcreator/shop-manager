<script setup lang="ts">
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Button from 'primevue/button';
import type { Order } from '@/types';

const orders = ref<Order[]>([
  {
    id: 1001,
    customer_name: 'Іван Петренко',
    customer_email: 'ivan@example.com',
    customer_phone: '+380991234567',
    delivery_address: 'Київ, вул. Садова, 10, кв. 5',
    payment_method: 'card',
    status: 'pending',
    total_price: 1540,
    created_at: '2026-04-20 14:30',
    items: [
      { id: 1, product_id: 1, product_name: 'Насіння соняшника "Гігант"', quantity: 2, price: 120 },
      { id: 2, product_id: 5, product_name: 'Шланг для поливу 20м', quantity: 1, price: 1200 },
    ],
  },
  {
    id: 1002,
    customer_name: 'Марія Ковальчук',
    customer_email: 'maria@example.com',
    customer_phone: '+380671112233',
    delivery_address: 'Львів, пр-т Свободи, 1',
    payment_method: 'cash',
    status: 'delivered',
    total_price: 450,
    created_at: '2026-04-18 10:15',
    items: [{ id: 3, product_id: 2, product_name: 'Лійка садова 5л', quantity: 1, price: 450 }],
  },
]);

const getStatusSeverity = (status: string) => {
  switch (status) {
    case 'pending':
      return 'warn';
    case 'processing':
      return 'info';
    case 'shipped':
      return 'secondary';
    case 'delivered':
      return 'success';
    case 'cancelled':
      return 'danger';
    default:
      return null;
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'pending':
      return 'Очікує';
    case 'processing':
      return 'Обробка';
    case 'shipped':
      return 'Відправлено';
    case 'delivered':
      return 'Доставлено';
    case 'cancelled':
      return 'Скасовано';
    default:
      return status;
  }
};
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
    <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
      <h3 class="text-lg font-bold text-gray-800">Список замовлень</h3>
      <div class="flex gap-2">
        <Button icon="pi pi-filter" severity="secondary" label="Фільтри" text size="small" />
        <Button icon="pi pi-download" severity="secondary" label="Експорт" text size="small" />
      </div>
    </div>

    <DataTable :value="orders" class="p-datatable-sm" responsiveLayout="scroll">
      <Column field="id" header="№ Замовлення" :sortable="true"></Column>
      <Column field="customer_name" header="Клієнт" :sortable="true"></Column>
      <Column field="created_at" header="Дата" :sortable="true"></Column>
      <Column field="total_price" header="Сума" :sortable="true">
        <template #body="slotProps">
          <span class="font-bold text-emerald-600">{{ slotProps.data.total_price }} ₴</span>
        </template>
      </Column>
      <Column field="status" header="Статус" :sortable="true">
        <template #body="slotProps">
          <Tag
            :value="getStatusLabel(slotProps.data.status)"
            :severity="getStatusSeverity(slotProps.data.status)!"
          />
        </template>
      </Column>
      <Column header="Дії" style="width: 10rem">
        <template #body>
          <div class="flex gap-2">
            <Button icon="pi pi-eye" severity="secondary" rounded text />
            <Button icon="pi pi-pencil" severity="secondary" rounded text />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
