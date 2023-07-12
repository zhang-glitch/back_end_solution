import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 导入全局样式
import './styles/index.scss'
import App from './App.vue'
import router from './router'
import store from './store'

// 注册 svg-icons
import 'virtual:svg-icons-register'
import SvgIcon from './assets/icons'

import './permission'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router).use(ElementPlus).use(SvgIcon).use(store).mount('#app')
