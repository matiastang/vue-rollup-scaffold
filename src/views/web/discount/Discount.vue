<!--
 * @Author: your name
 * @Date: 2021-11-08 14:55:53
 * @LastEditTime: 2021-12-01 19:14:59
 * @LastEditors: matiastang
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/views/web/discount/Discount.vue
-->
<template>
    <div class="discount borderBox">
        <div class="discount-top-content borderBox">
            <div class="discount-money-content flexRowCenter">
                <div class="discount-title defaultFont">接口套餐:</div>
                <div class="discount-money-right-content flexRowCenter">
                    <DiscountPackage
                        v-for="(item, index) in moneyArr"
                        :key="item.value"
                        :discount="item.discountPrice"
                        :original="item.originalPrice"
                        :text="item.text"
                        :value="item.value"
                        :select="item.selected"
                        :recommend="item.recommend"
                        @selectAction="discountSelectAction(index)"
                    />
                </div>
            </div>
            <div class="discount-money-content flexRowCenter" style="margin: 24px 0px">
                <div class="discount-title defaultFont">有效期限:</div>
                <div class="discount-money-right-content flexRowCenter">
                    <Payment
                        v-for="item in timeArr"
                        :key="item.title"
                        :title="item.title"
                        :selected="item.selected"
                    />
                </div>
            </div>
            <div class="discount-money-content flexRowCenter" style="margin: 24px 0px">
                <div class="discount-title defaultFont">支付方式:</div>
                <div class="discount-money-right-content flexRowCenter">
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
        <div class="discount-bottom-content borderBox flexColumnCenter">
            <div class="discount-service-content flexColumnCenter">
                <div class="discount-title-content flexRowCenter">
                    <div class="discount-line"></div>
                    <div class="discount-title defaultFont">服务优势</div>
                </div>
                <div class="discount-service-bottom-content flexRowCenter">
                    <div
                        v-for="(item, index) in serviceArr"
                        :key="item.title"
                        :class="[
                            'discount-service-item',
                            {
                                'discount-service-item-start': index === 0,
                                'discount-service-item-end': index === serviceArr.length - 1,
                            },
                        ]"
                    >
                        <div class="discount-service-item-img-content flexRowCenter">
                            <img
                                class="discount-service-item-img"
                                :src="getAdvantageUrl(index + 1)"
                            />
                        </div>
                        <div class="discount-service-item-title defaultFont">{{ item.title }}</div>
                    </div>
                </div>
            </div>
            <div class="discount-course-content flexColumnCenter">
                <div class="discount-title-content flexRowCenter">
                    <div class="discount-line"></div>
                    <div class="discount-title defaultFont">使用流程</div>
                </div>
                <div class="discount-course-bottom-content flexRowCenter">
                    <div
                        v-for="(item, index) in courseArr"
                        :key="item.title"
                        class="discount-course-item flexColumnCenter"
                    >
                        <div class="discount-course-item-top-content flexRowCenter">
                            <div
                                :class="[
                                    'discount-course-item-left',
                                    { 'discount-course-item-hidden-line': index === 0 },
                                ]"
                            ></div>
                            <div class="discount-course-item-index defaultFont">
                                {{ index + 1 }}
                            </div>
                            <div
                                :class="[
                                    'discount-course-item-right',
                                    {
                                        'discount-course-item-hidden-line':
                                            index === courseArr.length - 1,
                                    },
                                ]"
                            ></div>
                        </div>
                        <div class="discount-course-item-title defaultFont">{{ item.title }}</div>
                        <div class="discount-course-item-text defaultFont">{{ item.text }}</div>
                    </div>
                </div>
            </div>
        </div>
        <LoginModel v-model="loginDialogVisible" @login="loginAction" />
        <WeixinModel
            :price="selectedMoney"
            :order="orederData.order.orderId"
            :codeUrl="orederData.order.codeUrl"
            :orderType="orderType.discount"
            :orderSn="orederData.order.orderSn"
            v-model="weixinDialogVisible"
            @close="weixinPayClose"
        />
        <TransferModel
            :price="selectedMoney"
            :orderType="orderType.discount"
            :payId="paymentSeleted.payment.payId"
            v-model="transferDialogVisible"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watchSyncEffect } from 'vue'
import { useRouter } from 'vue-router'
import DiscountPackage from './components/discountPackage/DiscountPackage.vue'
import Payment from '@/components/payment/Payment.vue'
import WeixinModel from '@/components/weixinModel/WeixinModel.vue'
import TransferModel from '@/components/transferModel/TransferModel.vue'
import ElMessage from '@/common/utils/message'
import { orderType, addOd, payList } from '@/common/request/modules/pay/pay'
import { PaymentType, WeiXinOdResponse } from '@/common/request/modules/pay/payInterface'
import { localStorageKey, localStorageRead } from 'utils/storage/localStorage'

