<!--
 * @Author: matiastang
 * @Date: 2021-12-16 13:41:45
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-16 14:08:23
 * @FilePath: /datumwealth-openalpha-front/src/components/numberInput/NumberInput.vue
 * @Description: 数字输入
-->
<template>
    <el-input
        class="money-input defaultFont"
        v-model="inputValue"
        @input="changeAction"
        @focus="focusAction"
        @blur="blurAction"
    />
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watchEffect } from 'vue'

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    isFocus: {
        type: Boolean,
        default: false,
    },
})

const inputValue = ref(props.modelValue)
watchEffect(() => {
    inputValue.value = props.modelValue
})
const emit = defineEmits({
    'update:modelValue': (value: string) => {
        return true
    },
    focus: () => {
        return true
    },
    blur: (value: string) => {
        return true
    },
})
const inputReplace = (value: string) => {
    return value.replace(/[^0-9]/gi, '')
}
const changeAction = (currentValue: string) => {
    const newValue = inputReplace(currentValue)
    inputValue.value = newValue
    emit('update:modelValue', newValue)
}
const focusAction = () => {
    emit('focus')
}
const blurAction = () => {
    emit('blur', inputValue.value)
}
</script>

<style lang="scss" scoped>
.money-input {
    font-size: fontSize(14px);
    color: $titleColor;
    line-height: 38px;
    width: 100%;
    height: 40px;
}
</style>
