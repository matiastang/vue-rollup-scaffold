<!--
 * @Author: your name
 * @Date: 2021-11-04 19:27:28
 * @LastEditTime: 2021-11-04 20:14:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /datumwealth-openalpha-front/src/views/home/components/collapseCell/CollapseCell.vue
-->
<template>
    <div class="borderBox collapse-cell">
        <div class="collapse-cell-left">
            <img class="collapse-cell-left-icon" />
            <div class="flexColumnCenter collapse-cell-center">
                <div class="collapse-cell-title defaultFont">{{ title }}</div>
                <div class="collapse-cell-text defaultFont">{{ text }}</div>
            </div>
        </div>
        <img class="collapse-cell-right-icon" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CollapseCell',
    props: ['title', 'text'],
    data() {
        return {
            autoplay: {
                disableOnInteraction: false,
                delay: 5000,
            },
            pagination: {
                clickable: true,
            },
        }
    },
})
</script>

<style lang="scss" scoped>
.collapse-cell {
    padding: 12px 17px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    background: $themeColor;
    .collapse-cell-left {
        display: flex;
        align-items: flex-start;
        .collapse-cell-left-icon {
            width: 16px;
            height: 16px;
            margin-top: 4px;
            background: $themeBgColor;
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
        background: $themeBgColor;
    }
}
.collapse-cell:hover {
    background: $themeBgColor;
    .collapse-cell-left {
        .collapse-cell-left-icon {
            background: $themeColor;
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
    .collapse-cell-right-icon {
        background: $themeColor;
    }
}
</style>
