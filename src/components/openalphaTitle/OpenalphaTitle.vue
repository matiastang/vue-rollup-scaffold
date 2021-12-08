<!--
 * @Author: your name
 * @Date: 2021-11-11 10:31:47
 * @LastEditTime: 2021-12-08 10:36:17
 * @LastEditors: matiastang
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/components/openalphaTitle/OpenalphaTitle.vue
-->
<template>
    <div class="openalpha-title borderBox flexRowCenter">
        <div class="openalpha-title-line" :style="{ height: `${fontSize}px` }"></div>
        <div
            class="openalpha-title-title"
            :style="{ 'font-size': `${fontSize}px`, 'line-height': `${fontSize * 1.5}px` }"
        >
            {{ title }}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'OpenalphaTitle',
    props: {
        title: {
            type: String,
            default: '标题',
        },
        fontSize: {
            type: Number,
            default: 22,
        },
    },
})
</script>

<style lang="scss" scoped>
.openalpha-title {
    width: 100%;
    justify-content: flex-start !important;
    .openalpha-title-line {
        width: 4px;
        height: 22px;
        background: $themeColor;
        margin-right: 4px;
    }
    .openalpha-title-title {
        @include defaultFontMedium;
        font-size: fontSize(22px);
        color: $titleColor;
        line-height: 30px;
        letter-spacing: 2px;
    }
}
</style>
