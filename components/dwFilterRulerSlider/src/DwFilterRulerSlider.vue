<!--
 * @Author: matiastang
 * @Date: 2022-02-15 09:54:17
 * @LastEditors: matiastang
 * @LastEditTime: 2022-02-28 17:31:47
 * @FilePath: /dw-vue-components/components/dwFilterRulerSlider/src/DwFilterRulerSlider.vue
 * @Description: DwFilterRulerSlider
-->
<template>
    <div class="dw-ruler-slider">
        <DwFilterRuler class="dw-ruler"></DwFilterRuler>
        <DwFilterSlider
            class="dw-slider"
            :startValue="start"
            :endValue="end"
            @update:startValue="startUpdate"
            @update:endValue="endUpdate"
            :autoResize="false"
        >
            <template v-slot:greaterImg>
                <slot name="greaterImg"></slot>
            </template>
            <template v-slot:lessImg>
                <slot name="lessImg"></slot>
            </template>
        </DwFilterSlider>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DwFilterRuler from '../../dwFilterRuler/src/DwFilterRuler.vue'
import DwFilterSlider from '../../dwFilterSlider/src/DwFilterSlider.vue'

export default defineComponent({
    name: 'DwFilterRulerSlider',
    props: {
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
         * 选择范围颜色
         */
        trunc: {
            type: Boolean,
            default: false,
        },
    },
    emits: {
        /**
         * 更新开始位置
         */
        'update:start': (value: number) => {
            return true
        },
        /**
         * 更新结束位置
         */
        'update:end': (value: number) => {
            return true
        },
    },
    setup(props, context) {
        const startUpdate = (value: number) => {
            context.emit('update:start', props.trunc ? Math.round(value) : value)
        }
        const endUpdate = (value: number) => {
            context.emit('update:end', props.trunc ? Math.round(value) : value)
        }
        return {
            startUpdate,
            endUpdate,
        }
    },
    components: {
        DwFilterRuler,
        DwFilterSlider,
    },
})
</script>

<style lang="scss" scoped>
.dw-ruler-slider {
    width: 100%;
    .dw-ruler {
        width: 100%;
        box-sizing: border-box;
    }
    .dw-slider {
        width: 100%;
        padding: 0rem 4.55% 1.4rem 4.55%;
        box-sizing: border-box;
    }
}
</style>
