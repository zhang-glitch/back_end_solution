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
      if (isCheckTimeout()) {
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
