<script setup lang="ts"></script>

<template>
  <div class="header flex justify-between items-center gap-3 p-2 border-b border-gray-400">
    <div><i class="pi pi-shop" style="font-size: 3.5rem"></i></div>
    <div class="menu">
      <ul class="flex gap-2 text-xl">
        <li>
          <RouterLink class="p-1 rounded-md" to="/">Магазин</RouterLink>
        </li>
        <li>
          <RouterLink class="p-1 rounded-md" to="/categories">Категорії</RouterLink>
        </li>
        <li><RouterLink class="p-1 rounded-md" to="/blog">Блог</RouterLink></li>
        <li><RouterLink class="p-1 rounded-md" to="/about">Про нас</RouterLink></li>
        <li><RouterLink class="p-1 rounded-md" to="/admin">Admin</RouterLink></li>
      </ul>
    </div>
    <div class="flex items-center gap-2 text-xl">
      <div><i class="pi pi-search" style="font-size: 1.5rem"></i></div>
      <div><RouterLink class="p-1 rounded-md" to="/login">Вхід</RouterLink></div>
      <div><RouterLink class="p-1 rounded-md" to="/register">Реєестрація</RouterLink></div>
      <div><i class="pi pi-shopping-cart" style="font-size: 1.5rem"></i></div>
    </div>
  </div>
</template>

<style scoped></style>
