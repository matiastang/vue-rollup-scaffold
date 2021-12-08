<!--
 * @Author: matiastang
 * @Date: 2021-11-19 19:17:03
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-22 16:41:37
 * @FilePath: /datumwealth-openalpha-front/src/components/payment/Payment.vue
 * @Description: 支付方式cell
-->
<template>
    <div
        :class="[
            'pay-monet',
            'flexRowCenter',
            {
                cursorP: !selected,
                'pay-monet-select': selected,
            },
        ]"
    >
        <img v-if="title === '微信支付'" class="pay-monet-img" src="static/pay/weixin_icon.svg" />
        <img v-if="title === '支付宝支付'" class="pay-monet-img" src="static/pay/zfb_icon.svg" />
        <img v-if="title === '对公转账'" class="pay-monet-img" src="static/pay/dgzz_icon.svg" />
        <div class="pay-monet-text defaultFont">{{ title }}</div>
        <img v-if="selected" class="pay-monet-selected" src="static/recharge/recharge-select.svg" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'PayMonet',
    props: {
        id: {
            type: Number,
            default: -1,
        },
        title: {
            type: String,
            default: '',
        },
        selected: {
            type: Boolean,
            default: false,
        },
    },
})
</script>

<style lang="scss" scoped>
.pay-monet {
    height: 44px;
    border-radius: 4px;
    border: 1px solid $borderColor;
    margin: 0px 8px;
    position: relative;
    padding: 0px 16px;
    .pay-monet-img {
        width: 16px;
        height: 16px;
        margin-right: 10px;
    }
    .pay-monet-text {
        font-size: fontSize(14px);
        color: $titleColor;
        line-height: 20px;
    }
    .pay-monet-selected {
        position: absolute;
        width: 20px;
        height: 18px;
        right: 0px;
        bottom: 0px;
    }
}
.pay-monet:hover {
    border: 1px solid $themeColor;
}
.pay-monet-select {
    border: 1px solid $themeColor;
}
</style>
