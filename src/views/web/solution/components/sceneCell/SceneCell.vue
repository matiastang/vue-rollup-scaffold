<!--
 * @Author: your name
 * @Date: 2021-11-11 11:15:40
 * @LastEditTime: 2021-11-30 15:29:35
 * @LastEditors: matiastang
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/views/web/solution/components/sceneCell/SceneCell.vue
-->
<template>
    <div class="scene-cell borderBox flexColumnCenter">
        <div class="scene-cell-title">{{ title }}</div>
        <div class="scene-cell-text defaultFont">{{ text }}</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'SceneCell',
    props: {
        title: {
            type: String,
            default: '标题',
        },
        text: {
            type: String,
            default: '简介',
        },
    },
})
</script>

<style lang="scss" scoped>
.scene-cell {
    width: 100%;
    padding: 24px;
    background: $themeColor;
    justify-content: flex-start !important;
    align-items: flex-start !important;
    .scene-cell-title {
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: $themeBgColor;
        line-height: 26px;
        letter-spacing: 1px;
        text-align: left;
    }
    .scene-cell-text {
        font-size: 14px;
        color: $themeBgColor;
        line-height: 20px;
        text-align: left;
    }
}
</style>
