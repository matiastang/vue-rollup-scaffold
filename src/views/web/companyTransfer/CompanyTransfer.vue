<!--
 * @Author: matiastang
 * @Date: 2021-11-11 17:58:07
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-08 10:38:57
 * @FilePath: /datumwealth-openalpha-front/src/views/web/companyTransfer/CompanyTransfer.vue
 * @Description: 对公转账成功
-->
<template>
    <div class="company-transfer borderBox flexColumnCenter">
        <div class="company-transfer-content borderBox flexColumnCenter">
            <img class="company-transfer-icon" src="static/user/certification_success.svg" />
            <div class="company-transfer-title">提交订单成功</div>
            <div class="company-transfer-bottom-content">
                <div class="company-transfer-bottom-title defaultFont">
                    {{ `西筹数据开放平台${isDiscount ? '优惠套餐' : '充值'}订单` }}
                </div>
                <div class="order-info borderBox">
                    <div
                        v-for="item in orderData.info"
                        :key="item.title"
                        class="order-info-cell defaultFont flexRowCenter"
                    >
                        <div class="order-info-title defaultFont">{{ item.title }}</div>
                        <div class="order-info-value defaultFont">{{ item.value }}</div>
                    </div>
                </div>
                <div class="company-transfer-tottom-title defaultFont">
                    请将款项打至西筹对公账户
                </div>
                <div class="company-info borderBox">
                    <div
                        v-for="item in companyInfo"
                        :key="item.title"
                        class="order-info-cell defaultFont flexRowCenter"
                    >
                        <div class="order-info-title defaultFont">{{ item.title }}</div>
                        <div class="order-info-value defaultFont">{{ item.value }}</div>
                    </div>
                </div>
                <div class="company-transfer-tottom-title defaultFont">转账成功后如何生效?</div>
                <div class="company-transfer-tottom-content borderBox flexRowCenter">
                    <div class="company-transfer-tottom-content-left-text defaultFont">
                        转账成功后，请到
                    </div>
                    <div
                        class="company-transfer-tottom-content-center-text cursorP defaultFont"
                        @click="orderAction"
                    >
                        我的订单
                    </div>
                    <div class="company-transfer-tottom-content-right-text defaultFont">
                        {{
                            `,点击「上传凭证」,将电汇凭证拍照上传，审核通过后${
                                isDiscount ? '套餐' : '充值'
                            }生效。`
                        }}
                    </div>
                </div>
                <div class="company-transfer-warning-text defaultFont">温馨提示</div>
                <div class="company-transfer-warning-text defaultFont" style="padding: 18px 44px">
                    {{ `1.请于${lastTime}前完成转账，若未及时转账，订单将取消` }}
                </div>
                <div class="company-transfer-warning-text defaultFont">
                    {{
                        `2.请在电汇凭证的「汇款用途」中写入“西筹数据开放平台${
                            isDiscount ? '优惠套餐' : '充值'
                        }”`
                    }}
                </div>
            </div>
            <div
                v-if="false"
                class="company-transfer-download defaultFont cursorP"
                @click="downloadAction"
            >
                下载采购订单
            </div>
            <div v-if="false" class="company-transfer-text defaultFont">提交财务打款更方便</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, watchSyncEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ElMessage from '@/common/utils/message'
import { getOdInfo } from '@/common/request/modules/pay/pay'
import { useStore } from 'store/index'

