<!--
 * @Author: your name
 * @Date: 2021-11-02 16:56:07
 * @LastEditTime: 2021-12-08 10:59:57
 * @LastEditors: matiastang
 * @Description: In User Settings Edit
 * @FilePath: /datumwealth-openalpha-front/src/components/loginModule/LoginModule.vue
-->
<template>
    <div>
        <el-tabs
            v-if="!findPassword"
            class="login-model-tabs login-module-tabs"
            v-model="activeName"
        >
            <el-tab-pane class="login-module-register" label="短信登录/注册" name="register">
                <PhoneInput
                    phoneClass="login-phone-input"
                    v-model="inputPhone"
                    placeholder="请输入手机号码"
                />
                <CodeInput
                    codeInputClass="login-code-input"
                    v-model="fegisterCode"
                    @CodeInputGetCode="getPhoneCode(0)"
                    ref="registerCodeRef"
                />
                <div class="login" @click="registerAction">登录/注册</div>
                <div class="text">
                    使用手机短信验证码登录，无账号时将自动注册<br />登录即表示同意<span
                        class="text-protocol cursorP"
                        @click="protocolAction"
                        >《服务协议》</span
                    >
                </div>
            </el-tab-pane>
            <el-tab-pane class="login-module-login" label="密码登录" name="login">
                <PhoneInput
                    phoneClass="login-phone-input"
                    v-model="inputPhone"
                    placeholder="请输入手机号码"
                />
                <PasswordInput
                    passwordClass="login-password-input"
                    v-model="inputPassword"
                    placeholder="请输入密码"
                />
                <div class="forgot-password" @click="gotoFindPassword">忘记密码?</div>
                <div class="login" @click="loginAction">登录</div>
                <div class="text">
                    登录即表示同意<span class="text-protocol cursorP" @click="protocolAction"
                        >《服务协议》</span
                    >
                </div>
            </el-tab-pane>
        </el-tabs>
        <div v-if="findPassword" class="find-password-content">
            <div class="back-content flexRowCenter" @click="backLogin">
                <img class="back-icon" src="static/login/login-back.svg" />
                <div class="back-text">返回登录</div>
            </div>
            <div class="find-password-title">找回密码</div>
            <PhoneInput
                phoneClass="find-password-phone-input"
                v-model="inputPhone"
                placeholder="请输入手机号码"
            />
            <CodeInput
                codeInputClass="find-password-code-input"
                v-model="findInputCode"
                @CodeInputGetCode="getPhoneCode"
                ref="findCodeRef"
            />
            <PasswordInput
                passwordClass="find-password-input"
                v-model="findInputPassword"
                placeholder="请输入新密码(8-20位数字和字母组合)"
            />
            <PasswordInput
                passwordClass="find-affirm-password-input"
                v-model="findInputAffirmPassword"
                placeholder="再次确认密码"
            />
            <div class="login find-password-ok" @click="findPasswordAction">确定</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'
import { useRouter } from 'vue-router'
import ElMessage from '@/common/utils/message'
import PhoneInput from '@/components/phoneinput/PhoneInput.vue'
import PasswordInput from '@/components/passwordInput/PasswordInput.vue'
import CodeInput, { CodeInputRefTypes } from '@/components/codeInput/CodeInput.vue'
import { sendSMS, forget } from '@/common/request/modules/user/user'
import { phone_check, code_check, password_check } from 'utils/check/index'
import { useStore } from 'store/index'
import { routerToUserCenter } from 'utils/router/index'

