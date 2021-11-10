<!--
 * @Author: your name
 * @Date: 2021-11-10 10:50:34
 * @LastEditTime: 2021-11-10 14:37:57
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/views/interfaceInfo/components/infoCell/InfoCell.vue
-->
<template>
    <div class="info-cell borderBox flexRowCenter">
        <div class="cell-left flexRowCenter">
            <div class="cell-icon"></div>
            <div class="cell-title-content flexColumnCenter">
                <div class="cell-title defaultFont">{{ data.title }}</div>
                <div class="cell-item flexRowCenter">
                    <div class="cell-item-title defaultFont">描述:</div>
                    <div class="cell-text defaultFont">{{ data.text }}</div>
                </div>
                <div class="cell-last flexRowCenter">
                    <div class="cell-last-item flexRowCenter">
                        <div class="cell-item-title defaultFont">接口ID:</div>
                        <div class="cell-id defaultFont">{{ data.id }}</div>
                    </div>
                    <div class="cell-last-item flexRowCenter" style="margin-left: 30px">
                        <div class="cell-item-title defaultFont">价格:</div>
                        <div class="cell-price defaultFont">{{ `${data.price}元` }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="cell-button cursorP defaultFont" @click.stop="cellButtonAction(id)">
            试用接口
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { InterfaceInfo } from '../../interfaceInfo'

export default defineComponent({
    name: 'InfoCell',
    props: {
        data: {
            type: Object as PropType<InterfaceInfo>,
            default: () => {
                return {}
            },
        },
    },
    emits: ['trialAction'],
    methods: {
        cellButtonAction(id: string) {
            this.$emit('trialAction', id)
        },
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
                font-size: 18px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: $titleColor;
                line-height: 26px;
                letter-spacing: 1px;
                margin-bottom: 8px;
                text-align: left;
            }
            .cell-item {
                margin-bottom: 8px;
                align-items: flex-start;
                .cell-item-title {
                    font-size: 14px;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: $titleColor;
                    line-height: 20px;
                    letter-spacing: 1px;
                    flex-shrink: 0;
                    margin-right: 8px;
                }
                .cell-text,
                .cell-id {
                    font-size: 14px;
                    color: #595959;
                    line-height: 20px;
                    text-align: left;
                }
                .cell-price {
                    font-size: 14px;
                    color: #e62412;
                    line-height: 20px;
                }
            }
            .cell-last {
                .cell-last-item {
                    align-items: flex-start;
                    .cell-item-title {
                        font-size: 14px;
                        font-family: PingFangSC-Medium, PingFang SC;
                        font-weight: 500;
                        color: $titleColor;
                        line-height: 20px;
                        letter-spacing: 1px;
                        flex-shrink: 0;
                        margin-right: 8px;
                    }
                    .cell-text,
                    .cell-id {
                        font-size: 14px;
                        color: #595959;
                        line-height: 20px;
                        text-align: left;
                    }
                    .cell-price {
                        font-size: 14px;
                        color: #e62412;
                        line-height: 20px;
                    }
                }
            }
        }
        .cell-title {
            font-size: 16px;
            color: $titleColor;
            line-height: 24px;
        }
    }
    .cell-button {
        width: 118px;
        height: 42px;
        background: $themeColor;
        border-radius: 4px;
        font-size: 16px;
        color: $themeBgColor;
        line-height: 42px;
        align-self: flex-end;
        flex-shrink: 0;
    }
}
</style>
