export default {
  namespaced: true,
  state() {
    return {
      sideBarOpen: true
    }
  },
  mutations: {
    setSideBarOpen(state) {
      state.sideBarOpen = !state.sideBarOpen
    }
  }
}
