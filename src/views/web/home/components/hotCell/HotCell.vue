<!--
 * @Author: matiastang
 * @Date: 2021-11-11 17:58:07
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-19 11:40:27
 * @FilePath: /datumwealth-openalpha-front/src/views/web/home/components/hotCell/HotCell.vue
 * @Description: 热榜接口cell
-->
<template>
    <div class="hot-cell borderBox flexColumnCenter">
        <div class="hot-cell-top borderBox flexColumnCenter">
            <img class="hot-cell-img" :src="data.apiHomeRecoIcon" />
            <div class="hot-cell-title">{{ data.apiHomeRecoDesc || '标题' }}</div>
            <div
                v-for="item in getText(data.apiHomeRecoPopularText || '')"
                :key="item"
                class="hot-cell-text defaultFont"
            >
                {{ item || '副标题' }}
            </div>
            <div class="hot-cell-text defaultFont">...</div>
        </div>
        <div class="hot-cell-value">{{ `$${data.apiPrice}/次` }}</div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
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
    setup() {
        const getText = (homeText: string) => {
            return homeText.split('，')
        }
        return {
            getText,
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
    .hot-cell-top {
        .hot-cell-img {
            max-width: 54px;
            width: 100%;
            height: 54px;
            background: $themeColor;
        }
        .hot-cell-title {
            font-size: 18px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: $titleColor;
            line-height: 26px;
            letter-spacing: 1px;
            text-align: center;
            margin: 27px 0px 18px 0px;
        }
        .hot-cell-text {
            font-size: 14px;
            color: $placeholderColor;
            line-height: 20px;
            text-align: center;
            margin-bottom: 16px;
        }
    }
    .hot-cell-value {
        width: 100%;
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: $themeColor;
        line-height: 26px;
        letter-spacing: 1px;
        text-align: center;
    }
}
</style>
