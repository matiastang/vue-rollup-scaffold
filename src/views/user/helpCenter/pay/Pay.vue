<!--
 * @Author: matiastang
 * @Date: 2021-11-18 10:15:02
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-03 16:43:42
 * @FilePath: /datumwealth-openalpha-front/src/views/user/helpCenter/pay/Pay.vue
 * @Description: 帮助中心-支付方式
-->
<template>
    <div class="pay flexColumnCenter">
        <div class="pay-title defaultFont">支付方式</div>
        <div class="pay-item flexColumnCenter">
            <div class="pay-item-title defaultFont">1、充值调用</div>
            <div class="pay-item-text defaultFont">
                西筹数据开放平台目前支持“微信支付”、“支付宝支付”和“对公转账”三种支付方式
            </div>
            <img class="pay-item-img" src="static/help/pay-1.png" />
        </div>
        <div class="pay-item flexColumnCenter">
            <div class="pay-item-title defaultFont">2、优惠套餐</div>
            <div class="pay-item-text defaultFont">
                西筹数据开放平台目前支持“微信支付”、“支付宝支付”和“对公转账”三种支付方式
            </div>
            <img class="pay-item-img" src="static/help/pay-2.png" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Pay',
    setup() {
        return {}
    },
})
</script>

<style lang="scss" scoped>
.pay {
    width: 100%;
    height: 100%;
    padding: 20px 16px;
    box-sizing: border-box;
    background: $themeBgColor;
    justify-content: flex-start;
    .pay-title {
        width: 100%;
        height: 42px;
        font-size: 18px;
        color: $titleColor;
        line-height: 26px;
        text-align: left;
        border-bottom: 1px solid #dfdfdf;
    }
    .pay-item {
        width: 100%;
        justify-content: flex-start;
        align-items: flex-start;
        .pay-item-title {
            font-size: 14px;
            color: $titleColor;
            line-height: 20px;
            margin-top: 19px;
            .pay-item-home {
                color: rgba(78, 154, 235, 1);
                font-size: 14px;
                line-height: 20px;
            }
        }
        .pay-item-text {
            margin: 12px 0px 12px 24px;
            font-size: 14px;
            color: #595959;
            line-height: 20px;
            text-align: left;
        }
        .pay-item-img {
            width: calc(100% - 24px);
            // height: 362px;
            background: $themeColor;
            margin-bottom: 12px;
            margin-left: 24px;
        }
    }
}
</style>
