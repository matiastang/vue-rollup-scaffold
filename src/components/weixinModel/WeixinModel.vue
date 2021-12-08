<!--
 * @Author: matiastang
 * @Date: 2021-11-11 17:58:07
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-08 10:36:55
 * @FilePath: /datumwealth-openalpha-front/src/components/weixinModel/WeixinModel.vue
 * @Description: 微信支付
-->
<template>
    <div class="weixin-model">
        <el-dialog :="$attrs" center @close="dialogCloseAction">
            <div class="model-title defaultFont">
                {{ `西筹数据开放平台${orderType === 1 ? '充值' : '优惠套餐'}` }}
            </div>
            <div class="model-pay-title">微信支付</div>
            <div class="model-Price-content flexRowCenter">
                <div class="model-Price-title defaultFont">实付金额:</div>
                <div class="model-Price-price">{{ `${price.toFixed(2)}元` }}</div>
            </div>
            <div class="model-Price-content flexRowCenter">
                <div class="model-Price-title defaultFont">单据编号:</div>
                <div class="model-Price-order">{{ orderSn }}</div>
            </div>
            <div class="model-code-content flexRowCenter">
                <img
                    v-if="status"
                    class="model-code-success"
                    src="static/user/certification_success.svg"
                />
                <QrcodeVue v-else class="model-code" :value="codeUrl" :size="size" />
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, watchEffect, onUnmounted } from 'vue'
import QrcodeVue from 'qrcode.vue'
import { payStatus } from '@/common/request/modules/pay/pay'

export default defineComponent({
    name: 'WeixinModel',
    inheritAttrs: false,
    props: {
        price: {
            type: Number,
            default: 0,
        },
        orderSn: {
            type: String,
            default: '',
        },
        order: {
            type: Number,
            default: -1,
        },
        codeUrl: {
            type: String,
            default: '',
        },
        orderType: {
            type: Number,
            default: 0,
        },
    },
    emits: ['statusChange', 'close'],
    setup(props, context) {
        const size = 370
        // 支付状态
        const status = ref(false)
        // 查询定时器
        const timerId: Ref<number | null> = ref(null)
        // 查询支付状态
        const getOrderStatus = (orderId: number) => {
            timerId.value = window.setInterval(() => {
                payStatus(orderId)
                    .then((res) => {
                        status.value = res
                        if (res) {
                            if (timerId.value) {
                                window.clearInterval(timerId.value)
                            }
                            context.emit('statusChange')
                        }
                    })
                    .catch((err) => {
                        console.error(err)
                    })
            }, 3000)
        }
        watchEffect(() => {
            if (timerId.value) {
                window.clearInterval(timerId.value)
            }
            if (props.order > 0) {
                getOrderStatus(props.order)
            }
        })
        // 销毁定时器
        const dialogCloseAction = () => {
            if (timerId.value) {
                window.clearInterval(timerId.value)
            }
            context.emit('close')
        }
        onUnmounted(() => {
            if (timerId.value) {
                window.clearInterval(timerId.value)
            }
        })
        return {
            size,
            status,
            dialogCloseAction,
        }
    },
    components: {
        QrcodeVue,
    },
})
</script>

<style lang="scss" scoped>
.weixin-model {
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
        padding: 0px 25px 66px 25px;
        .model-title {
            height: 41px;
            width: 100%;
            font-size: fontSize(18px);
            color: $titleColor;
            line-height: 40px;
            text-align: left;
            border-bottom: 1px solid #dfdfdf;
        }
        .model-pay-title {
            @include defaultFontMedium;
            width: 100%;
            font-size: fontSize(18px);
            color: $titleColor;
            line-height: 26px;
            text-align: center;
            margin: 14px 0px;
        }
        .model-Price-content {
            margin-bottom: 18px;
            justify-content: flex-start;
            .model-Price-title {
                font-size: fontSize(14px);
                color: #595959;
                line-height: 20px;
                margin-right: 12px;
            }
            .model-Price-price {
                @include defaultFontMedium;
                font-size: fontSize(16px);
                color: $themeColor;
                line-height: 24px;
            }
            .model-Price-order {
                font-size: fontSize(16px);
                color: $titleColor;
                line-height: 24px;
            }
        }
        .model-code-content {
            margin-top: 17px;
            width: 100%;
            max-width: 694px;
            height: 371px;
            .model-code-success {
                width: 150px;
                height: 150px;
            }
        }
    }
    ::v-deep(.el-dialog__footer) {
        display: none;
    }
}
@media screen and (max-width: 1300px) {
    .weixin-model {
        ::v-deep(.el-dialog) {
            width: 60%;
        }
    }
}
@media screen and (max-width: 1100px) {
    .weixin-model {
        ::v-deep(.el-dialog) {
            width: 70%;
        }
    }
}
@media screen and (max-width: 900px) {
    .weixin-model {
        ::v-deep(.el-dialog) {
            width: 80%;
        }
    }
}
@media screen and (max-width: 800px) {
    .weixin-model {
        ::v-deep(.el-dialog) {
            width: 90%;
        }
    }
}
</style>
