<!--
 * @Author: your name
 * @Date: 2021-11-04 20:01:27
 * @LastEditTime: 2021-11-19 18:56:07
 * @LastEditors: matiastang
 * @Description: In User Settings Edit
 * @FilePath: /datumwealth-openalpha-front/src/views/web/home/components/collapse/Collapse.vue
-->
<template>
    <div class="flexColumnCenter collapse">
        <!-- <el-popover
            popper-class="collapse-popover"
            v-for="categoryItem in data"
            :key="categoryItem.id"
            :visible="false"
            :show-arrow="false"
            :popper-options="{
                boundariesElement: '.collapse-popover-bound',
                gpuAcceleration: true,
            }"
            trigger="hover"
            placement="right-end"
        >
            <div v-if="categoryItem.categoryType === 0" class="content borderBox">
                <div
                    v-for="childrenItem in categoryItem.children"
                    :key="childrenItem.categoryId"
                    class="content-item borderBox flexColumnCenter"
                >
                    <div class="content-title defaultFont">{{ childrenItem.categoryName }}</div>
                    <div class="content-bottom borderBox flexRowCenter">
                        <div
                            v-for="item in childrenItem.apiInfoList"
                            :key="item.apiCode"
                            class="content-cell defaultFont"
                        >
                            {{ item.apiName }}
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="content borderBox">
                <div class="content-item borderBox flexColumnCenter">
                    <div class="content-title defaultFont">{{ categoryItem.categoryName }}</div>
                    <div class="content-bottom flexRowCenter">
                        <div
                            v-for="item in categoryItem.apiInfoList"
                            :key="item.apiCode"
                            class="content-cell defaultFont"
                        >
                            {{ item.apiName }}
                        </div>
                    </div>
                </div>
            </div>
            <template #reference>
                <CollapseCell
                    class="collapse-cell"
                    :url="categoryItem.categoryIconUrl"
                    :title="categoryItem.categoryName"
                    :text="categoryItem.categoryDescribe"
                />
            </template>
        </el-popover> -->
        <CollapseCell
            v-for="(categoryItem, index) in data"
            class="collapse-cell"
            :key="categoryItem.id"
            :url="categoryItem.categoryIconUrl"
            :title="categoryItem.categoryName"
            :text="categoryItem.categoryDescribe"
            :selected="selectedIndex === index"
            @mouseover="mouseoverAction(index)"
            @mouseout="mouseoutAction(index)"
        />
        <div class="defaultFont cursorP collapse-all">查看全部接口</div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import CollapseCell from '../collapseCell/CollapseCell.vue'
import { HotType } from '@/common/request/modules/home/homeInterface'

export default defineComponent({
    name: 'Collapse',
    props: {
        data: {
            type: Array as PropType<Array<HotType>>,
            default: () => {
                return []
            },
        },
        selectedIndex: {
            type: Number,
            default: -1,
        },
    },
    emits: {
        mouseoverIndex: (index: number) => {
            return index > -1
        },
        mouseoutIndex: (index: number) => {
            return index > -1
        },
    },
    setup(props, context) {
        const mouseoverAction = (index: number) => {
            context.emit('mouseoverIndex', index)
        }
        const mouseoutAction = (index: number) => {
            context.emit('mouseoutIndex', index)
        }
        return {
            mouseoverAction,
            mouseoutAction,
        }
    },
    components: {
        CollapseCell,
    },
})
</script>

<style lang="scss">
.collapse {
    height: 100%;
    width: 100%;
    background: $themeColor;
    .collapse-cell {
        height: 76px;
        width: 100%;
    }
    .collapse-all {
        width: 100%;
        height: 76px;
        font-size: fontSize(18px);
        font-weight: 500;
        color: $themeBgColor;
        line-height: 76px;
    }
}
body {
    .collapse-popover {
        width: calc(56% + 16px) !important;
        padding: 0px !important;
        inset: 96px auto auto calc(34% - 16px) !important;
        transform: none !important;
        border: none !important;
        border-radius: 0px !important;
        box-shadow: none !important;
        background: linear-gradient(135deg, #ffffff 0%, #fffaf8 100%);
        box-shadow: 0px 4px 10px 0px rgba(218, 218, 218, 0.5);
        .content {
            padding: 20px 60px;
            height: 628px;
            .content-item {
                border-bottom: 1px solid #dfdfdf;
                align-items: flex-start;
                .content-title {
                    font-size: 14px;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: $themeColor;
                    line-height: 20px;
                    letter-spacing: 1px;
                    margin-top: 23px;
                }
                .content-bottom {
                    padding: 12px 0px;
                    box-sizing: border-box;
                    width: 100%;
                    justify-content: flex-start;
                    flex-wrap: wrap;
                    .content-cell {
                        width: 25%;
                        margin: 6px 0px;
                        font-size: 14px;
                        color: $titleColor;
                        line-height: 20px;
                        flex-shrink: 0;
                        cursor: pointer;
                        text-align: left;
                    }
                }
            }
        }
    }
}
@media screen and (max-width: 1360px) {
    body {
        .collapse-popover {
            left: calc(36.5% - 16px) !important;
            width: calc(58.5% + 16px) !important;
        }
    }
}
</style>
