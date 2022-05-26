<!--
 * @Author: your name
 * @Date: 2021-10-15 15:54:50
 * @LastEditTime: 2022-05-25 16:42:57
 * @LastEditors: matiastang
 * @Description: In User Settings Edit
 * @FilePath: /vue-rollup-scaffold/src/test/App.vue
-->
<template>
    <div class="theme-title">{{ title }}</div>
    <!-- rulerColor="red" -->
    <DwFilterRuler></DwFilterRuler>
    <SVGDOM></SVGDOM>
    <GLPointColor></GLPointColor>
    <!-- 路由出口 -->
    <!-- <router-view></router-view> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import DwFilterRuler from '../components/dwFilterRuler'
// import DwFilterRuler from '../../matias/dwFilterRuler.js'
import DwFilterRuler from 'root/dist_1.2.0/index.es.js'
import 'root/dist_1.2.0/dwFilterRuler/index.css'
import SVGDOM from './svg/svgdom/SVGDOM.vue'
import GLPointColor from './WebGL/components/glsl/GLPointColor.vue'

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
        SVGDOM,
        GLPointColor,
    },
})
</script>

<style lang="scss" scoped>
.title-test {
    color: var(--themecolor);
}
</style>
