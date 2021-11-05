<!--
 * @Author: your name
 * @Date: 2021-11-05 12:11:39
 * @LastEditTime: 2021-11-05 13:47:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /datumwealth-openalpha-front/src/views/home/components/homeTitle/HomeTitle.vue
-->
<template>
    <div class="home-title borderBox flexColumnCenter">
        <div class="home-title-title">{{ data || '标题' }}</div>
        <div class="home-title-line"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'HomeTitle',
    props: ['data'],
    data() {
        return {}
    },
})
</script>

<style lang="scss" scoped>
.home-title {
    width: 100%;
    .home-title-title {
        font-size: 30px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #262626;
        line-height: 40px;
        letter-spacing: 2px;
        text-align: center;
    }
    .home-title-line {
        width: 76px;
        height: 4px;
        background: $themeColor;
        border-radius: 2px;
        margin: 6px 0px 30px 0px;
    }
}
</style>
