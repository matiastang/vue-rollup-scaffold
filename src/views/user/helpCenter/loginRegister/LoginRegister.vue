<!--
 * @Author: matiastang
 * @Date: 2021-11-18 10:13:15
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-03 16:43:36
 * @FilePath: /datumwealth-openalpha-front/src/views/user/helpCenter/loginRegister/LoginRegister.vue
 * @Description: 帮组中心-登录注册
-->
<template>
    <div class="login-register flexColumnCenter">
        <div class="login-register-title defaultFont">登录注册</div>
        <div class="login-register-item flexColumnCenter">
            <div class="login-register-item-title defaultFont">1、进入登录/注册页面</div>
            <div class="login-register-item-text defaultFont">
                打开西筹数据接口平台首页：<span
                    class="login-register-item-home defaultFont"
                    @click="loginActiono"
                    >{{ host }}</span
                >，点击导航栏右上角的“登录/注册”按钮。
            </div>
            <img class="login-register-item-img" src="static/help/login-1.png" />
        </div>
        <div class="login-register-item flexColumnCenter">
            <div class="login-register-item-title defaultFont">
                2、西筹数据开放平台登录的方式有两种：“短信验证码登录”和“帐号密码登录”两种方式。
            </div>
            <div class="login-register-item-text defaultFont">
                按照登录的默认提示填写自己的账号或者手机号码，以账号的密码进行账号密码登录，或者通过短信验证的方式登录。未注册的用户可直接通过短信验证码登录。
            </div>
            <img class="login-register-item-img" src="static/help/login-2.png" />
        </div>
        <div class="login-register-item flexColumnCenter">
            <div class="login-register-item-title defaultFont">
                3、未注册用户通过短信验证码登录后，可进入“账号管理-账号设置”，设置登录密码及进行邮箱验证。
            </div>
            <div class="login-register-item-text defaultFont">
                按照登录的默认提示填写自己的账号或者手机号码，以账号的密码进行账号密码登录，或者通过短信验证的方式登录。未注册的用户可直接通过短信验证码登录。
            </div>
            <img class="login-register-item-img" src="static/help/login-3.png" />
            <img class="login-register-item-img" src="static/help/login-4.png" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
    name: 'LoginRegister',
    setup() {
        const router = useRouter()
        const host = ref(window.location.host)
        const loginActiono = () => {
            router.push({
                path: '/login',
            })
        }
        return {
            host,
            loginActiono,
        }
    },
})
</script>

<style lang="scss" scoped>
.login-register {
    width: 100%;
    height: 100%;
    padding: 20px 16px;
    box-sizing: border-box;
    background: $themeBgColor;
    justify-content: flex-start;
    .login-register-title {
        width: 100%;
        height: 42px;
        font-size: 18px;
        color: $titleColor;
        line-height: 26px;
        text-align: left;
        border-bottom: 1px solid #dfdfdf;
    }
    .login-register-item {
        width: 100%;
        justify-content: flex-start;
        align-items: flex-start;
        .login-register-item-title {
            font-size: 14px;
            color: $titleColor;
            line-height: 20px;
            margin-top: 19px;
        }
        .login-register-item-text {
            margin: 12px 0px 12px 24px;
            font-size: 14px;
            color: #595959;
            line-height: 20px;
            text-align: left;
            .login-register-item-home {
                color: #4e9aeb;
                font-size: 14px;
                line-height: 20px;
                cursor: pointer;
            }
        }
        .login-register-item-img {
            width: calc(100% - 24px);
            // height: 362px;
            background: $themeColor;
            margin-bottom: 12px;
            margin-left: 24px;
        }
    }
}
</style>
