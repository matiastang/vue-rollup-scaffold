<!--
 * @Author: matiastang
 * @Date: 2022-01-12 18:42:57
 * @LastEditors: matiastang
 * @LastEditTime: 2022-05-19 13:26:11
 * @FilePath: /dw-vue-components/components/dwPortfolioIndustry/src/DwPortfolioIndustry.vue
 * @Description: 西筹“基金组合”结果页，行业占比折线图
-->
<template>
    <div class="dw-portfolio-industry">
        <VChart class="dw-portfolio-chart" :option="echartsOption" :style="chartStyle" />
    </div>
</template>

<script lang="ts">
import { defineComponent, provide, computed } from 'vue'
// import { use } from 'echarts/core'
// import { CanvasRenderer } from 'echarts/renderers'
// import { LineChart } from 'echarts/charts'
// import {
//     GridComponent,
//     LegendComponent,
//     TooltipComponent,
//     MarkLineComponent,
//     MarkPointComponent,
// } from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
import { IndustryBondStockData, IndustryMainData } from '../../dwPortfolioTypes'

// use([
//     CanvasRenderer,
//     LineChart,
//     GridComponent,
//     LegendComponent,
//     TooltipComponent,
//     MarkLineComponent,
//     MarkPointComponent,
// ])

export default defineComponent({
    name: 'DwPortfolioIndustry',
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
            type: Array as () => (IndustryBondStockData | IndustryMainData)[],
            default: () => {
                return [
                    { tradeDt: '20210709', bondWeight: 0.7497, stockWeight: 0.2503 },
                    { tradeDt: '20210712', bondWeight: 0.7476, stockWeight: 0.2524 },
                    { tradeDt: '20210713', bondWeight: 0.7471, stockWeight: 0.2529 },
                    { tradeDt: '20210714', bondWeight: 0.7493, stockWeight: 0.2507 },
                    { tradeDt: '20210715', bondWeight: 0.7471, stockWeight: 0.2529 },
                    { tradeDt: '20210716', bondWeight: 0.7488, stockWeight: 0.2512 },
                    { tradeDt: '20210719', bondWeight: 0.7486, stockWeight: 0.2514 },
                    { tradeDt: '20210720', bondWeight: 0.7487, stockWeight: 0.2513 },
                    { tradeDt: '20210721', bondWeight: 0.7474, stockWeight: 0.2526 },
                    { tradeDt: '20210722', bondWeight: 0.7469, stockWeight: 0.2531 },
                ]
                // return [
                //     {
                //         backWeight: 0.1191,
                //         commonWeight: 0.110275,
                //         consumerWeight: 0.245025,
                //         financialWeight: 0.1804,
                //         frontWeight: 0.059575,
                //         medicineWeight: 0.0767,
                //         middleWeight: 0.090875,
                //         tmtWeight: 0.11805,
                //         tradeDt: '20210709',
                //     },
                //     {
                //         backWeight: 0.1191,
                //         commonWeight: 0.110275,
                //         consumerWeight: 0.245025,
                //         financialWeight: 0.1804,
                //         frontWeight: 0.059575,
                //         medicineWeight: 0.0767,
                //         middleWeight: 0.090875,
                //         tmtWeight: 0.11805,
                //         tradeDt: '20210712',
                //     },
                //     {
                //         backWeight: 0.1191,
                //         commonWeight: 0.110275,
                //         consumerWeight: 0.245025,
                //         financialWeight: 0.1804,
                //         frontWeight: 0.059575,
                //         medicineWeight: 0.0767,
                //         middleWeight: 0.090875,
                //         tmtWeight: 0.11805,
                //         tradeDt: '20210713',
                //     },
                //     {
                //         backWeight: 0.1191,
                //         commonWeight: 0.110275,
                //         consumerWeight: 0.245025,
                //         financialWeight: 0.1804,
                //         frontWeight: 0.059575,
                //         medicineWeight: 0.0767,
                //         middleWeight: 0.090875,
                //         tmtWeight: 0.11805,
                //         tradeDt: '20210714',
                //     },
                //     {
                //         backWeight: 0.1191,
                //         commonWeight: 0.110275,
                //         consumerWeight: 0.245025,
                //         financialWeight: 0.1804,
                //         frontWeight: 0.059575,
                //         medicineWeight: 0.0767,
                //         middleWeight: 0.090875,
                //         tmtWeight: 0.11805,
                //         tradeDt: '20210715',
                //     },
                //     {
                //         backWeight: 0.1191,
                //         commonWeight: 0.110275,
                //         consumerWeight: 0.245025,
                //         financialWeight: 0.1804,
                //         frontWeight: 0.059575,
                //         medicineWeight: 0.0767,
                //         middleWeight: 0.090875,
                //         tmtWeight: 0.11805,
                //         tradeDt: '20210716',
                //     },
                //     {
                //         backWeight: 0.1191,
                //         commonWeight: 0.110275,
                //         consumerWeight: 0.245025,
                //         financialWeight: 0.1804,
                //         frontWeight: 0.059575,
                //         medicineWeight: 0.0767,
                //         middleWeight: 0.090875,
                //         tmtWeight: 0.11805,
                //         tradeDt: '20210719',
                //     },
                //     {
                //         backWeight: 0.1191,
                //         commonWeight: 0.110275,
                //         consumerWeight: 0.245025,
                //         financialWeight: 0.1804,
                //         frontWeight: 0.059575,
                //         medicineWeight: 0.0767,
                //         middleWeight: 0.090875,
                //         tmtWeight: 0.11805,
                //         tradeDt: '20210720',
                //     },
                //     {
                //         backWeight: 0.1191,
                //         commonWeight: 0.110275,
                //         consumerWeight: 0.245025,
                //         financialWeight: 0.1804,
                //         frontWeight: 0.059575,
                //         medicineWeight: 0.0767,
                //         middleWeight: 0.090875,
                //         tmtWeight: 0.11805,
                //         tradeDt: '20210721',
                //     },
                //     {
                //         backWeight: 0.1191,
                //         commonWeight: 0.110275,
                //         consumerWeight: 0.245025,
                //         financialWeight: 0.1804,
                //         frontWeight: 0.059575,
                //         medicineWeight: 0.0767,
                //         middleWeight: 0.090875,
                //         tmtWeight: 0.11805,
                //         tradeDt: '20210722',
                //     },
                // ]
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
                    height: '15rem',
                }
            },
        },
    },
    emits: {
        tooltipAction: (values: any) => {
            return true
        },
    },
    setup(props, context) {
        // 主题
        provide(THEME_KEY, props.themeKey)
        // 处理数据
        const industryData = computed(() => {
            let xData: string[] = []
            let yData = [
                {
                    code: 'stockWeight',
                    name: '股票',
                    data: [] as number[],
                },
                {
                    code: 'bondWeight',
                    name: '债券',
                    data: [] as number[],
                },
            ]
            props.data.forEach((element, index) => {
                if (element.backWeight === undefined) {
                    const item = element as IndustryBondStockData
                    xData.push(item.tradeDt)
                    yData[0].data.push(item.stockWeight)
                    yData[1].data.push(item.bondWeight)
                } else {
                    if (index === 0) {
                        yData = [
                            {
                                code: 'commonWeight',
                                name: '公共事业',
                                data: [] as number[],
                            },
                            {
                                code: 'medicineWeight',
                                name: '医药生物',
                                data: [] as number[],
                            },
                            {
                                code: 'backWeight',
                                name: '周期下游',
                                data: [] as number[],
                            },
                            {
                                code: 'middleWeight',
                                name: '周期中游',
                                data: [] as number[],
                            },
                            {
                                code: 'frontWeight',
                                name: '周期上游',
                                data: [] as number[],
                            },
                            {
                                code: 'consumerWeight',
                                name: '消费',
                                data: [] as number[],
                            },
                            {
                                code: 'tmtWeight',
                                name: 'TMT',
                                data: [] as number[],
                            },
                            {
                                code: 'financialWeight',
                                name: '金融',
                                data: [] as number[],
                            },
                        ]
                    }
                    const item = element as IndustryMainData
                    xData.push(item.tradeDt)
                    yData[0].data.push(item.commonWeight)
                    yData[1].data.push(item.medicineWeight)
                    yData[2].data.push(item.backWeight)
                    yData[3].data.push(item.middleWeight)
                    yData[4].data.push(item.frontWeight)
                    yData[5].data.push(item.consumerWeight)
                    yData[6].data.push(item.tmtWeight)
                    yData[7].data.push(item.financialWeight)
                }
            })
            yData.forEach((item) => {
                if (item.data.length > 100) {
                    item.data = item.data.filter((item, index) => {
                        return index % 4 === 0
                    })
                }
            })
            if (xData.length > 100) {
                xData = xData.filter((item, index) => {
                    return index % 4 === 0
                })
            }
            return {
                xData,
                yData,
            }
        })
        // echarts option
        const echartsOption = computed(() => {
            return {
                color:
                    industryData.value.yData.length === 2
                        ? ['#FF4C4C', '#64BAFF']
                        : [
                              '#fbffb0',
                              '#fcef50',
                              '#ffc928',
                              '#FFAF3D',
                              '#FF9B5F',
                              '#FF5033',
                              '#ED1313',
                              '#64BAFF',
                          ],
                grid: {
                    left: 0,
                    right: 5,
                    top: 5,
                    bottom: 5,
                    containLabel: true,
                },
                tooltip: {
                    show: true,
                    trigger: 'axis',
                    formatter: (values: any, index: number) => {
                        if (!Array.isArray(values) || values.length <= 0) {
                            return '数据格式错误'
                        }
                        context.emit('tooltipAction', values)
                        // 无法解析回调return的html字符串
                        return ''
                    },
                },
                legend: {
                    show: false,
                    orient: 'vertical', //垂直显示
                    y: 'center', //延Y轴居中
                    x: 'right', //居右显示,
                    icon: 'rect', //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none
                    itemWidth: 10,
                    itemHeight: 10,
                    selectedMode: false,
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: industryData.value.xData,
                    axisLine: {
                        // 不显示坐标轴轴线
                        show: false,
                    },
                    axisTick: {
                        // 不显示刻度
                        show: false,
                    },
                    axisLabel: {
                        show: false,
                        fontSize: 10,
                        color: '#8F8F8F',
                    },
                },
                yAxis: {
                    show: true,
                    min: 0,
                    max: 1,
                    axisLabel: {
                        show: true,
                        inside: false, // 刻度标签是否朝内，默认朝外。
                        fontSize: 10,
                        color: '#8F8F8F',
                        formatter: (value: number, index: number) => {
                            return `${(Number(value) * 100).toFixed(0)}`
                        },
                    },
                },
                series: industryData.value.yData.map((value, yIndex) => {
                    return {
                        name: value.name,
                        type: 'line',
                        stack: 'Total',
                        lineStyle: {
                            width: 0,
                        },
                        areaStyle: {
                            opacity: 1,
                        },
                        smooth: true,
                        emphasis: {
                            focus: 'none',
                        },
                        blur: {},
                        data: value.data.map((value, index) => {
                            return {
                                value,
                                symbol: 'none',
                                // symbol: "circle",
                                // symbolSize: 6
                            }
                        }),
                    }
                }),
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
.dw-portfolio-industry {
    max-height: 100vh;
    max-width: 100vw;
    width: 100%;
    height: 15rem;
    .dw-portfolio-chart {
        width: 100%;
        height: 100%;
    }
}
</style>
