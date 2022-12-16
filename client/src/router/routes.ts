import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/layouts/SignIn.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
    alias: '/signin'
  },
  {
    path: '/signup',
    component: () => import('layouts/SignUp.vue')
  },
  {
    path: '/main',
    component: () => import('layouts/MainLayout.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
