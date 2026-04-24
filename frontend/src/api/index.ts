import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status !== 404) {
      console.error('API Error:', error);
    }
    return Promise.reject(error);
  },
);

export default api;
