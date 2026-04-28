import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { User } from '@/types';

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);
  const isInitialized = ref(false);
  const token = ref<string | null>(null);
  const setUser = (payloadUser: User) => {
    user.value = payloadUser;
    isInitialized.value = true;
  };
  const clearUser = () => {
    user.value = null;
    isInitialized.value = true;
  };
  return { user, isInitialized, token, setUser, clearUser };
});
