<!--
 * @Author: your name
 * @Date: 2021-11-03 15:54:19
 * @LastEditTime: 2021-11-12 09:46:56
 * @LastEditors: matiastang
 * @Description: In User Settings Edit
 * @FilePath: /datumwealth-openalpha-front/src/components/codeInput/CodeInput.vue
-->
<template>
    <div
        class="code-input borderBox defaultBorder flexRowCenter"
        :class="codeInputClass"
        :style="codeInputstyle"
    >
        <el-input
            class="defaultBorderR inputNumber defaultInput"
            :="$attrs"
            type="number"
            maxlength="4"
            clearable
        />
        <div class="code-button defaultFont flexRowCenter cursorP ak-ellipsis" @click="getCode">
            {{ codeText }}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'CodeInput',
    inheritAttrs: false,
    props: {
        codeInputClass: {
            type: String,
            default: '',
        },
        codeInputstyle: {
            type: Object,
            default: () => {
                return {}
            },
        },
    },
    emits: ['CodeInputGetCode'],
    setup(props, content) {
        let codeText = ref('获取验证码')
        /**
         * 获取验证码
         */
        const getCode = () => {
            content.emit('CodeInputGetCode')
            let number = 60
            codeText.value = `${number}s重新发送`
            let intervalId = setInterval(() => {
                number -= 1
                codeText.value = `${number}s重新发送`
                if (number <= 0) {
                    clearInterval(intervalId)
                    number = 60
                    codeText.value = '获取验证码'
                }
            }, 1000)
        }
        return {
            codeText,
            getCode,
        }
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
