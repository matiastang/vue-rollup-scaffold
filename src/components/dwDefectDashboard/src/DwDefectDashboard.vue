<!--
 * @Author: matiastang
 * @Date: 2022-05-06 14:01:32
 * @LastEditors: matiastang
 * @LastEditTime: 2022-05-19 14:59:23
 * @FilePath: /dw-vue-components/components/dwDefectDashboard/src/DwDefectDashboard.vue
 * @Description: 仪表盘比例显示
-->
<template>
    <canvas
        :id="`dw-dashboard-canvas-${id}`"
        class="dw-canvas"
        :style="{
            width: '124px',
            height: '90px',
            background: 'white',
            zoom: 0.5,
        }"
    >
    </canvas>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

/**
 * point
 */
interface Point {
    x: number
    y: number
}

export default defineComponent({
    name: 'DwDefectDashboard',
    props: {
        id: {
            type: String,
            default: 'id',
        },
        /**
         * 百分比
         */
        percentage: {
            type: Number,
            default: 100,
        },
        /**
         * 角速度
         */
        angularSpeed: {
            type: Number,
            default: 3,
        },
        /**
         * 起始颜色
         */
        startColor: {
            type: String,
            default: '#FFCECE',
        },
        /**
         * 结束颜色
         */
        endColor: {
            type: String,
            default: '#FF2E2E',
        },
    },
    setup(props) {
        /**
         * 初始化
         * @param ctx
         * @param width
         * @param height
         * @param value
         * @param startColor
         * @param endColor
         */
        const initCanvas = (
            ctx: CanvasRenderingContext2D,
            width: number,
            height: number,
            value: number,
            speed: number,
            startColor: string,
            endColor: string
        ) => {
            const lineWidth = 8
            const radius = width / 2 //中间
            const centerPoint = {
                x: radius,
                y: radius,
            } as Point // 中间点
            const circleR = radius - 12 //圆半径
            const startAngle = -Math.PI //开始角度
            const endAngle = startAngle + (value * Math.PI) / 100 //结束角度
            ctx.clearRect(0, 0, width, height) // 清理
            initBgArc(ctx, centerPoint, circleR, lineWidth, startAngle, startAngle + Math.PI)
            initScale(ctx, centerPoint, radius, Math.PI / 6, 3, 6, 23)
            let xAngle = speed * (Math.PI / 180) //偏移角度量
            let tmpAngle = startAngle //临时角度变量 //渲染函数
            rander(
                ctx,
                xAngle,
                startAngle,
                endAngle,
                tmpAngle,
                lineWidth,
                radius,
                circleR,
                startColor,
                endColor,
                value
            )
        }

        /**
         * 动态渲染
         * @param ctx
         * @param xAngle
         * @param startAngle
         * @param endAngle
         * @param tmpAngle
         * @param lineWidth
         * @param radius
         * @param circleR
         * @param startColor
         * @param endColor
         * @param value
         */
        const rander = (
            ctx: CanvasRenderingContext2D,
            xAngle: number,
            startAngle: number,
            endAngle: number,
            tmpAngle: number,
            lineWidth: number,
            radius: number,
            circleR: number,
            startColor: string,
            endColor: string,
            value: number
        ) => {
            if (tmpAngle >= endAngle) {
                if (value === 0) {
                    // 文字
                    ctx.clearRect(radius - 26, radius - 16, 52, 40) // 清除画布
                    ctx.fillStyle = '#191919'
                    ctx.font = '36px Microsoft Yahei'
                    ctx.textAlign = 'center'
                    ctx.fillText(`${value}`, radius, radius + 12)
                    // 三角形
                    initTriangle(
                        ctx,
                        {
                            x: radius,
                            y: radius,
                        },
                        circleR + 10,
                        tmpAngle + Math.PI,
                        9,
                        endColor
                    )
                }
                return
            } else if (tmpAngle + xAngle > endAngle) {
                tmpAngle = endAngle
            } else {
                tmpAngle += xAngle
            }
            ctx.beginPath()
            ctx.lineWidth = lineWidth
            const grad = ctx.createLinearGradient(0, 0, radius, 0) //创建一个渐变色线性对象
            grad.addColorStop(0, startColor) //定义渐变色颜色
            grad.addColorStop(1, endColor)
            ctx.strokeStyle = grad
            ctx.arc(radius, radius, circleR, startAngle, tmpAngle) //画圈
            ctx.lineCap = 'round'
            ctx.stroke()
            // 文字
            ctx.clearRect(radius - 26, radius - 16, 52, 40) // 清除画布
            ctx.fillStyle = '#191919'
            ctx.font = '36px Microsoft Yahei'
            ctx.textAlign = 'center'
            ctx.fillText(
                `${Math.round(((tmpAngle - startAngle) / (endAngle - startAngle)) * value)}`,
                radius,
                radius + 12
            )
            // 三角形
            initTriangle(
                ctx,
                {
                    x: radius,
                    y: radius,
                },
                circleR + 10,
                tmpAngle + Math.PI,
                9,
                endColor
            )
            requestAnimationFrame(() => {
                rander(
                    ctx,
                    xAngle,
                    startAngle,
                    endAngle,
                    tmpAngle,
                    lineWidth,
                    radius,
                    circleR,
                    startColor,
                    endColor,
                    value
                )
            })
        }

        /**
         * 绘制背景圆弧
         * @param ctx
         * @param centrePoint
         * @param radius
         * @param lineWidth
         * @param start
         * @param end
         */
        const initBgArc = (
            ctx: CanvasRenderingContext2D,
            centrePoint: Point,
            radius: number,
            lineWidth: number,
            start: number,
            end: number
        ) => {
            ctx.beginPath()
            ctx.lineWidth = lineWidth
            ctx.lineCap = 'round'
            ctx.strokeStyle = '#A4A4A4'
            ctx.arc(centrePoint.x, centrePoint.y, radius, start, end) //画圈

            ctx.fillStyle = '#404040'
            ctx.font = '20px Microsoft Yahei'
            ctx.textAlign = 'center'
            ctx.fillText('0', lineWidth / 2 + 8, centrePoint.y + 25)

            ctx.fillStyle = '#404040'
            ctx.font = '20px Microsoft Yahei'
            ctx.textAlign = 'center'
            ctx.fillText('100', centrePoint.x + radius - 3, centrePoint.y + 25)

            ctx.stroke()
        }

        /**
         * 绘制刻度线
         * @param ctx
         * @param radius
         * @param lineWidth
         * @param diffAngle
         * @param start
         */
        const initScale = (
            ctx: CanvasRenderingContext2D,
            centrePoint: Point,
            radius: number,
            diffAngle: number,
            lineWidth: number,
            lineLen: number,
            gap: number
        ) => {
            for (let i = 0; i < 7; i++) {
                ctx.save()
                ctx.beginPath()
                let rad = i * diffAngle
                let startX = radius - Math.cos(rad) * (radius - gap)
                let startY = radius - Math.sin(rad) * (radius - gap)
                let endX = radius - Math.cos(rad) * (radius - gap - lineLen)
                let endY = radius - Math.sin(rad) * (radius - gap - lineLen)
                ctx.moveTo(startX, startY)
                ctx.lineWidth = lineWidth
                ctx.lineTo(endX, endY)
                ctx.strokeStyle = '#C4C4C4'
                ctx.stroke()
            }
        }

        /**
         * 指标三角
         * @param ctx
         * @param centrePoint
         * @param radius
         * @param angle
         * @param sideLine
         * @param color
         */
        const initTriangle = (
            ctx: CanvasRenderingContext2D,
            centrePoint: Point,
            radius: number,
            angle: number,
            sideLine: number,
            color: string
        ) => {
            const line = sideLine / (2 * Math.cos(Math.PI / 6))
            ctx.beginPath()
            ctx.lineWidth = line * 2 + 1
            ctx.lineCap = 'round'
            ctx.strokeStyle = '#FFFFFF'
            ctx.arc(centrePoint.x, centrePoint.y, radius - 1, -Math.PI, 0) //画圈
            ctx.stroke()

            const radiusX = radius - line
            const pointOnex = radiusX * Math.cos(angle)
            const pointOney = radiusX * Math.sin(angle)

            const pointTwox = pointOnex + sideLine * Math.cos(angle - Math.PI / 6)
            const pointTwoy = pointOney + sideLine * Math.sin(angle - Math.PI / 6)

            const pointThreex = pointOnex + sideLine * Math.cos(angle + Math.PI / 6)
            const pointThreey = pointOney + sideLine * Math.sin(angle + Math.PI / 6)
            ctx.beginPath()
            ctx.moveTo(centrePoint.x - pointOnex, centrePoint.y - pointOney)
            ctx.lineTo(centrePoint.x - pointTwox, centrePoint.y - pointTwoy)
            ctx.lineTo(centrePoint.x - pointThreex, centrePoint.y - pointThreey)
            ctx.lineWidth = 1
            ctx.strokeStyle = color
            ctx.fillStyle = color
            ctx.fill() // 自动closePath
            ctx.stroke()
        }

        const gradientColor = (start: string, end: string, proportion: number) => {
            let startR = hex2int('ff')
            let startG = hex2int('00')
            let startB = hex2int('00')
            let endR = hex2int('00')
            let endG = hex2int('00')
            let endB = hex2int('ff')
            return (
                '0x' +
                int2hex(startR - (startR - endR) * proportion) +
                int2hex((endG - startG) * proportion + startG) +
                int2hex((endB - startB) * proportion + startB)
            )
        }

        function hex2int(hex: string) {
            let len = hex.length,
                a = new Array(len),
                code
            for (let i = 0; i < len; i++) {
                code = hex.charCodeAt(i)
                if (48 <= code && code < 58) {
                    code -= 48
                } else {
                    code = (code & 0xdf) - 65 + 10
                }
                a[i] = code
            }

            return a.reduce(function (acc, c) {
                acc = 16 * acc + c
                return acc
            }, 0)
        }

        function int2hex(num: number, width = 2) {
            let hex = '0123456789abcdef'
            let s = ''
            while (num) {
                s = hex.charAt(num % 16) + s
                num = Math.floor(num / 16)
            }
            if (typeof width === 'undefined' || width <= s.length) {
                // return '0x' + s
                return s
            }
            let delta = width - s.length
            let padding = ''
            while (delta-- > 0) {
                padding += '0'
            }
            // return '0x' + padding + s
            return padding + s
        }

        onMounted(() => {
            let canvas = document.getElementById(
                `dw-dashboard-canvas-${props.id}`
            ) as HTMLCanvasElement | null
            if (canvas && canvas.getContext) {
                let ctx = canvas.getContext('2d')
                if (!ctx) {
                    console.warn('canvas获取context失败')
                    return
                }
                let value = props.percentage
                if (value === undefined) {
                    console.warn('请传入percentage')
                    return
                }
                if (value < 0) {
                    console.warn('percentage在>=0')
                    value = 0
                }
                if (value > 100) {
                    console.warn('percentage在<=100')
                    value = 100
                }
                let canvasW = (canvas.width = 124)
                let canvasH = (canvas.height = 90)
                initCanvas(
                    ctx,
                    canvasW,
                    canvasH,
                    value,
                    props.angularSpeed,
                    props.startColor || '#FFCECE',
                    props.endColor || '#FF2E2E'
                )
            }
        })
    },
})
</script>
