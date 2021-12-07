/*
 * @Author: matiastang
 * @Date: 2021-11-18 17:56:58
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-07 11:04:48
 * @FilePath: /datumwealth-openalpha-front/src/components/loginModule/register.ts
 * @Description: 注册逻辑
 */
import { Store } from 'vuex'
import { Router } from 'vue-router'
import { AllStateTypes } from 'store/indexInterface'
import { ref, Ref } from 'vue'
import { routerToUserCenter } from 'utils/router/index'
// import _, { CodeInputRefTypes } from '@/components/codeInput/CodeInput.vue'
import { sendSMS, forget } from '@/common/request/modules/user/user'
import { phone_check, code_check } from 'utils/check/index'
import { MessageParams } from 'element-plus'
import ElMessage from '@/common/utils/message'

const fegisterCode = ref('')
// const registerCodeRef: Ref<CodeInputRefTypes | null> = ref(null)
/**
 * 获取验证码
 */
const registerPhoneCode = (phone: string): MessageParams | Promise<string> => {
    // 手机校验
    const phoneError = phone_check(phone)
    if (phoneError) {
        // ElMessage({
        //     message: phoneError,
        //     type: 'warning',
        // })
        return {
            message: phoneError,
            type: 'warning',
        }
    }
    // 启动到计时
    // if (registerCodeRef.value) {
    //     registerCodeRef.value.runCountDown()
    // }
    // 发送验证码
    return sendSMS(phone)
    // .then((res) => {
    //     ElMessage({
    //         message: res,
    //         type: 'success',
    //     })
    // })
    // .catch((err) => {
    //     ElMessage({
    //         message: err.msg || '发送验证码错误',
    //         type: 'error',
    //     })
    // })
}
/**
 * 注册登录
 */
const register = (store: Store<AllStateTypes>, router: Router, phone: string) => {
    // 手机校验
    const phoneError = phone_check(phone)
    if (phoneError) {
        ElMessage({
            message: phoneError,
            type: 'warning',
        })
        return
    }
    // 验证码校验
    const code = fegisterCode.value
    const codeError = code_check(code)
    if (codeError) {
        ElMessage({
            message: codeError,
            type: 'warning',
        })
        return
    }
    // 注册登录
    dwLogin(store, router, {
        loginType: 'code',
        username: phone,
        password: code,
    })
}
// 登录
const dwLogin = (
    store: Store<AllStateTypes>,
    router: Router,
    parameters: {
        loginType: string
        username: string
        password: string
    }
) => {
    store
        .dispatch('userLogin', parameters)
        .then((res: string) => {
            ElMessage({
                message: res,
                type: 'success',
            })
            routerToUserCenter(store, router)
        })
        .catch((err: any) => {
            ElMessage({
                message: err.msg || '登录错误',
                type: 'error',
            })
        })
}
export { fegisterCode, registerPhoneCode, register }
