<script setup lang="ts">
import Dialog from 'primevue/dialog';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { Product } from '@/types';

const props = defineProps<{
  visible: boolean;
}>();

const emit = defineEmits(['update:visible']);
const router = useRouter();

const cartItems = ref<(Product & { quantity: number })[]>([
  {
    id: 1,
    name: 'Насіння соняшника "Гігант"',
    price: 120,
    image:
      'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&q=80&w=400',
    quantity: 2,
  },
  {
    id: 2,
    name: 'Лійка садова 5л',
    price: 450,
    image:
      'https://media.istockphoto.com/id/1143999174/uk/%D1%84%D0%BE%D1%82%D0%BE/%D1%81%D0%B0%D0%B4%D0%BE%D0%B2%D0%B8%D0%B9-%D0%BF%D0%BE%D0%BB%D0%B8%D0%B2-%D0%BC%D0%BE%D0%B6%D0%B5-%D1%81%D1%82%D0%BE%D1%97%D1%82%D1%8C-%D0%B1%D1%96%D0%BB%D1%8F-%D0%B4%D0%B5%D0%BA%D0%BE%D1%80%D0%B0%D1%82%D0%B8%D0%B2%D0%BD%D0%BE%D0%B3%D0%BE-%D0%BF%D0%B0%D1%80%D0%BA%D0%B0%D0%BD%D1%83.jpg?s=2048x2048&w=is&k=20&c=gAllacYEZnGh6w_xKb62rr0PDLWJU9rZ-J1gFwwrhzc=',
    quantity: 1,
  },
]);

const totalPrice = ref(cartItems.value.reduce((acc, item) => acc + item.price * item.quantity, 0));

const updateVisible = (value: boolean) => {
  emit('update:visible', value);
};

const removeItem = (id: number) => {
  cartItems.value = cartItems.value.filter((item) => item.id !== id);
  totalPrice.value = cartItems.value.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

const goToCheckout = () => {
  updateVisible(false);
  router.push({ name: 'checkout' });
};
</script>

<template>
  <Dialog
    :visible="props.visible"
    @update:visible="updateVisible"
    modal
    header="Ваш кошик"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div v-if="cartItems.length > 0" class="flex flex-col gap-4">
      <div
        v-for="item in cartItems"
        :key="item.id"
        class="flex items-center justify-between border-b pb-4 last:border-0"
      >
        <div class="flex items-center gap-4">
          <img :src="item.image" :alt="item.name" class="w-16 h-16 object-cover rounded-md" />
          <div>
            <h4 class="font-semibold text-gray-800">{{ item.name }}</h4>
            <p class="text-sm text-gray-500">{{ item.quantity }} x {{ item.price }} ₴</p>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <span class="font-bold text-emerald-600">{{ item.price * item.quantity }} ₴</span>
          <button
            @click="removeItem(item.id)"
            class="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
          >
            <i class="pi pi-trash"></i>
          </button>
        </div>
      </div>

      <div class="mt-4 pt-4 border-t flex justify-between items-center">
        <span class="text-xl font-bold text-gray-800">Разом:</span>
        <span class="text-2xl font-black text-emerald-600">{{ totalPrice }} ₴</span>
      </div>

      <div class="mt-6 flex flex-col sm:flex-row gap-3">
        <button
          @click="updateVisible(false)"
          class="flex-1 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
        >
          Продовжити покупки
        </button>
        <button
          @click="goToCheckout"
          class="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
        >
          Оформити замовлення
        </button>
      </div>
    </div>
    <div v-else class="py-12 text-center">
      <i class="pi pi-shopping-cart text-6xl text-gray-200 mb-4"></i>
      <p class="text-xl text-gray-500">Ваш кошик порожній</p>
      <button
        @click="updateVisible(false)"
        class="mt-6 px-8 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
      >
        До магазину
      </button>
    </div>
  </Dialog>
</template>

<style scoped></style>
