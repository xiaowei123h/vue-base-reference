import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import SvgIcon from "~virtual/svg-component"

import '@/assets/styles/index.css'

import App from './App.vue'
import router from './router'
import store from './store'

import './permission'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus)
app.use(router)
app.use(store)

// 注册 SvgIcon 组件
app.component("SvgIcon", SvgIcon)

app.mount('#app')

