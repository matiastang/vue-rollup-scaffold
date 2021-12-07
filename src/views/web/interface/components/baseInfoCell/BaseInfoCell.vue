<!--
 * @Author: your name
 * @Date: 2021-11-09 17:16:04
 * @LastEditTime: 2021-11-30 10:32:04
 * @LastEditors: matiastang
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/views/web/interface/components/baseInfoCell/BaseInfoCell.vue
-->
<template>
    <div class="base-info-cell borderBox cursorP flexRowCenter" @click="infoCellAction">
        <div class="cell-left flexRowCenter">
            <svg class="icon cell-icon" aria-hidden="true">
                <use :xlink:href="`#${data.apiIconUrl}`"></use>
            </svg>
            <div class="cell-title-content flexColumnCenter">
                <div class="cell-title defaultFont">{{ data.apiName }}</div>
                <div class="cell-item flexRowCenter">
                    <div class="cell-item-title defaultFont">描述:</div>
                    <div class="cell-text defaultFont">{{ data.apiDescribe }}</div>
                </div>
                <div class="cell-item flexRowCenter">
                    <div class="cell-item-title defaultFont">接口CODE:</div>
                    <div class="cell-id defaultFont">{{ data.apiCode }}</div>
                </div>
                <div class="cell-item cell-item-last flexRowCenter">
                    <div class="cell-item-title defaultFont">价格:</div>
                    <div class="cell-price defaultFont">{{ `${data.apiPrice.toFixed(2)}元` }}</div>
                </div>
            </div>
        </div>
        <div class="cell-button defaultFont" @click.stop="cellButtonAction">试用接口</div>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useRouter } from 'vue-router'
import { ApiInfoType } from '@/common/request/modules/home/homeInterface'
import { interface_id_check } from 'utils/check/index'
import ElMessage from '@/common/utils/message'

export default defineComponent({
    name: 'BaseInfoCell',
    props: {
        data: {
            type: Object as PropType<ApiInfoType>,
            default: () => {
                return {}
            },
        },
    },
    setup(props) {
        const router = useRouter()
        /**
         * 跳转到接口试用界面
         */
        const cellButtonAction = () => {
            if (interface_id_check(props.data.apiInfoId)) {
                router.push({
                    path: `/interface/call/${props.data.apiInfoId}`,
                })
            } else {
                ElMessage({
                    message: '接口id错误',
                    type: 'error',
                })
            }
        }
        /**
         * 跳转到接口详情界面
         */
        const infoCellAction = () => {
            if (interface_id_check(props.data.apiInfoId)) {
                router.push({
                    path: `/interface/info/${props.data.apiInfoId}`,
                })
            } else {
                ElMessage({
                    message: '接口id错误',
                    type: 'error',
                })
            }
        }
        return {
            infoCellAction,
            cellButtonAction,
        }
    },
})
</script>

<style lang="scss" scoped>
.base-info-cell {
    width: 100%;
    padding: 24px 0px;
    justify-content: space-between !important;
    background: $themeBgColor;
    border-bottom: 1px dashed #dfdfdf;
    .cell-left {
        align-items: stretch;
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
            .cell-item-last {
                margin-bottom: 0px;
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
