import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { User } from '@/types';

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);
  const isInitialized = ref(false);
  const setUser = (payloadUser: User) => {
    user.value = payloadUser;
    isInitialized.value = true;
  };
  const clearUser = () => {
    user.value = null;
    isInitialized.value = true;
  };
  return { user, isInitialized, setUser, clearUser };
});
