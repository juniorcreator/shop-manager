<script setup lang="ts">
import InputGroupAddon from 'primevue/inputgroupaddon';
import Button from 'primevue/button';
import InputGroup from 'primevue/inputgroup';
import Password from 'primevue/password';
import InputText from 'primevue/inputtext';
import { reactive } from 'vue';

const formData = reactive({
  name: '',
  serNamer: '',
  email: '',
  password: '',
});
</script>

<template>
  <form class="max-w-100 m-auto flex flex-col gap-2">
    <div>Register Form</div>
    <InputGroup>
      <InputGroupAddon>
        <i class="pi pi-user"></i>
      </InputGroupAddon>
      <InputText required v-model="formData.name" placeholder="Name" />
    </InputGroup>
    <InputGroup>
      <InputGroupAddon>
        <i class="pi pi-user"></i>
      </InputGroupAddon>
      <InputText v-model="formData.serNamer" placeholder="Ser Name optional" />
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
        placeholder="Password"
        :inputProps="{ autocomplete: 'new-password' }"
        meter="false"
        toggleMask
      />
    </InputGroup>
    <Button label="Register" type="submit" severity="help" />
  </form>
</template>

<style scoped></style>
