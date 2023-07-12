import md5 from 'md5'
import { postLogin } from '@/api/user'
import { getItem, setItem } from '@/utils/storage'
import { TOKEN } from '@/constants'

export default {
  namespaced: true,
  state() {
    return {
      token: getItem(TOKEN) || ''
    }
  },
  getters: {},
  mutations: {
    setToken(state, data) {
      state.token = data
      setItem(TOKEN, data)
    }
  },
  actions: {
    async postLogin({ commit }, data) {
      const psw = md5(data.password)
      const { token } = await postLogin({ ...data, password: psw })
      commit('setToken', token)
    }
  }
}
