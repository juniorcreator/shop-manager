<script setup lang="ts">
import { reactive, ref } from "vue";
import Tabs from "primevue/tabs";
import TabList from "primevue/tablist";
import Tab from "primevue/tab";
import TabPanels from "primevue/tabpanels";
import TabPanel from "primevue/tabpanel";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag";
import Rating from "primevue/rating";
import Footer from "@/client-page/components/Footer.vue";
import type { User, Order, Comment } from "@/types";
import { useUserStore } from "@/stores/user.ts";
import Image from "primevue/image";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import api from "@/api";
import { useToast } from "primevue/usetoast";
import FileUpload from "primevue/fileupload";
import { useFileUpload } from "@/composables/useFileUpload.ts";

const toast = useToast();
const queryClient = useQueryClient();
const userStore = useUserStore();
const { selectedFile, filePreview, onFileSelect } = useFileUpload();
const editForm = reactive({
  id: userStore.user?.id ?? "",
  name: userStore.user?.name ?? "",
  surname: userStore.user?.surname ?? "",
  phone: userStore.user?.phone ?? "",
  image: userStore.user?.image ?? "",
});
const userOrders = ref<Order[]>([
  {
    id: 1001,
    customer_name: "Сергій Коваленко",
    customer_email: "serhii@example.com",
    customer_phone: "+380991234567",
    delivery_address: "Київ, вул. Центральна, 5",
    payment_method: "card",
    status: "delivered",
    total_price: 1540,
    created_at: "2026-04-10",
    items: [],
  },
]);
const userComments = ref<Comment[]>([
  {
    id: 1,
    product_id: 1,
    product_name: 'Насіння соняшника "Гігант"',
    user_id: 1,
    text: "Дуже гарне насіння, зійшло швидко!",
    rating: 5,
    created_at: "2026-04-12",
  },
]);
const getStatusSeverity = (status: string) => {
  switch (status) {
    case "pending":
      return "warn";
    case "delivered":
      return "success";
    case "cancelled":
      return "danger";
    default:
      return "info";
  }
};

const handleUpdateProfile = async () => {
  if (!editForm.name || !editForm.surname) {
    throw new Error("Форма не может быть пустой");
  }
  const formDataToSend = new FormData();
  formDataToSend.append("name", editForm.name);
  formDataToSend.append("surname", editForm.surname);
  formDataToSend.append("phone", editForm.phone);

  if (selectedFile.value) {
    formDataToSend.append("image", selectedFile.value);
  }

  const data = await api.put<User>("/profile", formDataToSend, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.data;
};

const { isPending, isError, error, mutate } = useMutation({
  mutationFn: handleUpdateProfile,
  onSuccess: (updatedUser: User) => {
    userStore.setUser({ ...userStore.user, ...updatedUser });
    queryClient.invalidateQueries({ queryKey: ["profile"] });
    toast.add({ severity: "success", summary: "Профайл оновлений", life: 1500 });
  },
  onError: (err: any) => {
    toast.add({ severity: "error", summary: err.response?.data?.message || err.message, life: 3000 });
  },
});
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
            <TabPanel v-if="userStore.user" value="0">
              <div class="py-6 max-w-md">
                <div class="flex flex-col gap-4">
                  <form @submit.prevent="mutate()">
                    <div class="flex items-center gap-2">
                      <Image
                        :src="
                          filePreview
                            ? filePreview
                            : userStore.user.image || '/front/images/default-avatar.avif'
                        "
                        alt="Avatar"
                        class="rounded-full"
                        imageClass="size-34"
                        preview
                      />
                      <FileUpload
                        chooseIcon="pi pi-file-edit"
                        :chooseButtonProps="{ severity: 'info', size: 'small', variant: 'text' }"
                        mode="basic"
                        @select="onFileSelect"
                        customUpload
                        auto
                      />
                    </div>
                    <div class="flex flex-col gap-2">
                      <label class="font-semibold text-gray-700">Name</label>
                      <InputText required minlength="3" v-model="editForm.name" />
                    </div>
                    <div class="flex flex-col gap-2">
                      <label class="font-semibold text-gray-700">Surname</label>
                      <InputText minlength="3" v-model="editForm.surname" />
                    </div>
                    <div class="flex flex-col gap-2">
                      <label class="font-semibold text-gray-700">Phone</label>
                      <InputText
                        type="tel"
                        minlength="9"
                        :placeholder="userStore.user.phone ?? 'Enter your phone'"
                        v-model="editForm.phone"
                      />
                    </div>
                    <div class="flex flex-col gap-2">
                      <label class="font-semibold text-gray-700">Email</label>
                      <InputText :value="userStore.user.email" disabled class="opacity-60" />
                      <small class="text-gray-500">Email змінити неможливо</small>
                    </div>
                    <div v-if="isError" class="text-red-400">{{ error }}</div>
                    <div class="mt-4">
                      <Button
                        type="submit"
                        label="Зберегти зміни"
                        class="w-full sm:w-auto"
                        :disabled="isPending"
                        :loading="isPending"
                      />
                    </div>
                  </form>
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
