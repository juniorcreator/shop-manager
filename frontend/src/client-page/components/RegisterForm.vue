<script setup lang="ts">
import InputGroupAddon from "primevue/inputgroupaddon";
import Button from "primevue/button";
import InputGroup from "primevue/inputgroup";
import Password from "primevue/password";
import InputText from "primevue/inputtext";
import FileUpload from "primevue/fileupload";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useToast } from "primevue/usetoast";
import { useFileUpload } from "@/composables/useFileUpload.ts";
import type { User } from "@/types";
import { reactive } from "vue";
import api from "@/api";

const toast = useToast();
const queryClient = useQueryClient();
const { selectedFile, filePreview, onFileSelect } = useFileUpload();
const initialState = { name: "", email: "", surname: "", password: "" };
const formData = reactive({ ...initialState });
const mutation = useMutation({
  mutationFn: async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("surname", formData.surname);
    formDataToSend.append("password", formData.password);

    if (selectedFile.value) {
      formDataToSend.append("image", selectedFile.value);
    }
    const response = await api.post<User>("/register", formDataToSend, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(response, "response useMutation client");
    return response;
  },

  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["users"] });
    Object.assign(formData, initialState);
    selectedFile.value = null;
    filePreview.value = null;
    toast.add({ severity: "success", summary: "Користувача успішно зареєстровано", life: 3000 });
  },
  onError: (err: any) => {
    const errorMessage = err.response?.data?.message || "Помилка при реєстрації";
    toast.add({ severity: "error", summary: "Помилка", detail: errorMessage, life: 5000 });
    console.error("Registration error:", err);
  },
});
const handleSubmit = (): void => {
  mutation.mutate();
};
</script>

<template>
  <form
    @submit.prevent="handleSubmit"
    class="w-full max-w-sm h-screen m-auto flex flex-col justify-center gap-4"
  >
    <h2 class="text-xl font-bold text-gray-800 text-center mb-2">Реєстрація</h2>
    <InputGroup>
      <InputGroupAddon>
        <i class="pi pi-user"></i>
      </InputGroupAddon>
      <InputText :minlength="3" :maxlength="20" required v-model="formData.name" placeholder="Ім'я" />
    </InputGroup>
    <InputGroup>
      <InputGroupAddon>
        <i class="pi pi-user"></i>
      </InputGroupAddon>
      <InputText :maxlength="20" v-model="formData.surname" placeholder="Прізвище (необов'язково)" />
    </InputGroup>
    <InputGroup>
      <InputGroupAddon>
        <i class="pi pi-envelope"></i>
      </InputGroupAddon>
      <InputText required autocomplete="email" type="email" v-model="formData.email" placeholder="Email" />
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
    <InputGroup>
      <div class="flex items-center gap-2 w-full">
        <FileUpload
          mode="basic"
          @select="onFileSelect"
          customUpload
          auto
          severity="contrast"
          class="p-button-outlined"
        />
        <span v-if="!filePreview">No avatar uploaded <i class="pi pi-image"></i></span>
        <img v-if="filePreview" :src="filePreview" alt="Avatar" class="shadow-md rounded-xl sm:w-35" />
      </div>
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
