<!--
 * @Author: your name
 * @Date: 2021-11-04 20:01:27
 * @LastEditTime: 2021-12-08 10:45:09
 * @LastEditors: matiastang
 * @Description: In User Settings Edit
 * @FilePath: /datumwealth-openalpha-front/src/views/web/home/components/collapse/Collapse.vue
-->
<template>
    <div class="flexColumnCenter collapse">
        <CollapseCell
            v-for="(categoryItem, index) in data"
            class="collapse-cell"
            :key="categoryItem.id"
            :url="categoryItem.navBarIcon"
            :title="categoryItem.categoryName"
            :data="getSubData(categoryItem)"
            :selected="selectedIndex === index"
            @mouseover="mouseoverAction(index)"
            @mouseout="mouseoutAction(index)"
        />
        <div class="defaultFont cursorP collapse-all" @click="allAction">查看全部接口</div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useRouter } from 'vue-router'
import CollapseCell from '../collapseCell/CollapseCell.vue'
import { HotType, CollapseCellDataType } from '@/common/request/modules/home/homeInterface'

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
        const router = useRouter()
        /**
         * 获取下一级描述
         */
        const getSubData = (category: HotType) => {
            if (category.categoryType === 1) {
                const list = category.apiInfoList
                    .sort((left, right) => left.apiOrderNum - right.apiOrderNum)
                    .filter((item, index) => index < 2)
                    .map((item) => {
                        return {
                            isCategory: false,
                            name: item.apiName,
                            id: item.apiInfoId,
                        } as CollapseCellDataType
                    })
                return list
            }
            const childrenData = category.children
            if (!childrenData) {
                return [] as CollapseCellDataType[]
            }
            const list = childrenData
                .sort((left, right) => left.categoryOrderNum - right.categoryOrderNum)
                .filter((item, index) => index < 2)
                .map((item) => {
                    return {
                        isCategory: true,
                        name: category.categoryName,
                        id: category.categoryId,
                    } as CollapseCellDataType
                })
            return list
        }
        const mouseoverAction = (index: number) => {
            context.emit('mouseoverIndex', index)
        }
        const mouseoutAction = (index: number) => {
            context.emit('mouseoutIndex', index)
        }
        const allAction = () => {
            router.push({
                path: '/interface',
            })
        }
        return {
            mouseoverAction,
            mouseoutAction,
            allAction,
            getSubData,
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
        @include fontWeight500;
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
                    font-size: fontSize(14px);
                    @include defaultFontMedium;
                    color: $themeColor;
                    line-height: 20px;
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
                        font-size: fontSize(14px);
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
