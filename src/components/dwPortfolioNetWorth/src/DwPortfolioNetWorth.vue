<!--
 * @Author: matiastang
 * @Date: 2022-03-21 10:15:56
 * @LastEditors: matiastang
 * @LastEditTime: 2022-05-19 13:26:46
 * @FilePath: /dw-vue-components/components/dwPortfolioNetWorth/src/DwPortfolioNetWorth.vue
 * @Description: 单位净值曲线
-->
<template>
    <div class="dw-portfolio-net-worth">
        <VChart
            ref="chart"
            class="dw-portfolio-chart"
            :option="echartsOption"
            :style="chartStyle"
        />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, provide, ref, Ref, watchEffect } from 'vue'
// import { use } from 'echarts/core'
// import { CanvasRenderer } from 'echarts/renderers'
// import { LineChart } from 'echarts/charts'
// import {
//     GridComponent,
//     TooltipComponent,
//     MarkLineComponent,
//     MarkPointComponent,
// } from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'

// use([
//     CanvasRenderer,
//     LineChart,
//     GridComponent,
//     TooltipComponent,
//     MarkLineComponent,
//     MarkPointComponent,
// ])

interface lineYData {
    /**
     * 单位净值
     */
    lineNetWorthData: Array<number | null>
    /**
     * 均线
     */
    lineAverageData: Array<number | null>
    /**
     * 历史最优均线
     */
    lineOptimalData: Array<number | null>
}

