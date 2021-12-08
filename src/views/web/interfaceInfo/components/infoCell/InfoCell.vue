<!--
 * @Author: your name
 * @Date: 2021-11-10 10:50:34
 * @LastEditTime: 2021-12-08 10:42:04
 * @LastEditors: matiastang
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/views/web/interfaceInfo/components/infoCell/InfoCell.vue
-->
<template>
    <div v-if="id > 0" class="info-cell borderBox flexRowCenter">
        <div class="cell-left flexRowCenter">
            <svg class="icon cell-icon" aria-hidden="true">
                <use :xlink:href="`#${url}`"></use>
            </svg>
            <div class="cell-title-content flexColumnCenter">
                <div class="cell-title defaultFont">{{ title || '-' }}</div>
                <div class="cell-item flexRowCenter">
                    <div class="cell-item-title defaultFont">描述:</div>
                    <div class="cell-text defaultFont">{{ text || '-' }}</div>
                </div>
                <div class="cell-last flexRowCenter">
                    <div class="cell-last-item flexRowCenter">
                        <div class="cell-item-title defaultFont">接口CODE:</div>
                        <div class="cell-id defaultFont">{{ code || '-' }}</div>
                    </div>
                    <div class="cell-last-item flexRowCenter" style="margin-left: 30px">
                        <div class="cell-item-title defaultFont">价格:</div>
                        <div class="cell-price defaultFont">
                            {{ `${price ? price.toFixed(2) : '-'}元` }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="cell-button cursorP defaultFont" @click.stop="cellButtonAction">试用接口</div>
    </div>
    <el-skeleton v-else class="info-cell-skeleton borderBox" animated>
        <template #template>
            <div class="info-cell borderBox flexRowCenter">
                <div class="cell-left flexRowCenter">
                    <el-skeleton-item variant="image" class="cell-icon" />
                    <div class="cell-title-content flexColumnCenter">
                        <el-skeleton-item class="cell-title" variant="p" />
                        <div class="cell-item flexRowCenter">
                            <el-skeleton-item class="cell-item-title" variant="p" />
                            <el-skeleton-item class="cell-text" variant="p" />
                        </div>
                        <div class="cell-last flexRowCenter">
                            <div class="cell-last-item flexRowCenter">
                                <el-skeleton-item class="cell-item-title" variant="p" />
                                <el-skeleton-item class="cell-id" variant="p" />
                            </div>
                            <div class="cell-last-item flexRowCenter" style="margin-left: 30px">
                                <el-skeleton-item class="cell-item-title" variant="p" />
                                <el-skeleton-item class="cell-price" variant="p" />
                            </div>
                        </div>
                    </div>
                </div>
                <el-skeleton-item class="cell-button-skeleton-item" variant="button" />
            </div>
        </template>
    </el-skeleton>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { interface_id_check } from 'utils/check/index'
import ElMessage from '@/common/utils/message'

export default defineComponent({
    name: 'InfoCell',
    props: {
        url: {
            type: String,
            default: '',
        },
        title: {
            type: String,
            default: '',
        },
        text: {
            type: String,
            default: '',
        },
        code: {
            type: String,
            default: '',
        },
        id: {
            type: Number,
            default: 0,
        },
        price: {
            type: Number,
            default: 0,
        },
    },
    setup(props) {
        const router = useRouter()
        const cellButtonAction = () => {
            if (interface_id_check(props.id)) {
                router.push({
                    path: `/interface/call/${props.id}`,
                })
            } else {
                ElMessage({
                    message: '接口id错误',
                    type: 'error',
                })
            }
        }
        return {
            cellButtonAction,
        }
    },
})
</script>

<style lang="scss" scoped>
.info-cell {
    width: 100%;
    padding: 24px;
    justify-content: space-between !important;
    background: $themeBgColor;
    .cell-left {
        align-items: center;
        .cell-icon {
            width: 132px;
            height: 132px;
            background: #fdf6f4;
            border-radius: 2px;
            margin-right: 16px;
            flex-shrink: 0;
        }
        .cell-title-content {
            justify-content: space-between;
            align-items: flex-start;
            .cell-title {
                font-size: fontSize(18px);
                @include defaultFontMedium;
                color: $titleColor;
                line-height: 26px;
                margin-bottom: 8px;
                text-align: left;
            }
            .cell-item {
                margin-bottom: 8px;
                align-items: flex-start;
                .cell-item-title {
                    font-size: fontSize(14px);
                    @include defaultFontMedium;
                    color: $titleColor;
                    line-height: 20px;
                    flex-shrink: 0;
                    margin-right: 8px;
                }
                .cell-text,
                .cell-id {
                    font-size: fontSize(14px);
                    color: #595959;
                    line-height: 20px;
                    text-align: left;
                }
                .cell-price {
                    font-size: fontSize(14px);
                    color: #e62412;
                    line-height: 20px;
                }
            }
            .cell-last {
                .cell-last-item {
                    align-items: flex-start;
                    .cell-item-title {
                        font-size: fontSize(14px);
                        @include defaultFontMedium;
                        color: $titleColor;
                        line-height: 20px;
                        flex-shrink: 0;
                        margin-right: 8px;
                    }
                    .cell-text,
                    .cell-id {
                        font-size: fontSize(14px);
                        color: #595959;
                        line-height: 20px;
                        text-align: left;
                    }
                    .cell-price {
                        font-size: fontSize(14px);
                        color: #e62412;
                        line-height: 20px;
                    }
                }
            }
        }
        .cell-title {
            font-size: fontSize(16px);
            color: $titleColor;
            line-height: 24px;
        }
    }
    .cell-button {
        width: 118px;
        height: 42px;
        background: $themeColor;
        border-radius: 4px;
        font-size: fontSize(16px);
        color: $themeBgColor;
        line-height: 42px;
        align-self: flex-end;
        flex-shrink: 0;
    }
}
.info-cell-skeleton {
    :deep(.info-cell) {
        width: 100%;
        padding: 24px;
        justify-content: space-between !important;
        background: $themeBgColor;
        .cell-left {
            align-items: center;
            justify-content: flex-start;
            flex-grow: 1;
            .cell-icon {
                width: 132px;
                height: 132px;
                background: #fdf6f4;
                border-radius: 2px;
                margin-right: 16px;
                flex-shrink: 0;
            }
            .cell-title-content {
                justify-content: space-between;
                align-items: flex-start;
                flex-grow: 1;
                .cell-title {
                    width: 100%;
                    font-size: fontSize(18px);
                    @include defaultFontMedium;
                    color: $titleColor;
                    line-height: 26px;
                    margin-bottom: 8px;
                    text-align: left;
                }
                .cell-item {
                    width: 100%;
                    margin-bottom: 8px;
                    align-items: flex-start;
                    .cell-item-title {
                        width: 40px;
                        font-size: fontSize(14px);
                        @include defaultFontMedium;
                        color: $titleColor;
                        line-height: 20px;
                        flex-shrink: 0;
                        margin-right: 8px;
                    }
                    .cell-text {
                        width: calc(100% - 50px);
                    }
                    .cell-id {
                        width: 100%;
                        font-size: fontSize(14px);
                        color: #595959;
                        line-height: 20px;
                        text-align: left;
                    }
                    .cell-price {
                        width: 100%;
                        font-size: fontSize(14px);
                        color: #e62412;
                        line-height: 20px;
                    }
                }
                .cell-last {
                    .cell-last-item {
                        width: 100%;
                        align-items: flex-start;
                        .cell-item-title {
                            width: 50px;
                            font-size: fontSize(14px);
                            @include defaultFontMedium;
                            color: $titleColor;
                            line-height: 20px;
                            flex-shrink: 0;
                            margin-right: 8px;
                        }
                        .cell-text,
                        .cell-id {
                            width: calc(100% - 50px);
                            font-size: fontSize(14px);
                            color: #595959;
                            line-height: 20px;
                            text-align: left;
                        }
                        .cell-price {
                            width: calc(100% - 50px);
                            font-size: fontSize(14px);
                            color: #e62412;
                            line-height: 20px;
                        }
                    }
                }
            }
            .cell-title {
                font-size: fontSize(16px);
                color: $titleColor;
                line-height: 24px;
            }
        }
        .cell-button-skeleton-item {
            width: 118px;
            height: 42px;
            align-self: flex-end;
            flex-shrink: 0;
        }
    }
}
</style>
