<script setup lang="ts">
import Galleria from 'primevue/galleria';
import Button from 'primevue/button';

import { ref, onMounted } from 'vue';
import { Photo } from '@/client-page/utils/Photo.ts';

onMounted(() => {
  Photo.getImages().then((data: any) => (images.value = data));
});

const images = ref();
const responsiveOptions = ref([
  {
    breakpoint: '991px',
    numVisible: 4,
  },
  {
    breakpoint: '767px',
    numVisible: 3,
  },
  {
    breakpoint: '575px',
    numVisible: 1,
  },
]);
</script>

<template>
  <div class="flex justify-center py-8 px-4">
    <Galleria
      :value="images"
      :responsiveOptions="responsiveOptions"
      :circular="true"
      containerClass="rounded-2xl overflow-hidden shadow-xl border border-gray-100"
      containerStyle="max-width: 1200px; width: 100%;"
      :showItemNavigators="true"
      :showThumbnailNavigators="false"
      :show-thumbnails="false"
      :showIndicators="true"
      :showIndicatorsOnItem="true"
      :autoPlay="true"
      :transitionInterval="5000"
    >
      <template #item="slotProps">
        <img
          :src="slotProps.item.itemImageSrc"
          :alt="slotProps.item.alt"
          class="w-full h-75 object-cover"
        />
      </template>
      <template #caption="slotProps">
        <div class="relative w-full">
          <div class="inset-0 flex items-end p-4 md:p-10">
            <div class="text-white max-w-2xl">
              <h2 class="text-2xl md:text-5xl font-bold mb-4">
                {{ slotProps.item.title || 'Нова колекція' }}
              </h2>
              <p class="text-lg md:text-xl opacity-90 mb-6">
                Найкращі товари для вашого саду з доставкою по всій Україні.
              </p>
              <Button
                label="Переглянути"
                class="transition-all transform hover:scale-102 bg-[#807e51]"
              />
            </div>
          </div>
        </div>
      </template>
    </Galleria>
  </div>
</template>

<style scoped lang="scss">
:deep(.p-galleria-caption) {
  background-color: transparent;
}
:deep(.p-galleria-nav-button) {
  z-index: 3;
}
:deep(.p-galleria-content .p-galleria-indicator-list) {
  background-color: transparent;
}
</style>
