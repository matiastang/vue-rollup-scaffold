<!--
 * @Author: matiastang
 * @Date: 2022-02-11 17:52:50
 * @LastEditors: matiastang
 * @LastEditTime: 2022-03-10 18:53:06
 * @FilePath: /dw-vue-components/components/dwFilterArea/src/DwFilterArea.vue
 * @Description: DwFilterArea
-->
<template>
    <div class="dw-area">
        <canvas ref="areaCanvasElement" class="dw-area-canvas"></canvas>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref, toRefs, computed, onMounted, nextTick, watchEffect } from 'vue'
import { ChartItem, CanvasItem } from './interface'

export default defineComponent({
    name: 'DwFilterArea',
    props: {
        /**
         * 图谱数据
         */
        chartData: {
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
    },
    setup(props, context) {
        const { chartData, start, end, bgColor, rangeColor } = toRefs(props)
        const areaCanvasElement: Ref<HTMLCanvasElement | null> = ref(null)
        // 大于
        // 是否隐藏大于，当单边小于时隐藏
        const greaterHidden = computed(() => {
            return start.value < 0
        })
        // 小于
        // 是否隐藏小于，当单边大于时隐藏
        const lessHidden = computed(() => {
            return end.value > 101
        })
        /**
         * 获取渲染点集
         * @param width 画布宽
         * @param height 画布高
         */
        const generatePoints = (width: number, height: number) => {
            const data = chartData.value
            const len = data.length
            const pts: CanvasItem[] = []
            if (len <= 0) {
                return pts
            }
            // 支持负数
            const max = Math.max(...data.map((it) => it.number))
            const min = Math.min(...data.map((it) => it.number))
            let diff = 0
            if (min < 0) {
                diff = Math.abs(min)
            }
            for (let i = 0; i < len; i++) {
                const item = data[i]
                const value = item.number
                // TIXME: - 0 / 0
                pts.push({
                    x: (i / (len - 1)) * width,
                    y: ((max - value) / (max + diff)) * height,
                })
            }
            return pts
        }
        /**
         * 渲染点
         * @param ctx 上下问
         * @param pts 点集
         * @param width 总宽度
         */
        const renderPoints = (
            ctx: CanvasRenderingContext2D,
            pts: CanvasItem[],
            width: number,
            height: number
        ) => {
            const heightMax = height
            // 背景
            ctx.save()
            ctx.beginPath()
            ctx.moveTo(0, heightMax)
            ctx.fillStyle = bgColor.value
            pts.forEach((pt) => ctx.lineTo(pt.x, pt.y))
            // now define the bottom of the filled area
            // draw the missing parts
            ctx.lineTo(pts[pts.length - 1].x, heightMax) // bottom-right
            ctx.lineTo(pts[0].x, heightMax) // bottom-left
            // ctx.globalCompositeOperation = "destination-over"; // draw behind
            ctx.closePath()
            ctx.fill() // will close the path for us
            ctx.restore()
            // 范围
            let _start = 0
            let _end = width
            if (!greaterHidden.value) {
                _start = (start.value / 100) * width
            }
            if (!lessHidden.value) {
                _end = (end.value >= 101 ? 0 : end.value / 100) * width
            }
            // const ract_pts = pts.filter((it) => it.x >= _start && it.x <= _end)
            const ract_pts = rangePoints(pts, _start, _end)
            if (ract_pts.length > 0) {
                ctx.beginPath()
                ctx.moveTo(ract_pts[0].x, heightMax)
                ctx.fillStyle = rangeColor.value
                ract_pts.forEach((pt) => ctx.lineTo(pt.x, pt.y))
                ctx.lineTo(ract_pts[ract_pts.length - 1].x, heightMax) // bottom-right
                ctx.closePath()
                ctx.fill() // will close the path for us
            }
            ctx.globalCompositeOperation = 'source-over' // normal behavior
        }
        /**
         * 获取显示范围
         * @param pts 点集
         * @param start 开始
         * @param end 结束
         */
        const rangePoints = (pts: CanvasItem[], startValue: number, endValue: number) => {
            const rpts: CanvasItem[] = []
            for (let index = 0; index < pts.length; index++) {
                const item = pts[index]
                if (startValue === item.x) {
                    // 开始位置
                    rpts.push(item)
                }
                if (endValue === item.x) {
                    // 结束位置
                    rpts.push(item)
                    break
                }
                if (index < pts.length - 1) {
                    const nextItem = pts[index + 1]
                    if (startValue < item.x && endValue > item.x) {
                        rpts.push(item)
                    }
                    // 起点处理
                    if (startValue > item.x && startValue < nextItem.x) {
                        const startY =
                            ((nextItem.y - item.y) * (startValue - item.x)) /
                                (nextItem.x - item.x) +
                            item.y
                        rpts.push({
                            x: startValue,
                            y: startY,
                        })
                    }
                    // 终点处理
                    if (endValue > item.x && endValue < nextItem.x) {
                        const endY =
                            ((nextItem.y - item.y) * (endValue - item.x)) / (nextItem.x - item.x) +
                            item.y
                        rpts.push({
                            x: endValue,
                            y: endY,
                        })
                    }
                }
            }
            return rpts
        }
        /**
         * 渲染
         */
        const draw = () => {
            const canvas = areaCanvasElement.value
            if (!canvas) {
                return
            }
            const canvasContext = canvas.getContext('2d')
            if (!canvasContext) {
                return
            }
            // const ratio = window.devicePixelRatio || 1
            // canvasContext.scale(ratio, ratio)
            const width = canvas.width
            const height = canvas.height
            canvasContext.clearRect(0, 0, width, height)
            // 获取点
            const pts = generatePoints(width, height)
            // 渲染点
            renderPoints(canvasContext, pts, width, height)
        }

        watchEffect(() => {
            nextTick(() => {
                window.requestAnimationFrame(draw)
            })
            return start.value
        })

        watchEffect(() => {
            nextTick(() => {
                window.requestAnimationFrame(draw)
            })
            return end.value
        })

        watchEffect(() => {
            nextTick(() => {
                window.requestAnimationFrame(draw)
            })
            return chartData.value
        })

        onMounted(() => {
            nextTick(() => {
                window.requestAnimationFrame(draw)
            })
        })

        // 自适应相关
        // const resizeChart = () => {
        //     nextTick(() => {
        //         window.requestAnimationFrame(draw)
        //     })
        // }
        // if (props.autoResize) {
        //     onMounted(() => {
        //         window.addEventListener('resize', resizeChart)
        //     })
        //     onBeforeUnmount(() => {
        //         window.removeEventListener('resize', resizeChart)
        //     })
        // }
        // context.expose({
        //     resizeChart,
        // })

        return {
            areaCanvasElement,
        }
    },
})
</script>
<style lang="scss" scoped>
.dw-area {
    width: 100%;
    .dw-area-canvas {
        width: 100%;
    }
}
</style>
