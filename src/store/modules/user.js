import md5 from 'md5'
import { postLogin, getUserInfo } from '@/api/user'
import { getItem, setItem, removeAllItem } from '@/utils/storage'
import { TOKEN, USERINFO } from '@/constants'
import router, { resetRouter } from '../../router'

export default {
  namespaced: true,
  state() {
    return {
      token: getItem(TOKEN) || '',
      // userInfo: getItem(USERINFO) || {}
      // 这里不缓存，不然动态路由添加后，刷新将会丢失
      userInfo: {}
    }
  },
  getters: {},
  mutations: {
    setToken(state, data) {
      state.token = data
      console.log('token', data)
      setItem(TOKEN, data)
    },
    setUserInfo(state, data) {
      state.userInfo = data
      setItem(USERINFO, data)
    }
  },
  actions: {
    async postLogin({ commit }, data) {
      const psw = md5(data.password)
      const { token } = await postLogin({ ...data, password: psw })
      commit('setToken', token)
    },
    async getUserInfo({ commit }) {
      const res = await getUserInfo()
      commit('setUserInfo', res)
      return res
    },
    // 退出登录
    async logout() {
      resetRouter()
      this.commit('user/setToken', '')
      this.commit('user/setUserInfo', {})
      removeAllItem()
      router.push('/login')
    }
  }
}
