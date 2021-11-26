<!--
 * @Author: matiastang
 * @Date: 2021-11-26 13:40:01
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-26 13:43:55
 * @FilePath: /datumwealth-openalpha-front/src/views/web/about/aboutUs/AboutUs.vue
 * @Description: 关于我们
-->
<template>
    <div class="about-us flexColumnCenter">
        <div class="about-us-title defaultFont">关于我们</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'AboutUs',
    setup() {
        return {}
    },
})
</script>

<style lang="scss" scoped>
.about-us {
    width: 100%;
    height: 100%;
    padding: 20px 16px;
    box-sizing: border-box;
    background: $themeBgColor;
    justify-content: flex-start;
    .about-us-title {
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
