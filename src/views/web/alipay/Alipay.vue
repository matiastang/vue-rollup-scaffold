<!--
 * @Author: matiastang
 * @Date: 2021-11-22 16:18:06
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-22 16:26:51
 * @FilePath: /datumwealth-openalpha-front/src/views/web/alipay/Alipay.vue
 * @Description: 支付宝支付界面
-->
<template>
    <div class="alipay" v-html="form"></div>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
    name: 'Alipay',
    setup() {
        const route = useRoute()
        const form = route.query.payUrl
        nextTick(() => {
            document.forms[0].submit()
        })
        return {
            form,
        }
    },
})
</script>

<style lang="scss" scoped></style>
