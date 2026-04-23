import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
      name: 'admin',
      redirect: { name: 'admin-dashboard' },
      component: () => import('@/admin-page/views/AdminView.vue'),
      children: [
        {
          path: '',
          name: 'admin-dashboard',
          component: () => import('@/admin-page/views/DashboardView.vue'),
        },
        {
          path: 'products',
          name: 'admin-products',
          component: () => import('@/admin-page/views/ProductsView.vue'),
        },
        {
          path: 'categories',
          name: 'admin-categories',
          component: () => import('@/admin-page/views/CategoriesAdminView.vue'),
        },
        {
          path: 'users',
          name: 'admin-users',
          component: () => import('@/admin-page/views/UsersView.vue'),
        },
        {
          path: 'blog',
          name: 'admin-blog',
          component: () => import('@/admin-page/views/BlogAdminView.vue'),
        },
        {
          path: 'orders',
          name: 'admin-orders',
          component: () => import('@/admin-page/views/OrdersAdminView.vue'),
        },
      ],
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
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('@/client-page/views/CheckoutView.vue'),
    },
  ],
});

export default router;
