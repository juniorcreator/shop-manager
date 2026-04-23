import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/admin-page/views/AdminView.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/client-page/views/HomeView.vue'),
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('@/client-page/views/CategoriesView.vue'),
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('@/client-page/views/BlogView.vue'),
    },
    {
      path: '/blog/:id',
      name: 'blog-post',
      component: () => import('@/client-page/views/BlogPostView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/client-page/views/AboutUsView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/client-page/views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/client-page/views/RegisterView.vue'),
    },
  ],
});

export default router;
