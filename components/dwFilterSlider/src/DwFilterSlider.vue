<!--
 * @Author: matiastang
 * @Date: 2022-02-11 11:31:36
 * @LastEditors: matiastang
 * @LastEditTime: 2022-03-10 18:47:45
 * @FilePath: /dw-vue-components/components/dwFilterSlider/src/DwFilterSlider.vue
 * @Description: DwFilterSlider
-->
<template>
    <div class="dw-slider">
        <div class="dw-slider-track" ref="sliderTrackElement">
            <div
                v-if="!greaterHidden"
                aria-label="大于滑块"
                @touchstart="greaterTouchStart"
                @touchmove="greaterTouchMove"
                @touchend="greaterTouchEnd"
                class="dw-slider-greater"
                :style="{
                    left: `${greaterLeft}%`,
                }"
            >
                <slot name="greaterImg"></slot>
            </div>
            <div
                :style="{
                    left: `${leftWidth}%`,
                    width: `${rightWidth - leftWidth}%`,
                }"
                class="dw-slider-center-track"
            ></div>
            <div
                v-if="!lessHidden"
                aria-label="小于滑块"
                @touchstart="lessTouchStart"
                @touchmove="lessTouchMove"
                @touchend="lessTouchEnd"
                class="dw-slider-less"
                :style="{
                    left: `${lessLeft}%`,
                }"
            >
                <slot name="lessImg"></slot>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref, toRefs, computed } from 'vue'
export default defineComponent({
    name: 'DwFilterSlider',
    props: {
        /**
         * 开始位置, 当小于0时表示固定最小值为0
         */
        startValue: {
            type: Number,
            default: Number.MIN_SAFE_INTEGER,
        },
        /**
         * 结束位置, 当大于100时表示固定最大值为100
         */
        endValue: {
            type: Number,
            default: Number.MAX_SAFE_INTEGER,
        },
        /**
         * 开始位置与结束位置最小间隔
         */
        minDiff: {
            type: Number,
            default: 5,
        },
    },
    emits: {
        /**
         * 更新开始位置
         */
        'update:startValue': (value: number) => {
            return true
        },
        /**
         * 更新结束位置
         */
        'update:endValue': (value: number) => {
            return true
        },
        /**
         * 更新结束位置
         */
        minDiffWarn: (start: number, end: number, diff: number) => {
            return true
        },
    },
    setup(props, context) {
        const { startValue, endValue, minDiff } = toRefs(props)
        const sliderTrackElement: Ref<HTMLElement | null> = ref(null)
        const diff = computed(() => {
            if (minDiff.value < 0) {
                return 0
            }
            if (minDiff.value > 100) {
                return 100
            }
            return minDiff.value
        })
        // left百分比
        const leftWidth = computed(() => {
            if (startValue.value < 0) {
                return 0
            }
            return startValue.value > 100 ? 100 : startValue.value
        })
        // 大于
        // 是否隐藏大于，当单边小于时隐藏
        const greaterHidden = computed(() => {
            return startValue.value < -1
        })
        const greaterLeft = computed(() => {
            if (sliderTrackElement.value === null) {
                return startValue.value
            }
            // 总长
            const max = sliderTrackElement.value.clientWidth
            if (startValue.value < 0) {
                return -(14 / max) * 100
            }
            return startValue.value - (14 / max) * 100
        })
        const greaterMoving = ref(false)
        const greaterElement: Ref<HTMLElement | null> = ref(null)
        const greaterTouchStart = (e: TouchEvent) => {
            greaterMoving.value = true
        }
        const greaterTouchEnd = () => {
            greaterMoving.value = false
        }
        const greaterTouchMove = (e: TouchEvent) => {
            if (sliderTrackElement.value === null || !greaterMoving.value) {
                return
            }
            // left
            let x = e.changedTouches[0].clientX
            // 总长
            const max = sliderTrackElement.value.clientWidth
            if (x < 0) {
                x = 0
            }
            if (x > max) {
                x = max
            }
            const startValue = (x / max) * 100
            if (startValue < endValue.value && endValue.value - startValue >= diff.value) {
                context.emit('update:startValue', startValue)
            } else {
                console.warn(`end=${endValue.value}-start=${startValue}<diff=${diff.value}`)
                context.emit('update:startValue', endValue.value - diff.value)
                context.emit('minDiffWarn', startValue, endValue.value, diff.value)
            }
        }
        // 小于
        // 是否隐藏小于，当单边大于时隐藏
        const lessHidden = computed(() => {
            return endValue.value > 101
        })
        const lessLeft = computed(() => {
            if (sliderTrackElement.value === null) {
                return endValue.value
            }
            // 总长
            const max = sliderTrackElement.value.clientWidth
            if (endValue.value > 100) {
                return -(14 / max) * 100
            }
            return endValue.value - (14 / max) * 100
        })
        const lessMoving = ref(false)
        const lessElement: Ref<HTMLElement | null> = ref(null)
        const lessTouchStart = (e: TouchEvent) => {
            lessMoving.value = true
        }
        const lessTouchEnd = () => {
            lessMoving.value = false
        }
        const lessTouchMove = (e: TouchEvent) => {
            if (sliderTrackElement.value === null || !lessMoving.value) {
                return
            }
            // left
            let x = e.changedTouches[0].clientX
            // 总长
            const max = sliderTrackElement.value.clientWidth
            if (x < 0) {
                x = 0
            }
            if (x > max) {
                x = max
            }
            const endValue = (x / max) * 100
            if (endValue > startValue.value && endValue - startValue.value >= diff.value) {
                context.emit('update:endValue', endValue)
            } else {
                console.warn(`end=${endValue}-start=${startValue.value}<diff=${diff.value}`)
                context.emit('update:endValue', startValue.value + diff.value)
                context.emit('minDiffWarn', startValue.value, endValue, diff.value)
            }
        }
        // left百分比
        const rightWidth = computed(() => {
            if (endValue.value > 100) {
                return endValue.value === 101 ? 0 : 100
            }
            return endValue.value < 0 ? 0 : endValue.value
        })
        return {
            sliderTrackElement,
            leftWidth,
            greaterElement,
            greaterLeft,
            greaterHidden,
            greaterTouchStart,
            greaterTouchEnd,
            greaterTouchMove,
            lessElement,
            lessLeft,
            lessHidden,
            lessTouchStart,
            lessTouchEnd,
            lessTouchMove,
            rightWidth,
        }
    },
})
</script>
<style lang="scss" scoped>
.dw-slider {
    width: 100%;
    padding: 1.5rem 0;
    .dw-slider-track {
        width: 100%;
        height: 0.4rem;
        background-color: rgba(0, 0, 0, 0.1);
        position: relative;
        .dw-slider-greater {
            display: inline;
            position: absolute;
            top: -1.35rem;
            width: 2.8rem;
            height: 2.8rem;
            z-index: 9;
        }
        .dw-slider-center-track {
            position: absolute;
            top: 0rem;
            height: 0.4rem;
            background: #ff6d1b;
        }
        .dw-slider-less {
            position: absolute;
            top: -1.35rem;
            width: 2.8rem;
            height: 2.8rem;
            z-index: 9;
        }
    }
}
</style>
