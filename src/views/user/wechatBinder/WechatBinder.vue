<!--
 * @Author: matiastang
 * @Date: 2021-12-22 17:03:44
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-24 11:08:31
 * @FilePath: /datumwealth-openalpha-front/src/views/user/wechatBinder/WechatBinder.vue
 * @Description: 绑定微信界面
-->
<template>
    <div class="wechat-binder">
        <div class="wechat-binder-bg-container">
            <div class="wechat-binder-title">绑定账号</div>
            <div class="wechat-binder-container">
                <PhoneInput
                    phoneClass="login-phone-input"
                    v-model="inputPhone"
                    placeholder="请输入手机号码"
                />
                <CodeInput
                    codeInputClass="login-code-input"
                    v-model="fegisterCode"
                    @CodeInputGetCode="getPhoneCode()"
                    @countDownOver="registerCountDownOver"
                    ref="registerCodeRef"
                />
                <DragVerify v-if="dragVerifyStatus" @dragSuccess="dragSuccess" />
                <el-button :loading="loginLoading" class="login" @click="registerAction"
                    >注册/绑定</el-button
                >
                <div class="text">
                    使用手机短信验证码绑定，无账号时将自动注册<br />绑定即表示同意<span
                        class="text-protocol cursorP"
                        @click="protocolAction"
                        >《服务协议》</span
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref, Ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ElMessage from '@/common/utils/message'
import PhoneInput from '@/components/phoneinput/PhoneInput.vue'
import PasswordInput from '@/components/passwordInput/PasswordInput.vue'
import CodeInput, { CodeInputRefTypes } from '@/components/codeInput/CodeInput.vue'
import { sendSMS, forget, oauthBinder } from '@/common/request/modules/user/user'
import { phone_check, code_check, password_check } from 'utils/check/index'
import { useStore } from 'store/index'
import { routerToUserCenter } from 'utils/router/index'
import DragVerify from '@/components/dragVerify/DragVerify.vue'
import WechatLogin from '@/components/wechatLogin/WechatLogin.vue'

const prop = defineProps({})

const route = useRoute()
const router = useRouter()
const store = useStore()
const inputPhone = ref('')
const fegisterCode = ref('')
const loginLoading = ref(false)
const registerCodeRef: Ref<CodeInputRefTypes | null> = ref(null)
const dragVerifyStatus = ref(false)

const jumpType = computed(() => {
    return route.query.type === 'center'
})
const weixinUUID = computed(() => {
    const uuid = route.params.uuid
    if (Array.isArray(uuid)) {
        return null
    }
    return uuid
})
const userId = computed(() => store.state.userModule.userLoginInfo.member.id)
/**
 * 获取验证码
 */
const getPhoneCode = () => {
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
    if (dragVerifyStatus.value) {
        ElMessage.warning('请滑动滑块儿发送验证码')
        return
    }
    dragVerifyStatus.value = true
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
    if (!weixinUUID.value) {
        ElMessage.error('数据异常')
        return
    }
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
            weixinOauthBinder()
        })
        .catch((err) => {
            loginLoading.value = false
            ElMessage.error(err.msg || '登录错误')
        })
}
const weixinOauthBinder = () => {
    if (!weixinUUID.value || !userId.value) {
        ElMessage.error('数据异常')
        return
    }
    oauthBinder(userId.value.toString(), weixinUUID.value)
        .then((res: string) => {
            store.commit('setBindWechat', 1)
            ElMessage({
                message: res,
                type: 'success',
            })
            if (jumpType.value) {
                routerToUserCenter(store, router)
            } else {
                router.back()
            }
        })
        .catch((err) => {
            ElMessage.error(err.msg || '登录错误')
        })
        .finally(() => {
            loginLoading.value = false
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
</script>

<style lang="scss" scoped>
.wechat-binder {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 60px 80px;
    height: calc(100vh - 120px - 96px);

    .wechat-binder-bg-container {
        background: $themeBgColor;
        width: 100%;
        height: 100%;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        .wechat-binder-title {
            font-size: fontSize(24px);
            @include defaultFont;
            color: $titleColor;
            text-align: center;
            margin: 40px 0px;
        }
        .wechat-binder-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 50%;
            max-width: 600px;
            .login-phone-input {
                width: 100%;
                height: 56px;
                margin-top: 40px;
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
    }
}
</style>
