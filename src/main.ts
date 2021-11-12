/*
 * @Author: your name
 * @Date: 2021-10-15 17:10:16
 * @LastEditTime: 2021-11-12 14:09:37
 * @LastEditors: matiastang
 * @Description: In User Settings Edit
 * @FilePath: /datumwealth-openalpha-front/src/main.ts
 */
import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import { store, key } from '@/store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementPlus from 'element-plus'
import '@/common/css/index.css'

const app = createApp(App)

// Element-plus组件
app.use(ElementPlus)
// 状态
app.use(store, key)
// 路由
app.use(router)
// axios
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios) // provide 'axios'
// 挂载
app.mount('#app')

console.log(`当前Vue版本为${app.version}`)
