<!--
 * @Author: matiastang
 * @Date: 2021-12-01 10:53:41
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-01 15:15:49
 * @FilePath: /datumwealth-openalpha-front/src/views/web/recharge/components/moneyInput/MoneyInput.vue
 * @Description: 自定义充值金额输入
-->
<template>
    <div :class="['money-input-content', { 'money-input-content-selected': isFocus }]">
        <el-input-number
            class="money-input"
            placeholder="其他金额(元)"
            :controls="false"
            :="$attrs"
            v-model.number="inputValue"
            :min="0.01"
            :max="99999999"
            maxlength="8"
            @change="changeAction"
        />
        <!-- <el-input
            class="money-input inputNumber"
            :="$attrs"
            type="number"
            maxlength="8"
            step="0.01"
            :min="0.01"
            :max="99999999"
            v-model.number="inputValue"
            placeholder="其他金额(元)"
            @change="changeAction"
        /> -->
        <!--  -->
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
const inputValue: Ref<number> = ref(props.modelValue)
watchEffect(() => {
    inputValue.value = props.modelValue
})
const emit = defineEmits({
    'update:modelValue': (value: number) => {
        return true
    },
})
const changeAction = (currentValue: string | number) => {
    console.log(currentValue)
    if (typeof currentValue === 'number') {
        emit('update:modelValue', currentValue)
        return
    }
    try {
        const value = Number(currentValue)
        emit('update:modelValue', value)
    } catch (error) {
        console.log('设置为默认值')
        emit('update:modelValue', 0.01)
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
        font-size: 14px;
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
