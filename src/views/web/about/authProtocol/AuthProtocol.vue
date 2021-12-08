<!--
 * @Author: matiastang
 * @Date: 2021-11-30 17:36:42
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-30 17:41:45
 * @FilePath: /datumwealth-openalpha-front/src/views/web/about/authProtocol/AuthProtocol.vue
 * @Description: 认证服务协议
-->
<template>
    <div class="auth-protocol flexColumnCenter">
        <div class="auth-protocol-title defaultFont">认证服务协议</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'AuthProtocol',
    setup() {
        return {}
    },
})
</script>

<style lang="scss" scoped>
.auth-protocol {
    width: 100%;
    height: 100%;
    padding: 20px 16px;
    box-sizing: border-box;
    background: $themeBgColor;
    justify-content: flex-start;
    .auth-protocol-title {
        width: 100%;
        height: 42px;
        font-size: fontSize(18px);
        color: $titleColor;
        line-height: 26px;
        text-align: left;
        border-bottom: 1px solid #dfdfdf;
    }
}
</style>
