import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/DashboardView.vue'
import TransactionsView from '@/views/TransactionsView'
import UserAuth from '@/components/AuthComponents/UserAuth'
import TableModal from '@/components/HomeViewComponents/TableModal'
const routes = [
  {
    path: '/',
    name: 'home',
    redirect: 'transactions'
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/transactions',
    name: 'transactions-view',
    component: HomeView,
    children : [
      // {path: '/transactions/:id', name: 'transaction', component: TableModal, props: true}
    ]
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

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/auth']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')
  if (authRequired && !loggedIn) {
    return next('/auth')
  }
    next()
})
export default router
