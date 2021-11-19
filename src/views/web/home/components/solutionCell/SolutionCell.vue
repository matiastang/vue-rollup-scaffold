<!--
 * @Author: your name
 * @Date: 2021-11-05 11:33:07
 * @LastEditTime: 2021-11-19 14:23:48
 * @LastEditors: matiastang
 * @Description: In User Settings Edit
 * @FilePath: /datumwealth-openalpha-front/src/views/web/home/components/solutionCell/SolutionCell.vue
-->
<template>
    <div class="borderBox solution-cell">
        <div class="solution-cell-top-content">
            <OpenalphaTitle class="solution-cell-top" :title="data.title" :fontSize="18" />
            <div v-for="item in sceneList" :key="item" class="solution-cell-text defaultFont">
                {{ `· ${item}` }}
            </div>
        </div>
        <div class="solution-cell-details defaultFont cursorP">了解详情</div>
    </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, PropType } from 'vue'
import OpenalphaTitle from '@/components/openalphaTitle/OpenalphaTitle.vue'
import { SolutionType } from '@/common/request/modules/home/homeInterface'

export default defineComponent({
    name: 'SolutionCell',
    props: {
        data: {
            type: Object as PropType<SolutionType>,
            default: () => {
                return {}
            },
        },
    },
    setup(props) {
        // 应用场景列表
        const sceneList: ComputedRef<string[]> = computed(() => {
            try {
                let arr = JSON.parse(props.data.scenario)
                return arr
                    .map((item: { title: string }) => {
                        return item.title
                    })
                    .filter((item: string, index: number) => {
                        return index <= 3
                    })
            } catch (error) {
                return []
            }
        })
        return {
            sceneList,
        }
    },
    components: {
        OpenalphaTitle,
    },
})
</script>

<style lang="scss" scoped>
.solution-cell {
    padding: 24px 24px 18px 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    background: linear-gradient(135deg, #ffffff 0%, #fffaf8 100%);
    box-shadow: 0px 4px 10px 0px rgba(218, 218, 218, 0.5);
    border-radius: 4px;
    .solution-cell-top-content {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        .solution-cell-top {
            margin-bottom: 34px;
        }
        .solution-cell-text {
            margin-bottom: 20px;
            font-size: 14px;
            color: $titleColor;
            line-height: 20px;
        }
    }
    .solution-cell-details {
        width: 118px;
        height: 42px;
        border-radius: 4px;
        border: 1px solid $themeColor;
        font-size: 16px;
        color: $themeColor;
        line-height: 42px;
        text-align: center;
    }
}
</style>
