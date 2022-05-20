<!--
 * @Author: matiastang
 * @Date: 2022-01-11 11:26:01
 * @LastEditors: matiastang
 * @LastEditTime: 2022-03-07 11:33:56
 * @FilePath: /dw-vue-components/components/dwPortfolioBg/src/DwPortfolioBg.vue
 * @Description: 西筹“基金组合”背景页面
-->
<template>
    <div class="dw-portfolio-bg">
        <div class="dw-portfolio-left-top">
            <slot name="leftTopImg"></slot>
        </div>

        <!-- <img class="dw-portfolio-left-top" :src="leftTopUrl" :style="leftTopStyle" /> -->
        <slot />
        <div class="dw-portfolio-right-bottom">
            <slot name="rightBottomImg"></slot>
        </div>
        <!-- <img class="dw-portfolio-right-bottom" :src="rightBottomUrl" :style="rightBottomStyle" /> -->
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'DwPortfolioBg',
    props: {
        /**
         * 图片地址
         */
        leftTopUrl: {
            type: String,
        },
        /**
         * leftTop图片样式
         */
        leftTopStyle: {
            type: Object,
            default: () => {
                return {
                    height: '203px',
                    width: '262px',
                }
            },
        },
        /**
         * 图片地址
         */
        rightBottomUrl: {
            type: String,
        },
        /**
         * rightBottom图片样式
         */
        rightBottomStyle: {
            type: Object,
            default: () => {
                return {
                    height: '209px',
                    width: '174px',
                }
            },
        },
    },
})
</script>

<style lang="scss" scoped>
.dw-portfolio-bg {
    min-height: 100vh;
    width: 100vw;
    position: relative;
    background: #f0f0f0;
    z-index: 0;
    .dw-portfolio-left-top {
        max-width: 100%;
        max-height: 100%;
        position: absolute;
        left: 0px;
        top: 0px;
        z-index: -1;
        // 对于没有设置 position:absolute 属性的元素 不管 z-index 设置多少都为 0,
        // 但低于 position:absolute 中 z-index:0 的元素
    }
    .dw-portfolio-right-bottom {
        max-width: 100%;
        max-height: 100%;
        position: absolute;
        right: 0px;
        bottom: 0px;
        z-index: -1;
    }
}
</style>
