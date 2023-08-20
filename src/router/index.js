import { createRouter, createWebHashHistory } from 'vue-router'
import loginRoutes from './modules/loginRoutes'
// import profileRoutes from './modules/profileRoutes'
import articleRoutes from './modules/articleRputes'
import userRoutes from './modules/userRoutes'

// 私有路由表 通过后端返回的当前用户权限列表来动态添加对应的路由。
export const privateRoutes = [articleRoutes, userRoutes]
// 共有路由表
export const publicRoutes = [
  loginRoutes,
  {
    path: '/',
    // 注意：带有路径“/”的记录中的组件“默认”是一个不返回 Promise 的函数
    component: () => import('../views/layout/index.vue'),
    redirect: '/profile',
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index.vue'),
        meta: {
          title: 'profile',
          icon: 'el-icon',
          iconName: 'User'
        }
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404.vue')
      },
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
})

export default router

/**
 * 初始化路由表
 */
export function resetRouter() {
  const menus = ['permissionList', 'articleRanking']
  menus.forEach((menu) => {
    router.removeRoute(menu)
  })
}
