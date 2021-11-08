<!--
 * @Author: your name
 * @Date: 2021-10-15 15:54:50
 * @LastEditTime: 2021-11-08 16:12:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-scaffold/src/App.vue
-->
<template>
    <!-- 路由出口 -->
    <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

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
        return {
            phone: '18380449615',
        }
    },
})
</script>

<style lang="scss" scoped></style>
