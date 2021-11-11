<!--
 * @Author: matiastang
 * @Date: 2021-11-10 19:40:26
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-11 14:50:43
 * @FilePath: /datumwealth-openalpha-front/src/views/interface/components/hotCell/HotCell.vue
 * @Description: 热榜cell
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
            <div class="cell-text textLine2 defaultFont">{{ text }}</div>
            <div class="cell-button cursorP defaultFont" @click="clickAction(id)">查看接口</div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { interface_id_check } from 'utils/check/index'

export default defineComponent({
    name: 'HotCell',
    props: {
        title: {
            type: String,
            default: '名称',
        },
        text: {
            type: String,
            default:
                '基金基本要素接口描述，基金基本要素接口描述,基金基本要素接口描述，基金基本要素接口描述，基金基本要素接口描述',
        },
        id: {
            type: String,
            default: '',
        },
        showLine: {
            type: Boolean,
            default: false,
        },
    },
    emits: {
        /**
         * 查看接口
         */
        onClick: (id: string) => {
            return interface_id_check(id)
        },
    },
    setup(props, context) {
        const clickAction = (id: string) => {
            context.emit('onClick', id)
        }
        return {
            clickAction,
        }
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
