<!--
 * @Author: matiastang
 * @Date: 2022-01-12 16:39:19
 * @LastEditors: matiastang
 * @LastEditTime: 2022-05-19 13:26:59
 * @FilePath: /dw-vue-components/components/dwPortfolioPie/src/DwPortfolioPie.vue
 * @Description: 西筹“基金组合”结果页，行业占比饼图
-->
<template>
    <div class="dw-portfolio-pie">
        <VChart class="dw-portfolio-chart" :option="echartsOption" :style="chartStyle" />
    </div>
</template>

<script lang="ts">
import { defineComponent, provide, computed } from 'vue'
// import { use } from 'echarts/core'
// import { CanvasRenderer } from 'echarts/renderers'
// import { PieChart } from 'echarts/charts'
// import {
//     GridComponent,
//     LegendComponent,
//     TooltipComponent,
//     MarkLineComponent,
//     MarkPointComponent,
// } from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
import { PieBondStockData } from '../../dwPortfolioTypes'

// use([
//     CanvasRenderer,
//     PieChart,
//     GridComponent,
//     LegendComponent,
//     TooltipComponent,
//     MarkLineComponent,
//     MarkPointComponent,
// ])

// export type PieBondStockData = {
//     value: number
//     name: string
// }

export default defineComponent({
    name: 'DwPortfolioPie',
    props: {
        /**
         * 标题
         */
        title: {
            type: String,
            default: '行业占比',
        },
        /**
         * 主题
         */
        themeKey: {
            type: String,
            default: 'bright', // 'bark'
        },
        /**
         * 图谱数据
         */
        data: {
            type: Array as () => PieBondStockData[],
            default: () => {
                // return [
                //     { value: 0.2503, name: '股票' },
                //     { value: 0.7497, name: '债券' },
                // ]
                return [
                    { value: 0.1686, name: '金融' },
                    { value: 0.1599, name: 'TMT' },
                    { value: 0.2529, name: '消费' },
                    { value: 0.0421, name: '周期上游' },
                    { value: 0.0813, name: '周期中游' },
                    { value: 0.1452, name: '周期下游' },
                    { value: 0.0917, name: '公共事业' },
                    { value: 0.0584, name: '医药生物' },
                ]
            },
        },
        /**
         * chart样式
         */
        chartStyle: {
            type: Object,
            default: () => {
                return {
                    width: '100%',
                    height: '19.6rem',
                }
            },
        },
        /**
         * 饼图中心位置到左侧的距离，占整个空间的百分比
         */
        pieLeft: {
            type: Number,
            default: 35,
        },
    },
    setup(props) {
        // 主题
        provide(THEME_KEY, props.themeKey)
        // echarts option
        const echartsOption = computed(() => {
            return {
                legend: {
                    show: true,
                    orient: 'vertical',
                    height: '100%',
                    top: props.data.length === 2 ? '35%' : '8%',
                    left: '60%',
                    icon: 'circle', //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none
                    itemWidth: props.data.length === 2 ? 4 : 8,
                    itemHeight: props.data.length === 2 ? 4 : 8,
                    selectedMode: false,
                    formatter: (name: string) => {
                        let percent = '0'
                        for (var i = 0; i < props.data.length; i++) {
                            let item = props.data[i]
                            if (item.name === name) {
                                try {
                                    percent = Number(item.value * 100).toFixed(2)
                                } catch (e) {
                                    percent = '0'
                                }
                                break
                            }
                        }
                        return `${name} ${percent}%`
                    },
                },
                series: [
                    {
                        name: props.title,
                        type: 'pie',
                        radius: props.data.length === 2 ? [0, '82%'] : '70%',
                        center:
                            props.data.length === 2 ? [`${props.pieLeft}%`, '50%'] : ['35%', '52%'],
                        colorBy: 'data',
                        data: props.data,
                        itemStyle: {
                            color: (params: any) => {
                                let colorList = ['#FF4C4C', '#64BAFF']
                                if (props.data.length !== 2) {
                                    colorList = [
                                        '#64BAFF',
                                        '#ED1313',
                                        '#FF5033',
                                        '#FF9B5F',
                                        '#FFAF3D',
                                        '#ffc928',
                                        '#fcef50',
                                        '#fbffb0',
                                    ]
                                }
                                return colorList[params.dataIndex]
                            },
                        },
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                            },
                        },
                        label: {
                            show: false,
                        },
                    },
                ],
            }
        })
        return {
            echartsOption,
        }
    },
    components: {
        VChart,
    },
})
</script>

<style lang="scss" scoped>
.dw-portfolio-pie {
    max-height: 100vh;
    max-width: 100vw;
    width: 100%;
    height: 19.6rem;
    .dw-portfolio-chart {
        width: 100%;
        height: 100%;
    }
}
</style>
