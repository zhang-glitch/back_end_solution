import variables from '@/styles/variables.module.scss'
import { generateColors } from '@/utils/theme'

export default {
  token(state) {
    return state.user.token
  },
  userInfo(state) {
    return state.user.userInfo
  },
  // scss变量
  cssVar(state, getters) {
    return {
      ...variables,
      // 这里需要一些css变量的值
      ...generateColors(getters.themeColor)
    }
  },
  // 是否展开sidebar
  sideBarOpen(state) {
    return state.app.sideBarOpen
  },
  // 国际化
  language(state) {
    return state.app.language
  },
  // 切换主题
  themeColor(state) {
    return state.app.themeColor
  },
  // viwTags
  viewTags(state) {
    return state.app.viewTags
  }
}
