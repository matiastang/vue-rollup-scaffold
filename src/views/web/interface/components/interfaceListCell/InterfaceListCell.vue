<!--
 * @Author: your name
 * @Date: 2021-11-09 16:53:09
 * @LastEditTime: 2021-11-09 17:12:54
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/views/interface/components/interfaceListCell/InterfaceListCell.vue
-->
<template>
    <div
        :class="[
            'interface-list-cell',
            'borderBox',
            'cursorP',
            'flexRowCenter',
            { 'cell-selected': selected },
        ]"
    >
        <div class="cell-left flexRowCenter">
            <div class="cell-icon"></div>
            <div class="cell-title defaultFont">{{ title }}</div>
        </div>
        <div class="cell-value defaultFont">{{ `(${count})` }}</div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'InterfaceListCell',
    props: {
        title: {
            type: String,
            default: '名称',
        },
        count: {
            type: Number,
            default: 0,
        },
        selected: {
            type: Boolean,
            default: false,
        },
    },
})
</script>

<style lang="scss" scoped>
.interface-list-cell {
    width: 100%;
    padding: 21px 12px 21px 16px;
    justify-content: space-between !important;
    background: $themeBgColor;
    .cell-left {
        .cell-icon {
            width: 24px;
            height: 24px;
            background: $themeColor;
            margin-right: 8px;
        }
        .cell-title {
            font-size: 16px;
            color: $titleColor;
            line-height: 24px;
        }
    }
    .cell-value {
        font-size: 16px;
        color: $titleColor;
        line-height: 24px;
    }
}
.cell-selected {
    background: $themeColor;
    .cell-left {
        .cell-icon {
            background: #d8d8d8;
        }
        .cell-title {
            color: $themeBgColor;
        }
    }
    .cell-value {
        color: $themeBgColor;
    }
}
.interface-list-cell:hover {
    background: rgba(214, 89, 40, 0.5);
    .cell-left {
        .cell-icon {
            background: #d8d8d8;
        }
        .cell-title {
            color: $themeBgColor;
        }
    }
    .cell-value {
        color: $themeBgColor;
    }
}
</style>
