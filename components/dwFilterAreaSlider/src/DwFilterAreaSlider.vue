<!--
 * @Author: matiastang
 * @Date: 2022-02-14 17:21:53
 * @LastEditors: matiastang
 * @LastEditTime: 2022-02-28 17:31:57
 * @FilePath: /dw-vue-components/components/dwFilterAreaSlider/src/DwFilterAreaSlider.vue
 * @Description: DwFilterAreaSlider
-->
<template>
    <div class="dw-area-slider">
        <DwFilterArea
            class="dw-area"
            :chartData="data"
            :start="start"
            :end="end"
            :bgColor="bgColor"
            :rangeColor="rangeColor"
        ></DwFilterArea>
        <DwFilterSlider
            class="dw-slider"
            :startValue="start"
            :endValue="end"
            @update:startValue="startUpdate"
            @update:endValue="endUpdate"
            :autoResize="false"
        >
            <template v-slot:greaterImg>
                <slot name="greaterImg"></slot>
            </template>
            <template v-slot:lessImg>
                <slot name="lessImg"></slot>
            </template>
        </DwFilterSlider>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DwFilterArea from '../../dwFilterArea/src/DwFilterArea.vue'
import { ChartItem } from '../../dwFilterArea/src/interface'
import DwFilterSlider from '../../dwFilterSlider/src/DwFilterSlider.vue'

export default defineComponent({
    name: 'DwFilterAreaSlider',
    props: {
        /**
         * 图谱数据
         */
        data: {
            type: Array as () => ChartItem[],
            default: () => [
                { data: 0, number: 3727 },
                { data: 1, number: 2746 },
                { data: 2, number: 1674 },
                { data: 3, number: 1160 },
                { data: 4, number: 1169 },
                { data: 5, number: 1394 },
                { data: 6, number: 1022 },
                { data: 7, number: 483 },
                { data: 8, number: 362 },
                { data: 9, number: -261 },
                { data: 10, number: 168 },
                { data: 11, number: 156 },
                { data: 12, number: 142 },
                { data: 13, number: 112 },
                { data: 14, number: 59 },
                { data: 15, number: 97 },
            ],
        },
        /**
         * 开始位置, 当小于0时表示固定最小值为0
         */
        start: {
            type: Number,
            default: Number.MIN_SAFE_INTEGER,
        },
        /**
         * 结束位置, 当大于100时表示固定最大值为100
         */
        end: {
            type: Number,
            default: Number.MAX_SAFE_INTEGER,
        },
        /**
         * 背景颜色
         */
        bgColor: {
            type: String,
            default: '#f7f7f7',
        },
        /**
         * 选择范围颜色
         */
        rangeColor: {
            type: String,
            default: '#FFECE0',
        },
        /**
         * 选择范围颜色
         */
        trunc: {
            type: Boolean,
            default: false,
        },
    },
    emits: {
        /**
         * 更新开始位置
         */
        'update:start': (value: number) => {
            return true
        },
        /**
         * 更新结束位置
         */
        'update:end': (value: number) => {
            return true
        },
    },
    setup(props, context) {
        const startUpdate = (value: number) => {
            context.emit('update:start', props.trunc ? Math.round(value) : value)
        }
        const endUpdate = (value: number) => {
            context.emit('update:end', props.trunc ? Math.round(value) : value)
        }
        return {
            startUpdate,
            endUpdate,
        }
    },
    components: {
        DwFilterArea,
        DwFilterSlider,
    },
})
</script>

<style lang="scss" scoped>
.dw-area-slider {
    width: 100%;
    .dw-area {
        width: 100%;
        padding: 0rem 1.4rem;
        box-sizing: border-box;
    }
    .dw-slider {
        width: 100%;
        padding: 0rem 1.4rem 1.4rem 1.4rem;
        box-sizing: border-box;
    }
}
</style>
