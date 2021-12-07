<!--
 * @Author: matiastang
 * @Date: 2021-11-19 19:17:03
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-01 15:25:23
 * @FilePath: /datumwealth-openalpha-front/src/views/web/recharge/Recharge.vue
 * @Description: 充值
-->
<template>
    <div class="recharge borderBox">
        <div class="recharge-top-content borderBox">
            <div class="recharge-money-content flexRowCenter">
                <div class="recharge-title defaultFont">充值金额:</div>
                <div class="recharge-money-right-content flexRowCenter">
                    <RechargeMoney
                        v-for="(item, index) in moneyArr"
                        :key="item.title"
                        :title="item.title"
                        :select="item.selected"
                        @selectAction="moneySelectAction(index)"
                    />
                    <MoneyInput
                        v-model="inputMoney"
                        :isFocus="inputMoneyFocus"
                        @focus="focusAction"
                        @blur="blurAction"
                    ></MoneyInput>
                </div>
            </div>
            <div class="recharge-money-content flexRowCenter" style="margin: 24px 0px">
                <div class="recharge-title defaultFont">支付方式:</div>
                <div class="recharge-money-right-content flexRowCenter">
                    <Payment
                        v-for="(item, index) in paymentData.payments"
                        :key="item.payId"
                        :title="item.payName"
                        :id="item.payId"
                        :selected="item.selected"
                        @click="paymentSelectAction(index)"
                    />
                </div>
            </div>
            <div class="pay-button cursorP" @click="payAction">确认支付</div>
        </div>
        <div class="recharge-bottom-content borderBox flexColumnCenter">
            <div class="recharge-service-content flexColumnCenter">
                <div class="recharge-title-content flexRowCenter">
                    <div class="recharge-line"></div>
                    <div class="recharge-title defaultFont">服务优势</div>
                </div>
                <div class="recharge-service-bottom-content flexRowCenter">
                    <div
                        v-for="(item, index) in serviceArr"
                        :key="item.title"
                        :class="[
                            'recharge-service-item',
                            {
                                'recharge-service-item-start': index === 0,
                                'recharge-service-item-end': index === serviceArr.length - 1,
                            },
                        ]"
                    >
                        <div class="recharge-service-item-img-content flexRowCenter">
                            <img
                                class="recharge-service-item-img"
                                :src="getAdvantageUrl(index + 1)"
                            />
                        </div>
                        <div class="recharge-service-item-title defaultFont">{{ item.title }}</div>
                    </div>
                </div>
            </div>
            <div class="recharge-course-content flexColumnCenter">
                <div class="recharge-title-content flexRowCenter">
                    <div class="recharge-line"></div>
                    <div class="recharge-title defaultFont">使用流程</div>
                </div>
                <div class="recharge-course-bottom-content flexRowCenter">
                    <div
                        v-for="(item, index) in courseArr"
                        :key="item.title"
                        class="recharge-course-item flexColumnCenter"
                    >
                        <div class="recharge-course-item-top-content flexRowCenter">
                            <div
                                :class="[
                                    'recharge-course-item-left',
                                    { 'recharge-course-item-hidden-line': index === 0 },
                                ]"
                            ></div>
                            <div class="recharge-course-item-index defaultFont">
                                {{ index + 1 }}
                            </div>
                            <div
                                :class="[
                                    'recharge-course-item-right',
                                    {
                                        'recharge-course-item-hidden-line':
                                            index === courseArr.length - 1,
                                    },
                                ]"
                            ></div>
                        </div>
                        <div class="recharge-course-item-title defaultFont">{{ item.title }}</div>
                        <div class="recharge-course-item-text defaultFont">{{ item.text }}</div>
                    </div>
                </div>
            </div>
        </div>
        <LoginModel v-model="loginDialogVisible" @login="loginAction" />
        <WeixinModel
            v-if="paymentSeleted.payment.payId === 1"
            :price="selectedMoney"
            :orderType="orderType.recharge"
            :order="orederData.order.orderId"
            :codeUrl="orederData.order.codeUrl"
            :orderSn="orederData.order.orderSn"
            v-model="weixinDialogVisible"
            @close="weixinPayClose"
        />
        <TransferModel
            :price="selectedMoney"
            :orderType="orderType.recharge"
            :payId="paymentSeleted.payment.payId"
            v-model="transferDialogVisible"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watchSyncEffect } from 'vue'
import { useRouter } from 'vue-router'
import RechargeMoney from './components/rechargeMoney/RechargeMoney.vue'
import Payment from '@/components/payment/Payment.vue'
import WeixinModel from '@/components/weixinModel/WeixinModel.vue'
import TransferModel from '@/components/transferModel/TransferModel.vue'
import ElMessage from '@/common/utils/message'
import { orderType, addOd, payList } from '@/common/request/modules/pay/pay'
import { PaymentType, WeiXinOdResponse } from '@/common/request/modules/pay/payInterface'
import { localStorageKey, localStorageRead } from 'utils/storage/localStorage'
import MoneyInput from './components/moneyInput/MoneyInput.vue'

