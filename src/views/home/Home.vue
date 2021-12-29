<!--
 * @Author: matiastang
 * @Date: 2021-12-29 10:52:57
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-29 10:57:16
 * @FilePath: /datumwealth-front-scaffold/src/views/home.vue
 * @Description: 
-->
<template>
    <div class="home">
        <div class="text">{{ text }}</div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const text = ref('home')
</script>

<style lang="scss" scoped>
.home {
    display: flex;
    justify-content: center;
    align-items: center;
    .text {
        font-size: fontSize(14px);
        @include defaultFont;
        color: $placeholderColor;
        line-height: 20px;
        text-align: center;
    }
}
</style>
