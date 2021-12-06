<!--
 * @Author: your name
 * @Date: 2021-11-03 15:54:19
 * @LastEditTime: 2021-12-06 10:31:03
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
            class="inputNumber defaultInput"
            :="$attrs"
            type="number"
            maxlength="4"
            placeholder="请输入6位验证码"
            clearable
        />
        <div
            class="code-button defaultFont flexRowCenter cursorP ak-ellipsis defaultBorderL"
            @click="getCode"
        >
            {{ codeText }}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

interface CodeInputRefTypes {
    runCountDown: (num?: number) => void
}

export { CodeInputRefTypes }

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
    emits: {
        CodeInputGetCode: (): boolean => {
            return true
        },
    },
    setup(props, content) {
        let codeText = ref('获取验证码')
        /**
         * 获取验证码
         */
        const getCode = () => {
            if (codeText.value !== '获取验证码') {
                console.warn('倒计时中')
                return
            }
            content.emit('CodeInputGetCode')
        }
        // 倒计时
        const runCountDown = (num = 60) => {
            let number = num
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
            runCountDown,
        }
    },
})
</script>

<style lang="scss" scoped>
.code-input {
    width: 100%;
    height: 56px;
    justify-content: flex-start;
    :deep(.el-input__inner) {
        height: 54px;
    }
    :deep(.el-input__suffix) {
        padding-right: 10px !important;
    }
    .code-button {
        width: 148px;
        height: 30;
        font-size: fontSize(16px);
        color: $themeColor;
        line-height: lineHeight(16px);
    }
}
</style>
