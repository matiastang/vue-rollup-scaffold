<!--
 * @Author: matiastang
 * @Date: 2021-11-26 13:35:49
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-26 13:47:19
 * @FilePath: /datumwealth-openalpha-front/src/views/web/about/statement/Statement.vue
 * @Description: 免责声明
-->
<template>
    <div class="statement flexColumnCenter">
        <div class="statement-title defaultFont">免责声明</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Statement',
    setup() {
        return {}
    },
})
</script>

<style lang="scss" scoped>
.statement {
    width: 100%;
    height: 100%;
    padding: 20px 16px;
    box-sizing: border-box;
    background: $themeBgColor;
    justify-content: flex-start;
    .statement-title {
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
