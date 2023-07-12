import { createRouter, createWebHashHistory } from 'vue-router'
import loginRoutes from './modules/loginRoutes'
import profileRoutes from './modules/profileRoutes'

const routes = [
  ...loginRoutes,
  {
    name: '',
    path: '/',
    redirect: '/profile',
    children: [...profileRoutes]
  }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})
