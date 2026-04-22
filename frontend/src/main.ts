import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { VueQueryPlugin } from '@tanstack/vue-query';
import ToastService from 'primevue/toastservice';
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css';
import './style.css';
import App from './App.vue';
import router from './router';
import Aura from '@primeuix/themes/aura';

const app = createApp(App);

app.use(VueQueryPlugin);
app.use(ToastService);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: 'system',
      cssLayer: false,
    },
  },
});
app.use(createPinia());
app.use(router);

app.mount('#app');
