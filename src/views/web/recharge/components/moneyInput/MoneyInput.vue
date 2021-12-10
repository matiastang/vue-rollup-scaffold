<!--
 * @Author: matiastang
 * @Date: 2021-12-01 10:53:41
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-10 15:54:06
 * @FilePath: /datumwealth-openalpha-front/src/views/web/recharge/components/moneyInput/MoneyInput.vue
 * @Description: 自定义充值金额输入
-->
<template>
    <div :class="['money-input-content', { 'money-input-content-selected': isFocus }]">
        <el-input
            class="money-input"
            placeholder="其他金额(元)"
            :controls="false"
            :="$attrs"
            v-model="inputValue"
            maxlength="8"
            @input="changeAction"
            @focus="focusAction"
            @blur="blurAction"
        />
        <img
            v-if="isFocus"
            class="money-input-selected"
            src="static/recharge/recharge-select.svg"
        />
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, Ref, watchEffect } from 'vue'

const props = defineProps({
    modelValue: {
        type: Number,
        default: NaN,
    },
    isFocus: {
        type: Boolean,
        default: false,
    },
})

const inputValue = ref(isNaN(props.modelValue) ? '' : props.modelValue.toString())
watchEffect(() => {
    inputValue.value = isNaN(props.modelValue) ? '' : props.modelValue.toString()
})
const emit = defineEmits({
    'update:modelValue': (value: number) => {
        return true
    },
    focus: () => {
        return true
    },
    blur: (value: number) => {
        return true
    },
})
const inputReplace = (value: string) => {
    return value.replace(/[^0-9]/gi, '')
}
const changeAction = (currentValue: string) => {
    const newValue = inputReplace(currentValue)
    inputValue.value = newValue
    if (newValue === '') {
        emit('update:modelValue', NaN)
        return
    }
    try {
        const value = Number(newValue)
        emit('update:modelValue', value)
    } catch (error) {
        emit('update:modelValue', 300)
    }
}
const focusAction = () => {
    emit('focus')
}
const blurAction = () => {
    if (inputValue.value === '') {
        emit('blur', NaN)
        return
    }
    try {
        const value = Number(inputValue.value)
        if (value < 300) {
            emit('update:modelValue', 300)
        }
        if (value > 99999999) {
            emit('update:modelValue', 99999999)
        }
        emit('blur', value)
    } catch (error) {
        emit('blur', 300)
    }
}
</script>

<style lang="scss" scoped>
.money-input-content {
    width: 120px;
    height: 60px;
    border-radius: 4px;
    border: 1px solid $borderColor;
    margin: 0px 8px;
    position: relative;
    align-items: stretch;
    .money-input {
        font-size: fontSize(14px);
        color: $titleColor;
        line-height: 20px;
        width: 100%;
        height: 100%;
        :deep(.el-input) {
            height: 100%;
            border: none;
            .el-input__inner {
                height: 100%;
                border: none;
            }
        }
        :deep(.el-input__inner) {
            height: 100%;
            border: none;
            text-align: center;
        }
    }
    .money-input-selected {
        position: absolute;
        width: 20px;
        height: 18px;
        right: 0px;
        bottom: 0px;
    }
}
.money-input-content-selected {
    background: linear-gradient(90deg, #ffd9c4 0%, #f08660 100%);
    border: 1px solid $themeColor;
}
</style>
