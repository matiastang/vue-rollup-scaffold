<!--
 * @Author: your name
 * @Date: 2021-11-04 19:27:28
 * @LastEditTime: 2021-11-26 16:06:33
 * @LastEditors: matiastang
 * @Description: In User Settings Edit
 * @FilePath: /datumwealth-openalpha-front/src/views/web/home/components/collapseCell/CollapseCell.vue
-->
<template>
    <div :class="['borderBox', 'collapse-cell', { 'collapse-cell-selected': selected }]">
        <div class="collapse-cell-left">
            <svg class="icon collapse-cell-left-icon" aria-hidden="true">
                <use :xlink:href="`#${url}`"></use>
            </svg>
            <div class="flexColumnCenter collapse-cell-center">
                <div class="collapse-cell-title defaultFont">{{ title }}</div>
                <div v-if="data.length > 0" class="collapse-cell-sub-content flexRowCenter">
                    <div
                        v-if="data.length > 0"
                        class="collapse-cell-text textLine1 cursorP defaultFont"
                        style="margin-right: 5px"
                        @click="subAction(data[0])"
                    >
                        {{ data[0].name }}
                    </div>
                    <div v-if="data.length > 1" class="collapse-cell-line"></div>
                    <div
                        v-if="data.length > 1"
                        class="collapse-cell-text textLine1 cursorP defaultFont"
                        style="margin-left: 5px"
                        @click="subAction(data[1])"
                    >
                        {{ data[1].name }}
                    </div>
                </div>
            </div>
        </div>
        <img v-if="selected" class="collapse-cell-right-icon" src="static/api/category_on.svg" />
        <img v-else class="collapse-cell-right-icon" src="static/api/category_off.svg" />
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useRouter } from 'vue-router'
import { CollapseCellDataType } from '@/common/request/modules/home/homeInterface'
import { interface_id_check, category_id_check } from 'utils/check/interfaceCheck'
import { ElMessage } from 'element-plus'

export default defineComponent({
    name: 'CollapseCell',
    props: {
        url: {
            type: String,
            default: '',
        },
        title: {
            type: String,
            default: '',
        },
        data: {
            type: Array as PropType<CollapseCellDataType[]>,
            default: () => {
                return []
            },
        },
        selected: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const router = useRouter()
        /**
         * 跳转
         */
        const subAction = (subData: CollapseCellDataType) => {
            if (subData.isCategory) {
                if (category_id_check(subData.id)) {
                    router.push({
                        path: `/interface/${subData.id}`,
                    })
                    return
                }
                ElMessage({
                    message: '分类id错误',
                    type: 'error',
                })
                return
            }
            if (interface_id_check(subData.id)) {
                router.push({
                    path: `/interface/info/${subData.id}`,
                })
                return
            }
            ElMessage({
                message: '接口id错误',
                type: 'error',
            })
        }
        return {
            subAction,
        }
    },
})
</script>

<style lang="scss" scoped>
.collapse-cell {
    padding: 12px 17px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: $themeColor;
    .collapse-cell-left {
        display: flex;
        align-items: flex-start;
        flex-grow: 1;
        .collapse-cell-left-icon {
            width: 24px;
            height: 24px;
            color: white;
            flex-shrink: 0;
        }
        .collapse-cell-center {
            flex-grow: 1;
            align-items: flex-start;
            margin-left: 18px;
            .collapse-cell-title {
                font-size: fontSize(18px);
                font-weight: 500;
                color: $themeBgColor;
                line-height: 26px;
                text-align: left;
            }
            .collapse-cell-sub-content {
                width: 100%;
                justify-content: flex-start;
                .collapse-cell-line {
                    width: 1px;
                    height: 16px;
                    background: $themeBgColor;
                }
                .collapse-cell-text {
                    max-width: calc(50% - 6px);
                    box-sizing: border-box;
                    font-size: fontSize(14px);
                    color: $themeBgColor;
                    line-height: 20px;
                    text-align: left;
                }
                .collapse-cell-text:hover {
                    color: $themeColor;
                }
            }
        }
    }
    .collapse-cell-right-icon {
        width: 16px;
        height: 16px;
        margin-top: 4px;
    }
}
.collapse-cell-selected,
.collapse-cell:hover {
    background: $themeBgColor;
    .collapse-cell-left {
        .collapse-cell-left-icon {
            color: $themeColor;
        }
        .collapse-cell-center {
            .collapse-cell-title {
                color: $themeColor;
            }
            .collapse-cell-sub-content {
                .collapse-cell-line {
                    background: $themeColor;
                }
                .collapse-cell-text {
                    color: $titleColor;
                }
                .collapse-cell-text:hover {
                    color: $themeColor;
                }
            }
        }
    }
}
</style>
