import { getItem, setItem } from '@/utils/storage'
import { LANG, THEME_COLOR, DEFAULT_COLOR } from '@/constants'

export default {
  namespaced: true,
  state() {
    return {
      // 菜单栏是否展开
      sideBarOpen: true,
      // 国际化
      language: getItem(LANG) || 'zh',
      // 主题切换
      themeColor: getItem(THEME_COLOR) || DEFAULT_COLOR
    }
  },
  mutations: {
    setSideBarOpen(state) {
      state.sideBarOpen = !state.sideBarOpen
    },
    setLanguage(state, lang) {
      setItem(LANG, lang)
      state.language = lang
    },
    setThemeColor(state, color) {
      setItem(THEME_COLOR, color)
      state.themeColor = color
    }
  }
}
