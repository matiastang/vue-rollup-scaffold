<!--
 * @Author: your name
 * @Date: 2021-11-10 19:40:26
 * @LastEditTime: 2021-11-10 20:00:59
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/views/interface/components/hotCell/HotCell.vue
-->
<template>
    <div class="hot-cell borderBox flexColumnCenter">
        <div class="cell-top borderBox flexRowCenter">
            <div class="cell-icon"></div>
            <div class="cell-title defaultFont">{{ title }}</div>
        </div>
        <div
            class="cell-bottom borderBox flexColumnCenter"
            :style="{ 'border-left': `${showLine ? 0 : 1}px solid #dfdfdf` }"
        >
            <div class="cell-text textLine2 defaultFont">
                基金基本要素接口描述，基金基本要素接口描述,基金基本要素接口描述，基金素接jijin口基金...
            </div>
            <div class="cell-button cursorP defaultFont">查看接口</div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'HotCell',
    props: {
        title: {
            type: String,
            default: '名称',
        },
        count: {
            type: Number,
            default: 0,
        },
        showLine: {
            type: Boolean,
            default: false,
        },
    },
})
</script>

<style lang="scss" scoped>
.hot-cell {
    width: 100%;
    background: $themeBgColor;
    .cell-top {
        width: 100%;
        padding: 0px 15px 16px 15px;
        justify-content: flex-start;
        .cell-icon {
            width: 24px;
            height: 24px;
            background: $themeColor;
            margin-right: 6px;
        }
        .cell-title {
            font-size: 16px;
            color: $titleColor;
            line-height: 24px;
        }
    }
    .cell-bottom {
        width: 100%;
        padding: 0px 15px;
        align-items: flex-start;
        // border-left: 1px solid #dfdfdf;
        // border-right: 1px solid #dfdfdf;
        .cell-text {
            font-size: 14px;
            color: $placeholderColor;
            line-height: 20px;
            text-align: left;
            margin-bottom: 24px;
        }
        .cell-button {
            width: 118px;
            height: 42px;
            border-radius: 4px;
            border: 1px solid $themeColor;
            font-size: 16px;
            color: $themeColor;
            line-height: 42px;
        }
    }
}
</style>
