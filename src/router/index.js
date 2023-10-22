import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from "../stores/auth";

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
    }
  ]
})

export default router
