<!--
 * @Author: matiastang
 * @Date: 2021-11-11 17:58:07
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-10 16:03:29
 * @FilePath: /datumwealth-openalpha-front/src/views/web/home/components/hot/Hot.vue
 * @Description: 首页热榜cell
-->
<template>
    <div class="borderBox flexRowCenter hot">
        <HotLeftCell
            class="hot-cell"
            :id="data.categoryId"
            :url="data.categoryIconUrl"
            :title="data.categoryName"
            :text="data.categoryDescribe"
            :style="{
                background: background,
            }"
        />
        <HotCell
            class="hot-cell"
            v-for="item in apiList"
            :key="item.title"
            :data="item"
            @click="apiAction(item.apiInfoId)"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef, PropType, reactive } from 'vue'
import HotLeftCell from '../hotLeftCell/HotLeftCell.vue'
import HotCell from '../hotCell/HotCell.vue'
import { HotType, ApiInfoType } from '@/common/request/modules/home/homeInterface'
import { useRouter } from 'vue-router'
import { interface_id_check } from 'utils/check/interfaceCheck'
import ElMessage from '@/common/utils/message'

export default defineComponent({
    name: 'HomeHot',
    props: {
        data: {
            type: Object as PropType<HotType>,
            default: () => {
                return {}
            },
        },
        index: {
            type: Number,
            default: 0,
        },
    },
    setup(props) {
        const router = useRouter()
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
        // 获取当前背景
        const background: ComputedRef<string> = computed(() => {
            // for (let i = 0; i < backgroundColors.length; i++) {
            //     if (backgroundColors[i].title === props.data.categoryName) {
            //         return backgroundColors[i].value
            //     }
            // }
            // return 'linear-gradient(#F8642A, #FDA668)'
            for (let i = 0; i < backgroundColors.length; i++) {
                if (i === props.index) {
                    return backgroundColors[i].value
                }
            }
            return 'linear-gradient(#F8642A, #FDA668)'
        })
        // 前四条数据
        const apiList: ComputedRef<ApiInfoType[]> = computed(() => {
            let list = props.data.apiInfoList
            if (list.length > 4) {
                return list.slice(0, 4)
            }
            return list
        })
        // 跳转接口详情
        const apiAction = (id: number) => {
            if (interface_id_check(id)) {
                router.push({
                    path: `/interface/info/${id}`,
                })
                return
            }
            ElMessage({
                message: '接口id错误',
                type: 'error',
            })
        }
        return {
            background,
            apiList,
            apiAction,
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
