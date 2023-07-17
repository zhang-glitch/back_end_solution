import { getItem, setItem } from '@/utils/storage'
import { LANG, THEME_COLOR, DEFAULT_COLOR, VIEW_TAGS } from '@/constants'

export default {
  namespaced: true,
  state() {
    return {
      // 菜单栏是否展开
      sideBarOpen: true,
      // 国际化
      language: getItem(LANG) || 'zh',
      // 主题切换
      themeColor: getItem(THEME_COLOR) || DEFAULT_COLOR,
      // viewTags
      viewTags: getItem(VIEW_TAGS) || []
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
    },
    setViewTags(state, tags) {
      // const _tags = [...state.viewTags, tags]
      setItem(VIEW_TAGS, tags)
      state.viewTags = tags
    },
    removeRightTags(state, index) {
      const _tags = [...state.viewTags]
      _tags.splice(index + 1, state.viewTags.length)
      setItem(VIEW_TAGS, _tags)
      state.viewTags = _tags
    },
    removeOtherTags(state, index) {
      const _tags = [...state.viewTags]
      state.viewTags = _tags.splice(index, 1)
      setItem(VIEW_TAGS, state.viewTags)
    }
  }
}