export default defineComponent({
    name: 'Recharge',
    setup() {
        const router = useRouter()
        const selectedMoney = ref(500)
        const loginDialogVisible = ref(false)
        const moneyArr = reactive([
            {
                title: '500',
                value: 500,
                selected: true,
            },
            {
                title: '1000',
                value: 1000,
                selected: false,
            },
            {
                title: '2000',
                value: 2000,
                selected: false,
            },
            {
                title: '5000',
                value: 5000,
                selected: false,
            },
            {
                title: '10000',
                value: 10000,
                selected: false,
            },
        ])
        const inputMoney = ref(NaN)
        const inputMoneyFocus = ref(false)
        const lastSelectIndex = ref(0)
        const moneySelectAction = (index: number) => {
            inputMoney.value = NaN
            inputMoneyFocus.value = false
            lastSelectIndex.value = index
            for (let i = 0; i < moneyArr.length; i++) {
                if (i === index) {
                    moneyArr[i].selected = true
                    selectedMoney.value = moneyArr[i].value
                } else {
                    moneyArr[i].selected = false
                }
            }
        }
        const focusAction = () => {
            inputMoneyFocus.value = true
            for (let i = 0; i < moneyArr.length; i++) {
                moneyArr[i].selected = false
            }
        }
        const blurAction = () => {
            console.log(inputMoney.value)
            inputMoneyFocus.value = !isNaN(inputMoney.value)
            if (isNaN(inputMoney.value)) {
                for (let i = 0; i < moneyArr.length; i++) {
                    if (i === lastSelectIndex.value) {
                        moneyArr[i].selected = true
                        selectedMoney.value = moneyArr[i].value
                    } else {
                        moneyArr[i].selected = false
                    }
                }
            } else {
                selectedMoney.value = inputMoney.value
            }
        }
        const paymentSeleted = reactive({
            payment: {} as PaymentType,
        })
        const paymentData = reactive({
            payments: Array<PaymentType>(),
        })
        watchSyncEffect(async () => {
            const list = await payList()
            paymentData.payments = list
            if (list.length > 0) {
                paymentSeleted.payment = list[0]
            }
        })
        let weixinDialogVisible = ref(false)
        let transferDialogVisible = ref(false)
        const paymentSelectAction = (index: number) => {
            for (let i = 0; i < paymentData.payments.length; i++) {
                if (i === index) {
                    paymentData.payments[i].selected = true
                    paymentSeleted.payment = paymentData.payments[i]
                } else {
                    paymentData.payments[i].selected = false
                }
            }
        }
        // 订单
        let orederData = reactive({
            order: { payUrl: '', codeUrl: '', orderId: -1 } as WeiXinOdResponse,
        })
        // 支付
        const payAction = () => {
            // 用户token
            const userToken = localStorageRead<string>(localStorageKey.userTokenKey)
            if (!userToken || userToken.trim() === '') {
                // 未登录
                loginDialogVisible.value = true
                return
            }
            for (let i = 0; i < paymentData.payments.length; i++) {
                if (paymentData.payments[i].selected) {
                    if (paymentData.payments[i].payId === 3) {
                        transferDialogVisible.value = true
                    } else {
                        addOd({
                            goodsAmount: import.meta.env.VITE_PAY_TEST ? 0.01 : selectedMoney.value,
                            orderType: orderType.recharge,
                            payId: paymentData.payments[i].payId,
                        })
                            .then((oreder) => {
                                if (paymentData.payments[i].payId === 1) {
                                    orederData.order = oreder
                                    weixinDialogVisible.value = true
                                } else {
                                    let routerData = router.resolve({
                                        path: '/alipay',
                                        query: { payUrl: oreder.payUrl },
                                    })
                                    window.open(routerData.href, '_blank')
                                }
                            })
                            .catch((err: any) => {
                                ElMessage.error(err.msg || '生成订单错误')
                            })
                    }
                    return
                }
            }
            ElMessage({
                message: '请选择支付方式',
                type: 'warning',
            })
        }
        const loginAction = () => {
            loginDialogVisible.value = false
        }
        const weixinPayClose = () => {
            orederData.order = {
                payUrl: '',
                codeUrl: '',
                orderSn: '',
                orderId: -1,
            }
        }
        // 服务优势
        const serviceArr = [
            {
                title: '稳定及时',
            },
            {
                title: '基金全维度数据',
            },
            {
                title: '赋能多业务场景',
            },
            {
                title: '优质售后服务',
            },
        ]
        /**
         * 导入图片
         */
        const getAdvantageUrl = (index: number) => {
            return new URL(`/static/pay/advantage_${index}.svg`, import.meta.url).href
        }
        // 使用流程
        const courseArr = [
            {
                title: '充值',
                text: '充值成功，充值金额到账',
            },
            {
                title: '查看接口',
                text: '在我的接口查看或调用接口的关联token值',
            },
            {
                title: '调用接口',
                text: '测试接口或按需调用接口',
            },
        ]
        return {
            selectedMoney,
            moneyArr,
            moneySelectAction,
            paymentData,
            paymentSelectAction,
            paymentSeleted,
            orderType,
            serviceArr,
            courseArr,
            payAction,
            weixinPayClose,
            orederData,
            loginAction,
            loginDialogVisible,
            weixinDialogVisible,
            transferDialogVisible,
            getAdvantageUrl,
            inputMoney,
            inputMoneyFocus,
            focusAction,
            blurAction,
        }
    },
    components: {
        RechargeMoney,
        Payment,
        WeixinModel,
        TransferModel,
        MoneyInput,
    },
})
</script>

