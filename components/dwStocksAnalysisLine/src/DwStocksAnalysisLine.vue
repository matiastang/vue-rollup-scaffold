<!--
 * @Author: matiastang
 * @Date: 2022-01-13 14:21:48
 * @LastEditors: matiastang
 * @LastEditTime: 2022-05-17 15:05:57
 * @FilePath: /dw-vue-components/components/dwStocksAnalysisLine/src/DwStocksAnalysisLine.vue
 * @Description: 西筹“个股分析”小程序，折线图
-->
<template>
    <div class="dw-stocks-analysis-line">
        <div class="dw-stocks-analysis-content">
            <DwLineChart
                class="dw-stocks-analysis-chart"
                ref="vEchart"
                :theme-key="themeKey"
                :yRangeRound="yRangeRound"
                :autoSetYRangeRound="autoSetYRangeRound"
                :option="echartsOption"
                :style="chartStyle"
                :auto-resize="true"
            />
            <div
                v-show="xData.length > 0 && showFullScreen"
                class="check-icon"
                :style="fullScreenStyle"
                @click="argeScreenAction"
            >
                <slot name="fullScreenImg"></slot>
            </div>
            <div v-if="xData.length <= 0" class="load-content">
                <div>暂无数据</div>
            </div>
        </div>
        <div v-if="xData.length > 0" class="charts-bottom">
            <div
                class="charts-bottom-item"
                v-for="(item, index) in dateList"
                :key="item.value"
                @click="onDateAction(index)"
            >
                <div
                    :class="[
                        {
                            'charts-bottom-select-value': index === selectDateIndex,
                            'charts-bottom-value': index !== selectDateIndex,
                        },
                    ]"
                >
                    {{ item.value }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    PropType,
    Ref,
    ref,
    computed,
    watchEffect,
    defineComponent,
    // provide,
    onMounted,
    onBeforeUnmount,
    reactive,
} from 'vue'
// import { use } from 'echarts/core'
// import { CanvasRenderer } from 'echarts/renderers'
// import { LineChart } from 'echarts/charts'
// import {
//     GridComponent,
//     TooltipComponent,
//     MarkLineComponent,
//     MarkPointComponent,
// } from 'echarts/components'
// import VChart, { THEME_KEY } from 'vue-echarts'
import { bigDataFormatter, moneyFormatter, removeZeroSuffix } from '../../utils'

// use([
//     CanvasRenderer,
//     LineChart,
//     GridComponent,
//     TooltipComponent,
//     MarkLineComponent,
//     MarkPointComponent,
// ])
/**
 * 分析类型
 */
export enum AnalyzeType {
    /**
     * 数量
     */
    VOL_HLD_STOCK = 0,
    /**
     * 市值
     */
    HLD_MKT_VALUE = 1,
    /**
     * 占比
     */
    MKT_VAL_NET_ASSET = 2,
}
/**
 * 数据来源
 */
export enum ReportType {
    /**
     * 日频
     */
    DAY = 1,
    /**
     * 季报
     */
    QUAETER = 2,
    /**
     * 年报
     */
    YEAR = 3,
}
interface TooltipItem {
    axisDim: string // "x"
    axisId: string //"\u0000series\u00000\u00000
    axisIndex: number //
    axisType: string //"xAxis.category"
    axisValue: string //"2016-09-30"
    axisValueLabel: string //"2016-09-30"
    borderColor: undefined
    color: string //"#D65928
    componentIndex: number //
    componentSubType: string //"line"
    componentType: string //"series"
    data: number //
    dataIndex: number //
    dataType: undefined
    dimensionNames: string[] //['x', 'y']
    marker: string //"<span style=\"display:inline-block;margin-right:0.4rem;border-radius:1rem;width:1rem;height:1rem;background-color:#D65928;\"></span>"
    name: string //"2016-09-30"
    seriesId: string //"\u0000数量\u00000
    seriesIndex: number //
    seriesName: string //"数量"
    seriesType: string //"line"
    value: number //39853625
}

import DwLineChart from '../../dwLineChart'
import { RangeRound } from '../../@types/index'

