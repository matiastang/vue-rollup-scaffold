/*
 * @Author: matiastang
 * @Date: 2022-02-09 15:30:53
 * @LastEditors: matiastang
 * @LastEditTime: 2022-02-10 10:24:42
 * @FilePath: /datumwealth-front-scaffold/src/pinia/useAuthUserStore.ts
 * @Description: 用户权限store
 */
import { defineStore } from 'pinia'

interface State {
    name: string
    age: string
    user: {
        name: string
        age: number
        phone: string
    }
}

export const useAuthUserStore = defineStore('auth/user', {
    state: (): State => ({
        name: 'name',
        age: 'age',
        user: {
            name: 'tdy',
            age: 29,
            phone: '18380449615',
        },
    }),
    actions: {
        setName(name: string) {
            this.name = name
        },
    },
})
