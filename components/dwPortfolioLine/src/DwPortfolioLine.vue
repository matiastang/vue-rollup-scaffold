<!--
 * @Author: matiastang
 * @Date: 2022-01-12 10:23:25
 * @LastEditors: matiastang
 * @LastEditTime: 2022-05-19 13:26:30
 * @FilePath: /dw-vue-components/components/dwPortfolioLine/src/DwPortfolioLine.vue
 * @Description: 西筹“基金组合”结果页优化折线图
-->
<template>
    <div class="dw-portfolio-line">
        <VChart class="dw-portfolio-chart" :option="echartsOption" :style="chartStyle" />
    </div>
</template>

<script lang="ts">
import { reactive, computed, defineComponent, provide } from 'vue'
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
    lineOneData: number[]
    lineTwoData: number[]
}

export default defineComponent({
    name: 'DwPortfolioLine',
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
                    '20210709',
                    '20210712',
                    '20210713',
                    '20210714',
                    '20210715',
                    '20210716',
                    '20210719',
                    '20210720',
                    '20210721',
                    '20210722',
                    '20210723',
                    '20210726',
                    '20210727',
                    '20210728',
                    '20210729',
                    '20210730',
                    '20210802',
                    '20210803',
                    '20210804',
                    '20210805',
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
                    lineOneData: [
                        0, 0.012981047736870208, 0.016336910241158437, 0.005235829117313867,
                        0.016776002918583516, 0.00789947976969732, 0.009550990293944628,
                        0.00926097933167977, 0.017393477580535218, 0.019975173490971155,
                        0.009087084944248217, -0.019814816688109544, -0.05130078891769939,
                        -0.05316428230972212, -0.03490303433926121, -0.04057556274888274,
                        -0.018402981245378158, -0.0201691872720452, -0.009545025529472355,
                        -0.014794261343107462,
                    ].map((item) => {
                        return item * 100
                    }),
                    lineTwoData: [
                        0, 0.006940342742139949, 0.009044524440513735, 0.007289151397722682,
                        0.01026313116464661, 0.008241938551579508, 0.008589130719757643,
                        0.009176855352334812, 0.014019660681433121, 0.015650350759267573,
                        0.01322303426823912, 0.009159464674437512, 0.00006756598485946341,
                        -0.0012379921072692701, -0.0012379921072692701, 0.007105610011855612,
                        0.006458096496205323, 0.011216278854175865, 0.008655196556772715,
                        0.013865887171321312, 0.01599228378722617,
                    ].map((item) => {
                        return item * 100
                    }),
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
         * 是否显示创建时点
         */
        createPoint: {
            type: Boolean,
            default: true,
        },
        /**
         * 当前选择项索引
         */
        currCheckedIndex: {
            type: Number,
            default: 1,
        },
        /**
         * 创建时点
         */
        createDate: {
            type: String,
            default: '20210721',
        },
    },
    setup(props) {
        // 主题
        provide(THEME_KEY, props.themeKey)
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
        // 创建时间点位置
        const createIndex = computed(() => {
            const index = props.xData.indexOf(props.createDate)
            return index
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
                    formatter: (value: any, index: number) => {
                        if (!Array.isArray(value) || value.length <= 0) {
                            return '数据格式错误'
                        }
                        let item = value[0]
                        let number = item && item.value ? item.value.toFixed(2) + '%' : '0%'
                        let item1 = value[1]
                        let number1 = item1 && item1.value ? item1.value.toFixed(2) + '%' : '0%'
                        const itemDate = formatterDate(item.axisValue)
                        // 无法解析回调return的html字符串
                        if (item && item1) {
                            return `${itemDate}<br/>${item.marker} ${number}<br/>${item1.marker} ${number1}`
                        } else if (item && !item1) {
                            return `${itemDate}<br/>${item.marker} ${number}`
                        } else if (item1 && !item) {
                            return `${itemDate}<br/>${item1.marker} ${number1}`
                        } else {
                            return ''
                        }
                    },
                },
                xAxis: {
                    show: true,
                    type: 'category',
                    boundaryGap: true,
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
                },
                yAxis: {
                    show: true,
                    axisLabel: {
                        show: true,
                        inside: false, // 刻度标签是否朝内，默认朝外。
                        fontSize: 14,
                        color: '#8F8F8F',
                        formatter: (value: string, index: number) => {
                            return `${Number(value)}%`
                        },
                    },
                },
                series: [
                    {
                        type: 'line',
                        lineStyle: {
                            color: '#F84848',
                            width: 1.8,
                        },
                        emphasis: {
                            lineStyle: {
                                width: 1.8, // hover时的折线宽度
                            },
                        },
                        showAllSymbol: true,
                        triggerLineEvent: false,
                        markPoint: {
                            symbol: 'pin',
                            itemStyle: {
                                color: '#000',
                            },
                            symbolSize: 0, // 容器大小
                            symbolOffset: 0, //位置偏移
                            data: [
                                {
                                    name: '创建时点',
                                    value: -2,
                                    xAxis:
                                        props.createPoint && props.currCheckedIndex == 1
                                            ? createIndex.value
                                            : '',
                                    yAxis:
                                        props.createPoint && props.currCheckedIndex == 1
                                            ? props.yData.lineOneData[createIndex.value]
                                            : '',
                                },
                            ],
                            label: {
                                fontSize: 11,
                                position: 'left',
                                offset: [-5, -5],
                                color: '#F87125',
                                fontWeight: 600,
                                formatter: ['创建时点'].join('\n'),
                            },
                        },
                        markLine: {
                            symbol: 'none',
                            silent: true,
                            data: [
                                {
                                    xAxis:
                                        props.createPoint && props.currCheckedIndex == 1
                                            ? createIndex.value
                                            : '',
                                    label: {
                                        show: false,
                                        position: 'start',
                                        formatter: '创建时点',
                                        color: '#F87125',
                                        rotate: '90deg',
                                        fontSize: 10,
                                        fontWeight: 600,
                                        padding: [0, 10, 0, 0],
                                    },
                                },
                            ],
                            lineStyle: {
                                normal: {
                                    type: 'dotted',
                                    color: '#F87125',
                                    symbol: 'none',
                                },
                            },
                        },
                        data: props.yData.lineOneData.map((value, index) => {
                            if (
                                index === createIndex.value &&
                                props.createPoint &&
                                props.currCheckedIndex == 1
                            ) {
                                return {
                                    value,
                                    itemStyle: {
                                        color: '#F84848',
                                        borderColor: '#FFFFFF',
                                    },
                                    symbol: 'circle',
                                    // symbol: 'path://M7 0L8.5716 4.83688H13.6574L9.5429 7.82624L11.1145 12.6631L7 9.67376L2.8855 12.6631L4.4571 7.82624L0.342604 4.83688H5.4284L7 0Z',
                                    symbolSize: 6,
                                }
                            }
                            return {
                                value,
                                itemStyle: {
                                    color: '#F84848',
                                },
                                symbol: 'none',
                                symbolSize: 7,
                            }
                        }),
                    },
                    {
                        type: 'line',
                        lineStyle: {
                            color: '#589DFC',
                            width: 1.8,
                        },
                        emphasis: {
                            lineStyle: {
                                width: 1.8, // hover时的折线宽度
                            },
                        },
                        data: props.yData.lineTwoData.map((value, index) => {
                            return {
                                value,
                                itemStyle: {
                                    color: '#589DFC',
                                },
                                symbol: 'none',
                                symbolSize: 6,
                            }
                        }),
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
.dw-portfolio-line {
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
