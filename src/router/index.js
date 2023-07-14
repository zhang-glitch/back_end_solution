import { createRouter, createWebHashHistory } from 'vue-router'
import loginRoutes from './modules/loginRoutes'
import profileRoutes from './modules/profileRoutes'
import articleRoutes from './modules/articleRputes'
import userRoutes from './modules/userRoutes'

const routes = [loginRoutes, profileRoutes, articleRoutes, userRoutes]

export default createRouter({
  history: createWebHashHistory(),
  routes
})
