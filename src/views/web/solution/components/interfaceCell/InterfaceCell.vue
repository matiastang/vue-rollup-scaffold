<!--
 * @Author: your name
 * @Date: 2021-11-11 11:31:53
 * @LastEditTime: 2021-12-08 10:41:59
 * @LastEditors: matiastang
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/views/web/solution/components/interfaceCell/InterfaceCell.vue
-->
<template>
    <div class="interface-cell borderBox cursorP flexRowCenter">
        <div class="interface-cell-content flexRowCenter">
            <svg class="icon cell-icon" aria-hidden="true">
                <use :xlink:href="`#${url}`"></use>
            </svg>
            <div class="cell-content flexColumnCenter">
                <div class="cell-title textLine1">{{ title }}</div>
                <div class="cell-text defaultFont textLine1">{{ text }}</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'InterfaceCell',
    props: {
        title: {
            type: String,
            default: '名称',
        },
        text: {
            type: String,
            default: '描述',
        },
        url: {
            type: String,
            default: '',
        },
    },
})
</script>

<style lang="scss" scoped>
.interface-cell {
    width: 100%;
    padding: 8px;
    .interface-cell-content {
        width: 100%;
        padding: 16px 10px 16px 16px;
        background: $themeBgColor;
        box-shadow: 0px 4px 10px 0px rgba(218, 218, 218, 0.5);
        border-radius: 2px;
        .cell-icon {
            width: 48px;
            height: 48px;
            color: $themeColor;
            flex-shrink: 0;
        }
        .cell-content {
            width: calc(100% - 57px);
            justify-content: space-between;
            align-items: flex-start;
            margin-left: 9px;
            .cell-title {
                width: 100%;
                font-size: fontSize(16px);
                @include defaultFontMedium;
                color: $titleColor;
                line-height: 24px;
                text-align: left;
            }
            .cell-text {
                width: 100%;
                font-size: fontSize(14px);
                color: #595959;
                line-height: 20px;
                text-align: left;
                margin-top: 4px;
            }
        }
    }
}
</style>
