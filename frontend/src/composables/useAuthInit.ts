import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user.ts';

export const useAuthInit = () => {
  const userStore = useUserStore();
  onMounted(() => {
    try {
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (user && token) {
        userStore.setUser(JSON.parse(user), token);
      }
    } catch (e) {
      console.error('Помилка читання даних користувача:', e);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  });
};
