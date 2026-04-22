<script setup lang="ts">
import Card from 'primevue/card';
import Button from 'primevue/button';
</script>

<template>
  <Card class="hover:bg-fuchsia-300" style="width: 17rem; overflow: hidden">
    <template #header>
      <img alt="user header" src="/front/images/22.png" />
    </template>
    <template #title>Advanced Card</template>
    <template #content>
      <p class="m-0 font-black text-lg">1,200 grn</p>
    </template>
    <template #footer>
      <div class="flex justify-center gap-2 mt-1">
        <Button severity="secondary" icon="pi pi-heart" label="" />
        <Button severity="contrast" icon="pi pi-shopping-cart" label="+" />
      </div>
    </template>
  </Card>
</template>

<style scoped></style>
