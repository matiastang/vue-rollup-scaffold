<!--
 * @Author: matiastang
 * @Date: 2022-05-10 09:50:21
 * @LastEditors: matiastang
 * @LastEditTime: 2022-05-19 16:08:09
 * @FilePath: /dw-vue-components/components/dwDefectFactorLine/src/DwDefectFactorLine.vue
 * @Description: 西筹-大v-寻暇记-因子收益率-折线图
-->
<template>
    <DwLineChart
        ref="lineChart"
        :theme-key="themeKey"
        :yRangeRound="yRangeRound"
        :autoSetYRangeRound="autoSetYRangeRound"
        :echarts-option="echartsOption"
        :style="{ height: '300px', background: '#FFFFFF' }"
    ></DwLineChart>
</template>
<script lang="ts">
import { defineComponent, ref, Ref, computed, PropType, reactive, watchEffect } from 'vue'
import DwLineChart from '../../dwLineChart'
import { RangeRound, ChartsGrid, DefectFactorOptionalThemeColors } from '../../@types/index'

export default defineComponent({
    name: 'DwDefectFactorLine',
    props: {
        /**
         * 主题（默认bright）
         * bright | bark
         */
        themeKey: {
            type: String,
            default: 'bright',
        },
        /**
         * y轴显示范围取整
         */
        yRangeRound: {
            type: Object as PropType<RangeRound>,
            default: () => {
                return {
                    min: true,
                    max: true,
                    diffPercent: 10,
                    decimal: 10,
                }
            },
        },
        /**
         * 自动设置Y轴显示范围
         */
        autoSetYRangeRound: {
            type: Boolean,
            default: true,
        },
        /**
         * 主题色
         */
        chartTheme: {
            type: Object as PropType<DefectFactorOptionalThemeColors>,
            default: () => {
                return {}
            },
        },
        /**
         * x轴数据
         */
        xData: {
            type: Array as PropType<Array<string>>,
            default: () => {
                return []
            },
        },
        /**
         * 是否显示x首尾坐标
         */
        xAxisLabel: {
            type: Boolean,
            default: false,
        },
        /**
         * y轴数据
         */
        yData: {
            type: Array as PropType<Array<number>>,
            default: () => {
                return []
            },
        },
        /**
         * 十字点追踪（开启后对性能有一定影响）
         */
        pointTrace: {
            type: Boolean,
            default: false,
        },
        /**
         * grid
         */
        grid: {
            type: Object as PropType<ChartsGrid>,
            default: () => {
                return {
                    left: 0,
                    right: 0,
                    top: 10,
                    bottom: 5,
                } as ChartsGrid
            },
        },
        /**
         * 开启动画
         */
        animation: {
            type: Boolean,
            default: true,
        },
    },
    setup(props, context) {
        // 导出
        const lineChart: Ref<any> = ref(null)
        // 颜色
        const colors = computed(() => {
            const normalColors = {
                // color: '#FFAB48',
                gridBackgroundColor: '#F7F7F7',
                gridBorderColor: '#F7F7F7',
                tooltipBorderColor: '#FFAB48',
                tooltipExtraCssTextBackground: '#FFAB48',
                tooltipExtraCssTextColor: '#FFFFFF',
                xAxisAxisLabelColor: '#8F8F8F',
                yAxisAxisLineLineStyleColor: '#CBCBCB',
                yAxisAxisLabelColor: '#404040',
                seriesLineAreaStyleStartColor: '#FFC8B7',
                seriesLineAreaStyleEndColor: '#FFF0EB',
                seriesLineMarkLineLineStyle: '#8F8F8F',
                seriesLineMarkLineEmphasisLineStyle: '#8F8F8F',
            } as DefectFactorOptionalThemeColors
            return {
                ...normalColors,
                ...props.chartTheme,
            }
        })
        /**
         * MarkLine位置
         */
        const seriesMarkLineData = reactive({
            value: [] as ({ yAxis: number } | { xAxis: string })[],
        })
        // 末尾位置
        const lastIndex = computed(() => {
            return props.xData.length - 1
        })
        /**
         * 组装参数
         */
        const echartsOption = computed(() => {
            return {
                animation: props.animation,
                grid: {
                    show: true,
                    left: props.grid.left,
                    right: props.grid.right,
                    top: props.grid.top,
                    bottom: props.grid.bottom,
                    containLabel: true,
                    backgroundColor: colors.value.gridBackgroundColor,
                    borderColor: colors.value.gridBorderColor,
                },
                tooltip: {
                    show: true,
                    trigger: 'axis',
                    axisPointer: {
                        type: props.pointTrace ? 'none' : 'line',
                        snap: true,
                        label: {
                            show: false,
                        },
                    },
                    padding: 6,
                    borderColor: colors.value.color || colors.value.tooltipBorderColor,
                    extraCssText: `background: ${
                        colors.value.color || colors.value.tooltipExtraCssTextBackground
                    }; border-radius: 6px;font-size: 12px; font-family: PingFang SC-Regular, PingFang SC; font-weight: 400; color: ${
                        colors.value.tooltipExtraCssTextColor
                    }; line-height: 14px;`,
                    formatter: (value: any[], index: number) => {
                        if (!Array.isArray(value) || value.length <= 0) {
                            return `${index}数据格式错误`
                        }
                        let item = value[0]
                        return `${item.axisValue}<br/>因子收益率：${item.value.toFixed(2)}%`
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
                    splitNumber: 20,
                    axisLabel: {
                        show: props.xAxisLabel,
                        fontSize: 14,
                        color: colors.value.xAxisAxisLabelColor,
                        interval: 0, //使x轴文字显示全
                        formatter: (value: string, index: number) => {
                            if (index === 0 || index === lastIndex.value) {
                                return value
                            }
                            return ''
                        },
                    },
                },
                yAxis: {
                    show: true,
                    axisLine: {
                        show: true, // 不显示坐标轴轴线
                        lineStyle: {
                            color: colors.value.yAxisAxisLineLineStyleColor,
                        },
                    },
                    axisTick: {
                        show: false, // 不显示刻度
                    },
                    splitLine: {
                        show: false, // 不显示网管线
                    },
                    axisLabel: {
                        show: true,
                        inside: false, // 刻度标签是否朝内，默认朝外。
                        fontSize: 10,
                        color: colors.value.yAxisAxisLabelColor,
                        formatter: (value: string, index: number) => {
                            return `${Number(value)}%`
                        },
                    },
                },
                series: [
                    {
                        type: 'line',
                        lineStyle: {
                            // 不显示线
                            color: 'none',
                            width: 0,
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
                                        offset: 0,
                                        color:
                                            colors.value.color ||
                                            colors.value.seriesLineAreaStyleStartColor, // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: colors.value.seriesLineAreaStyleEndColor, // 100% 处的颜色
                                    },
                                ],
                                global: false, // 缺省为 false
                            },
                        },
                        emphasis: {
                            disabled: true, // 从 v5.3.0 开始支持
                            lineStyle: {
                                width: 0, // hover时的折线宽度
                            },
                        },
                        showAllSymbol: true,
                        triggerLineEvent: false,
                        markLine: {
                            symbol: 'none', //去掉箭头
                            animation: false,
                            label: {
                                show: false,
                            },
                            lineStyle: {
                                color: colors.value.seriesLineMarkLineLineStyle,
                                type: 'dashed',
                                width: 1, // 正常时的折线宽度
                            },
                            emphasis: {
                                disabled: true, // 从 v5.3.0 开始支持
                                lable: {
                                    show: false,
                                },
                                lineStyle: {
                                    color: colors.value.seriesLineMarkLineEmphasisLineStyle,
                                    type: 'dashed',
                                    width: 1, // 正常时的折线宽度
                                },
                            },
                            data: seriesMarkLineData.value,
                        },
                        data: props.yData.map((value, index) => {
                            return {
                                value,
                                symbol: 'none',
                            }
                        }),
                    },
                ],
            }
        })
        /**
         * 导出chart
         */
        const chart = computed(() => {
            const nowChart = lineChart.value
            if (nowChart === null) {
                return null
            }
            return nowChart.chart
        })
        context.expose({
            chart,
        })
        // 监听
        watchEffect(() => {
            if (!props.pointTrace) {
                return
            }
            const chartValue = lineChart.value
            if (!chartValue) {
                return
            }
            const eChart = chartValue.chart
            if (!eChart) {
                return
            }
            eChart.getZr().on('mousemove', function (params: any) {
                // 获取点击位置的坐标
                let pointInPixel = [params.offsetX, params.offsetY]
                // containPixel为true则点击位置在坐标轴内
                if (eChart.containPixel('grid', pointInPixel)) {
                    // 传入鼠标位置坐标进行转化
                    // convertFromPixel返回[x, y],x对应鼠标点击处数据的下标,y对应鼠标点击处的数值
                    const x = eChart.convertFromPixel({ seriesIndex: 0 }, pointInPixel)[0]
                    seriesMarkLineData.value = [
                        {
                            yAxis: props.yData[x],
                        },
                        {
                            xAxis: props.xData[x],
                        },
                    ]
                } else {
                    seriesMarkLineData.value = []
                }
            })
            eChart.getZr().on('mouseup', function (event: any) {
                eChart.dispatchAction({
                    type: 'hideTip',
                })
                seriesMarkLineData.value = []
            })
        })
        return {
            lineChart,
            echartsOption,
        }
    },
    components: {
        DwLineChart,
    },
})
</script>
