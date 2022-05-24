<!--
 * @Author: your name
 * @Date: 2021-10-15 15:54:50
 * @LastEditTime: 2022-05-24 09:49:30
 * @LastEditors: matiastang
 * @Description: In User Settings Edit
 * @FilePath: /vue-front-scaffold/src/test/App.vue
-->
<template>
    <div class="theme-title">{{ title }}</div>
    <!-- rulerColor="red" -->
    <DwFilterRuler></DwFilterRuler>
    <!-- 路由出口 -->
    <!-- <router-view></router-view> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import DwFilterRuler from '../components/dwFilterRuler'
import DwFilterRuler from '../../matias/dwFilterRuler.js'
// import '../../matias/css/dwFilterRuler/index.css'

export default defineComponent({
    data() {
        return {
            title: '样式测试1',
        }
    },
    setup() {
        return {}
    },
    components: {
        DwFilterRuler,
    },
})
</script>

<style lang="scss" scoped>
.title-test {
    color: var(--themecolor);
}
</style>
