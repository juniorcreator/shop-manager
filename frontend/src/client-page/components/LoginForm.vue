<script setup lang="ts">
import InputGroupAddon from 'primevue/inputgroupaddon';
import Button from 'primevue/button';
import InputGroup from 'primevue/inputgroup';
import Password from 'primevue/password';
import InputText from 'primevue/inputtext';
import { useMutation } from '@tanstack/vue-query';
import { reactive } from 'vue';
import { useToast } from 'primevue/usetoast';
import type { User } from '@/types';
import api from '@/api';

const toast = useToast();
const initialState = { email: '', password: '' };
const formData = reactive({ ...initialState });

const mutation = useMutation({
  mutationFn: async (user: Pick<User, 'email' | 'password'>) => {
    const response = await api.post<User>('/login', user);
    console.log(response, 'response useMutation client');
    return response;
  },

  onSuccess: () => {
    Object.assign(formData, initialState);
    toast.add({
      severity: 'success',
      summary: 'Успіх',
      detail: 'Користувача успішно залогігений',
      life: 3000,
    });
  },
  onError: (err: any) => {
    const errorMessage = err.response?.data?.message || 'Помилка при вході';
    console.log(err.error, ' err onError client');
    console.log(errorMessage, ' errorMessage');
    toast.add({
      severity: 'error',
      summary: 'Помилка',
      detail: errorMessage,
      life: 5000,
    });
    console.error('Login error:', err);
  },
});

const handleSubmit = (): void => {
  mutation.mutate({ ...formData });
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="max-w-100 m-auto flex flex-col gap-2">
    <div>Login Form</div>
    <InputGroup>
      <InputGroupAddon>
        <i class="pi pi-envelope"></i>
      </InputGroupAddon>
      <InputText autocomplete="email" type="email" v-model="formData.email" placeholder="Email" />
    </InputGroup>
    <InputGroup>
      <InputGroupAddon>
        <i class="pi pi-shield"></i>
      </InputGroupAddon>
      <Password
        v-model="formData.password"
        placeholder="Password"
        :inputProps="{ autocomplete: 'current-password' }"
        meter="false"
        toggleMask
      />
    </InputGroup>
    <Button
      :disabled="mutation.isPending.value"
      :label="mutation.isPending.value ? 'Вхід...' : 'Вхід'"
      type="submit"
      severity="help"
    />
  </form>
</template>

<style scoped></style>
