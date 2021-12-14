<!--
 * @Author: your name
 * @Date: 2021-11-05 11:33:07
 * @LastEditTime: 2021-12-14 17:37:06
 * @LastEditors: matiastang
 * @Description: In User Settings Edit
 * @FilePath: /datumwealth-openalpha-front/src/views/web/home/components/solutionCell/SolutionCell.vue
-->
<template>
    <div class="borderBox solution-cell">
        <img v-if="index === 0" class="solution-icon" src="static/home/zq-icon.svg" />
        <img v-if="index === 1" class="solution-icon" src="static/home/yh-icon.svg" />
        <img v-if="index === 2" class="solution-icon" src="static/home/dx-icon.svg" />
        <img v-if="index === 3" class="solution-icon" src="static/home/dw-icon.svg" />
        <div class="solution-cell-top-content">
            <OpenalphaTitle class="solution-cell-top" :title="data.title" :fontSize="18" />
            <div v-for="item in sceneList" :key="item" class="solution-cell-text defaultFont">
                {{ `· ${item}` }}
            </div>
        </div>
        <div class="solution-cell-details defaultFont cursorP" @click="moreAction">了解详情</div>
    </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, PropType } from 'vue'
import OpenalphaTitle from '@/components/openalphaTitle/OpenalphaTitle.vue'
import { SolutionType } from '@/common/request/modules/home/homeInterface'
import { useRouter } from 'vue-router'

export default defineComponent({
    name: 'SolutionCell',
    props: {
        data: {
            type: Object as PropType<SolutionType>,
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
        // 查看更多
        const moreAction = () => {
            router.push({
                path: `/solution/${props.index}`,
            })
        }
        return {
            sceneList,
            moreAction,
        }
    },
    components: {
        OpenalphaTitle,
    },
})
</script>

<style lang="scss" scoped>
.solution-cell {
    position: relative;
    min-width: 200px;
    min-height: 200px;
    padding: 24px 24px 18px 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    background: linear-gradient(135deg, #ffffff 0%, #fffaf8 100%);
    box-shadow: 0px 4px 10px 0px rgba(218, 218, 218, 0.5);
    border-radius: 4px;
    .solution-icon {
        position: absolute;
        width: 200px;
        height: 200px;
        right: 0px;
        bottom: 0px;
    }
    .solution-cell-top-content {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        z-index: 1;
        .solution-cell-top {
            margin-bottom: 34px;
        }
        .solution-cell-text {
            margin-bottom: 20px;
            font-size: fontSize(14px);
            color: $titleColor;
            line-height: 20px;
        }
    }
    .solution-cell-details {
        z-index: 1;
        width: 118px;
        height: 42px;
        border-radius: 4px;
        border: 1px solid $themeColor;
        font-size: fontSize(16px);
        color: $themeColor;
        line-height: 42px;
        text-align: center;
    }
}
</style>
