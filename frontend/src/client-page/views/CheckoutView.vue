<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import SelectButton from 'primevue/selectbutton';
import Textarea from 'primevue/textarea';
import Footer from '@/client-page/components/Footer.vue';

const router = useRouter();

const formData = ref({
  fullName: '',
  phone: '',
  email: '',
  address: '',
  comment: '',
  paymentMethod: 'Готівка',
});

const paymentOptions = ref(['Готівка', 'Карта', 'При отриманні']);

const handleSubmit = () => {
  alert('Замовлення успішно оформлено! Дякуємо за покупку.');
  router.push('/');
};

const goBack = () => {
  router.back();
};
</script>

<template>
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    <div class="flex items-center gap-4 mb-8">
      <button
        @click="goBack"
        class="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
      >
        <i class="pi pi-arrow-left text-xl"></i>
      </button>
      <h1 class="text-3xl font-bold text-gray-800">Оформлення замовлення</h1>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Форма замовлення -->
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
            <i class="pi pi-user text-emerald-600"></i>
            Контактні дані
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex flex-col gap-2">
              <label for="fullName" class="text-sm font-medium text-gray-700"
                >Прізвище та ім'я</label
              >
              <InputText id="fullName" v-model="formData.fullName" placeholder="Іванов Іван" />
            </div>
            <div class="flex flex-col gap-2">
              <label for="phone" class="text-sm font-medium text-gray-700">Номер телефону</label>
              <InputText id="phone" v-model="formData.phone" placeholder="+380..." />
            </div>
            <div class="flex flex-col gap-2 md:col-span-2">
              <label for="email" class="text-sm font-medium text-gray-700"
                >Email (необов'язково)</label
              >
              <InputText id="email" v-model="formData.email" placeholder="example@mail.com" />
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
            <i class="pi pi-map-marker text-emerald-600"></i>
            Доставка
          </h2>

          <div class="flex flex-col gap-2">
            <label for="address" class="text-sm font-medium text-gray-700"
              >Адреса доставки (місто, відділення або вулиця)</label
            >
            <Textarea
              id="address"
              v-model="formData.address"
              rows="3"
              placeholder="Введіть дані для доставки"
            />
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
            <i class="pi pi-credit-card text-emerald-600"></i>
            Оплата
          </h2>

          <SelectButton
            v-model="formData.paymentMethod"
            :options="paymentOptions"
            aria-labelledby="basic"
          />

          <div class="flex flex-col gap-2 mt-4">
            <label for="comment" class="text-sm font-medium text-gray-700"
              >Коментар до замовлення</label
            >
            <Textarea
              id="comment"
              v-model="formData.comment"
              rows="2"
              placeholder="Ваші побажання..."
            />
          </div>
        </div>
      </div>

      <!-- order details -->
      <div class="lg:col-span-1">
        <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-md sticky top-24">
          <h2 class="text-xl font-bold text-gray-800 mb-6 border-b pb-4">Ваше замовлення</h2>

          <div class="space-y-4 mb-6">
            <div class="flex justify-between text-gray-600">
              <span>Товари (3)</span>
              <span>690 ₴</span>
            </div>
            <div class="flex justify-between text-gray-600">
              <span>Доставка</span>
              <span class="text-emerald-600 font-medium">За тарифами перевізника</span>
            </div>
            <div class="pt-4 border-t flex justify-between items-center">
              <span class="text-lg font-bold">Разом до сплати</span>
              <span class="text-2xl font-black text-emerald-600">690 ₴</span>
            </div>
          </div>

          <Button
            @click="handleSubmit"
            label="Підтвердити замовлення"
            class="w-full py-4 bg-emerald-600 hover:bg-emerald-700 border-none rounded-xl text-lg font-bold"
          />

          <p class="text-[10px] text-gray-400 mt-4 text-center">
            Натискаючи на кнопку, ви погоджуєтесь з умовами обробки персональних даних та договором
            публічної оферти.
          </p>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped>
:deep(.p-selectbutton .p-button.p-highlight) {
  background: #10b981;
  border-color: #10b981;
}
</style>
