<!--
 * @Author: matiastang
 * @Date: 2021-11-11 17:58:07
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-21 10:18:00
 * @FilePath: /datumwealth-openalpha-front/src/views/web/home/components/hotCell/HotCell.vue
 * @Description: 热榜接口cell
-->
<template>
    <div class="hot-cell borderBox flexColumnCenter">
        <div class="hot-cell-top borderBox flexColumnCenter">
            <svg class="icon hot-cell-img" aria-hidden="true">
                <use :xlink:href="`#${data.listRecoIcon}`"></use>
            </svg>
            <div class="hot-cell-title">{{ data.apiName || '标题' }}</div>
            <div v-for="item in texts" :key="item" class="hot-cell-text defaultFont">
                {{ item || '副标题' }}
            </div>
            <div class="hot-cell-text defaultFont">...</div>
        </div>
        <div class="hot-cell-value">{{ `￥${data.apiPrice}/次` }}</div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef, PropType } from 'vue'
import { ApiInfoType } from '@/common/request/modules/home/homeInterface'

export default defineComponent({
    name: 'hotCell',
    props: {
        data: {
            type: Object as PropType<ApiInfoType>,
            default: () => {
                return {}
            },
        },
    },
    setup(props) {
        const texts: ComputedRef<string[]> = computed(() => {
            let text = props.data.apiHomeRecoPopularText
            if (text) {
                return text.split('，')
            }
            return []
        })
        return {
            texts,
        }
    },
})
</script>

<style lang="scss" scoped>
.hot-cell {
    width: 100%;
    margin: 8px;
    padding-top: 33px;
    padding-bottom: 36px;
    background: $themeBgColor;
    box-shadow: 0px 4px 10px 0px rgba(218, 218, 218, 0.5);
    border-radius: 4px;
    justify-content: space-between !important;
    cursor: pointer;
    .hot-cell-top {
        .hot-cell-img {
            max-width: 54px;
            width: 100%;
            height: 54px;
            color: #333333;
        }
        .hot-cell-title {
            font-size: fontSize(18px);
            @include defaultFontMedium;
            color: $titleColor;
            line-height: 26px;
            text-align: center;
            margin: 27px 0px 18px 0px;
            padding: 0px 12px;
        }
        .hot-cell-text {
            font-size: fontSize(14px);
            color: $placeholderColor;
            line-height: 20px;
            text-align: center;
            margin-bottom: 16px;
            padding: 0px 12px;
        }
    }
    .hot-cell-value {
        width: 100%;
        font-size: fontSize(18px);
        @include defaultFontMedium;
        color: $themeColor;
        line-height: 26px;
        text-align: center;
    }
}
</style>
