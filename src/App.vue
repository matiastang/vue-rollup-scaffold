<!--
 * @Author: your name
 * @Date: 2021-10-15 15:54:50
 * @LastEditTime: 2021-10-29 15:54:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-scaffold/src/App.vue
-->
<template>
    <Header />
    <div id="nav">
        <router-link to="/home">Home</router-link>
        <router-link to="/">About</router-link>
    </div>
    <div class="text">{{ title ?? 'title' + obj?.name }}</div>
    <!-- 路由出口 -->
    <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '@/components/header/Header.vue'

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
    components: {
        Header: Header,
    },
    setup() {
        return {
            phone: '18380449615',
        }
    },
})
</script>

<style lang="scss" scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.text {
    background: red;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
