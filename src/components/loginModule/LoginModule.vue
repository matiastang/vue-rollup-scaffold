<!--
 * @Author: your name
 * @Date: 2021-11-02 16:56:07
 * @LastEditTime: 2021-12-24 13:55:50
 * @LastEditors: matiastang
 * @Description: In User Settings Edit
 * @FilePath: /datumwealth-openalpha-front/src/components/loginModule/LoginModule.vue
-->
<template>
    <div style="position: relative">
        <el-tabs
            v-if="!findPassword && !wechatLogin"
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
                    @countDownOver="registerCountDownOver"
                    ref="registerCodeRef"
                />
                <DragVerify v-if="dragVerifyStatus" @dragSuccess="dragSuccess" />
                <el-button :loading="loginLoading" class="login" @click="registerAction"
                    >登录/注册</el-button
                >
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
                <div class="login-way-forget-container">
                    <div class="login-way-container">
                        <div class="login-way-title">三方登录</div>
                        <img
                            class="wechat-login"
                            src="static/login/wx_logo.svg"
                            @click="wechatLoginAction"
                        />
                    </div>
                    <div class="forgot-password" @click="gotoFindPassword">忘记密码?</div>
                </div>
                <el-button :loading="loginLoading" class="login" @click="loginAction"
                    >登录</el-button
                >
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
            <el-button
                :loading="findLoading"
                class="login find-password-ok"
                @click="findPasswordAction"
                >确定</el-button
            >
        </div>
        <div v-show="wechatLogin" class="wechat-login-content">
            <div class="back-content flexRowCenter" @click="wechatBackLogin">
                <img class="back-icon" src="static/login/login-back.svg" />
                <div class="back-text">密码登录</div>
            </div>
            <WechatLogin
                v-if="wechatLogin"
                appid="wx6d902dc1624282c4"
                scope="snsapi_login"
                :state="wechatState"
                :redirect_uri="redirect_uri"
            />
        </div>
        <!-- <img
            v-if="!findPassword && !wechatLogin"
            class="wechat-login"
            src="static/login/openalpha-qrcode.png"
            @click="wechatLoginAction"
        /> -->
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ElMessage from '@/common/utils/message'
import PhoneInput from '@/components/phoneinput/PhoneInput.vue'
import PasswordInput from '@/components/passwordInput/PasswordInput.vue'
import CodeInput, { CodeInputRefTypes } from '@/components/codeInput/CodeInput.vue'
import { sendSMS, forget } from '@/common/request/modules/user/user'
import { phone_check, code_check, password_check } from 'utils/check/index'
import { useStore } from 'store/index'
import { routerToUserCenter } from 'utils/router/index'
import DragVerify from '@/components/dragVerify/DragVerify.vue'
import WechatLogin from '@/components/wechatLogin/WechatLogin.vue'

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
            isShowSelf: true,
            sliderVConf: {
                width: 300,
                height: 180,
            },
        }
    },
    setup(props, context) {
        const route = useRoute()
        const router = useRouter()
        const store = useStore()
        let inputPhone = ref('')
        let findPassword = ref(false)
        const loginLoading = ref(false)

        // 注册
        let fegisterCode = ref('')
        let registerCodeRef: Ref<CodeInputRefTypes | null> = ref(null)
        let findCodeRef: Ref<CodeInputRefTypes | null> = ref(null)
        const dragVerifyStatus = ref(false)
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
                    type: 'error',
                })
                return
            }
            // 启动到计时
            // if (type === 0) {
            //     if (registerCodeRef.value) {
            //         registerCodeRef.value.runCountDown()
            //     }
            // } else {
            //     if (findCodeRef.value) {
            //         findCodeRef.value.runCountDown()
            //     }
            // }
            if (type === 0) {
                if (dragVerifyStatus.value) {
                    ElMessage.warning('请滑动滑块儿发送验证码')
                    return
                }
                dragVerifyStatus.value = true
                return
            }
            // 发送验证码
            sendSMS(phone)
                .then((res) => {
                    if (type === 1) {
                        if (findCodeRef.value) {
                            findCodeRef.value.runCountDown()
                        }
                    }
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
        const dragSuccess = () => {
            // 手机校验
            let phone = inputPhone.value
            let phoneError = phone_check(phone)
            if (phoneError) {
                dragVerifyStatus.value = false
                ElMessage({
                    message: phoneError,
                    type: 'error',
                })
                return
            }
            // 发送验证码
            sendSMS(phone)
                .then((res) => {
                    // 启动到计时
                    if (registerCodeRef.value) {
                        registerCodeRef.value.runCountDown()
                    }
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
        const registerCountDownOver = () => {
            dragVerifyStatus.value = false
        }
        /**
         * 注册登录
         */
        const registerAction = () => {
            if (loginLoading.value) {
                ElMessage.error('登录/注册中，请勿频繁操作')
                return
            }
            // 手机校验
            let phone = inputPhone.value
            let phoneError = phone_check(phone)
            if (phoneError) {
                ElMessage({
                    message: phoneError,
                    type: 'error',
                })
                return
            }
            // 验证码校验
            let code = fegisterCode.value
            let codeError = code_check(code)
            if (codeError) {
                ElMessage({
                    message: codeError,
                    type: 'error',
                })
                return
            }
            // 注册登录
            dwLogin('code', phone, code)
        }
        // 登录
        const dwLogin = (loginType: string, username: string, password: string) => {
            loginLoading.value = true
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
                .finally(() => {
                    loginLoading.value = false
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
            if (loginLoading.value) {
                ElMessage.error('登录中，请勿频繁操作')
                return
            }
            // 手机校验
            let phone = inputPhone.value
            let phoneError = phone_check(phone)
            if (phoneError) {
                ElMessage({
                    message: phoneError,
                    type: 'error',
                })
                return
            }
            // 密码校验
            let password = inputPassword.value
            let passwordError = password_check(password)
            if (passwordError) {
                ElMessage({
                    message: passwordError,
                    type: 'error',
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
        const findLoading = ref(false)
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
                    type: 'error',
                })
                return
            }
            // 验证码校验
            let code = findInputCode.value
            let codeError = code_check(code)
            if (codeError) {
                ElMessage({
                    message: codeError,
                    type: 'error',
                })
                return
            }
            // 确认密码校验
            let password = findInputPassword.value
            let affirmPassword = findInputAffirmPassword.value
            if (password !== affirmPassword) {
                ElMessage({
                    message: '两次密码不一致',
                    type: 'error',
                })
                return
            }
            // 密码校验
            let passwordError = password_check(password, true)
            if (passwordError) {
                ElMessage({
                    message: passwordError,
                    type: 'error',
                })
                return
            }
            findLoading.value = true
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
                .finally(() => {
                    findLoading.value = false
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
        // 微信登录
        const wechatLogin = ref(false)
        const wechatBackLogin = () => {
            wechatLogin.value = false
        }

        const wechatState = ref('')

        const wechatLoginAction = () => {
            const stateUUID = Math.round(Math.random() * 100 + 100)
            console.log(`成功uuid:${stateUUID}`)
            store.commit('setWechatState', stateUUID.toString())
            wechatState.value = stateUUID.toString()
            // 集成在网页
            wechatLogin.value = true
            // 跳转网页
            // window.open(
            //     `${
            //         import.meta.env.DEV ? 'https://test.openalpha.cn' : window.location.origin
            //     }/open/login/oauth/login/wechat`
            // )
        }

        /**
         * 重定向地址
         */
        const redirect_uri = computed(() => {
            const uri = `${
                import.meta.env.DEV ? 'https://test.openalpha.cn' : window.location.origin
            }${route.path}`
            const redirect_uri = encodeURI(uri)
            return redirect_uri
        })

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
            loginLoading,
            findLoading,
            dragVerifyStatus,
            dragSuccess,
            registerCountDownOver,
            wechatBackLogin,
            wechatLogin,
            wechatLoginAction,
            redirect_uri,
            wechatState,
        }
    },
    components: {
        PhoneInput,
        PasswordInput,
        CodeInput,
        DragVerify,
        WechatLogin,
    },
    computed: {},
    methods: {},
})
</script>

<style lang="scss" scoped>
::v-deep(.login) {
    width: 100%;
    height: 56px;
    background: $themeColor;
    border-radius: 4px;
    font-size: fontSize(18px);
    @include defaultFont;
    color: $themeBgColor;
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
            margin: 20px 0px;
        }
        .login {
            width: 100%;
            height: 56px;
            background: $themeColor;
            border-radius: 4px;
            font-size: fontSize(18px);
            @include defaultFont;
            color: $themeBgColor;
            line-height: 56px;
            text-align: center;
            cursor: pointer;
            margin-top: 20px;
            padding: 0px;
            border: none;
        }
        .text {
            margin-top: 40px;
            width: 100%;
            font-size: fontSize(14px);
            @include defaultFont;
            color: $placeholderColor;
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
        .login-way-forget-container {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 10px 0px;
            .login-way-container {
                height: 35px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                .login-way-title {
                    height: 20px;
                    font-size: fontSize(14px);
                    @include defaultFont;
                    color: $placeholderColor;
                    line-height: 20px;
                    margin-right: 10px;
                }
                .wechat-login {
                    width: 30px;
                    overflow: hidden;
                    cursor: pointer;
                }
                .wechat-login:hover {
                    width: 35px;
                }
            }
            .forgot-password {
                height: 20px;
                font-size: fontSize(14px);
                @include defaultFont;
                color: $placeholderColor;
                cursor: pointer;
            }
        }
        .login {
            width: 100%;
            height: 56px;
            background: $themeColor;
            border-radius: 4px;
            font-size: fontSize(18px);
            @include defaultFont;
            color: $themeBgColor;
            line-height: 56px;
            text-align: center;
            cursor: pointer;
            padding: 0px;
            border: none;
        }
        .text {
            margin-top: 40px;
            width: 100%;
            height: 20px;
            font-size: fontSize(14px);
            @include defaultFont;
            color: $placeholderColor;
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
        font-size: fontSize(30px);
        @include defaultFont;
        color: $titleColor;
        line-height: 40px;
        letter-spacing: 2px;
        text-align: center;
        padding: 0px;
        margin-right: 51px;
    }
    ::v-deep(#tab-login) {
        width: 132px;
        height: 54px;
        font-size: fontSize(30px);
        @include defaultFont;
        color: $titleColor;
        line-height: 40px;
        letter-spacing: 2px;
        text-align: center;
        padding: 0px;
        margin-left: 51px;
    }
    ::v-deep(.is-active) {
        color: $themeColor !important;
        @include fontWeight500;
    }
    ::v-deep(.el-tabs__active-bar) {
        height: 6px;
        background: $themeColor;
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
            font-size: fontSize(16px);
            @include defaultFont;
            color: $themeColor;
            line-height: 24px;
        }
    }
    .find-password-title {
        margin-top: 34px;
        align-self: flex-start;
        font-size: fontSize(30px);
        @include defaultFont;
        color: $titleColor;
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
        padding: 0px;
        border: none;
        background: $themeColor;
        color: $themeBgColor;
    }
}
.wechat-login-content {
    box-sizing: border-box;
    padding: 24px 40px 44px 40px;
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
            font-size: fontSize(16px);
            @include defaultFont;
            color: $themeColor;
            line-height: 24px;
        }
    }
}
.slider-verify {
    width: 300px;
    height: 180px;
}

// .wechat-login {
//     position: absolute;
//     top: 0px;
//     right: 0px;
//     width: 40px;
//     height: 40px;
//     cursor: pointer;
// }
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
