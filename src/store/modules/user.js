import md5 from 'md5'
import { postLogin, getUserInfo } from '@/api/user'
import { getItem, setItem, removeAllItem } from '@/utils/storage'
import { TOKEN, USERINFO } from '@/constants'
import router from '../../router'

export default {
  namespaced: true,
  state() {
    return {
      token: getItem(TOKEN) || '',
      userInfo: getItem(USERINFO) || {}
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
    },
    // 退出登录
    async logout() {
      this.commit('user/setToken', '')
      this.commit('user/setUserInfo', {})
      removeAllItem()
      router.push('/login')
    }
  }
}
