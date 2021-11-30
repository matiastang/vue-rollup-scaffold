<!--
 * @Author: your name
 * @Date: 2021-11-10 15:19:59
 * @LastEditTime: 2021-11-30 15:22:42
 * @LastEditors: matiastang
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/views/web/interfaceInfo/components/infoListCell/InfoListCell.vue
-->
<template>
    <div
        :class="[
            'info-list-cell',
            'borderBox',
            'cursorP',
            'flexRowCenter',
            { 'info-list-cell-selected': selected, 'cell-can-hover': !selected },
        ]"
    >
        <div class="cell-title defaultFont" :style="{ 'padding-left': `${left}px` }">
            {{ title }}
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'InfoListCell',
    props: {
        title: {
            type: String,
            default: '',
        },
        selected: {
            type: Boolean,
            default: false,
        },
        left: {
            type: Number,
            default: 48,
        },
    },
})
</script>

<style lang="scss" scoped>
.info-list-cell {
    width: 100%;
    padding: 21px 0px;
    background: $themeBgColor;
    .cell-title {
        width: 100%;
        font-size: 16px;
        color: $titleColor;
        line-height: 24px;
        text-align: left;
    }
}
.info-list-cell-selected {
    background: $themeColor;
    .cell-title {
        color: $themeBgColor;
    }
}
.cell-can-hover:hover {
    background: $hoverColor;
}
</style>
