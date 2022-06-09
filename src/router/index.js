import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Tasks.vue'),
  },
  {
    path: '/new',
    name: 'new',
    component: () => import('../views/New.vue'),
  },
  {
    path: '/task/:id',
    name: 'task',
    props: true,
    component: () => import('../views/Task.vue'),
  },
  {
    path: '/:notFound(.*)',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
});

export default router;
