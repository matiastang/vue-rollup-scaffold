<!--
 * @Author: your name
 * @Date: 2021-11-02 16:56:07
 * @LastEditTime: 2021-11-03 17:47:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /datumwealth-openalpha-front/src/components/loginModule/LoginModule.vue
-->
<template>
    <div>
        <el-tabs
            v-if="!findPassword"
            class="login-module-tabs"
            v-model="activeName"
            @tab-click="tabClick"
        >
            <el-tab-pane class="login-module-register" label="短信登录/注册" name="register">
                <PhoneInput
                    class="login-phone-input"
                    v-model="inputPhone"
                    placeholder="请输入手机号码"
                />
                <CodeInput
                    class="login-code-input"
                    v-model="fegisterCode"
                    placeholder="请输入4位验证码"
                    @getCode="getRegisterCode"
                />
                <div class="login" @click="registerAction">登录/注册</div>
                <div class="text">
                    使用手机短信验证码登录，无账号时将自动注册<br />登录即表示同意《服务协议》
                </div>
            </el-tab-pane>
            <el-tab-pane class="login-module-login" label="密码登录" name="login">
                <PhoneInput
                    class="login-phone-input"
                    v-model="inputPhone"
                    placeholder="请输入手机号码"
                />
                <PasswordInput
                    class="login-password-input"
                    v-model="inputPassword"
                    placeholder="请输入密码"
                />
                <div class="forgot-password" @click="gotoFindPassword">忘记密码?</div>
                <div class="login" @click="loginAction">登录</div>
                <div class="text">登录即表示同意《服务协议》</div>
            </el-tab-pane>
        </el-tabs>
        <div v-if="findPassword" class="find-password-content">
            <div class="back-content" @click="backLogin">
                <div class="back-text">返回登录</div>
            </div>
            <div class="find-password-title">找回密码</div>
            <PhoneInput
                class="find-password-phone-input"
                v-model="inputPhone"
                placeholder="请输入手机号码"
            />
            <CodeInput
                class="find-password-code-input"
                v-model="findInputCode"
                placeholder="请输入4位验证码"
                @getCode="getCode"
            />
            <PasswordInput
                class="find-password-input"
                v-model="findInputPassword"
                placeholder="请输入新密码(8-20位数字和字母组合)"
            />
            <PasswordInput
                class="find-affirm-password-input"
                v-model="findInputAffirmPassword"
                placeholder="再次确认密码"
            />
            <div class="login find-password-ok" @click="findPasswordAction">确定</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElMessage } from 'element-plus'
import PhoneInput from '@/components/phoneinput/PhoneInput.vue'
import PasswordInput from '@/components/passwordInput/PasswordInput.vue'
import CodeInput from '@/components/codeInput/CodeInput.vue'

export default defineComponent({
    data() {
        return {
            activeName: 'login',
        }
    },
    setup() {
        let inputPhone = ref('')
        let findPassword = ref(false)

        // 注册
        let fegisterCode = ref('')
        /**
         * 获取验证码
         */
        const getRegisterCode = () => {
            if (inputPhone.value.trim() == '') {
                ElMessage({
                    message: '请输入手机号',
                    type: 'warning',
                })
                return
            }
            // TODO: - 手机号校验
            ElMessage({
                message: '功能开发中...',
                type: 'warning',
            })
        }
        /**
         * 找回密码
         */
        const registerAction = () => {
            if (inputPhone.value.trim() == '') {
                ElMessage({
                    message: '请输入手机号',
                    type: 'warning',
                })
                return
            }
            if (fegisterCode.value.trim() == '') {
                ElMessage({
                    message: '请输入验证码',
                    type: 'warning',
                })
                return
            }
            ElMessage({
                message: '功能开发中...',
                type: 'warning',
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
            if (inputPhone.value.trim() == '') {
                ElMessage({
                    message: '请输入手机号',
                    type: 'warning',
                })
                return
            }
            if (inputPassword.value.trim() == '') {
                ElMessage({
                    message: '请输入密码',
                    type: 'warning',
                })
                return
            }
            ElMessage({
                message: '功能开发中...',
                type: 'warning',
            })
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
         * 获取验证码
         */
        const getFindCode = () => {
            if (inputPhone.value.trim() == '') {
                ElMessage({
                    message: '请输入手机号',
                    type: 'warning',
                })
                return
            }
            // TODO: - 手机号校验
            ElMessage({
                message: '功能开发中...',
                type: 'warning',
            })
        }
        /**
         * 找回密码
         */
        const findPasswordAction = () => {
            if (inputPhone.value.trim() == '') {
                ElMessage({
                    message: '请输入手机号',
                    type: 'warning',
                })
                return
            }
            if (findInputCode.value.trim() == '') {
                ElMessage({
                    message: '请输入验证码',
                    type: 'warning',
                })
                return
            }
            if (findInputPassword.value.trim() == '') {
                ElMessage({
                    message: '请输入密码',
                    type: 'warning',
                })
                return
            }
            if (findInputAffirmPassword.value.trim() == '') {
                ElMessage({
                    message: '请确认密码',
                    type: 'warning',
                })
                return
            }
            if (findInputPassword.value !== findInputAffirmPassword.value) {
                ElMessage({
                    message: '两次密码不一致',
                    type: 'warning',
                })
                return
            }
            ElMessage({
                message: '功能开发中...',
                type: 'warning',
            })
        }

        return {
            inputPhone,
            findPassword,
            fegisterCode,
            getRegisterCode,
            registerAction,
            inputPassword,
            gotoFindPassword,
            loginAction,
            findInputCode,
            findInputPassword,
            findInputAffirmPassword,
            backLogin,
            getFindCode,
            findPasswordAction,
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
::v-deep .login {
    width: 100%;
    height: 56px;
    background: #d65928;
    border-radius: 4px;
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 56px;
    text-align: center;
    letter-spacing: 1px;
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
            background: #d65928;
            border-radius: 4px;
            font-size: 18px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #ffffff;
            line-height: 56px;
            text-align: center;
            letter-spacing: 1px;
            cursor: pointer;
            margin-top: 40px;
        }
        .text {
            margin-top: 40px;
            width: 100%;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #8c8c8c;
            line-height: 20px;
            letter-spacing: 1px;
            text-align: center;
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
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #8c8c8c;
            line-height: 20px;
            letter-spacing: 1px;
            cursor: pointer;
        }
        .text {
            margin-top: 40px;
            width: 100%;
            height: 20px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #8c8c8c;
            line-height: 20px;
            letter-spacing: 1px;
            text-align: center;
        }
    }
    ::v-deep #tab-register {
        width: 215px;
        height: 54px;
        font-size: 30px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #262626;
        line-height: 40px;
        letter-spacing: 2px;
        text-align: center;
        padding: 0px;
        margin-right: 51px;
    }
    ::v-deep #tab-login {
        width: 132px;
        height: 54px;
        font-size: 30px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #262626;
        line-height: 40px;
        letter-spacing: 2px;
        text-align: center;
        padding: 0px;
        margin-left: 51px;
    }
    ::v-deep .is-active {
        font-weight: 500 !important;
        color: #d65928 !important;
    }
    ::v-deep .el-tabs__active-bar {
        height: 6px;
        background: #d65928;
    }
    ::v-deep .el-tabs__nav-wrap::after {
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
        .back-text {
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #d65928;
            line-height: 24px;
            letter-spacing: 1px;
        }
    }
    .find-password-title {
        margin-top: 34px;
        align-self: flex-start;
        font-size: 30px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
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
</style>
