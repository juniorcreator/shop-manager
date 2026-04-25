<script setup lang="ts">
import Toast from 'primevue/toast';
import Header from '@/client-page/components/Header.vue';
import { useAuthInit } from '@/composables/useAuthInit.ts';
useAuthInit();
</script>
<template>
  <div class="h-full min-h-screen">
    <Toast />
    <Header />
    <router-view></router-view>
  </div>
</template>
<style scoped></style>
