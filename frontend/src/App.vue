<script setup lang="ts">
import Toast from 'primevue/toast';
import ProgressSpinner from 'primevue/progressspinner';
import Header from '@/client-page/components/Header.vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
</script>
<template>
  <div class="h-full min-h-screen">
    <Toast />
    <div v-if="!userStore.isInitialized" class="flex h-screen items-center justify-center bg-white">
      <ProgressSpinner />
    </div>
    <template v-else>
      <Header />
      <router-view></router-view>
    </template>
  </div>
</template>
<style scoped></style>
