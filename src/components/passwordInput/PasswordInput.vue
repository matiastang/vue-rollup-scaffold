<!--
 * @Author: your name
 * @Date: 2021-11-03 14:22:27
 * @LastEditTime: 2021-11-04 15:53:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /datumwealth-openalpha-front/src/components/passwordInput/PasswordInput.vue
-->
<template>
    <div class="password-input borderBox flexRowCenter defaultBorder" :class="class">
        <el-input
            class="defaultInput"
            :="$attrs"
            :show-password="passwordHide"
            type="text"
            maxlength="11"
            clearable
        >
        </el-input>
        <div class="password-button flexRowCenter cursorP" @click="passwordClick">
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
    justify-content: flex-start;
    .password-button {
        width: 76px;
        height: 100%;
        .password-icon {
            width: 16px;
            height: 16px;
        }
    }
}
</style>
