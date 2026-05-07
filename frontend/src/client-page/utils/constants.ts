import { ref } from 'vue';
import type { Product, Category, BlogPost } from '@/types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Насіння',
    slug: 'seeds',
    image:
      'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&q=80&w=400',
    subcategories: [
      { id: '1-1', name: 'Овочі', slug: 'vegetables' },
      { id: '1-2', name: 'Квіти', slug: 'flowers' },
      { id: '1-3', name: 'Трави', slug: 'herbs' },
    ],
  },
  {
    id: '2',
    name: 'Інструменти',
    slug: 'tools',
    image:
      'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=400',
    subcategories: [
      { id: '2-1', name: 'Лопати', slug: 'shovels' },
      { id: '2-2', name: 'Секатори', slug: 'pruners' },
      { id: '2-3', name: 'Граблі', slug: 'rakes' },
    ],
  },
  {
    id: '3',
    name: 'Полив',
    slug: 'watering',
    image:
      'https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&q=80&w=400',
    subcategories: [
      { id: '3-1', name: 'Шланги', slug: 'hoses' },
      { id: '3-2', name: 'Лейки', slug: 'watering-cans' },
      { id: '3-3', name: 'Обприскувачі', slug: 'sprayers' },
    ],
  },
  {
    id: '4',
    name: 'Добрива',
    slug: 'fertilizers',
    image:
      'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&q=80&w=400',
    subcategories: [
      { id: '4-1', name: 'Органічні', slug: 'organic' },
      { id: '4-2', name: 'Мінеральні', slug: 'mineral' },
      { id: '4-3', name: 'Для розсади', slug: 'seedlings' },
    ],
  },
];

