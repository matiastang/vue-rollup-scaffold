<!--
 * @Author: your name
 * @Date: 2021-11-10 15:36:48
 * @LastEditTime: 2021-11-23 15:21:55
 * @LastEditors: matiastang
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/views/web/interfaceInfo/components/infoListGroup/InfoListGroup.vue
-->
<template>
    <div class="info-list-group borderBox flexColumnCenter">
        <div class="group-content borderBox cursorP flexRowCenter" @click="selectAction">
            <div class="cell-left flexRowCenter">
                <img v-if="url !== ''" class="cell-left-icon" :src="url" />
                <div class="cell-title defaultFont" :style="{ 'margin-left': `${url ? 0 : 32}px` }">
                    {{ title }}
                </div>
            </div>
            <div class="cell-right flexRowCenter">
                <div class="cell-value defaultFont">{{ `(${count})` }}</div>
                <img
                    class="cell-right-icon"
                    :src="selectedGroup ? 'static/api/api_off.svg' : 'static/api/api_on.svg'"
                />
            </div>
        </div>
        <div v-show="selectedGroup" class="slot-content">
            <slot></slot>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'InfoListGroup',
    props: {
        title: {
            type: String,
            default: '',
        },
        url: {
            type: String,
            default: '',
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
    setup(props) {
        const selectedGroup = ref(props.selected)
        const selectAction = () => {
            selectedGroup.value = !selectedGroup.value
        }
        return {
            selectedGroup,
            selectAction,
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
                margin-right: 8px;
            }
            .cell-right-icon {
                width: 16px;
                height: 16px;
            }
        }
    }
    .slot-content {
        width: 100%;
    }
}
</style>
