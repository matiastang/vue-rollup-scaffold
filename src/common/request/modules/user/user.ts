/*
 * @Author: matiastang
 * @Date: 2021-11-11 18:24:38
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-01 18:51:49
 * @FilePath: /datumwealth-openalpha-front/src/common/request/modules/user/user.ts
 * @Description: 用户相关接口
 */
import http from '@/common/request/request'
import { Md5 } from 'ts-md5/dist/md5'
import { MbMemberAuthLogs, UserLoginInfo } from '@/user'
import { memberPrefix } from '@/common/request/prefix'
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

/**
 * 用户登录/注册
 * @param loginType 登录类型：pwd-密码登录 code-验证码登录
 * @param username 账号：手机号/用户名
 * @param password 密码：验证码/密码
 * @returns
 */
function login(parameters: LoginParameters) {
    return http.post<UserLoginInfo>(`${memberPrefix}/login`, {
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
    return http.get<null>(`${memberPrefix}/logout`)
}

/**
 * 短信验证码发送
 * @param mobile
 * @returns
 */
function sendSMS(mobile: string) {
    return http.get<string>(`${memberPrefix}/send/sms/${mobile}`)
}

/**
 * 邮箱验证码发送
 * @param email
 * @returns
 */
function sendEmail(email: string) {
    return http.get<string>(`${memberPrefix}/send/email/${email}`)
}

/**
 * 忘记密码/找回密码
 * @param mobile 手机号
 * @param verifyCode 验证码
 * @param password 密码
 * @returns
 */
function forget(parameters: FotgetParameters) {
    return http.post<string>(`${memberPrefix}/forget`, {
        mobile: parameters.mobile,
        verifyCode: parameters.verifyCode,
        password: Md5.hashStr(parameters.password),
    })
}

/**
 * 绑定/修改手机号
 * @param parameters
 * @returns
 */
function changeMobile(parameters: ChangeMobileParameters) {
    return http.post<string>(`${memberPrefix}/change/mobile`, parameters)
}

/**
 * 绑定/修改手机号
 * @param parameters
 * @returns
 */
function changePassword(parameters: ChangePasswordParameters) {
    return http.post<string>(`${memberPrefix}/change/password`, {
        id: parameters.id,
        oldPassword: Md5.hashStr(parameters.oldPassword),
        password: Md5.hashStr(parameters.password),
    })
}

/**
 * 绑定/修改邮箱
 * @param parameters
 * @returns
 */
function changeEmail(parameters: ChangeEmailParameters) {
    return http.post<string>(`${memberPrefix}/change/email`, parameters)
}

/**
 * 个人实名认证
 */
function personal(parameters: PersonalParameters) {
    return http.post<string>(`${memberPrefix}/auth/personal`, parameters)
}

/**
 * 企业实名认证
 */
function enterprise(parameters: EnterpriseParameters) {
    return http.post<string>(`${memberPrefix}/auth/enterprise`, parameters)
}

/**
 * 实名认证记录接口
 */
const certificationList = (userId: number) => {
    return http.get<certificationAuth[]>(`${memberPrefix}/auth/log/${userId}`)
}

/**
 * 获得最后一次认证信息接口
 */
const certificationLast = (userId: number) => {
    return http.get<MbMemberAuthLogs>(`${memberPrefix}/auth/last?userId=${userId}`)
}

/**
 * 用户token重置
 */
const resetToken = () => {
    return http.post<string>(`${memberPrefix}/reset/token`, {})
}

/**
 * 检查账户余额/套餐是否可用
 * @param userId
 * @returns
 */
const checkAvailable = (type: string) => {
    return http.get<boolean>(`${memberPrefix}/check/account/balance/available?type=${type}`)
}

/**
 * 意见反馈提交
 * @param userId
 * @returns
 */
const feedback = (phone: string, content: string) => {
    return http.post<boolean>(`${memberPrefix}/opinion/add`, {
        mobile: phone,
        opinion: content,
    })
}
/**
 * 设置扣款顺序：BALANCE-余额,COMBO-套餐
 * @param sequence
 * @returns
 */
const chargingSequence = (sequence: string[]) => {
    return http.post<boolean>(`${memberPrefix}/charging/sequence/set`, sequence)
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
    checkAvailable,
    feedback,
    chargingSequence,
}
