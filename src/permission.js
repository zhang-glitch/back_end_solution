import router from './router'
import store from './store'
import { isCheckTimeout } from '@/utils/auth'
import { ElMessage } from 'element-plus'

const whiteList = ['/login']
/**
 * token有值
 * token未过期
 */
router.beforeEach(async (to, from, next) => {
  // token存在，禁止跳转到login
  if (store.getters.token) {
    if (to.name === 'login') {
      next('/')
    } else {
      if (!isCheckTimeout()) {
        // 将数据加入到viewTags
        // 进行去重
        const tags = store.getters.viewTags
        const findIndex = tags.findIndex((item) => to.path === item.path)
        if (findIndex === -1 && to.path !== '/404' && to.path !== '/401') {
          store.commit('app/setViewTags', [...tags, to])
        }
        const { permission } = store.getters.userInfo
        console.log('userInfo', permission)
        // 处理动态路由添加
        // 处理用户权限，筛选出需要添加的权限
        const filterRoutes = await store.dispatch(
          'permission/filterRoutes',
          permission?.menus
        )
        // 利用 addRoute 循环添加
        filterRoutes.forEach((item) => {
          router.addRoute(item)
        })
        next()
        // return true
      } else {
        ElMessage.info('登录已过期，请重新登录！')
        next('/login')
      }
    }
  } else {
    // 没有token的情况下，可以进入白名单
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
