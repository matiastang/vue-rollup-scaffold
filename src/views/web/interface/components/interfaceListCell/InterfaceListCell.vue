<!--
 * @Author: your name
 * @Date: 2021-11-09 16:53:09
 * @LastEditTime: 2021-11-23 14:27:50
 * @LastEditors: matiastang
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/views/web/interface/components/interfaceListCell/InterfaceListCell.vue
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
            <img class="cell-icon" :src="data.categoryIconUrl" />
            <div class="cell-title defaultFont">{{ data.categoryName }}</div>
        </div>
        <div class="cell-value defaultFont">{{ `(${count})` }}</div>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { HotType } from '@/common/request/modules/home/homeInterface'

export default defineComponent({
    name: 'InterfaceListCell',
    props: {
        data: {
            type: Object as PropType<HotType>,
            default: () => {
                return {}
            },
        },
        selected: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        /**
         * 接口总数
         */
        const count = computed(() => {
            let num = 0
            if (props.data.categoryType === 1) {
                // 叶子节点
                let apiList = props.data.apiInfoList
                num += apiList.length
            } else {
                const children = props.data.children
                if (children) {
                    for (let j = 0; j < children.length; j++) {
                        const element = children[j]
                        if (element.categoryType === 1) {
                            // 叶子节点
                            let childrenApiList = element.apiInfoList
                            num += childrenApiList.length
                        }
                    }
                }
            }
            return num
        })
        // 选中的列表
        return {
            count,
        }
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
        .cell-title {
            color: $themeBgColor;
        }
    }
    .cell-value {
        color: $themeBgColor;
    }
}
</style>