export const products = ref<Product[]>([
  {
    id: 1,
    name: 'Насіння соняшника "Гігант"',
    price: 120,
    category: 'seeds',
    image:
      'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 2,
    name: 'Лійка садова 5л',
    category: 'tools',
    price: 450,
    image:
      'https://media.istockphoto.com/id/1143999174/uk/%D1%84%D0%BE%D1%82%D0%BE/%D1%81%D0%B0%D0%B4%D0%BE%D0%B2%D0%B8%D0%B9-%D0%BF%D0%BE%D0%BB%D0%B8%D0%B2-%D0%BC%D0%BE%D0%B6%D0%B5-%D1%81%D1%82%D0%BE%D1%97%D1%82%D1%8C-%D0%B1%D1%96%D0%BB%D1%8F-%D0%B4%D0%B5%D0%BA%D0%BE%D1%80%D0%B0%D1%82%D0%B8%D0%B2%D0%BD%D0%BE%D0%B3%D0%BE-%D0%BF%D0%B0%D1%80%D0%BA%D0%B0%D0%BD%D1%83.jpg?s=2048x2048&w=is&k=20&c=gAllacYEZnGh6w_xKb62rr0PDLWJU9rZ-J1gFwwrhzc=',
  },
  {
    id: 3,
    name: 'Секатор професійний',
    category: 'tools',
    price: 890,
    image:
      'https://plus.unsplash.com/premium_photo-1666299434262-3d16a700ca82?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    name: 'Добрива Універсальні',
    category: 'fertilizers',
    price: 320,
    image:
      'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 5,
    name: 'Шланг для поливу 20м',
    category: 'watering',
    price: 1200,
    image:
      'https://images.unsplash.com/photo-1590487988256-9ed24133863e?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 6,
    name: 'Лопата сталева',
    category: 'tools',
    price: 550,
    image:
      'https://plus.unsplash.com/premium_photo-1680658496041-f7575066cec2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
]);

export const blogPosts = ref<BlogPost[]>([
  {
    id: 1,
    title: 'Як правильно доглядати за трояндами весною',
    excerpt:
      'Поради від професійних садівників щодо обрізки, підживлення та захисту троянд від шкідників на початку сезону.',
    content: `
      <p class="mb-4">Весна — критично важливий період для троянд. Правильний догляд у цей час закладає фундамент для пишного цвітіння протягом усього літа.</p>
      <h3 class="text-xl font-bold mb-2">1. Зняття укриття</h3>
      <p class="mb-4">Не поспішайте знімати укриття занадто рано, але й не затягуйте. Найкращий час — коли температура стабільно тримається вище нуля, а грунт відтанув.</p>
      <h3 class="text-xl font-bold mb-2">2. Обрізка</h3>
      <p class="mb-4">Видаліть усі пошкоджені, сухі та хворі гілки. Для чайно-гібридних троянд залиште 3-5 сильних бруньок на пагоні.</p>
      <h3 class="text-xl font-bold mb-2">3. Підживлення</h3>
      <p class="mb-4">Весною трояндам потрібен азот для активного росту зеленої маси. Використовуйте спеціалізовані добрива для троянд.</p>
    `,
    image:
      'https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&q=80&w=800',
    date: '15 Квітня, 2026',
    author: 'Марина Квітка',
  },
  {
    id: 2,
    title: 'Топ-5 інструментів для кожного дачника',
    excerpt:
      'Розповідаємо, які інструменти полегшать вашу працю в саду та зекономлять час при підготовці грядок.',
    content: `
      <p class="mb-4">Якісний інструмент — це 50% успіху в садівництві. Ось наш список "must-have" на цей сезон:</p>
      <ul class="list-disc ml-6 mb-4">
        <li><strong>Ергономічний секатор:</strong> Вибирайте модель зі змінними лезами.</li>
        <li><strong>Садова лопатка:</strong> Краще з нержавіючої сталі з мірною шкалою.</li>
        <li><strong>Культиватор ручний:</strong> Для розпушування грунту без пошкодження коріння.</li>
        <li><strong>Садові ножиці:</strong> Для тонкої роботи та зрізання квітів.</li>
        <li><strong>Наколінники:</strong> Ваше здоров'я понад усе!</li>
      </ul>
    `,
    image:
      'https://images.unsplash.com/photo-1416870230247-d0ce556a3d4e?auto=format&fit=crop&q=80&w=800',
    date: '10 Квітня, 2026',
    author: 'Іван Садовий',
  },
  {
    id: 3,
    title: 'Автоматичний полив: за і проти',
    excerpt:
      'Чи варто встановлювати систему автоматичного поливу? Розглядаємо економічну вигоду та вплив на ріст рослин.',
    content: `
      <p class="mb-4">Полив — це найбільш трудомістка частина догляду за садом. Автоматизація цього процесу може кардинально змінити ваше життя.</p>
      <h3 class="text-xl font-bold mb-2">Переваги:</h3>
      <p class="mb-4">Економія води до 30%, полив у нічний або вечірній час (що краще для рослин), відсутність людського фактору.</p>
      <h3 class="text-xl font-bold mb-2">Недоліки:</h3>
      <p class="mb-4">Висока вартість проектування та монтажу, необхідність консервації на зиму.</p>
    `,
    image:
      'https://images.unsplash.com/photo-1558905619-17153ad27391?auto=format&fit=crop&q=80&w=800',
    date: '05 Квітня, 2026',
    author: 'Олексій Полив',
  },
  {
    id: 4,
    title: 'Секрети вирощування органічних овочів',
    excerpt:
      'Як отримати багатий врожай без використання хімікатів та пестицидів на власному городі.',
    content: `
      <p class="mb-4">Органічне землеробство — це не просто відмова від хімії, це створення живої екосистеми на вашій ділянці.</p>
      <p class="mb-4">Почніть з компостування. Це найкраще добриво, яке можна отримати безкоштовно. Використовуйте мульчування для збереження вологи та боротьби з бур'янами.</p>
    `,
    image:
      'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=800',
    date: '01 Квітня, 2026',
    author: 'Ганна Органік',
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