export default defineComponent({
    name: 'DwPortfolioNetWorth',
    props: {
        /**
         * 主题
         */
        themeKey: {
            type: String,
            default: 'bright', // 'bark'
        },
        /**
         * x轴数据
         */
        xData: {
            type: Array as () => string[],
            default: () => {
                return [
                    '20210924',
                    '20210927',
                    '20210928',
                    '20210929',
                    '20210930',
                    '20211008',
                    '20211011',
                    '20211012',
                    '20211013',
                    '20211014',
                ]
            },
        },

        /**
         * y轴数据
         */
        yData: {
            type: Object as () => lineYData,
            default: () => {
                return {
                    lineOptimalData: [
                        2.6254, 2.6326, 2.6401, 2.6473, 2.6546, 2.6622, 2.6699, 2.6773, 2.6848,
                        2.6923,
                    ] as (number | null)[],
                    lineAverageData: [
                        3.6532, 3.6558, 3.6556, 3.6298, 3.6081, 3.5936, 3.5911, 3.5702, 3.565,
                        3.5497,
                    ],
                    lineNetWorthData: [
                        3.6693, 3.605, 3.6429, -3.5387, -3.5848, -3.5969, 3.5924, 3.5385, 3.5128,
                        3.5079,
                    ],
                }
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
                    height: '20rem',
                }
            },
        },
        /**
         * 单位
         */
        unit: {
            type: String,
            default: '',
        },
        /**
         * 数据长度
         */
        dataLen: {
            type: Number,
            default: 4,
        },
    },
    setup(props, context) {
        // 主题
        provide(THEME_KEY, props.themeKey)
        const chart: Ref<any> = ref(null)
        const lineOptimalData = computed(() => {
            return props.yData.lineOptimalData
        })
        const lineAverageData = computed(() => {
            return props.yData.lineAverageData
        })
        const lineNetWorthData = computed(() => {
            return props.yData.lineNetWorthData
        })
        // 格式化创建时间点时间数据
        const formatterDate = (date: string) => {
            const year = date.slice(0, 4)
            let month = date.slice(4, 6)
            if (month.startsWith('0')) {
                month = month.slice(1)
            }
            let day = date.slice(6, 8)
            if (day.startsWith('0')) {
                day = day.slice(1)
            }
            return `${year}.${month}.${day}`
        }
        const dataRange = computed(() => {
            const optimalData = lineOptimalData.value.filter((item) => {
                return item !== null
            }) as number[]
            const optimalMin = Math.min(...optimalData)
            const optimalMax = Math.max(...optimalData)
            const averageData = lineAverageData.value.filter((item) => {
                return item !== null
            }) as number[]
            const averageMin = Math.min(...averageData)
            const averageMax = Math.max(...averageData)
            const netWorthData = lineNetWorthData.value.filter((item) => {
                return item !== null
            }) as number[]
            const netWorthMin = Math.min(...netWorthData)
            const netWorthMax = Math.max(...netWorthData)
            let min = Math.min(optimalMin, averageMin, netWorthMin)
            let max = Math.max(optimalMax, averageMax, netWorthMax)
            const diff = max - min
            min = min - diff / 10
            max = max + diff / 10
            return {
                min: Math.floor(min * 10) / 10,
                max: Math.ceil(max * 10) / 10,
            }
        })
        // echarts option
        const echartsOption = computed(() => {
            return {
                grid: {
                    left: '0',
                    right: '20',
                    top: '15',
                    bottom: '8',
                    containLabel: true,
                },
                tooltip: {
                    trigger: 'axis',
                    position: function (point: any, params: any, dom: any, rect: any, size: any) {
                        // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                        const pointX = point[0] as number
                        const viewSize = size.viewSize as number[]
                        const viewHalfW = viewSize[0] / 2
                        const viewHalfH = viewSize[1] / 2
                        const contentSize = size.contentSize as number[]
                        const contentHalfH = contentSize[1] / 2
                        if (pointX < viewHalfW) {
                            return [pointX, viewHalfH - contentHalfH]
                        }
                        return [pointX - contentSize[0], viewHalfH - contentHalfH]
                    },
                    formatter: (value: any, index: number) => {
                        if (!Array.isArray(value) || value.length <= 0) {
                            return '数据格式错误'
                        }
                        if (!Array.isArray(value)) {
                            return ''
                        }
                        let itemDate = ''
                        let listText = value
                            .map((item, index) => {
                                if (index === 0) {
                                    itemDate = formatterDate(item.axisValue)
                                }
                                if (item && typeof item.value === 'number') {
                                    return `<br/>${item.marker} ${item.value.toFixed(
                                        props.dataLen
                                    )}${props.unit}`
                                }
                                return ''
                            })
                            .filter((item) => {
                                return item !== ''
                            })
                            .join('')
                        return itemDate + listText
                    },
                },
                xAxis: {
                    show: true,
                    type: 'category',
                    boundaryGap: false,
                    data: props.xData,
                    axisLine: {
                        // 不显示坐标轴轴线
                        show: false,
                    },
                    axisTick: {
                        // 不显示刻度
                        show: false,
                    },
                    axisLabel: {
                        show: true,
                        fontSize: 13,
                        color: '#8F8F8F',
                        formatter: (value: string, index: number) => {
                            return formatterDate(value)
                        },
                    },
                    // axisPointer: {
                    //     value: '2016-10-7',
                    //     snap: true,
                    //     lineStyle: {
                    //         color: '#7581BD',
                    //         width: 2,
                    //     },
                    //     // label: {
                    //     //     show: true,
                    //     //     formatter: function (params: any) {
                    //     //         return echarts.format.formatTime('yyyy-MM-dd', params.value)
                    //     //     },
                    //     //     backgroundColor: '#7581BD',
                    //     // },
                    //     handle: {
                    //         show: true,
                    //         color: 'red',
                    //     },
                    // },
                },
                yAxis: {
                    show: true,
                    axisLabel: {
                        show: true,
                        inside: false, // 刻度标签是否朝内，默认朝外。
                        fontSize: 14,
                        color: '#8F8F8F',
                        formatter: (value: string, index: number) => {
                            return `${Number(value).toFixed(props.dataLen)}${props.unit}`
                        },
                    },
                    min: dataRange.value.min,
                    max: dataRange.value.max,
                },
                series: [
                    {
                        type: 'line',
                        lineStyle: {
                            color: '#BC2424',
                            width: 1.8,
                        },
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 1,
                                        color: '#FFFDFD', // 100% 处的颜色
                                    },
                                    {
                                        offset: 0,
                                        color: '#FFAAAA', // 0% 处的颜色
                                    },
                                ],
                                global: false, // 缺省为 false
                            },
                        },
                        emphasis: {
                            lineStyle: {
                                width: 1.8, // hover时的折线宽度
                            },
                        },
                        showAllSymbol: true,
                        triggerLineEvent: false,
                        data: lineNetWorthData.value.map((value, index) => {
                            return {
                                value,
                                itemStyle: {
                                    color: '#BC2424',
                                },
                                symbol: 'none',
                                symbolSize: 7,
                            }
                        }),
                    },
                    {
                        type: 'line',
                        lineStyle: {
                            color: lineNetWorthData.value.length > 0 ? '#467FEA' : '#BC2424',
                            width: 1.8,
                        },
                        emphasis: {
                            lineStyle: {
                                width: 1.8, // hover时的折线宽度
                            },
                        },
                        data: lineAverageData.value.map((value, index) => {
                            return {
                                value,
                                itemStyle: {
                                    color:
                                        lineNetWorthData.value.length > 0 ? '#467FEA' : '#BC2424',
                                },
                                symbol: 'none',
                                symbolSize: 6,
                            }
                        }),
                    },
                    {
                        type: 'line',
                        lineStyle: {
                            color: '#FF6E1C',
                            width: 1.8,
                        },
                        emphasis: {
                            lineStyle: {
                                width: 1.8, // hover时的折线宽度
                            },
                        },
                        data: lineOptimalData.value.map((value, index) => {
                            return {
                                value,
                                itemStyle: {
                                    color: '#FF6E1C',
                                },
                                symbol: 'none',
                                symbolSize: 6,
                            }
                        }),
                    },
                ],
            }
        })

        watchEffect(() => {
            const chartValue = chart.value
            if (chartValue) {
                chartValue.chart.getZr().on('mouseup', function (event: any) {
                    chartValue.chart.dispatchAction({
                        type: 'hideTip',
                    })
                    if (!event.target) {
                        // MARK: - 点击在了空白处，做些什么
                    }
                })
            }
        })
        context.expose({
            chart,
        })
        return {
            chart,
            echartsOption,
        }
    },
    components: {
        VChart,
    },
})
</script>

<style lang="scss" scoped>
.dw-portfolio-net-worth {
    max-height: 100vh;
    max-width: 100vw;
    width: 100%;
    height: 20rem;
    margin-bottom: 0.8rem;
    overflow: hidden;
    .dw-portfolio-chart {
        width: 100%;
        height: 100%;
    }
}
</style>
