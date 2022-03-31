/*
 * @Author: your name
 * @Date: 2021-10-15 17:10:16
 * @LastEditTime: 2022-03-31 10:52:10
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
import _package from '../package.json'
import VConsole from 'vconsole'

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
} else {
    console.info(`当前Vue版本为${app.version}`)
    const vConsole = new VConsole()
}
const print = (key: string, value: string) =>
    console.log(
        `%c ${key} %c ${value} %c `,
        'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
        'background:rgb(65, 184, 131) ;padding: 1px; border-radius: 0 3px 3px 0;  color: #fff; font-weight: bold;',
        'background:transparent'
    )
print(_package.name, _package.version)
print('build time', `${import.meta.env.VITE_APP_BUILD_TIME}`)
