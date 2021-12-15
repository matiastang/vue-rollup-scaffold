<!--
 * @Author: your name
 * @Date: 2021-11-03 15:54:19
 * @LastEditTime: 2021-12-15 19:35:21
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
            type="text"
            maxlength="6"
            v-model="code"
            @input="codeAction"
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
import { defineComponent, ref, watch } from 'vue'

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
        modelValue: {
            type: String,
            default: '',
        },
    },
    emits: {
        CodeInputGetCode: (): boolean => {
            return true
        },
        countDownOver: () => {
            return true
        },
        'update:modelValue': (value: string) => {
            return true
        },
    },
    setup(props, content) {
        const inputReplace = (value: string) => {
            return value.replace(/[^0-9]/gi, '')
        }
        const code = ref(inputReplace(props.modelValue))
        watch(
            () => props.modelValue,
            (newValue, oldValue) => {
                code.value = inputReplace(newValue)
            }
        )
        const codeAction = (value: string) => {
            const newValue = inputReplace(value)
            code.value = newValue
            content.emit('update:modelValue', newValue)
        }
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
                    content.emit('countDownOver')
                }
            }, 1000)
        }
        return {
            codeText,
            getCode,
            runCountDown,
            code,
            codeAction,
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
