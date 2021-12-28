<!--
 * @Author: matiastang
 * @Date: 2021-12-27 16:04:38
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-27 17:13:08
 * @FilePath: /datumwealth-openalpha-front/src/views/web/product/components/dwTitle/DwTitle.vue
 * @Description: 西筹Title组件
-->
<template>
    <div class="dw-title borderBox flexColumnCenter">
        <div :class="['dw-title-title', { 'dw-title-title-selected': selected }]">{{ title }}</div>
        <div :class="['dw-title-line', { 'dw-title-line-seleted': selected }]"></div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
    /**
     * 标题
     */
    title: {
        type: String,
        default: '标题',
    },
    /**
     * 是否选择
     */
    selected: {
        type: Boolean,
        default: false,
    },
})
</script>

<style lang="scss" scoped>
.dw-title {
    width: 100%;
    .dw-title-title {
        font-size: fontSize(18px);
        @include defaultFont;
        color: $titleColor;
        line-height: 21px;
        text-align: center;
        margin: 6px 0px;
    }
    .dw-title-title-selected {
        color: $themeColor;
    }
    .dw-title-line {
        width: 54px;
        height: 4px;
        background: transparent;
        border-radius: 11px 11px 11px 11px;
    }
    .dw-title-line-seleted {
        background: $themeColor;
    }
}
</style>