export default defineComponent({
    name: 'DwStocksAnalysisLine',
    props: {
        /**
         * 主题
         */
        themeKey: {
            type: String,
            default: 'bright', // 'bark'
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
         * x轴数据
         */
        xData: {
            type: Array as () => string[],
            default: () => {
                return [
                    '2007-03-31',
                    '2007-06-30',
                    '2007-09-30',
                    '2007-12-31',
                    '2008-03-31',
                    '2008-06-30',
                    '2008-09-30',
                    '2008-12-31',
                    '2009-03-31',
                    '2009-06-30',
                    '2009-09-30',
                    '2009-12-31',
                    '2010-03-31',
                    '2010-06-30',
                    '2010-09-30',
                    '2010-12-31',
                    '2011-03-31',
                    '2011-06-30',
                    '2011-09-30',
                    '2011-12-31',
                    '2012-03-31',
                    '2012-06-30',
                    '2012-09-30',
                    '2012-12-31',
                    '2013-03-31',
                    '2013-06-30',
                    '2013-09-30',
                    '2013-12-31',
                    '2014-03-31',
                    '2014-06-30',
                    '2014-09-30',
                    '2014-12-31',
                    '2015-03-31',
                    '2015-06-30',
                    '2015-09-30',
                    '2015-12-31',
                    '2016-03-31',
                    '2016-06-30',
                    '2016-09-30',
                    '2016-12-31',
                    '2017-03-31',
                    '2017-06-30',
                    '2017-09-30',
                    '2017-12-31',
                    '2018-03-31',
                    '2018-06-30',
                    '2018-09-30',
                    '2018-12-31',
                    '2019-03-31',
                    '2019-06-30',
                    '2019-09-30',
                    '2019-12-31',
                    '2020-03-31',
                    '2020-06-30',
                    '2020-09-30',
                    '2020-12-31',
                    '2021-03-31',
                    '2021-06-30',
                    '2021-09-30',
                ]
            },
        },

        /**
         * y轴数据
         */
        yData: {
            type: Array as () => number[],
            default: () => {
                return []
                // 数量
                // return [
                //     63728781, 273408012, 311825293, 271786113, 143719228, 222530711, 176305296,
                //     373832056, 651284673, 695289545, 741806715, 592130430, 335984459, 426056686,
                //     420261800, 464910782, 245593994, 250017771, 203402386, 240828490, 258252854,
                //     484602734, 478500678, 351851486, 251681543, 168237572, 149348223, 163708039,
                //     97209784, 125416681, 81425750, 118520172, 198272592, 103719831, 106024806,
                //     112399063, 42588132, 33720601, 39853625, 58161258, 80456579, 290098071,
                //     265900439, 300892926, 257879212, 222048195, 346866266, 263609489, 314932440,
                //     337497035, 317148074, 239032318, 164582499, 129692109, 228657045, 382740223,
                //     269650282, 82123528, 56577291,
                // ]
                // 市值
                // return [
                //     2998439146.05, 19562342755.74, 42080823290.35, 28836506589.3, 7604184353.48,
                //     10961862823.86, 5865677197.92, 9940194369.04, 25471743561.03, 34389020895.7,
                //     37609600450.5, 32620465388.7, 16933616733.6, 19280806689.56, 22227646602.0,
                //     26109389517.12, 12147078943.24, 12068357806.17, 6828218098.02, 8294133195.6,
                //     9446889399.32, 22165729053.16, 20068318435.32, 15935353800.94, 10512738051.11,
                //     5847938002.72, 5331731561.1, 6831536467.47, 3651199487.04, 4933892230.54,
                //     3366140505.0, 8854642050.12, 15512847598.08, 8498802952.14, 3165900707.16,
                //     4046366268.0, 1354728478.92, 1080408056.04, 1361399830.0, 2060653370.94,
                //     2977697988.79, 14391765302.31, 14401167776.24, 21056486961.48, 16842091335.72,
                //     13007583263.1, 23760339221.0, 14788492332.9, 24281291124.0, 29905612271.35,
                //     27604568360.96, 20427701896.28, 11384171455.83, 9260016582.6, 17437386251.7,
                //     33290744596.54, 21221477193.4, 5278900379.84, 2736090823.76,
                // ]
                // 占比
                // return [
                //     0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.7799999999999999, 1.09, 2.31, 2.59,
                //     3.1300000000000003, 2.3, 1.26, 1.66, 1.69, 1.9900000000000002, 0.97, 1.02, 0.64,
                //     0.84, 0.97, 2.23, 2.12, 1.6199999999999999, 1.06, 0.62, 0.54,
                //     0.7100000000000001, 0.42, 0.5599999999999999, 0.36, 0.95, 1.31, 0.65, 0.32,
                //     0.33, 0.13, 0.1, 0.13, 0.2, 0.27999999999999997, 1.3, 1.25, 1.87,
                //     1.4500000000000002, 1.18, 2.29, 1.6, 2.15, 2.7199999999999998, 2.45, 1.6, 0.89,
                //     0.58, 0.8500000000000001, 1.28, 0.8099999999999999, 0.18, 0.09,
                // ]
            },
        },
        /**
         * 分析类型 数量0, 市值1, 占比2
         */
        analyzeType: {
            type: Number as () => AnalyzeType,
            default: AnalyzeType.VOL_HLD_STOCK,
        },
        /**
         * 数据来源 1日频  2季报  3年报
         */
        reportType: {
            type: Number as () => ReportType,
            default: ReportType.QUAETER,
        },
        /**
         * chart样式
         */
        chartStyle: {
            type: Object,
            default: () => {
                return {
                    width: '100%',
                    height: '35rem',
                }
            },
        },
        /**
         * chart样式
         */
        fullScreenStyle: {
            type: Object,
            default: () => {
                return {
                    right: '1.6rem',
                }
            },
        },
        /**
         * 是否支持大屏查看
         */
        showFullScreen: {
            type: Boolean,
            default: true,
        },
        /**
         * 自适应刷新
         */
        autoResize: {
            type: Boolean,
            default: true,
        },
        /**
         * 数据更新动画
         */
        animation: {
            type: Boolean,
            default: true,
        },
        /**
         * 主题颜色
         */
        themeColor: {
            type: String,
            default: '#D65928',
        },
        /**
         * 十字点追踪（开启后对性能有一定影响）
         */
        pointTrace: {
            type: Boolean,
            default: false,
        },
    },
    emits: {
        /**
         * 大屏查看
         */
        argeScreen: () => {
            return true
        },
    },
    setup(props, context) {
        // provide(LOADING_OPTIONS_KEY, { notMerge: true })
        // :update-options="{notMerge:true}"
        // 主题
        // provide(THEME_KEY, props.themeKey)
        const selectDateIndex = ref(3)
        // 时间切换列表
        const dateList = computed(() => {
            return props.reportType === ReportType.DAY
                ? [
                      //   {
                      //       selected: false,
                      //       value: '近一天',
                      //   },
                      {
                          selected: false,
                          value: '近一周',
                      },
                      {
                          selected: false,
                          value: '近一月',
                      },
                      {
                          selected: true,
                          value: '近三月',
                      },
                      {
                          selected: false,
                          value: '近半年',
                      },
                  ]
                : [
                      {
                          selected: false,
                          value: '近一年',
                      },
                      {
                          selected: false,
                          value: '近三年',
                      },
                      {
                          selected: false,
                          value: '近五年',
                      },
                      {
                          selected: true,
                          value: '历史以来',
                      },
                  ]
        })
        // 标题
        const echartsName = computed(() => {
            if (props.analyzeType === AnalyzeType.VOL_HLD_STOCK) {
                return '数量'
            }
            if (props.analyzeType === AnalyzeType.HLD_MKT_VALUE) {
                return '市值'
            }
            if (props.analyzeType === AnalyzeType.MKT_VAL_NET_ASSET) {
                return '持仓占比'
            }
            return '标题'
        })
        // 格式化时间数据
        const dateformat = (date: string) => {
            if (!date) {
                return date
            }
            if (String(date).length === 8) {
                date = date.slice(0, 4) + '/' + date.slice(4, 6) + '/' + date.slice(6, 8)
            }
            return date
        }
        // 显示的数据
        const showData = computed(() => {
            const xData = props.xData
            const yData = props.yData
            // 成立以来
            if (selectDateIndex.value >= 3) {
                return {
                    xData,
                    yData,
                }
            }
            let len = xData.length
            let nowStimestamp = new Date().getTime()
            if (len > 0) {
                nowStimestamp =
                    props.reportType == ReportType.DAY
                        ? new Date(dateformat(xData[len - 1])).getTime()
                        : new Date(xData[len - 1].replace(/-/g, '/')).getTime()
            }
            // 近一年（日频近一天）
            if (selectDateIndex.value === 0) {
                let index = xData.findIndex((item) => {
                    if (props.reportType == ReportType.DAY) {
                        let date = dateformat(item)
                        let timestamp = new Date(date).getTime()
                        // return Math.ceil((nowStimestamp - timestamp) / 86400000) <= 1 + 1
                        return Math.ceil((nowStimestamp - timestamp) / 86400000) <= 7 + 1
                    } else {
                        let date = item.replace(/-/g, '/')
                        let timestamp = new Date(date).getTime()
                        return Math.ceil((nowStimestamp - timestamp) / 86400000) <= 366
                    }
                })
                // if (props.reportType == ReportType.DAY && xData.length > 2) {
                //     index = xData.length - 2
                // }
                return {
                    xData: xData.slice(index),
                    yData: yData.slice(index),
                }
            }
            // 近三年（日频近一周）
            if (selectDateIndex.value === 1) {
                let index = xData.findIndex((item) => {
                    if (props.reportType == ReportType.DAY) {
                        let date = dateformat(item)
                        let timestamp = new Date(date).getTime()
                        // return Math.ceil((nowStimestamp - timestamp) / 86400000) <= 7 + 1
                        return Math.ceil((nowStimestamp - timestamp) / 86400000) <= 30 + 1
                    } else {
                        let date = item.replace(/-/g, '/')
                        let timestamp = new Date(date).getTime()
                        return Math.ceil((nowStimestamp - timestamp) / 86400000) <= 366 * 3
                    }
                })
                return {
                    xData: xData.slice(index),
                    yData: yData.slice(index),
                }
            }
            // 近五年（日频近一月）
            if (selectDateIndex.value === 2) {
                let index = xData.findIndex((item) => {
                    if (props.reportType == ReportType.DAY) {
                        let date = dateformat(item)
                        let timestamp = new Date(date).getTime()
                        // return Math.ceil((nowStimestamp - timestamp) / 86400000) <= 30 + 1
                        return Math.ceil((nowStimestamp - timestamp) / 86400000) <= 91 + 1
                    } else {
                        let date = item.replace(/-/g, '/')
                        let timestamp = new Date(date).getTime()
                        return Math.ceil((nowStimestamp - timestamp) / 86400000) <= 366 * 5
                    }
                })
                return {
                    xData: xData.slice(index),
                    yData: yData.slice(index),
                }
            }
            return {
                xData,
                yData,
            }
        })
        /**
         * 点类型
         */
        const symbolType = computed(() => {
            if (showData.value.yData.length <= 1) {
                return 'circle'
            }
            return 'none'
        })
        // 数据的最小值和最大值
        // const dataMaxMin = computed(() => {
        //     const valueArr = showData.value.yData
        //     if (valueArr.length <= 0) {
        //         return {
        //             max: 100,
        //             min: 0,
        //         }
        //     }
        //     if (valueArr.length === 1) {
        //         return {
        //             max: 2 * valueArr[0],
        //             min: 0,
        //         }
        //     }
        //     let max = null
        //     let min = null
        //     for (let value of valueArr) {
        //         if (max === null || max < value) {
        //             max = value
        //         }
        //         if (min === null || min > value) {
        //             min = value
        //         }
        //     }
        //     if (max !== null && min !== null) {
        //         const diffValue = max - min
        //         return {
        //             max: max + diffValue / 8,
        //             min: min - diffValue / 8,
        //         }
        //     }
        //     if (min == null) {
        //         return {
        //             max: max,
        //             min: 0,
        //         }
        //     }
        //     return {
        //         max: 100,
        //         min: min,
        //     }
        // })
        /**
         * MarkLine位置
         */
        const seriesMarkLineData = reactive({
            value: [] as ({ yAxis: number } | { xAxis: string })[],
        })
        // echarts option
        const echartsOption = computed(() => {
            return {
                animation: props.animation,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: props.pointTrace ? 'none' : 'line',
                        axis: 'x',
                        snap: true,
                        label: {
                            backgroundColor: '#000000',
                        },
                        lineStyle: {
                            type: 'dashed',
                        },
                    },
                    formatter: (values: TooltipItem[]) => {
                        if (values.length <= 0) {
                            return '数据格式错误'
                        }
                        let item = values[0]
                        let number = 'err'
                        let valueTitle = '标题'
                        if (props.analyzeType === AnalyzeType.VOL_HLD_STOCK) {
                            valueTitle = '数量'
                            number = bigDataFormatter(item.value)
                        }
                        if (props.analyzeType === AnalyzeType.HLD_MKT_VALUE) {
                            valueTitle = '市值'
                            number = moneyFormatter(item.value)
                        }
                        if (props.analyzeType === AnalyzeType.MKT_VAL_NET_ASSET) {
                            valueTitle = '持仓占比'
                            number = `${removeZeroSuffix(item.value.toFixed(2))}%`
                        }
                        return `${item.axisValue.replace(/-/g, '.')}<br/>${
                            item.marker
                        } ${valueTitle}：${number}`
                    },
                },
                grid: {
                    left: '8',
                    right: '10',
                    top: '10',
                    bottom: '10',
                    containLabel: true,
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: true,
                    data: showData.value.xData,
                    splitNumber: 3,
                    axisLine: {
                        // x轴
                        show: true,
                        onZero: false,
                        lineStyle: {
                            color: '#CCCCCC',
                        },
                    },
                    axisTick: {
                        // x轴刻度线
                        show: true,
                        alignWithLabel: true,
                    },
                    splitLine: {
                        // x网格线
                        show: false,
                    },
                    axisLabel: {
                        show: true,
                        fontSize: 10,
                        color: '#666666',
                        formatter: (value: string) => {
                            return value.replace(/-/g, '.')
                        },
                    },
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        // y轴
                        show: true,
                        lineStyle: {
                            color: '#CCCCCC',
                        },
                    },
                    axisTick: {
                        // y轴刻度线
                        show: false,
                    },
                    splitLine: {
                        // y网格线
                        show: true,
                        lineStyle: {
                            type: 'dashed',
                        },
                    },
                    axisLabel: {
                        show: true,
                        fontSize: 10,
                        color: '#666666',
                        formatter: (value: number, index: number) => {
                            if (index <= 0) {
                                return ''
                            }
                            if (props.analyzeType === AnalyzeType.VOL_HLD_STOCK) {
                                return bigDataFormatter(value)
                            }
                            if (props.analyzeType === AnalyzeType.HLD_MKT_VALUE) {
                                return moneyFormatter(value)
                            }
                            if (props.analyzeType === AnalyzeType.MKT_VAL_NET_ASSET) {
                                return `${removeZeroSuffix(value.toFixed(2))}%`
                            }
                            return value
                        },
                    },
                    // min: dataMaxMin.value.min,
                    // max: dataMaxMin.value.max,
                },
                // dataZoom: [
                //     {
                //         start: 0,
                //         end: 50,
                //         type: 'inside',
                //     },
                //     {
                //         id: 'dataZoomX',
                //         type: 'slider',
                //         xAxisIndex: [0],
                //         filterMode: 'filter',
                //     },
                // ],
                series: [
                    {
                        name: echartsName.value,
                        type: 'line',
                        itemStyle: {
                            color: props.themeColor,
                            decal: {
                                symbol: 'circle',
                            },
                        },
                        lineStyle: {
                            color: props.themeColor,
                            symbol: 'none',
                        },
                        emphasis: {
                            lineStyle: {
                                width: 1.8, // hover时的折线宽度
                            },
                        },
                        markLine: {
                            symbol: 'none', //去掉箭头
                            animation: false,
                            label: {
                                show: false,
                            },
                            lineStyle: {
                                color: '#8F8F8F',
                                type: 'dashed',
                                width: 1, // 正常时的折线宽度
                            },
                            emphasis: {
                                disabled: true, // 从 v5.3.0 开始支持
                                lable: {
                                    show: false,
                                },
                                lineStyle: {
                                    color: '#8F8F8F',
                                    type: 'dashed',
                                    width: 1, // 正常时的折线宽度
                                },
                            },
                            data: seriesMarkLineData.value,
                        },
                        data: showData.value.yData.map((value, index) => {
                            return {
                                value,
                                symbol: symbolType.value,
                            }
                        }),
                    },
                ],
            }
        })
        const argeScreenAction = () => {
            context.emit('argeScreen')
        }
        const onDateAction = (index: number) => {
            selectDateIndex.value = index
        }
        // 图标自适应相关
        // const vEchart: Ref<typeof VChart | null> = ref(null)
        const vEchart: Ref<any | null> = ref(null)
        /**
         * 导出chart
         */
        const chart = computed(() => {
            const nowChart = vEchart.value
            if (nowChart === null) {
                return null
            }
            return nowChart.chart
        })
        /**
         * 大小自适应
         */
        const resizeChart = () => {
            const chartValue = vEchart.value
            if (!chartValue) {
                return
            }
            const eChart = chartValue.chart
            if (!eChart) {
                return
            }
            eChart.resize()
        }
        if (props.autoResize) {
            onMounted(() => {
                window.addEventListener('resize', resizeChart)
            })
            onBeforeUnmount(() => {
                window.removeEventListener('resize', resizeChart)
            })
        }
        // 监听
        watchEffect(() => {
            if (!props.pointTrace) {
                return
            }
            const chartValue = vEchart.value
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
        context.expose({
            resizeChart,
            chart,
        })

        return {
            vEchart,
            selectDateIndex,
            dateList,
            echartsOption,
            argeScreenAction,
            onDateAction,
        }
    },
    components: {
        DwLineChart,
    },
})
</script>

