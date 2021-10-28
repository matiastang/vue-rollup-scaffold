/*
 * @Author: your name
 * @Date: 2021-10-15 17:10:16
 * @LastEditTime: 2021-10-28 11:37:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-scaffold/src/main.ts
 */
import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

const app = createApp(App)
// 状态
app.use(store)
// 路由
app.use(router)
// 挂载
app.mount('#app')

// const version = Number(app.version.split('.')[0])
console.log(`当前Vue版本为${app.version}`)
