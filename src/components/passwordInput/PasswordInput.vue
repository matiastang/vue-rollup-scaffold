<!--
 * @Author: your name
 * @Date: 2021-11-03 14:22:27
 * @LastEditTime: 2021-11-03 17:36:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /datumwealth-openalpha-front/src/components/passwordInput/PasswordInput.vue
-->
<template>
    <div class="password-input" :class="class">
        <el-input
            class="input"
            :="$attrs"
            :show-password="passwordHide"
            type="text"
            maxlength="11"
            clearable
        >
        </el-input>
        <div class="password-button" @click="passwordClick">
            <img v-if="passwordHide" class="password-icon" src="static/login/password-off.png" />
            <img v-else class="password-icon" src="static/login/password-on.png" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    inheritAttrs: false,
    props: ['class'],
    data() {
        return {
            passwordHide: true,
        }
    },
    setup() {
        return {}
    },
    methods: {
        /**
         * 是否显示
         */
        passwordClick() {
            this.passwordHide = !this.passwordHide
        },
    },
})
</script>

<style lang="scss" scoped>
.password-input {
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
    }
    .password-button {
        width: 76px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        .password-icon {
            width: 16px;
            height: 16px;
        }
    }
}
</style>
