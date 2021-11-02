<!--
 * @Author: your name
 * @Date: 2021-11-02 19:04:28
 * @LastEditTime: 2021-11-02 19:28:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /datumwealth-openalpha-front/src/views/NotFound.vue
-->
<template>
    <div class="content">
        <div class="text">Not Found</div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {}
    },
})
</script>

<style lang="scss" scoped>
.content {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .text {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #8c8c8c;
        line-height: 20px;
        letter-spacing: 1px;
        text-align: center;
    }
}
</style>
