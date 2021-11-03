/*
 * @Author: your name
 * @Date: 2021-10-15 17:10:16
 * @LastEditTime: 2021-11-03 19:58:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-scaffold/src/main.ts
 */
import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

// Element-plus组件
app.use(ElementPlus)
// 状态
app.use(store)
// 路由
app.use(router)
// 挂载
app.mount('#app')

console.log(`当前Vue版本为${app.version}`)