export default defineComponent({
    name: 'CompanyTransfer',
    setup() {
        const router = useRouter()
        const route = useRoute()
        const store = useStore()
        const companyInfo = [
            {
                title: '开户名称:',
                value: '成都西筹金融科技有限公司',
            },
            {
                title: '开户银行:',
                value: '招商银行股份有限公司北京自贸试验区商务中心区支行',
            },
            {
                title: '银行账号:',
                value: '1109 4435 7310 101',
            },
            {
                title: '汇款用途:',
                value: '西筹数据开放平台优惠套餐',
            },
        ]
        const orderId = computed(() => {
            return route.params.id as string
        })
        const orderData = reactive({
            info: [
                {
                    title: '充值帐号:',
                    value: '-',
                },
                {
                    title: '订单编号:',
                    value: '-',
                },
                {
                    title: '订单内容:',
                    value: '-',
                },
                {
                    title: '实付金额:',
                    value: '-',
                },
                {
                    title: '转账方式:',
                    value: '-',
                },
                {
                    title: '订单时间:',
                    value: '-',
                },
            ],
        })
        const userName = computed(() => {
            return store.state.userModule.userLoginInfo.member.userName || '-'
        })
        const isDiscount = computed(() => {
            return route.path.startsWith('/discount/companyTransfer')
        })
        companyInfo[companyInfo.length - 1].value = `西筹数据开放平台${
            isDiscount.value ? '优惠套餐' : '充值调用'
        }`
        const lastTime = ref('')
        // route
        watchSyncEffect(async () => {
            let res = await getOdInfo(orderId.value)
            lastTime.value = res.confirmTime
            orderData.info = [
                {
                    title: '充值帐号:',
                    value: userName.value,
                },
                {
                    title: '订单编号:',
                    value: res.orderSn,
                },
                {
                    title: '订单内容:',
                    value: `西筹数据开放平台${isDiscount.value ? '优惠套餐' : '充值调用'}`,
                },
                {
                    title: '实付金额:',
                    value: `${res.goodsAmount.toFixed(2)}元`,
                },
                {
                    title: '转账方式:',
                    value: res.payName,
                },
                {
                    title: '订单时间:',
                    value: res.addTime,
                },
            ]
        })
        /**
         * 我的订单
         */
        const orderAction = () => {
            router.push({
                path: '/user/deal/order',
            })
        }
        const downloadAction = () => {
            // TODO: - 校验
            ElMessage({
                message: '功能开发中...',
                type: 'warning',
            })
        }
        return {
            isDiscount,
            lastTime,
            orderData,
            companyInfo,
            orderAction,
            downloadAction,
        }
    },
})
</script>

<style lang="scss" scoped>
.company-transfer {
    width: 100%;
    padding: 20px calc(50% - 712px) 60px calc(50% - 712px);
    .company-transfer-content {
        width: 100%;
        background: $themeBgColor;
        padding: 54px 16px 47px 16px;
        .company-transfer-icon {
            width: 48px;
            height: 48px;
            border-radius: 24px;
        }
        .company-transfer-title {
            font-size: fontSize(22px);
            @include defaultFontMedium;
            color: $titleColor;
            line-height: 30px;
            letter-spacing: 2px;
            margin: 16px 0px 30px 16px;
        }
        .company-transfer-bottom-content {
            width: 100%;
            border: 1px solid #dfdfdf;
            margin-bottom: 30px;
            padding-bottom: 30px;
            .company-transfer-bottom-title {
                width: 100%;
                height: 60px;
                background: #e9e9e9;
                font-size: fontSize(18px);
                color: $titleColor;
                line-height: 60px;
                text-align: center;
            }
            .order-info,
            .company-info {
                width: 100%;
                padding: 27px 44px;
                .order-info-cell {
                    justify-content: flex-start;
                    margin-bottom: 20px;
                    .order-info-title {
                        font-size: fontSize(14px);
                        color: $placeholderColor;
                        line-height: 20px;
                        margin-right: 12px;
                    }
                    .order-info-value {
                        font-size: fontSize(16px);
                        color: $titleColor;
                        line-height: 24px;
                    }
                }
            }
            .company-transfer-tottom-title {
                width: 100%;
                padding: 0px 44px;
                font-size: fontSize(18px);
                @include defaultFontMedium;
                color: $titleColor;
                line-height: 26px;
                text-align: left;
            }
            .company-info {
                padding: 15px 44px 27px 44px;
            }
            .company-transfer-tottom-content {
                width: 100%;
                padding: 19px 44px 48px 44px;
                justify-content: flex-start;
                .company-transfer-tottom-content-left-text,
                .company-transfer-tottom-content-right-text {
                    font-size: fontSize(16px);
                    color: $titleColor;
                    line-height: 24px;
                }
                .company-transfer-tottom-content-center-text {
                    font-size: fontSize(16px);
                    color: #4e9aeb;
                    line-height: 24px;
                }
            }
            .company-transfer-warning-text {
                width: 100%;
                padding: 0px 44px;
                font-size: fontSize(14px);
                color: #e62412;
                line-height: 20px;
                text-align: left;
            }
        }
        .company-transfer-download {
            width: 153px;
            height: 42px;
            background: $themeColor;
            border-radius: 4px;
            font-size: fontSize(16px);
            color: $themeBgColor;
            line-height: 42px;
        }
        .company-transfer-text {
            font-size: fontSize(14px);
            color: $placeholderColor;
            line-height: 20px;
            text-align: center;
            margin-top: 12px;
        }
    }
}
@media screen and (max-width: 1500px) {
    .company-transfer {
        padding: 20px 30px 60px 30px;
    }
}
</style>