<style lang="scss" scoped>
.recharge {
    width: 100%;
    padding: 20px calc(50% - 712px) 60px calc(50% - 712px);
    .recharge-top-content {
        width: 100%;
        background: $themeBgColor;
        padding: 24px 16px 42px 16px;
        margin-bottom: 20px;
        .recharge-money-content {
            justify-content: flex-start;
            align-items: flex-start;
            .recharge-title {
                font-size: 14px;
                color: $titleColor;
                line-height: 20px;
            }
        }
        .pay-button {
            margin-left: 73px;
            width: 118px;
            height: 42px;
            background: $themeColor;
            border-radius: 4px;
            font-size: 16px;
            color: $themeBgColor;
            line-height: 42px;
            text-align: center;
        }
    }
    .recharge-bottom-content {
        width: 100%;
        background: $themeBgColor;
        padding: 24px 16px;
        .recharge-service-content {
            width: 100%;
            .recharge-title-content {
                width: 100%;
                justify-content: flex-start;
                .recharge-line {
                    width: 2px;
                    height: 14px;
                    background: $themeColor;
                    margin-right: 4px;
                }
                .recharge-title {
                    font-size: 14px;
                    color: $titleColor;
                    line-height: 20px;
                }
            }
            .recharge-service-bottom-content {
                width: 100%;
                .recharge-service-item {
                    width: 25%;
                    padding: 16px 0px 32px 0px;
                    margin: 0px 8px;
                    .recharge-service-item-img-content {
                        background: #fdf6f4;
                        width: 100%;
                        height: 218px;
                        .recharge-service-item-img {
                            width: 120px;
                            height: 120px;
                        }
                    }
                    .recharge-service-item-title {
                        width: 100%;
                        font-size: 18px;
                        color: $titleColor;
                        line-height: 26px;
                        text-align: center;
                        margin-top: 12px;
                    }
                }
                .recharge-service-item-start {
                    margin: 0px 8px 0px 0px;
                }
                .recharge-service-item-end {
                    margin: 0px 0px 0px 8px;
                }
            }
        }
        .recharge-course-content {
            width: 100%;
            .recharge-title-content {
                width: 100%;
                justify-content: flex-start;
                .recharge-line {
                    width: 2px;
                    height: 14px;
                    background: $themeColor;
                    margin-right: 4px;
                }
                .recharge-title {
                    font-size: 14px;
                    color: $titleColor;
                    line-height: 20px;
                }
            }
            .recharge-course-bottom-content {
                width: 100%;
                padding: 56px 0px 58px;
                align-items: flex-start;
                .recharge-course-item {
                    width: 100%;
                    .recharge-course-item-top-content {
                        width: 100%;
                        .recharge-course-item-hidden-line {
                            background: transparent !important;
                        }
                        .recharge-course-item-left {
                            flex-grow: 1;
                            height: 1px;
                            background: $themeColor;
                            margin-right: 36px;
                        }
                        .recharge-course-item-index {
                            flex-grow: 0;
                            flex-flow: 0;
                            width: 56px;
                            height: 56px;
                            background: $themeColor;
                            border-radius: 28px;
                            box-shadow: 0px 5px 12px 0px #ffc2aa;
                            font-size: 18px;
                            color: $themeBgColor;
                            line-height: 56px;
                            text-align: center;
                        }
                        .recharge-course-item-right {
                            flex-grow: 1;
                            height: 1px;
                            background: $themeColor;
                            margin-left: 36px;
                        }
                    }
                    .recharge-course-item-title {
                        width: 100%;
                        text-align: center;
                        font-size: 18px;
                        color: $titleColor;
                        line-height: 26px;
                        margin-top: 26px;
                    }
                    .recharge-course-item-text {
                        width: 100%;
                        text-align: center;
                        font-size: 14px;
                        color: $placeholderColor;
                        line-height: 20px;
                        margin-top: 6px;
                    }
                }
            }
        }
    }
}
@media screen and (max-width: 1500px) {
    .recharge {
        padding: 20px 30px 60px 30px;
    }
}
</style>
