<!--
 * @Author: matiastang
 * @Date: 2021-11-11 17:58:07
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-19 11:22:29
 * @FilePath: /datumwealth-openalpha-front/src/views/web/home/components/hotLeftCell/HotLeftCell.vue
 * @Description: 首页热榜分类cell
-->
<template>
    <div class="hot-left-cell borderBox flexColumnCenter">
        <img class="hot-left-cell-img" :src="url" />
        <div class="hot-left-cell-title">{{ title || '标题' }}</div>
        <div class="hot-left-cell-text">{{ text || '副标题' }}</div>
        <div class="hot-left-cell-button defaultFont cursorP">查看全部</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'hotLeftCell',
    props: {
        id: {
            type: Number,
            default: -1,
        },
        url: {
            type: String,
            default: '',
        },
        title: {
            type: String,
            default: '',
        },
        text: {
            type: String,
            default: '',
        },
    },
})
</script>

<style lang="scss" scoped>
.hot-left-cell {
    width: 100%;
    margin: 8px;
    padding-top: 60px;
    padding-bottom: 36px;
    border-radius: 4px;
    .hot-left-cell-img {
        max-width: 120px;
        width: 100%;
        height: 120px;
        background: white;
    }
    .hot-left-cell-title {
        font-size: 26px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 34px;
        letter-spacing: 2px;
        margin: 32px 0px 18px 0px;
        text-align: center;
    }
    .hot-left-cell-text {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 20px;
        letter-spacing: 1px;
        margin-bottom: 52px;
        text-align: center;
    }
    .hot-left-cell-button {
        max-width: 118px;
        width: 100%;
        height: 42px;
        border-radius: 4px;
        border: 1px solid #ffffff;
        font-size: 16px;
        color: $themeBgColor;
        line-height: 42px;
        text-align: center;
    }
}
</style>
