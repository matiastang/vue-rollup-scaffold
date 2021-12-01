/*
 * @Author: matiastang
 * @Date: 2021-11-01 17:46:01
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-12 17:14:46
 * @FilePath: /datumwealth-openalpha-front/src/store/index.ts
 * @Description: 全局状态管理
 */
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { RootStateTypes, AllStateTypes } from './indexInterface'
// 用户信息
import userModule from './modules/userModule/userModule'
import invModule from '@/views/user/dealManagement/_store'

// key
export const key: InjectionKey<Store<RootStateTypes>> = Symbol()

export const store = createStore<RootStateTypes>({
    mutations: {},
    actions: {},
    modules: {
        userModule,
        invModule,
    },
    plugins: [createPersistedState()],
})

// 定义自己的 `useStore` 组合式函数
export function useStore() {
    return baseUseStore<AllStateTypes>(key)
}
