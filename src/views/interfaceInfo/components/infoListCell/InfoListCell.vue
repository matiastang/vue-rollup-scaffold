<!--
 * @Author: your name
 * @Date: 2021-11-10 15:19:59
 * @LastEditTime: 2021-11-10 16:33:32
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/views/interfaceInfo/components/infoListCell/InfoListCell.vue
-->
<template>
    <div
        :class="[
            'info-list-cell',
            'borderBox',
            'cursorP',
            'flexRowCenter',
            { 'info-list-cell-selected': data.selected },
        ]"
        @click="cellAction"
    >
        <div class="cell-title defaultFont" :style="{ 'padding-left': `${left}px` }">
            {{ data.title }}
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { InterfaceListCell } from '../../interfaceInfo'

export default defineComponent({
    name: 'InfoListCell',
    props: {
        data: {
            type: Object as PropType<InterfaceListCell>,
            default: () => {
                return {
                    title: '基金基本信息',
                    selected: false,
                }
            },
        },
        left: {
            type: Number,
            default: 48,
        },
    },
    emits: ['selectAction'],
    methods: {
        cellAction() {
            this.$emit('selectAction')
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
.info-list-cell:hover {
    background: rgba(214, 89, 40, 0.5);
    .cell-title {
        color: $themeBgColor;
    }
}
</style>
