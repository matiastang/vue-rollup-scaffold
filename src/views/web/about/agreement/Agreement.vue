<!--
 * @Author: matiastang
 * @Date: 2021-11-26 13:34:06
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-26 13:44:36
 * @FilePath: /datumwealth-openalpha-front/src/views/web/about/agreement/Agreement.vue
 * @Description: 用户协议
-->
<template>
    <div class="agreement flexColumnCenter">
        <div class="agreement-title defaultFont">用户协议</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Agreement',
    setup() {
        return {}
    },
})
</script>

<style lang="scss" scoped>
.agreement {
    width: 100%;
    height: 100%;
    padding: 20px 16px;
    box-sizing: border-box;
    background: $themeBgColor;
    justify-content: flex-start;
    .agreement-title {
        width: 100%;
        height: 42px;
        font-size: 18px;
        color: $titleColor;
        line-height: 26px;
        text-align: left;
        border-bottom: 1px solid #dfdfdf;
    }
}
</style>