<style lang="scss" scoped>
.dw-stocks-analysis-line {
    --charts-bottom-normal-bg-color: #ffffff;
    --charts-bottom-normal-text-color: #191919;
    --charts-bottom-select-bg-color: var(--themeColor);
    --charts-bottom-select-text-color: #ffffff;
}
.dw-stocks-analysis-line {
    box-sizing: border-box;
    max-height: 100vh;
    max-width: 100vw;
    width: 100%;
    // height: 34.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: relative;

    .dw-stocks-analysis-content {
        width: 100%;
        // height: 30.5rem;
        position: relative;
        .dw-stocks-analysis-chart {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
        }
        .check-icon {
            position: absolute;
            right: 1.6rem;
            bottom: 2.8rem;
            width: 2.8rem;
            text-align: center;
            height: 2.8rem;
        }
        // .tooltip-content {
        //     position: absolute;
        //     top: 0rem;
        //     left: 0rem;
        //     display: flex;
        //     align-items: center;
        //     background: rgba(#535353, 0.3);
        //     border-radius: 0.8rem;
        //     padding: 0.8rem;
        //     .tooltip-content-left {
        //         width: 0.5rem;
        //         min-height: 3.2rem;
        //         background: #d65928;
        //     }
        //     .tooltip-content-right {
        //         display: flex;
        //         flex-direction: column;
        //         justify-content: center;
        //         margin-left: 1rem;
        //         align-items: center;
        //         .tooltip-content-date {
        //             font-size: 1rem;
        //             font-family: PingFangSC-Regular, PingFang SC;
        //             font-weight: 400;
        //             line-height: 1.6rem;
        //             color: #d65928;
        //         }
        //         .tooltip-content-value {
        //             font-size: 1rem;
        //             font-family: PingFangSC-Regular, PingFang SC;
        //             font-weight: 400;
        //             line-height: 1.6rem;
        //             color: #d65928;
        //         }
        //     }
        // }
    }
    .load-content {
        position: absolute;
        width: 100%;
        // height: 30.5rem;
        top: 0rem;
        left: 0rem;
        flex-grow: 0;
        flex-shrink: 0;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .charts-bottom {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        flex-grow: 0;
        flex-shrink: 0;
        .charts-bottom-item {
            flex-grow: 1;
            .charts-bottom-value {
                font-size: 1.5rem;
                font-family: PingFang SC-Medium, PingFang SC;
                font-weight: 500;
                color: var(--charts-bottom-normal-text-color);
                line-height: 4rem;
                padding: 0rem 1rem;
                background: var(--charts-bottom-normal-bg-color);
                text-align: center;
            }
            .charts-bottom-select-value {
                font-size: 1.5rem;
                font-family: PingFang SC-Medium, PingFang SC;
                font-weight: 500;
                color: var(--charts-bottom-select-text-color);
                line-height: 4rem;
                padding: 0rem 1rem;
                background: var(--charts-bottom-select-bg-color);
                text-align: center;
            }
        }
    }
}
// /*横屏*/
// @media (orientation: landscape) {
//     .dw-stocks-analysis-line {
//         .dw-stocks-analysis-content {
//             .dw-stocks-analysis-chart {
//                 padding: 0rem 3rem;
//             }
//             .check-icon {
//                 right: 4.6rem;
//             }
//         }
//     }
// }

// /*竖屏*/
// @media (orientation: portrait) {
//     .dw-stocks-analysis-line {
//         .dw-stocks-analysis-content {
//             .dw-stocks-analysis-chart {
//                 padding: 0rem;
//             }
//             .check-icon {
//                 right: 1.6rem;
//             }
//         }
//     }
// }
</style>
