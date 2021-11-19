<!--
 * @Author: matiastang
 * @Date: 2021-11-11 17:58:07
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-19 12:07:34
 * @FilePath: /datumwealth-openalpha-front/src/views/web/home/components/hot/Hot.vue
 * @Description: 首页热榜cell
-->
<template>
    <div class="borderBox flexRowCenter hot">
        <HotLeftCell
            class="hot-cell"
            :id="data.categoryId"
            :url="data.homeRecoIcon"
            :title="data.categoryName"
            :text="data.categoryDescribe"
            :style="{
                background: getBackground(data.categoryName),
            }"
        />
        <HotCell
            class="hot-cell"
            v-for="item in firstApi(data.apiInfoList)"
            :key="item.title"
            :data="item"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue'
import HotLeftCell from '../hotLeftCell/HotLeftCell.vue'
import HotCell from '../hotCell/HotCell.vue'
import { HotType, ApiInfoType } from '@/common/request/modules/home/homeInterface'

export default defineComponent({
    name: 'HomeHot',
    props: {
        data: {
            type: Object as PropType<HotType>,
            default: () => {
                return {}
            },
        },
    },
    setup() {
        // 背景
        const backgroundColors = reactive([
            {
                title: '基金基本信息',
                value: 'linear-gradient(#F8642A, #FDA668)',
            },
            {
                title: '基金净值',
                value: 'linear-gradient(#F49D12, #FFC67A)',
            },
            {
                title: '基金业绩表现',
                value: 'linear-gradient(#F1343A, #FA7377)',
            },
            {
                title: '基金投资组合',
                value: 'linear-gradient(#3785F9, #7AB0FF)',
            },
            {
                title: '基金财务数据',
                value: 'linear-gradient(#12BAF5, #6ADBFF)',
            },
            {
                title: '基金风险',
                value: 'linear-gradient(#EF1E51, #FF6D88)',
            },
            {
                title: '基金业绩归因',
                value: 'linear-gradient(#9233F9, #BF84FF)',
            },
        ])
        const getBackground = (name: string) => {
            for (let i = 0; i < backgroundColors.length; i++) {
                if (backgroundColors[i].title === name) {
                    return backgroundColors[i].value
                }
            }
            return 'linear-gradient(#F8642A, #FDA668)'
        }
        // 前四条数据
        const firstApi = (list: ApiInfoType[]) => {
            if (list.length > 4) {
                return list.slice(0, 4)
            }
            return list
        }
        return {
            getBackground,
            firstApi,
        }
    },
    components: {
        HotLeftCell,
        HotCell,
    },
})
</script>

<style lang="scss" scoped>
.hot {
    width: 100%;
    justify-content: flex-start !important;
    align-items: stretch !important;
    .hot-cell {
        width: calc(20% - 16px);
        flex-grow: 0;
        flex-shrink: 0;
    }
}
</style>
