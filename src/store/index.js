import { createStore } from 'vuex'
import user from './modules/user'
import getters from './getters'

const store = createStore({
  state() {
    return {}
  },
  getters,
  modules: {
    user
  }
})

export default store
