<!--
 * @Author: your name
 * @Date: 2021-11-08 14:16:03
 * @LastEditTime: 2021-11-08 15:49:47
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/components/payment/Payment.vue
-->
<template>
    <div
        :class="[
            'pay-monet',
            'flexRowCenter',
            {
                cursorP: !select,
                'pay-monet-select': select,
            },
        ]"
        @click="selectAction"
    >
        <img v-if="url" class="pay-monet-img" :src="url" />
        <div class="pay-monet-text defaultFont">{{ title }}</div>
        <img v-if="select" class="pay-monet-selected" src="static/recharge/recharge-select.svg" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'PayMonet',
    emits: ['selectAction'],
    props: ['title', 'select', 'url'],
    data() {
        return {}
    },
    methods: {
        selectAction() {
            if (this.select) {
                console.warn('已经处于选中状态')
                return
            }
            this.$emit('selectAction', this.title)
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
        background: red;
        margin-right: 10px;
    }
    .pay-monet-text {
        font-size: 14px;
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
