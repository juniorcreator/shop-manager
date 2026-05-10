<script setup lang="ts">
import InputGroupAddon from "primevue/inputgroupaddon";
import Button from "primevue/button";
import InputGroup from "primevue/inputgroup";
import Password from "primevue/password";
import InputText from "primevue/inputtext";
import { useMutation } from "@tanstack/vue-query";
import { reactive } from "vue";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
import type { User } from "@/types";
import { useUserStore } from "@/stores/user.ts";
import api from "@/api";

const toast = useToast();
const router = useRouter();
const initialState = { email: "44444@wedwedew.com", password: "12345" };
const formData = reactive({ ...initialState });
const userStore = useUserStore();

const mutation = useMutation({
  mutationFn: async (user: Pick<User, "email" | "password">) => {
    return await api.post<{ data: User }>("/login", user);
  },

  onSuccess: (response) => {
    const { data: user } = response.data;
    userStore.setUser(user);
    toast.add({ severity: "success", summary: "Користувача успішно залогігений", life: 1500 });
    Object.assign(formData, initialState);
    router.push("/");
  },
  onError: (err: any) => {
    const errorMessage = err.response?.data?.message || "Помилка при вході";
    toast.add({ severity: "error", summary: errorMessage, life: 5000 });
    console.error("Login error:", err);
  },
});

const handleSubmit = (): void => {
  mutation.mutate({ ...formData });
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="max-w-100 h-screen m-auto flex flex-col justify-center gap-2">
    <h2 class="text-xl font-bold text-gray-800 text-center mb-2">Вхід</h2>
    <InputGroup>
      <InputGroupAddon>
        <i class="pi pi-envelope"></i>
      </InputGroupAddon>
      <InputText
        minlength="8"
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
        placeholder="Password"
        :inputProps="{ autocomplete: 'current-password' }"
        :feedback="false"
        minlength="4"
        required
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
