import { createStore } from 'vuex'
import user from './modules/user'
import app from './modules/app'
import getters from './getters'

const store = createStore({
  state() {
    return {}
  },
  getters,
  modules: {
    user,
    app
  }
})

export default store
