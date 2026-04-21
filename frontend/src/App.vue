<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import type { User } from '@/types';

const users = ref<User[] | []>([]);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  try {
    const response = await fetch('https://shop-manager-6ucr.onrender.com/api/users');
    const data = await response.json();
    users.value = data.data;
    console.log(data);
    loading.value = false;
  } catch (e) {
    console.error(e);
  }
});
</script>

<template>
  <div class="p-4 bg-gray-500 h-full min-h-screen">
    <h1 class="text-red-400">You did it!</h1>
    <p>
      sed. Blanditiis doloremque dolores, esse exercitationem facere illum ipsa ipsum nostrum
      numquam quaerat quas quidem rerum sint.
    </p>
    <div v-if="loading">loading...</div>
    <ul v-else>
      <li v-for="user in users">
        id: {{ user.id }} name: {{ user.name }} email: {{ user.email }} created:
        {{
          new Date(user.created_at).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          })
        }}
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
