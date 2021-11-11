<!--
 * @Author: your name
 * @Date: 2021-11-08 13:41:50
 * @LastEditTime: 2021-11-08 15:38:49
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/views/recharge/components/rechargeMoney/RechargeMoney.vue
-->
<template>
    <div
        :class="[
            'recharge-money',
            'flexRowCenter',
            {
                cursorP: !select,
                'recharge-money-select': select,
            },
        ]"
        @click="selectAction"
    >
        <div class="recharge-money-text defaultFont">{{ `${title}元` }}</div>
        <img
            v-if="select"
            class="recharge-money-selected"
            src="static/recharge/recharge-select.svg"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'RechargeMoney',
    emits: ['selectAction'],
    props: ['title', 'select'],
    data() {
        return {}
    },
    setup() {
        return {}
    },
    methods: {
        selectAction() {
            if (this.select) {
                console.warn('已经处于选中状态')
                return
            }
            this.$emit('selectAction')
        },
    },
})
</script>

<style lang="scss" scoped>
.recharge-money {
    width: 120px;
    height: 60px;
    border-radius: 4px;
    border: 1px solid $borderColor;
    margin: 0px 8px;
    position: relative;
    .recharge-money-text {
        font-size: 14px;
        color: $titleColor;
        line-height: 20px;
    }
    .recharge-money-selected {
        position: absolute;
        width: 20px;
        height: 18px;
        right: 0px;
        bottom: 0px;
    }
}
.recharge-money:hover {
    border: 1px solid $themeColor;
}
.recharge-money-select {
    background: linear-gradient(90deg, #ffd9c4 0%, #f08660 100%);
    border: 1px solid $themeColor;
}
</style>
