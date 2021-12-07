<!--
 * @Author: your name
 * @Date: 2021-11-03 15:12:34
 * @LastEditTime: 2021-12-07 13:55:57
 * @LastEditors: matiastang
 * @Description: In User Settings Edit
 * @FilePath: /datumwealth-openalpha-front/src/components/phoneinput/PhoneInput.vue
-->
<template>
    <div class="phone-input defaultBorder flexRowCenter borderBox" :class="phoneClass">
        <el-input
            class="inputNumber defaultInput"
            :="$attrs"
            type="text"
            maxlength="11"
            v-model="phone"
            @input="inputAction"
            clearable
        >
        </el-input>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
    name: 'PhoneInput',
    inheritAttrs: false,
    props: {
        modelValue: {
            type: String,
            default: '',
        },
        phoneClass: {
            type: String,
            default: null,
        },
    },
    emits: {
        'update:modelValue': (value: string) => {
            return true
        },
    },
    setup(props, content) {
        const inputReplace = (value: string) => {
            return value.replace(/[^0-9]/gi, '')
        }
        const phone = ref(inputReplace(props.modelValue))
        watch(
            () => props.modelValue,
            (newValue, oldValue) => {
                phone.value = inputReplace(newValue)
            }
        )
        const inputAction = (value: string) => {
            const newValue = inputReplace(value)
            phone.value = newValue
            content.emit('update:modelValue', newValue)
        }
        return {
            phone,
            inputAction,
        }
    },
    methods: {},
})
</script>

<style lang="scss" scoped>
.phone-input {
    width: 100%;
    height: 56px;
    justify-content: flex-start;
    :deep(.el-input__inner) {
        height: 54px;
    }
    :deep(.el-input__suffix) {
        padding-right: 10px !important;
    }
}
</style>
