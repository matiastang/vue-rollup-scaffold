<!--
 * @Author: your name
 * @Date: 2021-11-08 14:55:53
 * @LastEditTime: 2021-11-09 10:27:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/views/discount/Discount.vue
-->
<template>
    <div class="discount borderBox">
        <div class="discount-top-content borderBox">
            <div class="discount-money-content flexRowCenter">
                <div class="discount-title defaultFont">接口套餐:</div>
                <div class="discount-money-right-content flexRowCenter">
                    <DiscountPackage
                        v-for="(item, index) in moneyArr"
                        :key="item.title"
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
                        :select="item.selected"
                    />
                </div>
            </div>
            <div class="discount-money-content flexRowCenter" style="margin: 24px 0px">
                <div class="discount-title defaultFont">支付方式:</div>
                <div class="discount-money-right-content flexRowCenter">
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
                            <img class="discount-service-item-img" />
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
        <WeixinModel v-model="weixinDialogVisible" />
        <TransferModel v-model="transferDialogVisible" @post="transferAction" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import DiscountPackage from './components/discountPackage/DiscountPackage.vue'
import Payment from '@/components/payment/Payment.vue'
import WeixinModel from '@/components/weixinModel/WeixinModel.vue'
import TransferModel from '@/components/transferModel/TransferModel.vue'
import { ElMessage } from 'element-plus'

export default defineComponent({
    name: 'Discount',
    setup() {
        const router = useRouter()
        const timeArr = reactive([
            {
                title: '1年',
                selected: true,
            },
        ])
        const moneyArr = reactive([
            {
                discountPrice: 1500,
                originalPrice: 1500,
                text: '元/1万次',
                value: '0.15',
                selected: false,
                recommend: false,
            },
            {
                discountPrice: 6000,
                originalPrice: 7500,
                text: '元/1万次',
                value: '0.15',
                selected: true,
                recommend: true,
            },
            {
                discountPrice: 10000,
                originalPrice: 15000,
                text: '元/10万次',
                value: '0.15',
                selected: false,
                recommend: false,
            },
            {
                discountPrice: 1000,
                originalPrice: 15000,
                text: '元/10万次',
                value: '0.15',
                selected: false,
                recommend: false,
            },
            {
                discountPrice: 1000,
                originalPrice: 15000,
                text: '元/10万次',
                value: '0.15',
                selected: false,
                recommend: false,
            },
        ])
        const discountSelectAction = (index: number) => {
            for (let i = 0; i < moneyArr.length; i++) {
                moneyArr[i].selected = i === index
            }
        }
        const paymentArr = reactive([
            {
                title: '微信支付',
                url: 'static/recharge/recharge-select.svg',
                selected: true,
            },
            {
                title: '支付宝支付',
                url: 'static/recharge/recharge-select.svg',
                selected: false,
            },
            {
                title: '对公转账',
                url: 'static/recharge/recharge-select.svg',
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
                path: '/discount/companyTransfer',
            })
        }
        return {
            timeArr,
            moneyArr,
            discountSelectAction,
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
    padding: 20px 10% 60px 10%;
    .discount-top-content {
        width: 100%;
        background: $themeBgColor;
        padding: 24px 16px 42px 16px;
        margin-bottom: 20px;
        .discount-money-content {
            justify-content: flex-start;
            align-items: flex-start;
            .discount-title {
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
                    font-size: 14px;
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
                        font-size: 18px;
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
                    font-size: 14px;
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
                            font-size: 18px;
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
                        font-size: 18px;
                        color: $titleColor;
                        line-height: 26px;
                        margin-top: 26px;
                    }
                    .discount-course-item-text {
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
    .discount {
        padding: 20px 5% 60px 5%;
    }
}
</style>
