<script setup lang="ts">
import Toast from 'primevue/toast';
import Header from '@/client-page/components/Header.vue';
</script>
<template>
  <div class="px-4 h-full min-h-screen">
    <Toast />
    <Header />
    <router-view></router-view>
  </div>
</template>
<style scoped></style>