export default defineComponent({
    name: 'LoginModule',
    props: {
        jump: {
            type: Boolean,
            default: true,
        },
    },
    emits: ['loginSuccess'],
    data() {
        return {
            activeName: 'login',
        }
    },
    setup(props, context) {
        const router = useRouter()
        const store = useStore()
        let inputPhone = ref('')
        let findPassword = ref(false)

        // 注册
        let fegisterCode = ref('')
        let registerCodeRef: Ref<CodeInputRefTypes | null> = ref(null)
        let findCodeRef: Ref<CodeInputRefTypes | null> = ref(null)
        /**
         * 获取验证码
         */
        const getPhoneCode = (type = 1) => {
            // 手机校验
            let phone = inputPhone.value
            let phoneError = phone_check(phone)
            if (phoneError) {
                ElMessage({
                    message: phoneError,
                    type: 'warning',
                })
                return
            }
            // 启动到计时
            if (type === 0) {
                if (registerCodeRef.value) {
                    registerCodeRef.value.runCountDown()
                }
            } else {
                if (findCodeRef.value) {
                    findCodeRef.value.runCountDown()
                }
            }
            // 发送验证码
            sendSMS(phone)
                .then((res) => {
                    ElMessage({
                        message: res,
                        type: 'success',
                    })
                })
                .catch((err) => {
                    ElMessage({
                        message: err.msg || '发送验证码错误',
                        type: 'error',
                    })
                })
        }
        /**
         * 注册登录
         */
        const registerAction = () => {
            // 手机校验
            let phone = inputPhone.value
            let phoneError = phone_check(phone)
            if (phoneError) {
                ElMessage({
                    message: phoneError,
                    type: 'warning',
                })
                return
            }
            // 验证码校验
            let code = fegisterCode.value
            let codeError = code_check(code)
            if (codeError) {
                ElMessage({
                    message: codeError,
                    type: 'warning',
                })
                return
            }
            // 注册登录
            dwLogin('code', phone, code)
        }
        // 登录
        const dwLogin = (loginType: string, username: string, password: string) => {
            store
                .dispatch('userLogin', {
                    loginType,
                    username,
                    password,
                })
                .then((res: string) => {
                    ElMessage({
                        message: res,
                        type: 'success',
                    })
                    if (props.jump) {
                        routerToUserCenter(store, router)
                    } else {
                        context.emit('loginSuccess')
                    }
                })
                .catch((err) => {
                    ElMessage.error(err.msg || '登录错误')
                })
        }
        // 密码登录
        let inputPassword = ref('')
        /**
         * 切换到找回密码界面
         */
        const gotoFindPassword = () => {
            findPassword.value = true
        }
        /**
         * 密码登录
         */
        const loginAction = () => {
            // 手机校验
            let phone = inputPhone.value
            let phoneError = phone_check(phone)
            if (phoneError) {
                ElMessage({
                    message: phoneError,
                    type: 'warning',
                })
                return
            }
            // 密码校验
            let password = inputPassword.value
            let passwordError = password_check(password)
            if (passwordError) {
                ElMessage({
                    message: passwordError,
                    type: 'warning',
                })
                return
            }
            // 密码登录
            dwLogin('pwd', phone, password)
        }

        // 找回密码
        let findInputCode = ref('')
        let findInputPassword = ref('')
        let findInputAffirmPassword = ref('')
        /**
         * 返回登录
         */
        const backLogin = () => {
            findPassword.value = false
        }
        /**
         * 找回密码
         */
        const findPasswordAction = () => {
            // 手机校验
            let phone = inputPhone.value
            let phoneError = phone_check(phone)
            if (phoneError) {
                ElMessage({
                    message: phoneError,
                    type: 'warning',
                })
                return
            }
            // 验证码校验
            let code = findInputCode.value
            let codeError = code_check(code)
            if (codeError) {
                ElMessage({
                    message: codeError,
                    type: 'warning',
                })
                return
            }
            // 确认密码校验
            let password = findInputPassword.value
            let affirmPassword = findInputAffirmPassword.value
            if (password !== affirmPassword) {
                ElMessage({
                    message: '两次密码不一致',
                    type: 'warning',
                })
                return
            }
            // 密码校验
            let passwordError = password_check(password)
            if (passwordError) {
                ElMessage({
                    message: passwordError,
                    type: 'warning',
                })
                return
            }
            // 忘记密码
            forget({
                mobile: phone,
                verifyCode: code,
                password,
            })
                .then((res) => {
                    ElMessage({
                        message: res,
                        type: 'success',
                    })
                    backLogin()
                })
                .catch((err) => {
                    ElMessage({
                        message: err.msg || '重置错误',
                        type: 'error',
                    })
                })
        }

        /**
         * 服务协议跳转
         */
        const protocolAction = () => {
            router.push({
                path: '/about/agreement',
            })
        }

        return {
            inputPhone,
            findPassword,
            fegisterCode,
            getPhoneCode,
            registerAction,
            inputPassword,
            gotoFindPassword,
            loginAction,
            findInputCode,
            findInputPassword,
            findInputAffirmPassword,
            backLogin,
            findPasswordAction,
            registerCodeRef,
            findCodeRef,
            protocolAction,
        }
    },
    components: {
        PhoneInput,
        PasswordInput,
        CodeInput,
    },
    computed: {},
    methods: {},
})
</script>

