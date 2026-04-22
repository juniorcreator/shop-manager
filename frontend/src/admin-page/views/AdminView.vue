<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { reactive } from 'vue';
import { useToast } from 'primevue/usetoast';
import api from '@/api';
import type { ApiResponse, User } from '@/types';

const toast = useToast();
const queryClient = useQueryClient();
const formData = reactive({
  name: '',
  email: '',
  password: '',
});
const addUser = async (userData: typeof formData): Promise<void> => {
  try {
    await api.post<User>('/users', userData);
  } catch (err) {
    console.error(err);
  }
};
const {
  isPending,
  isError,
  data: users,
  error,
} = useQuery({
  queryKey: ['users'],
  queryFn: async () => {
    const response = await api.get<ApiResponse<User[]>>('/users');
    return response.data.data;
  },
});
console.log(users, ' users');
// Mutation
const mutation = useMutation({
  mutationFn: (newUserData: typeof formData) => addUser(newUserData),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
    formData.name = '';
    formData.email = '';
    formData.password = '';
    show();
    console.log('user created successfully.');
  },
  onError: (err) => {
    console.error('error user creating', err);
  },
});
const handleSubmit = (): void => {
  mutation.mutate({ ...formData });
};
const show = () => {
  toast.add({ severity: 'success', summary: 'Info', detail: 'User Created', life: 3000 });
};
</script>

<template>
  <h1>Garden crm admin page</h1>
  <form @submit.prevent="handleSubmit">
    <div><input v-model="formData.name" type="text" placeholder="name" /> name</div>
    <div><input v-model="formData.email" type="text" placeholder="email" /> email</div>
    <div><input v-model="formData.password" type="text" placeholder="password" /> password</div>
    <button class="p-2 bg-amber-600 cursor-pointer" type="submit">
      {{ mutation.isPending.value ? 'Adding...' : 'Create' }}
    </button>
  </form>
  <div v-if="isPending">loading...</div>
  <div v-else-if="isError">Error: {{ error?.message }}</div>
  <ul v-else>
    <li v-for="user in users">
      id: {{ user.id }}, name: {{ user.name }}, email: {{ user.email }}, created:
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
</template>

<style scoped></style>