export default defineComponent({
    name: 'Discount',
    setup() {
        const router = useRouter()
        const loginDialogVisible = ref(false)
        const timeArr = reactive([
            {
                title: '1年',
                selected: true,
            },
        ])
        const selectedMoney = ref(1000)
        const moneyArr = reactive([
            {
                discountPrice: 300,
                originalPrice: 400,
                text: '元/2000次',
                value: '0.15',
                selected: false,
                recommend: false,
            },
            {
                discountPrice: 1000,
                originalPrice: 1600,
                text: '元/8000次',
                value: '0.125',
                selected: true,
                recommend: true,
            },
            {
                discountPrice: 5000,
                originalPrice: 10000,
                text: '元/5万次',
                value: '0.1',
                selected: false,
                recommend: false,
            },
            {
                discountPrice: 10000,
                originalPrice: 25000,
                text: '元/12.5万次',
                value: '0.08',
                selected: false,
                recommend: false,
            },
            {
                discountPrice: 30000,
                originalPrice: 100000,
                text: '元/50万次',
                value: '0.06',
                selected: false,
                recommend: false,
            },
        ])
        const discountSelectAction = (index: number) => {
            for (let i = 0; i < moneyArr.length; i++) {
                if (i === index) {
                    moneyArr[i].selected = true
                    selectedMoney.value = moneyArr[i].discountPrice
                } else {
                    moneyArr[i].selected = false
                }
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
                            orderType: orderType.discount,
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
                text: '充值成功，优惠套餐到账',
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
            timeArr,
            selectedMoney,
            moneyArr,
            discountSelectAction,
            paymentSeleted,
            orderType,
            paymentData,
            paymentSelectAction,
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
        }
    },
    components: {
        DiscountPackage,
        Payment,
        WeixinModel,
        TransferModel,
    },
})
</script>

<style lang="scss" scoped>
.discount {
    width: 100%;
    padding: 20px calc(50% - 712px) 60px calc(50% - 712px);
    .discount-top-content {
        width: 100%;
        background: $themeBgColor;
        padding: 24px 16px 42px 16px;
        margin-bottom: 20px;
        .discount-money-content {
            justify-content: flex-start;
            align-items: flex-start;
            .discount-title {
                font-size: fontSize(14px);
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
            font-size: fontSize(16px);
            color: $themeBgColor;
            line-height: 42px;
            text-align: center;
        }
    }
    .discount-bottom-content {
        width: 100%;
        background: $themeBgColor;
        padding: 24px 16px;
        .discount-service-content {
            width: 100%;
            .discount-title-content {
                width: 100%;
                justify-content: flex-start;
                .discount-line {
                    width: 2px;
                    height: 14px;
                    background: $themeColor;
                    margin-right: 4px;
                }
                .discount-title {
                    font-size: fontSize(14px);
                    color: $titleColor;
                    line-height: 20px;
                }
            }
            .discount-service-bottom-content {
                width: 100%;
                .discount-service-item {
                    width: 25%;
                    padding: 16px 0px 32px 0px;
                    margin: 0px 8px;
                    .discount-service-item-img-content {
                        background: #fdf6f4;
                        width: 100%;
                        height: 218px;
                        .discount-service-item-img {
                            width: 120px;
                            height: 120px;
                        }
                    }
                    .discount-service-item-title {
                        width: 100%;
                        font-size: fontSize(18px);
                        color: $titleColor;
                        line-height: 26px;
                        text-align: center;
                        margin-top: 12px;
                    }
                }
                .discount-service-item-start {
                    margin: 0px 8px 0px 0px;
                }
                .discount-service-item-end {
                    margin: 0px 0px 0px 8px;
                }
            }
        }
        .discount-course-content {
            width: 100%;
            .discount-title-content {
                width: 100%;
                justify-content: flex-start;
                .discount-line {
                    width: 2px;
                    height: 14px;
                    background: $themeColor;
                    margin-right: 4px;
                }
                .discount-title {
                    font-size: fontSize(14px);
                    color: $titleColor;
                    line-height: 20px;
                }
            }
            .discount-course-bottom-content {
                width: 100%;
                padding: 56px 0px 58px;
                align-items: flex-start;
                .discount-course-item {
                    width: 100%;
                    .discount-course-item-top-content {
                        width: 100%;
                        .discount-course-item-hidden-line {
                            background: transparent !important;
                        }
                        .discount-course-item-left {
                            flex-grow: 1;
                            height: 1px;
                            background: $themeColor;
                            margin-right: 36px;
                        }
                        .discount-course-item-index {
                            flex-grow: 0;
                            flex-flow: 0;
                            width: 56px;
                            height: 56px;
                            background: $themeColor;
                            border-radius: 28px;
                            box-shadow: 0px 5px 12px 0px #ffc2aa;
                            font-size: fontSize(18px);
                            color: $themeBgColor;
                            line-height: 56px;
                            text-align: center;
                        }
                        .discount-course-item-right {
                            flex-grow: 1;
                            height: 1px;
                            background: $themeColor;
                            margin-left: 36px;
                        }
                    }
                    .discount-course-item-title {
                        width: 100%;
                        text-align: center;
                        font-size: fontSize(18px);
                        color: $titleColor;
                        line-height: 26px;
                        margin-top: 26px;
                    }
                    .discount-course-item-text {
                        width: 100%;
                        text-align: center;
                        font-size: fontSize(14px);
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
    .discount {
        padding: 20px 30px 60px 30px;
    }
}
</style>
