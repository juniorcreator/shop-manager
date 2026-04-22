<script setup lang="ts">
import Galleria from 'primevue/galleria';

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
  <div class="flex justify-center py-4">
    <Galleria
      :value="images"
      :responsiveOptions="responsiveOptions"
      :numVisible="5"
      :circular="true"
      containerStyle="max-width: 940px; width: 100%; height: 250px"
      :showItemNavigators="true"
      :showIndicatorsOnItem="true"
      :showItemNavigatorsOnHover="true"
      :showIndicators="true"
    >
      <template #item="slotProps">
        <img
          :src="slotProps.item.itemImageSrc"
          :alt="slotProps.item.alt"
          style="width: 100%; height: 250px; display: block; object-fit: cover"
        />
      </template>

      <template #thumbnail="slotProps">
        <img
          :src="slotProps.item.thumbnailImageSrc"
          :alt="slotProps.item.alt"
          style="display: block"
        />
      </template>
    </Galleria>
  </div>
</template>

<style scoped></style>
