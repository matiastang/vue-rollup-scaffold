<!--
 * @Author: your name
 * @Date: 2021-11-11 11:31:53
 * @LastEditTime: 2021-12-21 10:07:15
 * @LastEditors: matiastang
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/views/web/solution/components/interfaceCell/InterfaceCell.vue
-->
<template>
    <div class="interface-cell borderBox cursorP flexRowCenter">
        <div
            class="
                interface-cell-content
                interface-cell-content-top
                interface-cell-content-right
                interface-cell-content-bottom
                interface-cell-content-left
                flexRowCenter
            "
        >
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
    position: relative;
    .interface-cell-content {
        width: 100%;
        box-sizing: border-box;
        padding: 16px 10px 16px 16px;
        background: $themeBgColor;
        box-shadow: 0px 4px 10px 0px rgba(218, 218, 218, 0.5);
        border-radius: 2px;
        position: relative;
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
    // .interface-cell-content:hover:after {
    //     transform: scale(1, 1);
    //     opacity: 1;
    //     transition: opacity 0.35s, transform 0.35s;
    // }
    // .interface-cell-content:hover:before {
    //     transform: scale(1, 1);
    //     opacity: 1;
    //     transition: opacity 0.35s, transform 0.35s;
    // }
    // .interface-cell-content:before {
    //     border-top: 1px solid red;
    //     border-bottom: 1px solid red;
    //     position: absolute;
    //     top: 0px;
    //     bottom: 0px;
    //     left: 0px;
    //     right: 0px;
    //     transform: scale(0, 1);
    //     content: '';
    //     opacity: 0;
    //     transition: opacity 0.35s, transform 0.35s;
    // }
    // .interface-cell-content:after {
    //     border-left: 1px solid red;
    //     border-right: 1px solid red;
    //     position: absolute;
    //     top: 0px;
    //     bottom: 0px;
    //     left: 0px;
    //     right: 0px;
    //     transform: scale(1, 0);
    //     content: '';
    //     opacity: 0;
    //     transition: opacity 0.35s, transform 0.35s;
    // }
    .interface-cell-content-top:hover:before {
        width: 100%;
        height: 100%;
        opacity: 1;
        transition: height 0.35s, width 0.35s;
    }
    .interface-cell-content-top:before {
        border-top: 1px solid red;
        border-left: 1px solid red;
        box-sizing: border-box;
        position: absolute;
        top: 0px;
        left: 0px;
        width: 0px;
        height: 0px;
        content: '';
        opacity: 0;
        transition: opacity 0.35s, transform 0.35s;
    }
    .interface-cell-content-bottom:hover:after {
        width: 100%;
        height: 100%;
        opacity: 1;
        transition: height 0.35s, width 0.35s;
    }
    .interface-cell-content-bottom:after {
        border-bottom: 1px solid red;
        border-right: 1px solid red;
        box-sizing: border-box;
        position: absolute;
        bottom: 0px;
        right: 0px;
        width: 0px;
        height: 0px;
        content: '';
        opacity: 0;
        transition: opacity 0.35s, width 0.35s;
    }
}
</style>
