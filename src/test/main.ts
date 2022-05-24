/*
 * @Author: your name
 * @Date: 2021-10-15 17:10:16
 * @LastEditTime: 2022-05-23 17:50:35
 * @LastEditors: matiastang
 * @Description: In User Settings Edit
 * @FilePath: /vue-front-scaffold/src/test/main.ts
 */
import { createApp } from 'vue'
import App from './App.vue'
// 默认主题（如果是其他预编译样式可以配置vite默认导入）
import '@/common/themes/default.css'

const app = createApp(App)
// 挂载
app.mount('#app')
