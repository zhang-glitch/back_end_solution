import variables from '@/styles/variables.module.scss'

export default {
  token(state) {
    return state.user.token
  },
  userInfo(state) {
    return state.user.userInfo
  },
  // scss变量
  cssVar(state) {
    return variables
  },
  // 是否展开sidebar
  sideBarOpen(state) {
    return state.app.sideBarOpen
  }
}