<style lang="scss" scoped>
::v-deep(.login) {
    width: 100%;
    height: 56px;
    background: #d65928;
    border-radius: 4px;
    font-size: 18px;
    @include defaultFont;
    color: #ffffff;
    line-height: 56px;
    text-align: center;
    cursor: pointer;
}
.login-module-tabs {
    box-sizing: border-box;
    padding: 80px 80px 66px 80px;
    .login-module-register {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .login-phone-input {
            width: 100%;
            height: 56px;
            margin-top: 80px;
        }
        .login-code-input {
            width: 100%;
            height: 56px;
            margin-top: 40px;
        }
        .login {
            width: 100%;
            height: 56px;
            background: $themeColor;
            border-radius: 4px;
            font-size: 18px;
            @include defaultFont;
            color: #ffffff;
            line-height: 56px;
            text-align: center;
            cursor: pointer;
            margin-top: 40px;
        }
        .text {
            margin-top: 40px;
            width: 100%;
            font-size: 14px;
            @include defaultFont;
            color: #8c8c8c;
            line-height: 20px;
            text-align: center;
            .text-protocol {
                color: #4e9aeb;
            }
        }
    }
    .login-module-login {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .login-phone-input {
            width: 100%;
            height: 56px;
            margin-top: 80px;
        }
        .login-password-input {
            width: 100%;
            height: 56px;
            margin-top: 40px;
        }
        .forgot-password {
            margin: 6px 0px 14px 0px;
            align-self: flex-end;
            height: 20px;
            font-size: 14px;
            @include defaultFont;
            color: #8c8c8c;
            line-height: 20px;
            cursor: pointer;
        }
        .text {
            margin-top: 40px;
            width: 100%;
            height: 20px;
            font-size: 14px;
            @include defaultFont;
            color: #8c8c8c;
            line-height: 20px;
            text-align: center;
            .text-protocol {
                color: #4e9aeb;
            }
        }
    }
    ::v-deep(#tab-register) {
        width: 215px;
        height: 54px;
        font-size: 30px;
        @include defaultFont;
        color: #262626;
        line-height: 40px;
        letter-spacing: 2px;
        text-align: center;
        padding: 0px;
        margin-right: 51px;
    }
    ::v-deep(#tab-login) {
        width: 132px;
        height: 54px;
        font-size: 30px;
        @include defaultFont;
        color: #262626;
        line-height: 40px;
        letter-spacing: 2px;
        text-align: center;
        padding: 0px;
        margin-left: 51px;
    }
    ::v-deep(.is-active) {
        color: #d65928 !important;
        @include fontWeight500;
    }
    ::v-deep(.el-tabs__active-bar) {
        height: 6px;
        background: #d65928;
    }
    ::v-deep(.el-tabs__nav-wrap::after) {
        display: none !important;
    }
}
.find-password-content {
    box-sizing: border-box;
    padding: 24px 80px 44px 80px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .back-content {
        align-self: flex-start;
        cursor: pointer;
        .back-icon {
            width: 16px;
            height: 16px;
            margin-right: 6px;
        }
        .back-text {
            font-size: 16px;
            @include defaultFont;
            color: $themeColor;
            line-height: 24px;
        }
    }
    .find-password-title {
        margin-top: 34px;
        align-self: flex-start;
        font-size: 30px;
        @include defaultFont;
        color: #262626;
        line-height: 40px;
        letter-spacing: 2px;
    }
    .find-password-phone-input,
    .find-password-code-input,
    .find-password-input,
    .find-affirm-password-input {
        width: 100%;
        height: 56px;
        margin-top: 24px;
    }
    .find-password-ok {
        margin-top: 30px;
    }
}
@media screen and (max-width: 1450px) {
    .login-module-tabs {
        padding: 40px 40px 30px 40px;
        .login-module-register {
            .login-phone-input {
                margin-top: 40px;
            }
            .login-code-input {
                margin-top: 20px;
            }
            .text {
                margin-top: 20px;
            }
        }
        .login-module-login {
            .login-phone-input {
                margin-top: 40px;
            }
            .login-password-input {
                margin-top: 20px;
            }
            .text {
                margin-top: 20px;
            }
        }
    }
    .find-password-content {
        padding: 24px 40px;
    }
}
</style>
