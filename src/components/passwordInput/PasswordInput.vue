<!--
 * @Author: your name
 * @Date: 2021-11-03 14:22:27
 * @LastEditTime: 2021-11-15 16:56:05
 * @LastEditors: matiastang
 * @Description: In User Settings Edit
 * @FilePath: /datumwealth-openalpha-front/src/components/passwordInput/PasswordInput.vue
-->
<template>
    <div class="password-input borderBox flexRowCenter defaultBorder" :class="passwordClass">
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
            <img v-if="passwordHide" class="password-icon" src="static/login/password-off.svg" />
            <img v-else class="password-icon" src="static/login/password-on.svg" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'PasswordInput',
    inheritAttrs: false,
    props: {
        passwordClass: {
            type: String,
            default: '',
        },
        hide: {
            type: Boolean,
            default: true,
        },
    },
    setup(props) {
        let passwordHide = ref(props.hide)
        /**
         * 是否显示
         */
        const passwordClick = () => {
            passwordHide.value = !passwordHide.value
        }
        return {
            passwordHide,
            passwordClick,
        }
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
