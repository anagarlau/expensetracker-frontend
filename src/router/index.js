import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import TransactionsView from '@/views/TransactionsView'
import UserAuth from '@/components/AuthComp/UserAuth'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/transactions',
    name: 'transactions-view',
    component: TransactionsView
  },
  {
    path: '/auth',
    name: 'auth',
    component: UserAuth
  }
]
/* router config */
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  routes
})

export default router
