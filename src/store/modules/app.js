import { getItem, setItem } from '@/utils/storage'
import { LANG } from '@/constants'

export default {
  namespaced: true,
  state() {
    return {
      // 菜单栏是否展开
      sideBarOpen: true,
      // 国际化
      language: getItem(LANG) || 'zh'
    }
  },
  mutations: {
    setSideBarOpen(state) {
      state.sideBarOpen = !state.sideBarOpen
    },
    setLanguage(state, lang) {
      setItem(LANG, lang)
      state.language = lang
    }
  }
}
