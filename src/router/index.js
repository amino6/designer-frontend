import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import InternalErrorView from '../views/InternalErrorView.vue'

import guest from '../middleware/guest';
import auth from '../middleware/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      beforeEnter: [guest],
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      beforeEnter: [guest],
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      beforeEnter: [guest],
      component: () => import('../views/ForgotPasswordView.vue')
    },
    {
      path: '/reset-password/:token',
      name: 'reset-password',
      beforeEnter: [guest],
      component: () => import('../views/ResetPasswordView.vue')
    },
    {
      path: '/upload',
      name: 'upload',
      beforeEnter: [auth],
      component: () => import('../views/Designs/CreateView.vue')
    },
    {
      path: '/designs/:id/edit',
      name: 'designs-edit',
      beforeEnter: [auth],
      component: () => import('../views/Designs/EditView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      beforeEnter: [auth],
      component: () => import('../views/DashboardView.vue')
    },
    {
      path: '/designs',
      name: 'designs',
      beforeEnter: [auth],
      component: () => import('../views/Designs/IndexView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView
    },
    {
      path: '/404',
      name: 'not-found-direct',
      component: NotFoundView
    },
    {
      path: '/500',
      name: 'internal-error',
      component: InternalErrorView
    },
  ]
})

export default router
