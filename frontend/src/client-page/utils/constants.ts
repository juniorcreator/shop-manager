import { ref } from 'vue';
import type { Product } from '@/types';

export const products = ref<Product[]>([
  {
    id: 1,
    name: 'Насіння соняшника "Гігант"',
    price: 120,
    image:
      'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 2,
    name: 'Лійка садова 5л',
    price: 450,
    image:
      'https://media.istockphoto.com/id/1143999174/uk/%D1%84%D0%BE%D1%82%D0%BE/%D1%81%D0%B0%D0%B4%D0%BE%D0%B2%D0%B8%D0%B9-%D0%BF%D0%BE%D0%BB%D0%B8%D0%B2-%D0%BC%D0%BE%D0%B6%D0%B5-%D1%81%D1%82%D0%BE%D1%97%D1%82%D1%8C-%D0%B1%D1%96%D0%BB%D1%8F-%D0%B4%D0%B5%D0%BA%D0%BE%D1%80%D0%B0%D1%82%D0%B8%D0%B2%D0%BD%D0%BE%D0%B3%D0%BE-%D0%BF%D0%B0%D1%80%D0%BA%D0%B0%D0%BD%D1%83.jpg?s=2048x2048&w=is&k=20&c=gAllacYEZnGh6w_xKb62rr0PDLWJU9rZ-J1gFwwrhzc=',
  },
  {
    id: 3,
    name: 'Секатор професійний',
    price: 890,
    image:
      'https://plus.unsplash.com/premium_photo-1666299434262-3d16a700ca82?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    name: 'Добрива Універсальні',
    price: 320,
    image:
      'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 5,
    name: 'Шланг для поливу 20м',
    price: 1200,
    image:
      'https://images.unsplash.com/photo-1590487988256-9ed24133863e?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 6,
    name: 'Лопата сталева',
    price: 550,
    image:
      'https://plus.unsplash.com/premium_photo-1680658496041-f7575066cec2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
]);
export const navLinks = [
  {
    to: 'home',
    name: 'Магазин',
  },
  {
    to: 'categories',
    name: 'Категорії',
  },
  {
    to: 'blog',
    name: 'Блог',
  },
  {
    to: 'about',
    name: 'Про нас',
  },
];
