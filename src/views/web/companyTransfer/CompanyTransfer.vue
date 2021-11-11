<!--
 * @Author: your name
 * @Date: 2021-11-09 09:55:15
 * @LastEditTime: 2021-11-09 11:18:55
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/views/companyTransfer/CompanyTransfer.vue
-->
<template>
    <div class="company-transfer borderBox flexColumnCenter">
        <div class="company-transfer-content borderBox flexColumnCenter">
            <div class="company-transfer-icon"></div>
            <div class="company-transfer-title">提交订单成功</div>
            <div class="company-transfer-bottom-content">
                <div class="company-transfer-bottom-title defaultFont">
                    西筹数据开放平台优惠套餐订单
                </div>
                <div class="order-info borderBox">
                    <div
                        v-for="item in orderInfo"
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
                        ,点击「上传凭证」,将电汇凭证拍照上传，审核通过后套餐生效。
                    </div>
                </div>
                <div class="company-transfer-warning-text defaultFont">温馨提示</div>
                <div class="company-transfer-warning-text defaultFont" style="padding: 18px 44px">
                    1.请于2021-10-30 10:47:25前完成转账，若未及时转账，订单将取消
                </div>
                <div class="company-transfer-warning-text defaultFont">
                    2.请在电汇凭证的「汇款用途」中写入“西筹数据开放平台优惠套餐”
                </div>
            </div>
            <div class="company-transfer-download defaultFont cursorP" @click="downloadAction">
                下载采购订单
            </div>
            <div class="company-transfer-text defaultFont">提交财务打款更方便</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'

export default defineComponent({
    name: 'CompanyTransfer',
    setup() {
        const orderInfo = [
            {
                title: '充值帐号:',
                value: '18708147975',
            },
            {
                title: '订单编号:',
                value: 'B20211027104725848843',
            },
            {
                title: '订单内容:',
                value: '西筹数据开放平台优惠套餐',
            },
            {
                title: '实付金额:',
                value: '6,000.00元',
            },
            {
                title: '转账方式:',
                value: '对公转账',
            },
            {
                title: '订单时间:',
                value: '2021-10-27 10:47:25',
            },
        ]
        const companyInfo = [
            {
                title: '开户名称:',
                value: '成都西筹金融科技有限公司',
            },
            {
                title: '开户银行:',
                value: '中国工商银行股份有限公司北京成府路支行',
            },
            {
                title: '银行账号:',
                value: '0200 0957 0920 0214 091',
            },
            {
                title: '汇款用途:',
                value: '西筹数据开放平台优惠套餐',
            },
        ]
        const orderAction = () => {
            // TODO: - 校验
            ElMessage({
                message: '功能开发中...',
                type: 'warning',
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
            orderInfo,
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
    padding: 20px 10% 60px 10%;
    .company-transfer-content {
        width: 100%;
        background: $themeBgColor;
        padding: 54px 16px 47px 16px;
        .company-transfer-icon {
            width: 48px;
            height: 48px;
            background: #64d16d;
            border-radius: 24px;
        }
        .company-transfer-title {
            font-size: 22px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
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
                font-size: 18px;
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
                        font-size: 14px;
                        color: $placeholderColor;
                        line-height: 20px;
                        margin-right: 12px;
                    }
                    .order-info-value {
                        font-size: 16px;
                        color: $titleColor;
                        line-height: 24px;
                    }
                }
            }
            .company-transfer-tottom-title {
                width: 100%;
                padding: 0px 44px;
                font-size: 18px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: $titleColor;
                line-height: 26px;
                letter-spacing: 1px;
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
                    font-size: 16px;
                    color: $titleColor;
                    line-height: 24px;
                }
                .company-transfer-tottom-content-center-text {
                    font-size: 16px;
                    color: #4e9aeb;
                    line-height: 24px;
                }
            }
            .company-transfer-warning-text {
                width: 100%;
                padding: 0px 44px;
                font-size: 14px;
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
            font-size: 16px;
            color: $themeBgColor;
            line-height: 42px;
        }
        .company-transfer-text {
            font-size: 14px;
            color: $placeholderColor;
            line-height: 20px;
            text-align: center;
            margin-top: 12px;
        }
    }
}
@media screen and (max-width: 1360px) {
    .company-transfer {
        padding: 20px 5% 60px 5%;
    }
}
</style>
