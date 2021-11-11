<!--
 * @Author: your name
 * @Date: 2021-11-02 19:15:52
 * @LastEditTime: 2021-11-04 10:34:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /datumwealth-openalpha-front/src/views/Login.vue
-->
<template>
    <div class="login">
        <div class="login-content">
            <div class="login-left">
                <div class="login-title">研究驱动的财富管理基础设施供应商</div>
                <div class="login-text">全面、深度、专业、有趣的基金数据产品</div>
            </div>
            <!-- 登录模块 -->
            <LoginModule class="login-module"></LoginModule>
        </div>
    </div>
</template>

<script lang="ts">
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
    height: calc(100vh - 96px);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-image: url('static/login/login-bg.png');
    background-size: cover;
    .login-content {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-start;
        margin: 0px 80px;
        .login-left {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            align-self: flex-start;
            margin-right: 33px;
            .login-title {
                font-size: 48px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #ffffff;
                line-height: 67px;
                letter-spacing: 4px;
                margin-top: 68px;
            }
            .login-text {
                font-size: 30px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #ffffff;
                line-height: 42px;
                letter-spacing: 2px;
                margin-top: 48px;
            }
        }
        .login-module {
            flex: 0 0 697px;
            width: 697px;
            background: #ffffff;
            border-radius: 8px;
        }
    }
}
</style>
