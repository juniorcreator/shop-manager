import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { User } from '@/types';

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);
  const setUser = (payloadUser: User, payloadToken: string) => {
    user.value = payloadUser;
    token.value = payloadToken;
  };
  const clearUser = () => {
    user.value = null;
    token.value = null;
  };
  return { user, token, setUser, clearUser };
});
