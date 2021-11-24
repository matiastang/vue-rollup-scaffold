<!--
 * @Author: your name
 * @Date: 2021-11-04 19:27:28
 * @LastEditTime: 2021-11-19 19:06:10
 * @LastEditors: matiastang
 * @Description: In User Settings Edit
 * @FilePath: /datumwealth-openalpha-front/src/views/web/home/components/collapseCell/CollapseCell.vue
-->
<template>
    <div :class="['borderBox', 'collapse-cell', { 'collapse-cell-selected': selected }]">
        <!-- @mouseover="mouseoverAction"
        @mouseout="mouseoutAction" -->
        <div class="collapse-cell-left">
            <svg class="icon collapse-cell-left-icon" aria-hidden="true">
                <use :xlink:href="`#${url}`"></use>
                <!-- <use :xlink:href="`#icon-jijinzhaiquantouzi-guijinshuchicangmingxi`"></use> -->
            </svg>
            <div class="flexColumnCenter collapse-cell-center">
                <div class="collapse-cell-title defaultFont">{{ title }}</div>
                <div class="collapse-cell-text textLine1 defaultFont">{{ text }}</div>
            </div>
        </div>
        <img
            class="collapse-cell-right-icon"
            :src="selected ? 'static/api/category_on.svg' : 'static/api/category_off.svg'"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'CollapseCell',
    props: {
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
        selected: {
            type: Boolean,
            default: false,
        },
    },
})
// setup() {
//         const isMouse = ref(false)
//         const mouseoverAction = () => {
//             isMouse.value = true
//         }
//         const mouseoutAction = () => {
//             isMouse.value = false
//         }
//         return {
//             isMouse,
//             mouseoverAction,
//             mouseoutAction,
//         }
//     },
</script>

<style lang="scss" scoped>
.collapse-cell {
    padding: 12px 17px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: $themeColor;
    .collapse-cell-left {
        display: flex;
        align-items: flex-start;
        .collapse-cell-left-icon {
            width: 20px;
            height: 20px;
            color: white;
        }

        .collapse-cell-center {
            align-items: flex-start;
            margin-left: 18px;
            .collapse-cell-title {
                font-size: fontSize(18px);
                font-weight: 500;
                color: $themeBgColor;
                line-height: lineHeight(18px);
                text-align: left;
            }
            .collapse-cell-text {
                font-size: fontSize(14px);
                color: $themeBgColor;
                line-height: lineHeight(14px);
                text-align: left;
            }
        }
    }
    .collapse-cell-right-icon {
        width: 16px;
        height: 16px;
        margin-top: 4px;
    }
}
.collapse-cell-selected,
.collapse-cell:hover {
    background: $themeBgColor;
    .collapse-cell-left {
        .collapse-cell-left-icon {
            color: $themeColor;
        }
        .collapse-cell-center {
            .collapse-cell-title {
                color: $themeColor;
            }
            .collapse-cell-text {
                color: $titleColor;
            }
        }
    }
}
</style>
