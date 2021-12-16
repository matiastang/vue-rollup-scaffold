<!--
 * @Author: your name
 * @Date: 2021-10-15 15:54:50
 * @LastEditTime: 2021-12-02 16:51:34
 * @LastEditors: matiastang
 * @Description: In User Settings Edit
 * @FilePath: /datumwealth-openalpha-front/src/App.vue
-->
<template>
    <!-- 路由出口 -->
    <router-view></router-view>
</template>

<script lang="ts">
import _package from '../package.json'
import { defineComponent } from 'vue'
import config from '../loadenv'
interface Obj {
    name?: string
    age?: number
}

interface App {
    title?: string
    obj: Obj
}

export default defineComponent({
    data() {
        return {
            title: undefined,
            obj: {
                name: 'matiastang',
                age: undefined,
            },
        } as App
    },
    setup() {
        const print = (key: string, value: string) =>
            console.log(
                `%c ${key} %c ${value} %c `,
                'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
                'background:rgb(65, 184, 131) ;padding: 1px; border-radius: 0 3px 3px 0;  color: #fff; font-weight: bold;',
                'background:transparent'
            )
        print(_package.name, _package.version)
        print('build time', `${import.meta.env.VITE_APP_BUILD_TIME}`)
        return {
            phone: '18380449615',
        }
    },
})
</script>

<style lang="scss" scoped></style>
