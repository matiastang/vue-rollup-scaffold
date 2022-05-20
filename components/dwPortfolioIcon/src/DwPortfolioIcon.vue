<!--
 * @Author: matiastang
 * @Date: 2022-01-11 15:48:23
 * @LastEditors: matiastang
 * @LastEditTime: 2022-05-19 13:25:54
 * @FilePath: /dw-vue-components/components/dwPortfolioIcon/src/DwPortfolioIcon.vue
 * @Description: 西筹“基金组合”组合策略折线icon
-->
<template>
    <div class="dw-portfolio-icon">
        <VChart class="dw-portfolio-chart" :option="echartsOption" :style="chartStyle" />
        <div class="dw-portfolio-chart-title" v-if="maxDownValue >= 0" :style="downStyle">
            {{ `最大回撤${maxDownValue.toFixed(1)}%` }}
        </div>
    </div>
</template>

<script lang="ts">
import { provide, computed, defineComponent } from 'vue'
// import { use } from 'echarts/core'
// import { CanvasRenderer } from 'echarts/renderers'
// import { LineChart } from 'echarts/charts'
// import { GridComponent } from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'

// use([CanvasRenderer, LineChart, GridComponent])

export default defineComponent({
    name: 'DwPortfolioIcon',
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
                    '20190110',
                    '20190111',
                    '20190114',
                    '20190115',
                    '20190116',
                    '20190117',
                    '20190118',
                    '20190121',
                    '20190122',
                    '20190123',
                    '20190124',
                ]
            },
        },
        /**
         * y轴数据
         */
        yData: {
            type: Array as () => number[],
            default: () => {
                return [
                    0, 0.003022708654423445, -0.00038571617091032184, 0.008426499095755213,
                    0.009789554563905511, 0.006449714993086664, 0.014593507337695488,
                    0.01726657507247631, 0.01223089135557398, 0.013852418194356453,
                    0.017638169438839446,
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
                    width: '9.6rem',
                    height: '10rem',
                }
            },
        },
        /**
         * 最大回撤点，x轴数据
         */
        maxDownDate: {
            type: String,
            default: '20190117',
        },
        /**
         * 最大回撤值
         */
        maxDownValue: {
            type: Number,
            default: 1,
        },
        /**
         * 最大回撤样式
         */
        downStyle: {
            type: Object,
            default: () => {
                return {}
            },
        },
    },
    setup(props) {
        // 主题
        provide(THEME_KEY, props.themeKey)
        // 最大回撤位置
        const maxIndex = computed(() => {
            const index = props.xData.findIndex((value) => {
                return value === props.maxDownDate
            })
            return index !== -1 ? index : 0
        })
        // echarts option
        const echartsOption = computed(() => {
            return {
                grid: {
                    left: '0',
                    right: '0',
                    top: '10',
                    bottom: '10',
                    containLabel: false,
                },
                xAxis: {
                    show: false,
                    type: 'category',
                    boundaryGap: false,
                    data: props.xData,
                },
                yAxis: {
                    show: false,
                },
                series: [
                    {
                        type: 'line',
                        lineStyle: {
                            color: '#F93E47',
                            width: 1,
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
                                        color: '#FFC7C5', // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: '#FDEFEA', // 100% 处的颜色
                                    },
                                ],
                                global: false, // 缺省为 false
                            },
                        },
                        showAllSymbol: true,
                        smooth: true,
                        emphasis: {
                            lineStyle: {
                                width: 1, // hover时的折线宽度
                            },
                        },
                        data: props.yData.map((value, index) => {
                            return {
                                value,
                                itemStyle: {
                                    color: '#58D74D',
                                    borderColor: '#FFFFFF',
                                },
                                symbol: index === maxIndex.value ? 'circle' : 'none',
                                symbolSize: 4,
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
.dw-portfolio-icon {
    max-height: 100vh;
    max-width: 100vw;
    width: 9.6rem;
    height: 10rem;
    background-color: #fdefea;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    .dw-portfolio-chart {
        width: 100%;
        height: 100%;
    }
    .dw-portfolio-chart-title {
        position: absolute;
        width: 100%;
        left: 0rem;
        bottom: 0.5rem;
        font-size: 1rem;
        font-family: PingFang SC-Medium, PingFang SC;
        font-weight: 500;
        color: #58d74d;
        line-height: 1.2rem;
        text-align: center;
    }
}
</style>
