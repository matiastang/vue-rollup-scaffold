<!--
 * @Author: your name
 * @Date: 2021-11-03 15:12:34
 * @LastEditTime: 2021-11-30 17:52:56
 * @LastEditors: matiastang
 * @Description: In User Settings Edit
 * @FilePath: /datumwealth-openalpha-front/src/components/phoneinput/PhoneInput.vue
-->
<template>
    <div class="phone-input defaultBorder flexRowCenter borderBox" :class="phoneClass">
        <el-input
            class="inputNumber defaultInput"
            :="$attrs"
            type="number"
            maxlength="11"
            clearable
        >
        </el-input>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'PhoneInput',
    inheritAttrs: false,
    props: ['phoneClass'],
    data() {
        return {}
    },
    setup() {
        return {}
    },
    methods: {},
})
</script>

<style lang="scss" scoped>
.phone-input {
    width: 100%;
    height: 56px;
    justify-content: flex-start;
    :deep(.el-input__suffix) {
        padding-right: 10px !important;
    }
}
</style>
