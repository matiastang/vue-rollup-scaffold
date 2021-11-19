<!--
 * @Author: your name
 * @Date: 2021-11-08 10:27:06
 * @LastEditTime: 2021-11-19 15:12:31
 * @LastEditors: matiastang
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/views/web/recharge/Recharge.vue
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
                </div>
            </div>
            <div class="recharge-money-content flexRowCenter" style="margin: 24px 0px">
                <div class="recharge-title defaultFont">支付方式:</div>
                <div class="recharge-money-right-content flexRowCenter">
                    <Payment
                        v-for="(item, index) in paymentArr"
                        :key="item.title"
                        :title="item.title"
                        :url="item.url"
                        :select="item.selected"
                        @selectAction="paymentSelectAction(index)"
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
                                :src="`static/pay/advantage_${index + 1}.svg`"
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
        <WeixinModel v-model="weixinDialogVisible" />
        <TransferModel v-model="transferDialogVisible" @post="transferAction" />
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import RechargeMoney from './components/rechargeMoney/RechargeMoney.vue'
import Payment from '@/components/payment/Payment.vue'
import WeixinModel from '@/components/weixinModel/WeixinModel.vue'
import TransferModel from '@/components/transferModel/TransferModel.vue'
import { ElMessage } from 'element-plus'

export default defineComponent({
    name: 'Recharge',
    setup() {
        const router = useRouter()
        const moneyArr = reactive([
            {
                title: '500',
                selected: true,
            },
            {
                title: '1000',
                selected: false,
            },
            {
                title: '2000',
                selected: false,
            },
            {
                title: '5000',
                selected: false,
            },
            {
                title: '10000',
                selected: false,
            },
        ])
        const moneySelectAction = (index: number) => {
            for (let i = 0; i < moneyArr.length; i++) {
                moneyArr[i].selected = i === index
            }
        }
        const paymentArr = reactive([
            {
                title: '微信支付',
                url: 'static/pay/weixin_icon.svg',
                selected: true,
            },
            {
                title: '支付宝支付',
                url: 'static/pay/zfb_icon.svg',
                selected: false,
            },
            {
                title: '对公转账',
                url: 'static/pay/dgzz_icon.svg',
                selected: false,
            },
        ])
        let weixinDialogVisible = ref(false)
        let transferDialogVisible = ref(false)
        const paymentSelectAction = (index: number) => {
            for (let i = 0; i < paymentArr.length; i++) {
                paymentArr[i].selected = i === index
            }
        }
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
        const payAction = () => {
            for (let i = 0; i < paymentArr.length; i++) {
                if (paymentArr[i].selected) {
                    if (i === 0) {
                        weixinDialogVisible.value = true
                    }
                    if (i === 2) {
                        transferDialogVisible.value = true
                    }
                }
            }

            // TODO: - 校验
            ElMessage({
                message: '功能开发中...',
                type: 'warning',
            })
        }
        const transferAction = () => {
            router.push({
                path: '/recharge/companyTransfer',
            })
        }
        return {
            moneyArr,
            moneySelectAction,
            paymentArr,
            paymentSelectAction,
            serviceArr,
            courseArr,
            payAction,
            weixinDialogVisible,
            transferDialogVisible,
            transferAction,
        }
    },
    components: {
        RechargeMoney,
        Payment,
        WeixinModel,
        TransferModel,
    },
})
</script>

<style lang="scss" scoped>
.recharge {
    width: 100%;
    padding: 20px 10% 60px 10%;
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
@media screen and (max-width: 1360px) {
    .recharge {
        padding: 20px 5% 60px 5%;
    }
}
</style>
