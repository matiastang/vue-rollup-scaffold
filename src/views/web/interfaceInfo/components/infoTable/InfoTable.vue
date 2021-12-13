<!--
 * @Author: your name
 * @Date: 2021-11-10 14:37:21
 * @LastEditTime: 2021-12-13 13:45:35
 * @LastEditors: matiastang
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/views/web/interfaceInfo/components/infoTable/InfoTable.vue
-->
<template>
    <div class="info-table borderBox flexRowCenter">
        <div
            v-for="item in header"
            :key="item.title"
            class="table-item flexColumnCenter"
            :style="header.length === 2 ? 'max-width: 50%;' : ''"
        >
            <div class="table-header defaultFont">{{ item.title }}</div>
            <div
                v-for="(cellItem, index) in data"
                :key="cellItem.title"
                class="table-cell-content flexRowCenter"
                :style="{
                    'border-bottom': `${index === data.length - 1 ? 0 : 1}px dashed #dfdfdf`,
                }"
            >
                <div class="table-cell defaultFont">
                    {{
                        item.title === '必选'
                            ? `${cellItem[item.key] == 0 ? '否' : '是'}`
                            : `${cellItem[item.key] || ''}`
                    }}
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { InterfaceInfoTableHeader } from '../../interfaceInfo'
import { ApiParamType } from '@/common/request/modules/home/homeInterface'

export default defineComponent({
    name: 'InfoTable',
    props: {
        header: {
            type: Array as PropType<InterfaceInfoTableHeader[]>,
            default: () => {
                return []
            },
        },
        data: {
            type: Array as PropType<ApiParamType[]>,
            default: () => {
                return []
            },
        },
    },
})
</script>

<style lang="scss" scoped>
.info-table {
    width: 100%;
    justify-content: space-between !important;
    align-items: flex-start !important;
    background: $themeBgColor;
    border: 1px solid #dfdfdf;
    .table-item {
        flex-shrink: 0;
        flex-grow: 1;
        justify-content: flex-start;
        .table-header {
            width: 100%;
            height: 60px;
            font-size: fontSize(14px);
            color: #595959;
            line-height: 60px;
            background: #f4f4f4;
        }
        .table-cell-content {
            width: 100%;
            height: 60px;
            padding: 0px 5px;
            box-sizing: border-box;
            .table-cell {
                font-size: fontSize(14px);
                color: $titleColor;
                line-height: 20px;
                word-wrap: break-word;
                white-space: normal;
                word-break: break-all;
            }
        }
    }
    .table-item:first-child {
        max-width: 20%;
    }
    .table-item:nth-child(2) {
        max-width: 15%;
    }
    .table-item:nth-child(3) {
        max-width: 15%;
    }
    .table-item:last-child {
        max-width: 50%;
    }
}
</style>
