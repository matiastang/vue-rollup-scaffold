<!--
 * @Author: matiastang
 * @Date: 2022-05-09 09:48:16
 * @LastEditors: matiastang
 * @LastEditTime: 2022-05-12 17:43:39
 * @FilePath: /dw-vue-components/components/dwEcharts/src/DwEcharts.vue
 * @Description: 
-->
<template>
    <VChart class="dw-vue-echarts" ref="chart" :option="echartsOption"></VChart>
</template>

<script lang="ts">
import { defineComponent, computed, watchEffect, ref, Ref, provide, PropType } from 'vue'
// import { use } from 'echarts/core'
// import { CanvasRenderer } from 'echarts/renderers'
// import { LineChart } from 'echarts/charts'
// import {
//     GridComponent,
//     TooltipComponent,
//     MarkLineComponent,
//     MarkPointComponent,
//     VisualMapComponent,
// } from 'echarts/components'
import { ECBasicOption } from 'echarts/types/dist/shared'
import VChart, { THEME_KEY } from 'vue-echarts'

/**
 * Error: Renderer 'undefined' is not imported. Please import it first
 * zRander的registerPainter未初始化,需要在main.ts中添加use()引用
 */
// use([
//     CanvasRenderer,
//     LineChart,
//     GridComponent,
//     TooltipComponent,
//     MarkLineComponent,
//     MarkPointComponent,
//     VisualMapComponent,
// ])

export default defineComponent({
    name: 'DwEcharts',
    props: {
        /**
         * 主题（默认bright）
         * bright | bark
         */
        themeKey: {
            type: String,
            default: 'bright',
        },
        echartsOption: {
            type: Object as PropType<ECBasicOption>,
        },
    },
    setup(props, context) {
        const chart: Ref<any> = ref(null)
        // 主题
        provide(THEME_KEY, props.themeKey)
        // 监听mouseup
        watchEffect(() => {
            const chartValue = chart.value
            if (!chartValue) {
                return
            }
            chartValue.chart.getZr().on('mouseup', function (event: any) {
                // console.log('mouseup')
                chartValue.chart.dispatchAction({
                    type: 'hideTip',
                })
                if (!event.target) {
                    // MARK: - 点击在了空白处
                }
            })
        })
        const eChart = computed(() => {
            const nowChart = chart.value
            if (nowChart === null) {
                return null
            }
            return nowChart.chart
        })
        context.expose({
            eChart,
        })
        return {
            chart,
        }
    },
    components: {
        VChart,
    },
})
</script>
