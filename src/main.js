import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'

// 导入全局样式
import './styles/index.scss'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'

// 注册 svg-icons
import 'virtual:svg-icons-register'
import SvgIcon from './assets/icons'

import './permission'

// 添加全局属性插件
import globalProperties from '@/utils/filter'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

globalProperties(app)

app
  .use(router)
  .use(ElementPlus, {
    locale: store.getters.language === 'zh' ? zhCn : en
  })
  .use(SvgIcon)
  .use(store)
  .use(i18n)
  .mount('#app')
