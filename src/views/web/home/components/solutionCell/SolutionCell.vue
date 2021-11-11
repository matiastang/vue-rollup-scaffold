<!--
 * @Author: your name
 * @Date: 2021-11-05 11:33:07
 * @LastEditTime: 2021-11-11 10:43:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /datumwealth-openalpha-front/src/views/home/components/solutionCell/solutionCell.vue
-->
<template>
    <div class="borderBox solution-cell">
        <div class="solution-cell-top-content">
            <OpenalphaTitle class="solution-cell-top" :title="data.title" :fontSize="18" />
            <div v-for="item in data.data" :key="item.text" class="solution-cell-text defaultFont">
                {{ item.text }}
            </div>
        </div>
        <div class="solution-cell-details defaultFont cursorP">了解详情</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import OpenalphaTitle from '@/components/openalphaTitle/OpenalphaTitle.vue'

export default defineComponent({
    name: 'SolutionCell',
    props: ['data'],
    data() {
        return {}
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
