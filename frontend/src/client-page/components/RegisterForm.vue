<script setup lang="ts">
import InputGroupAddon from 'primevue/inputgroupaddon';
import Button from 'primevue/button';
import InputGroup from 'primevue/inputgroup';
import Password from 'primevue/password';
import InputText from 'primevue/inputtext';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { useToast } from 'primevue/usetoast';
import type { User } from '@/types';
import { reactive } from 'vue';
import api from '@/api';

const toast = useToast();
const queryClient = useQueryClient();
const initialState = {
  name: '',
  email: '',
  surname: '',
  password: '',
};
const formData = reactive({ ...initialState });
const mutation = useMutation({
  mutationFn: async (newUserData: Omit<User, 'id' | 'created_at'>) => {
    const response = await api.post<User>('/register', newUserData);
    console.log(response, 'response useMutation client');
    return response;
  },

  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
    Object.assign(formData, initialState);
    toast.add({
      severity: 'success',
      summary: 'Успіх',
      detail: 'Користувача успішно зареєстровано',
      life: 3000,
    });
  },
  onError: (err: any) => {
    const errorMessage = err.response?.data?.message || 'Помилка при реєстрації';
    console.log(err.error, ' err onError client');
    console.log(errorMessage, ' errorMessage');
    toast.add({
      severity: 'error',
      summary: 'Помилка',
      detail: errorMessage,
      life: 5000,
    });
    console.error('Registration error:', err);
  },
});

const handleSubmit = (): void => {
  mutation.mutate({ ...formData });
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="w-full max-w-sm m-auto flex flex-col gap-4">
    <h2 class="text-xl font-bold text-gray-800 text-center mb-2">Реєстрація</h2>
    <InputGroup>
      <InputGroupAddon>
        <i class="pi pi-user"></i>
      </InputGroupAddon>
      <InputText
        :minlength="3"
        :maxlength="20"
        required
        v-model="formData.name"
        placeholder="Ім'я"
      />
    </InputGroup>
    <InputGroup>
      <InputGroupAddon>
        <i class="pi pi-user"></i>
      </InputGroupAddon>
      <InputText
        :maxlength="20"
        v-model="formData.surname"
        placeholder="Прізвище (необов'язково)"
      />
    </InputGroup>
    <InputGroup>
      <InputGroupAddon>
        <i class="pi pi-envelope"></i>
      </InputGroupAddon>
      <InputText
        required
        autocomplete="email"
        type="email"
        v-model="formData.email"
        placeholder="Email"
      />
    </InputGroup>
    <InputGroup>
      <InputGroupAddon>
        <i class="pi pi-shield"></i>
      </InputGroupAddon>
      <Password
        v-model="formData.password"
        required
        placeholder="Пароль"
        :inputProps="{ autocomplete: 'new-password' }"
        toggleMask
        :feedback="false"
      />
    </InputGroup>
    <Button
      :label="mutation.isPending.value ? 'Реєстрація...' : 'Зареєструвати'"
      :disabled="mutation.isPending.value"
      type="submit"
      severity="success"
      class="mt-2"
    />
  </form>
</template>

<style scoped></style>
