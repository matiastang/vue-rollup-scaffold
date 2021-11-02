<!--
 * @Author: your name
 * @Date: 2021-11-02 19:15:52
 * @LastEditTime: 2021-11-02 20:08:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /datumwealth-openalpha-front/src/views/Login.vue
-->
<template>
    <div class="login">
        <!-- 登录模块 -->
        <LoginModule class="login-module"></LoginModule>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import LoginModule from '@/components/loginModule/LoginModule.vue'

export default defineComponent({
    data() {
        return {}
    },
    components: {
        LoginModule,
    },
})
</script>

<style lang="scss" scoped>
.login {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url('static/login/login-bg.png');
    background-size: cover;
    .login-module {
        width: 697px;
        height: 590px;
        background: #ffffff;
        border-radius: 8px;
        margin: 50px;
    }
}
</style>
