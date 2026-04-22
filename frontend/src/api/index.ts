import axios from 'axios';
import toast from 'vue3-hot-toast';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 19000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status !== 404) {
      console.error('API Error:', error);
    }
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      console.error('API Timeout:', error.message);
      toast.error('Server Error, Please Update the page');
    }
    return Promise.reject(error);
  },
);

export default api;
