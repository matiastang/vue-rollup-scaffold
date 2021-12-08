<!--
 * @Author: your name
 * @Date: 2021-11-10 10:10:20
 * @LastEditTime: 2021-11-19 15:27:56
 * @LastEditors: matiastang
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/components/interfaceAffix/InterfaceAffix.vue
-->
<template>
    <div class="interface-affix cursorP flexColumnCenter" @click="affixActiion">
        <img class="interface-affix-img" src="static/api/onTrial.svg" />
        <div class="interface-affix-title defaultFont">{{ title }}</div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'InterfaceAffix',
    props: {
        title: {
            type: String,
            default: '申请试用',
        },
    },
    emits: ['trialAction'],
    methods: {
        affixActiion() {
            console.log('点击cell')
        },
    },
})
</script>

<style lang="scss" scoped>
.interface-affix {
    position: fixed;
    width: 76px;
    height: 110px;
    background: $themeColor;
    border-radius: 2px;
    right: 17px !important;
    bottom: 298px !important;
    .interface-affix-img {
        width: 35px;
        height: 35px;
        color: $themeBgColor;
    }
    .interface-affix-title {
        font-size: fontSize(18px);
        color: $themeBgColor;
        line-height: 26px;
        width: 40px;
    }
}
</style>
