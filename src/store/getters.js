import variables from '@/styles/variables.module.scss'
import { generateColors } from '@/utils/theme'

export default {
  token(state) {
    return state.user.token
  },
  userInfo(state) {
    return state.user.userInfo
  },
  // scss变量, 这里就是修改自定义样式的主题的。当主题色发生变化，我们将重新计算附属主题变量的值
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
