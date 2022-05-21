<!--
 * @Author: your name
 * @Date: 2021-10-15 15:54:50
 * @LastEditTime: 2022-05-21 17:03:50
 * @LastEditors: matiastang
 * @Description: In User Settings Edit
 * @FilePath: /vue-front-scaffold/src/test/App.vue
-->
<template>
    <div class="theme-title">{{ title }}</div>
    <!-- 路由出口 -->
    <!-- <router-view></router-view> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            title: '样式测试',
        }
    },
    setup() {
        return {}
    },
})
</script>

<style lang="scss" scoped>
.title-test {
    color: var(--themecolor);
}
</style>
