<!--
 * @Author: matiastang
 * @Date: 2021-11-26 13:36:53
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-26 13:46:53
 * @FilePath: /datumwealth-openalpha-front/src/views/web/about/rightNotify/RightNotify.vue
 * @Description: 权利通知
-->
<template>
    <div class="right-notify flexColumnCenter">
        <div class="right-notify-title defaultFont">权利通知</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'RightNotify',
    setup() {
        return {}
    },
})
</script>

<style lang="scss" scoped>
.right-notify {
    width: 100%;
    height: 100%;
    padding: 20px 16px;
    box-sizing: border-box;
    background: $themeBgColor;
    justify-content: flex-start;
    .right-notify-title {
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
