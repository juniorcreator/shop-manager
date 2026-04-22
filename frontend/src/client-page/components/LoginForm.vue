<script setup lang="ts">
import InputGroupAddon from 'primevue/inputgroupaddon';
import Button from 'primevue/button';
import InputGroup from 'primevue/inputgroup';
import Password from 'primevue/password';
import InputText from 'primevue/inputtext';
import { reactive } from 'vue';

const formData = reactive({
  email: '',
  password: '',
});
</script>

<template>
  <form class="max-w-100 m-auto flex flex-col gap-2">
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
    <Button label="Login" type="submit" severity="help" />
  </form>
</template>

<style scoped></style>
