<script setup lang="ts">
import Footer from '@/client-page/components/Footer.vue';
import Button from 'primevue/button';
import Card from 'primevue/card';
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#f9f9f1]">
    <main class="grow">
      <section class="bg-emerald-900 text-white py-20 px-4">
        <div class="container mx-auto text-center">
          <h1 class="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Про GARDEN<span class="text-emerald-400">SHOP</span>
          </h1>
          <p class="text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
            Ми допомагаємо створювати сади вашої мрії вже понад 10 років, поєднуючи любов до природи
            та сучасні технології.
          </p>
        </div>
      </section>

      <section class="py-20 container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Наша Місія</h2>
            <p class="text-gray-600 text-lg leading-relaxed mb-6">
              Ми віримо, що кожен клаптик землі може стати оазою спокою та краси. Наша мета —
              забезпечити садівників-аматорів та професіоналів найкращим насінням, інструментами та
              знаннями для досягнення ідеального результату.
            </p>
            <div class="space-y-4">
              <div class="flex items-start gap-4">
                <div class="bg-emerald-100 p-2 rounded-lg text-emerald-700">
                  <i class="pi pi-check-circle text-xl"></i>
                </div>
                <div>
                  <h4 class="font-bold text-gray-800">Якість понад усе</h4>
                  <p class="text-gray-600">
                    Тільки перевірені постачальники та сертифікована продукція.
                  </p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <div class="bg-emerald-100 p-2 rounded-lg text-emerald-700">
                  <i class="pi pi-heart-fill text-xl"></i>
                </div>
                <div>
                  <h4 class="font-bold text-gray-800">Турбота про клієнта</h4>
                  <p class="text-gray-600">Експертні консультації та підтримка на кожному етапі.</p>
                </div>
              </div>
            </div>
          </div>
          <div class="relative">
            <img
              src="/front/images/garden.jpeg"
              alt="Наш сад"
              class="rounded-2xl shadow-2xl w-full h-100 object-cover"
            />
            <div
              class="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl hidden lg:block"
            >
              <p class="text-4xl font-black text-emerald-600">10+</p>
              <p class="text-gray-500 font-medium">Років досвіду</p>
            </div>
          </div>
        </div>
      </section>

      <section class="bg-white py-16 border-y border-gray-100">
        <div class="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p class="text-4xl font-black text-emerald-600 mb-2">5000+</p>
            <p class="text-gray-500 uppercase text-sm tracking-wider font-bold">Товарів</p>
          </div>
          <div>
            <p class="text-4xl font-black text-emerald-600 mb-2">15к+</p>
            <p class="text-gray-500 uppercase text-sm tracking-wider font-bold">Клієнтів</p>
          </div>
          <div>
            <p class="text-4xl font-black text-emerald-600 mb-2">24/7</p>
            <p class="text-gray-500 uppercase text-sm tracking-wider font-bold">Підтримка</p>
          </div>
          <div>
            <p class="text-4xl font-black text-emerald-600 mb-2">100%</p>
            <p class="text-gray-500 uppercase text-sm tracking-wider font-bold">Гарантія</p>
          </div>
        </div>
      </section>

      <section class="py-20 bg-gray-50">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
            Чому обирають нас
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card class="text-center p-4 border-none shadow-sm hover:shadow-md transition-shadow">
              <template #header>
                <div class="flex justify-center pt-6">
                  <div
                    class="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600"
                  >
                    <i class="pi pi-truck text-3xl"></i>
                  </div>
                </div>
              </template>
              <template #title>Швидка доставка</template>
              <template #content>
                <p class="text-gray-600">
                  Відправляємо ваші замовлення в день оформлення по всій Україні.
                </p>
              </template>
            </Card>

            <Card class="text-center p-4 border-none shadow-sm hover:shadow-md transition-shadow">
              <template #header>
                <div class="flex justify-center pt-6">
                  <div
                    class="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600"
                  >
                    <i class="pi pi-verified text-3xl"></i>
                  </div>
                </div>
              </template>
              <template #title>Еко-продукція</template>
              <template #content>
                <p class="text-gray-600">
                  Ми дбаємо про довкілля, тому пропонуємо безпечні та органічні товари.
                </p>
              </template>
            </Card>

            <Card class="text-center p-4 border-none shadow-sm hover:shadow-md transition-shadow">
              <template #header>
                <div class="flex justify-center pt-6">
                  <div
                    class="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600"
                  >
                    <i class="pi pi-users text-3xl"></i>
                  </div>
                </div>
              </template>
              <template #title>Спільнота</template>
              <template #content>
                <p class="text-gray-600">
                  Об'єднуємо тисячі садівників у нашому блозі та соцмережах.
                </p>
              </template>
            </Card>
          </div>
        </div>
      </section>

      <section class="py-20">
        <div class="container mx-auto px-4">
          <div
            class="bg-emerald-600 rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden"
          >
            <div class="relative z-10">
              <h2 class="text-3xl md:text-5xl font-bold mb-6">Готові розпочати сезон?</h2>
              <p class="text-emerald-100 text-lg mb-10 max-w-2xl mx-auto">
                Завітайте до нашого магазину та оберіть все необхідне для вашого ідеального саду вже
                сьогодні!
              </p>
              <RouterLink to="/">
                <Button
                  label="Перейти до покупок"
                  severity="warn"
                  size="large"
                  class="font-bold px-10 py-4"
                />
              </RouterLink>
            </div>

            <div
              class="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500 rounded-full opacity-50"
            ></div>
            <div
              class="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-700 rounded-full opacity-50"
            ></div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
</template>

<style scoped>
:deep(.p-card-title) {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-top: 1rem;
}
</style>
