<!--
 * @Author: your name
 * @Date: 2021-11-08 17:47:01
 * @LastEditTime: 2021-12-08 10:36:29
 * @LastEditors: matiastang
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/components/transferModel/TransferModel.vue
-->
<template>
    <div id="transfer-model" class="transfer-model">
        <el-dialog :="$attrs" :append-to-body="false" center>
            <div class="model-title defaultFont">西筹数据开放平台优惠套餐</div>
            <div class="model-pay-title">对公转账</div>
            <div class="model-Price-content flexRowCenter">
                <div class="model-Price-title defaultFont">实付金额:</div>
                <div class="model-Price-price">{{ `${price.toFixed(2)}元` }}</div>
            </div>
            <div class="model-Price-content model-text-content flexColumnCenter">
                <div class="model-Price-title defaultFont" style="align-items: self-start">
                    请按以下步骤进行对公转账：
                </div>
                <div class="model-Price-text defaultFont">
                    第1步：确认您的实付金额，点击下方【提交订单】;
                </div>
                <div class="model-Price-text defaultFont">
                    第2步：将转账金额，通过您公司的对公账户转账至天眼查对公账户，将订单编号填写至电汇凭证的【附言】栏内（提交订单后，获取订单编号）；
                </div>
                <div class="model-Price-text defaultFont">
                    第3步：转账成功后，请至我的订单，点击【上传凭证】，审核通过后套餐立即生效。
                </div>
            </div>
            <div class="model-bottom flexColumnCenter">
                <div class="model-ok defaultFont" @click="transferAction">提交订单</div>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { addOd, orderType } from '@/common/request/modules/pay/pay'
import { useRouter } from 'vue-router'
import ElMessage from '@/common/utils/message'

export default defineComponent({
    name: 'TransferModel',
    inheritAttrs: false,
    props: {
        price: {
            type: Number,
            default: 0,
        },
        orderType: {
            type: Number,
            default: 0,
        },
        payId: {
            type: Number,
            default: 0,
        },
    },
    setup(props) {
        const router = useRouter()
        const transferAction = () => {
            addOd({
                goodsAmount: props.price,
                orderType: props.orderType,
                payId: props.payId,
            })
                .then((oreder) => {
                    router.push({
                        path: `/${
                            props.orderType === orderType.discount ? 'discount' : 'recharge'
                        }/companyTransfer/${oreder.orderId}`,
                    })
                })
                .catch((err) => {
                    ElMessage({
                        message: err.msg || '提交订单失败',
                        type: 'warning',
                    })
                })
        }
        return {
            transferAction,
        }
    },
})
</script>

<style lang="scss" scoped>
.transfer-model {
    ::v-deep(.el-dialog) {
        width: 50%;
        max-width: 742px;
        background: $themeBgColor;
        box-shadow: 0px 2px 32px 0px rgba(104, 104, 104, 0.5);
        border-radius: 8px;
    }
    ::v-deep(.el-dialog__header) {
        padding: 25px 25px 0px 25px;
        width: 100%;
        height: 41px;
        box-sizing: border-box;
        button {
            width: 16px;
            height: 16px;
            top: 25px;
            right: 25px;
        }
    }
    ::v-deep(.el-dialog__body) {
        padding: 0px 25px 25px 25px;
        .model-title {
            height: 41px;
            width: 100%;
            font-size: 18px;
            color: $titleColor;
            line-height: 40px;
            text-align: left;
            border-bottom: 1px solid #dfdfdf;
        }
        .model-pay-title {
            @include defaultFontMedium;
            width: 100%;
            font-size: 18px;
            color: $titleColor;
            line-height: 26px;
            text-align: center;
            margin: 14px 0px;
        }
        .model-Price-content {
            margin-bottom: 18px;
            justify-content: flex-start;
            .model-Price-title {
                font-size: 14px;
                color: #595959;
                line-height: 20px;
                margin-right: 12px;
            }
            .model-Price-price {
                @include defaultFontMedium;
                font-size: 16px;
                color: $themeColor;
                line-height: 24px;
            }
            .model-Price-text {
                font-size: 14px;
                color: $placeholderColor;
                line-height: 20px;
                text-align: left;
                margin: 5px 0px;
            }
        }
        .model-text-content {
            background: #ededed;
            border: 1px solid #dfdfdf;
            padding: 12px;
            align-items: flex-start;
            margin-bottom: 32px;
        }
        .model-bottom {
            width: 100%;
            .model-ok {
                width: 118px;
                height: 42px;
                background: $themeColor;
                border-radius: 4px;
                font-size: 16px;
                color: $themeBgColor;
                line-height: 42px;
                text-align: center;
                cursor: pointer;
            }
        }
    }
    ::v-deep(.el-dialog__footer) {
        display: none;
    }
}
@media screen and (max-width: 1300px) {
    .transfer-model {
        ::v-deep(.el-dialog) {
            width: 60%;
        }
    }
}
@media screen and (max-width: 1100px) {
    .transfer-model {
        ::v-deep(.el-dialog) {
            width: 70%;
        }
    }
}
@media screen and (max-width: 900px) {
    .transfer-model {
        ::v-deep(.el-dialog) {
            width: 80%;
        }
    }
}
@media screen and (max-width: 800px) {
    .transfer-model {
        ::v-deep(.el-dialog) {
            width: 90%;
        }
    }
}
</style>
