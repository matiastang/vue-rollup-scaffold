<!--
 * @Author: matiastang
 * @Date: 2021-11-26 13:35:05
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-26 13:47:52
 * @FilePath: /datumwealth-openalpha-front/src/views/web/about/copyright/Copyright.vue
 * @Description: 版权政策
-->
<template>
    <div class="copyright flexColumnCenter">
        <div class="copyright-title defaultFont">版权政策</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Copyright',
    setup() {
        return {}
    },
})
</script>

<style lang="scss" scoped>
.copyright {
    width: 100%;
    height: 100%;
    padding: 20px 16px;
    box-sizing: border-box;
    background: $themeBgColor;
    justify-content: flex-start;
    .copyright-title {
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
