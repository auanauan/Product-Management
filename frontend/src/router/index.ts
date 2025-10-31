import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import ProductList from '../views/ProductList.vue';
import ProductForm from '../views/ProductForm.vue';
import CategoryList from '../views/CategoryList.vue';
import CategoryForm from '../views/CategoryForm.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/products'
  },
  {
    path: '/products',
    name: 'ProductList',
    component: ProductList
  },
  {
    path: '/products/create',
    name: 'ProductCreate',
    component: ProductForm
  },
  {
    path: '/products/edit/:id',
    name: 'ProductEdit',
    component: ProductForm
  },
  {
    path: '/categories',
    name: 'CategoryList',
    component: CategoryList
  },
  {
    path: '/categories/create',
    name: 'CategoryCreate',
    component: CategoryForm
  },
  {
    path: '/categories/edit/:id',
    name: 'CategoryEdit',
    component: CategoryForm
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
