<!--
 * @Author: your name
 * @Date: 2021-11-03 15:54:19
 * @LastEditTime: 2021-11-03 17:34:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /datumwealth-openalpha-front/src/components/codeInput/CodeInput.vue
-->
<template>
    <div class="code-input" :class="class" :style="style">
        <el-input class="input" :="$attrs" type="number" maxlength="4" clearable />
        <div class="code-button" @click="getCode">{{ codeText }}</div>
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
    box-sizing: border-box;
    border: 1px solid #bfbfbf;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .input {
        border-right: 1px solid #bfbfbf;
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
    .code-button {
        width: 148px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #d65928;
        line-height: 24px;
        letter-spacing: 1px;
        text-align: center;
    }
}
</style>
