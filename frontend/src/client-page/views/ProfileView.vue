<script setup lang="ts">
import { ref } from 'vue';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Rating from 'primevue/rating';
import Footer from '@/client-page/components/Footer.vue';
import type { User, Order, Comment } from '@/types';

const user = ref<User>({
  id: 1,
  name: 'Сергій',
  surname: 'Коваленко',
  email: 'serhii@example.com',
  created_at: new Date('2024-01-15'),
});

const editForm = ref({
  name: user.value.name,
  surname: user.value.surname,
});

const userOrders = ref<Order[]>([
  {
    id: 1001,
    customer_name: 'Сергій Коваленко',
    customer_email: 'serhii@example.com',
    customer_phone: '+380991234567',
    delivery_address: 'Київ, вул. Центральна, 5',
    payment_method: 'card',
    status: 'delivered',
    total_price: 1540,
    created_at: '2026-04-10',
    items: [],
  },
]);

const userComments = ref<Comment[]>([
  {
    id: 1,
    product_id: 1,
    product_name: 'Насіння соняшника "Гігант"',
    user_id: 1,
    text: 'Дуже гарне насіння, зійшло швидко!',
    rating: 5,
    created_at: '2026-04-12',
  },
]);

const handleUpdateProfile = () => {
  user.value.name = editForm.value.name;
  user.value.surname = editForm.value.surname;
  alert('Профіль оновлено успішно!');
};

const getStatusSeverity = (status: string) => {
  switch (status) {
    case 'pending':
      return 'warn';
    case 'delivered':
      return 'success';
    case 'cancelled':
      return 'danger';
    default:
      return 'info';
  }
};
</script>

<template>
  <div class="container mx-auto px-4 py-8 min-h-[calc(100vh-200px)]">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-8 text-gray-800">Мій профіль</h1>

      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <Tabs value="0">
          <TabList>
            <Tab value="0">
              <div class="flex items-center gap-2">
                <i class="pi pi-user"></i>
                <span>Дані</span>
              </div>
            </Tab>
            <Tab value="1">
              <div class="flex items-center gap-2">
                <i class="pi pi-shopping-bag"></i>
                <span>Замовлення</span>
              </div>
            </Tab>
            <Tab value="2">
              <div class="flex items-center gap-2">
                <i class="pi pi-comments"></i>
                <span>Відгуки</span>
              </div>
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel value="0">
              <div class="py-6 max-w-md">
                <div class="flex flex-col gap-4">
                  <div class="flex flex-col gap-2">
                    <label class="font-semibold text-gray-700">Ім'я</label>
                    <InputText v-model="editForm.name" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <label class="font-semibold text-gray-700">Прізвище</label>
                    <InputText v-model="editForm.surname" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <label class="font-semibold text-gray-700">Email</label>
                    <InputText :value="user.email" disabled class="opacity-60" />
                    <small class="text-gray-500">Email змінити неможливо</small>
                  </div>
                  <div class="mt-4">
                    <Button
                      label="Зберегти зміни"
                      icon="pi pi-check"
                      @click="handleUpdateProfile"
                      class="w-full sm:w-auto"
                    />
                  </div>
                </div>
              </div>
            </TabPanel>

            <TabPanel value="1">
              <div class="py-4">
                <DataTable :value="userOrders" responsiveLayout="scroll">
                  <Column field="id" header="№"></Column>
                  <Column field="created_at" header="Дата"></Column>
                  <Column field="total_price" header="Сума">
                    <template #body="slotProps">
                      <span class="font-bold">{{ slotProps.data.total_price }} ₴</span>
                    </template>
                  </Column>
                  <Column field="status" header="Статус">
                    <template #body="slotProps">
                      <Tag
                        :value="slotProps.data.status"
                        :severity="getStatusSeverity(slotProps.data.status)"
                      />
                    </template>
                  </Column>
                  <Column header="Дії">
                    <template #body>
                      <Button icon="pi pi-search" text rounded severity="secondary" />
                    </template>
                  </Column>
                </DataTable>
              </div>
            </TabPanel>

            <TabPanel value="2">
              <div class="py-4 flex flex-col gap-4">
                <div
                  v-for="comment in userComments"
                  :key="comment.id"
                  class="p-4 border border-gray-100 rounded-xl bg-gray-50"
                >
                  <div class="flex justify-between items-start mb-2">
                    <h4 class="font-bold text-emerald-700">{{ comment.product_name }}</h4>
                    <span class="text-xs text-gray-400">{{ comment.created_at }}</span>
                  </div>
                  <Rating v-model="comment.rating" readonly :cancel="false" class="mb-2" />
                  <p class="text-gray-700 italic">"{{ comment.text }}"</p>
                </div>
                <div v-if="userComments.length === 0" class="text-center py-8 text-gray-400">
                  Ви ще не залишали відгуків
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  </div>
  <Footer />
</template>
