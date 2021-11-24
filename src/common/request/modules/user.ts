/*
 * @Author: matiastang
 * @Date: 2021-11-11 18:24:38
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-24 11:08:59
 * @FilePath: /datumwealth-openalpha-front/src/common/request/modules/user.ts
 * @Description: 用户相关接口
 */
import http from '../request'
import { Md5 } from 'ts-md5/dist/md5'
import { MbMemberAuthLogs } from '@/user'
import {
    LoginParameters,
    FotgetParameters,
    ChangeMobileParameters,
    ChangePasswordParameters,
    ChangeEmailParameters,
    PersonalParameters,
    EnterpriseParameters,
    certificationAuth,
} from './userInterface'
import { memberPrefix } from '../prefix'

/**
 * 用户登录/注册
 * @param loginType 登录类型：pwd-密码登录 code-验证码登录
 * @param username 账号：手机号/用户名
 * @param password 密码：验证码/密码
 * @returns
 */
function login(parameters: LoginParameters) {
    return http.post(`${memberPrefix}/login`, {
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
        http.get(`${memberPrefix}/logout`)
            .then((res) => {
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
        http.get(`${memberPrefix}/send/sms/${mobile}`)
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
        http.get(`${memberPrefix}/send/email/${email}`)
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
        http.post(`${memberPrefix}/forget`, {
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
        http.post(`${memberPrefix}/change/mobile`, parameters)
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
        http.post(`${memberPrefix}/change/password`, {
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
        http.post(`${memberPrefix}/change/email`, parameters)
            .then((res) => {
                const data = res.data
                resolve(typeof data === 'string' ? data : '修改成功')
            })
            .catch(reject)
    })
}

/**
 * 个人实名认证
 */
function personal(parameters: PersonalParameters) {
    return new Promise<string>((resolve, reject) => {
        http.post(`${memberPrefix}/auth/personal`, parameters)
            .then((res) => {
                const data = res.data
                resolve(typeof data === 'string' ? data : '修改成功')
            })
            .catch(reject)
    })
}

/**
 * 企业实名认证
 */
function enterprise(parameters: EnterpriseParameters) {
    return new Promise<string>((resolve, reject) => {
        http.post(`${memberPrefix}/auth/enterprise`, parameters)
            .then((res) => {
                const data = res.data
                resolve(typeof data === 'string' ? data : '修改成功')
            })
            .catch(reject)
    })
}

/**
 * 实名认证记录接口
 */
const certificationList = (userId: number) => {
    return new Promise<certificationAuth[]>((resolve, reject) => {
        http.get(`${memberPrefix}/auth/log/${userId}`)
            .then((res) => {
                const data = res.data
                if (Array.isArray(data)) {
                    resolve(data as Array<certificationAuth>)
                    return
                }
                resolve([])
                return
            })
            .catch(reject)
    })
}

/**
 * 获得最后一次认证信息接口
 */
const certificationLast = (userId: number) => {
    return new Promise<MbMemberAuthLogs>((resolve, reject) => {
        http.get(`${memberPrefix}/auth/last?userId=${userId}`)
            .then((res) => {
                const data = res.data
                if (typeof data === 'object') {
                    resolve(data as MbMemberAuthLogs)
                    return
                }
                reject('结果类型错误')
                return
            })
            .catch(reject)
    })
}

/**
 * 用户token重置
 */
const resetToken = () => {
    return new Promise<string>((resolve, reject) => {
        http.post(`${memberPrefix}/reset/token`, {})
            .then((res) => {
                const data = res.data
                resolve(typeof data === 'string' ? data : '修改成功')
            })
            .catch(reject)
    })
}

export {
    login,
    logout,
    sendSMS,
    sendEmail,
    forget,
    changeMobile,
    changePassword,
    changeEmail,
    personal,
    enterprise,
    certificationList,
    certificationLast,
    resetToken,
}
