<!--
 * @Author: matiastang
 * @Date: 2021-11-11 17:58:07
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-23 17:34:51
 * @FilePath: /datumwealth-openalpha-front/src/views/web/interface/components/hotCell/HotCell.vue
 * @Description: 接口列表热榜cell
-->
<template>
    <div class="hot-cell borderBox flexColumnCenter">
        <div class="cell-top borderBox flexRowCenter">
            <!-- <img class="cell-icon" :src="url" /> -->
            <svg class="icon cell-icon" aria-hidden="true">
                <use :xlink:href="`#${url}`"></use>
            </svg>
            <div class="cell-title defaultFont">{{ title || '-' }}</div>
        </div>
        <div
            class="cell-bottom borderBox flexColumnCenter"
            :style="{ 'border-left': `${showLine ? 0 : 1}px solid #dfdfdf` }"
        >
            <div class="cell-text textLine2 defaultFont">{{ text || '-' }}</div>
            <div class="cell-button cursorP defaultFont" @click="clickAction">查看接口</div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { interface_id_check } from 'utils/check/index'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

export default defineComponent({
    name: 'HotCell',
    props: {
        url: {
            type: String,
            default: '',
        },
        title: {
            type: String,
            default: '-',
        },
        text: {
            type: String,
            default: '-',
        },
        id: {
            type: Number,
            default: -1,
        },
        showLine: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const router = useRouter()
        const clickAction = () => {
            if (interface_id_check(props.id)) {
                router.push({
                    path: `/interface/info/${props.id}`,
                })
            } else {
                ElMessage({
                    message: '接口id错误',
                    type: 'error',
                })
            }
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
