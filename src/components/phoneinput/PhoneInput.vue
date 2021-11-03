<!--
 * @Author: your name
 * @Date: 2021-11-03 15:12:34
 * @LastEditTime: 2021-11-03 17:35:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /datumwealth-openalpha-front/src/components/phoneinput/PhoneInput.vue
-->
<template>
    <div class="phone-input" :class="class">
        <el-input class="input" :="$attrs" type="number" maxlength="11" clearable> </el-input>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    inheritAttrs: false,
    props: ['class'],
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
    box-sizing: border-box;
    border: 1px solid #bfbfbf;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .input {
        ::v-deep input {
            width: 100%;
            height: 100%;
            border: none !important;
            padding: 0px 0px 0px 24px !important;
        }
        ::v-deep .el-input__suffix {
            right: 0px !important;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        // 处理input type = number的上下箭头
        ::v-deep input::-webkit-outer-spin-button,
        ::v-deep input::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }
        ::v-deep input[type='number'] {
            -moz-appearance: textfield;
        }
    }
}
</style>
