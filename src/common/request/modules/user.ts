/*
 * @Author: matiastang
 * @Date: 2021-11-11 18:24:38
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-16 16:13:28
 * @FilePath: /datumwealth-openalpha-front/src/common/request/modules/user.ts
 * @Description: 用户相关接口
 */
import http from '../request'
import { Md5 } from 'ts-md5/dist/md5'
import {
    LoginParameters,
    FotgetParameters,
    ChangeMobileParameters,
    ChangePasswordParameters,
    ChangeEmailParameters,
} from './userInterface'
import { localStorageRemoveAll } from '@/common/utils/storage/localStorage'

/**
 * 前缀
 */
const _prefix = 'member'

/**
 * 用户登录/注册
 * @param loginType 登录类型：pwd-密码登录 code-验证码登录
 * @param username 账号：手机号/用户名
 * @param password 密码：验证码/密码
 * @returns
 */
function login(parameters: LoginParameters) {
    return http.post(`/${_prefix}/login`, {
        loginType: parameters.loginType,
        username: parameters.username,
        password:
            parameters.loginType === 'pwd' ? Md5.hashStr(parameters.password) : parameters.password,
    })
}

/**
 * 退出登录
 * @returns
 */
function logout() {
    return new Promise<string>((resolve, reject) => {
        http.get(`/${_prefix}/logout`)
            .then((res) => {
                localStorageRemoveAll()
                const data = res.data
                resolve(typeof data === 'string' ? data : '退出成功')
            })
            .catch(reject)
    })
}

/**
 * 短信验证码发送
 * @param mobile
 * @returns
 */
function sendSMS(mobile: string) {
    return new Promise<string>((resolve, reject) => {
        http.get(`/member/send/sms/${mobile}`)
            .then((res) => {
                const data = res.data
                resolve(typeof data === 'string' ? data : '发送成功')
            })
            .catch(reject)
    })
}

/**
 * 邮箱验证码发送
 * @param email
 * @returns
 */
function sendEmail(email: string) {
    return new Promise<string>((resolve, reject) => {
        http.get(`/member/send/email/${email}`)
            .then((res) => {
                const data = res.data
                resolve(typeof data === 'string' ? data : '发送成功')
            })
            .catch(reject)
    })
}

/**
 * 忘记密码/找回密码
 * @param mobile 手机号
 * @param verifyCode 验证码
 * @param password 密码
 * @returns
 */
function forget(parameters: FotgetParameters) {
    return new Promise<string>((resolve, reject) => {
        http.post(`/${_prefix}/forget`, {
            mobile: parameters.mobile,
            verifyCode: parameters.verifyCode,
            password: Md5.hashStr(parameters.password),
        })
            .then((res) => {
                const data = res.data
                resolve(typeof data === 'string' ? data : '重置成功')
            })
            .catch(reject)
    })
}

/**
 * 绑定/修改手机号
 * @param parameters
 * @returns
 */
function changeMobile(parameters: ChangeMobileParameters) {
    return new Promise<string>((resolve, reject) => {
        http.post(`/${_prefix}/change/mobile`, parameters)
            .then((res) => {
                const data = res.data
                resolve(typeof data === 'string' ? data : '修改成功')
            })
            .catch(reject)
    })
}

/**
 * 绑定/修改手机号
 * @param parameters
 * @returns
 */
function changePassword(parameters: ChangePasswordParameters) {
    return new Promise<string>((resolve, reject) => {
        http.post(`/${_prefix}/change/password`, {
            id: parameters.id,
            oldPassword: Md5.hashStr(parameters.oldPassword),
            password: Md5.hashStr(parameters.password),
        })
            .then((res) => {
                const data = res.data
                resolve(typeof data === 'string' ? data : '修改成功')
            })
            .catch(reject)
    })
}

/**
 * 绑定/修改邮箱
 * @param parameters
 * @returns
 */
function changeEmail(parameters: ChangeEmailParameters) {
    return new Promise<string>((resolve, reject) => {
        http.post(`/${_prefix}/change/email`, parameters)
            .then((res) => {
                const data = res.data
                resolve(typeof data === 'string' ? data : '修改成功')
            })
            .catch(reject)
    })
}

export { login, logout, sendSMS, sendEmail, forget, changeMobile, changePassword, changeEmail }
