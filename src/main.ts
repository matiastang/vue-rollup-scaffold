/*
 * @Author: your name
 * @Date: 2021-10-15 17:10:16
 * @LastEditTime: 2022-03-21 15:07:36
 * @LastEditors: matiastang
 * @Description: In User Settings Edit
 * @FilePath: /datumwealth-front-scaffold/src/main.ts
 */
import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import { store, key } from '@/store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'
import { createPinia } from 'pinia'
import '@/pinia/customProperties'
import '@/pinia/stateProperties'
import { myPiniaPlugin } from '@/pinia/plugin'
import {
    piniaPersistedState,
    createPersistedState,
    PERSISTED_STATE_KEY,
} from '@/pinia/piniaPersistedState'
import { useAuthUserStore } from '@/pinia/useAuthUserStore'

const app = createApp(App)

// pinia

const pinia = createPinia()
console.log(PERSISTED_STATE_KEY)
// pinia.use(piniaPersistedState)
pinia.use(
    createPersistedState({
        key: 'pinia-state',
    })
)
console.log(PERSISTED_STATE_KEY)
pinia.use(myPiniaPlugin)

// 直接使用
// const main = useAuthUserStore(pinia)
// console.log(main)

app.use(pinia)

// Element-plus组件
app.use(ElementPlus, {
    locale: zhCn,
})
// 状态
app.use(store, key)
// 路由
app.use(router)
// axios
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios) // provide 'axios'
// 挂载
app.mount('#app')
if (import.meta.env.PROD) {
    console.log = () => {
        // 线上环境屏蔽log
    }
}

// console.info(`当前Vue版本为${app.version}`)
