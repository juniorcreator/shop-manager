import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user.ts';
import api from '@/api';

export const useAuthInit = () => {
  const userStore = useUserStore();
  onMounted(async () => {
    console.log('onMounted');
    try {
      const res = await api.get('/me');
      console.log(res, ' res useAuthInit');
      if (res.data) {
        userStore.setUser(res.data);
      }
    } catch (eror) {
      console.error('Помилка читання даних користувача:', eror);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  });
};
