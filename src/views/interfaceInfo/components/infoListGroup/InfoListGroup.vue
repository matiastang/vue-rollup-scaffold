<!--
 * @Author: your name
 * @Date: 2021-11-10 15:36:48
 * @LastEditTime: 2021-11-10 16:44:13
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/views/interfaceInfo/components/infoListGroup/InfoListGroup.vue
-->
<template>
    <div class="info-list-group borderBox flexColumnCenter">
        <div class="group-content borderBox cursorP flexRowCenter" @click="groupAction">
            <div class="cell-left flexRowCenter">
                <img v-if="data.url" class="cell-left-icon" :src="data.url" />
                <div
                    class="cell-title defaultFont"
                    :style="{ 'margin-left': `${data.url ? 0 : 32}px` }"
                >
                    {{ data.title }}
                </div>
            </div>
            <div class="cell-right flexRowCenter">
                <div class="cell-value defaultFont">{{ `(${data.count})` }}</div>
                <img class="cell-right-icon" />
            </div>
        </div>
        <div v-show="showGroup" class="slot-content">
            <slot></slot>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { InterfaceListGroup } from '../../interfaceInfo'

export default defineComponent({
    name: 'InfoListGroup',
    props: {
        data: {
            type: Object as PropType<InterfaceListGroup>,
            default: () => {
                return {
                    title: '基本信息',
                    count: 0,
                    selected: false,
                }
            },
        },
    },
    setup(props) {
        let showGroup = ref(props.data.selected)
        const groupAction = () => {
            showGroup.value = !showGroup.value
        }
        return {
            showGroup,
            groupAction,
        }
    },
})
</script>

<style lang="scss" scoped>
.info-list-group {
    width: 100%;
    .group-content {
        width: 100%;
        padding: 21px 12px 21px 16px;
        justify-content: space-between !important;
        background: $themeBgColor;
        .cell-left {
            .cell-left-icon {
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
        .cell-right {
            .cell-value {
                font-size: 16px;
                color: $titleColor;
                line-height: 24px;
            }
            .cell-right-icon {
                width: 24px;
                height: 24px;
                background: $themeColor;
            }
        }
    }
    .slot-content {
        width: 100%;
    }
}
</style>
