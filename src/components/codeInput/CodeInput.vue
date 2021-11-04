<!--
 * @Author: your name
 * @Date: 2021-11-03 15:54:19
 * @LastEditTime: 2021-11-04 15:46:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /datumwealth-openalpha-front/src/components/codeInput/CodeInput.vue
-->
<template>
    <div class="code-input borderBox defaultBorder flexRowCenter" :class="class" :style="style">
        <el-input
            class="defaultBorderR inputNumber defaultInput"
            :="$attrs"
            type="number"
            maxlength="4"
            clearable
        />
        <div class="code-button defaultFont flexRowCenter cursorP" @click="getCode">
            {{ codeText }}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    inheritAttrs: false,
    props: ['class', 'style'],
    emits: ['getCode'],
    data() {
        return {
            codeText: '获取验证码',
        }
    },
    setup() {
        return {}
    },
    methods: {
        /**
         * 是否显示
         */
        getCode() {
            this.$emit('getCode')
        },
    },
})
</script>

<style lang="scss" scoped>
.code-input {
    width: 100%;
    height: 56px;
    justify-content: flex-start;
    .code-button {
        width: 148px;
        height: 100%;
        font-size: fontSize(16px);
        color: $themeColor;
        line-height: lineHeight(16px);
    }
}
</style>
