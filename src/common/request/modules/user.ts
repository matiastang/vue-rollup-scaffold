/*
 * @Author: matiastang
 * @Date: 2021-11-11 18:24:38
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-12 15:24:26
 * @FilePath: /datumwealth-openalpha-front/src/common/request/modules/user.ts
 * @Description: 用户相关接口
 */
import http from '../request'
import { Md5 } from 'ts-md5/dist/md5'
import { LoginParameters, FotgetParameters } from './userInterface'
// import { UserLoginInfo } from '@/user'
// import { localStorageKey, localStorageWrite } from '@/common/utils/storage/localStorage'

/**
 * 用户登录/注册
 * @param loginType 登录类型：pwd-密码登录 code-验证码登录
 * @param username 账号：手机号/用户名
 * @param password 密码：验证码/密码
 * @returns
 */
function login(parameters: LoginParameters) {
    return http.post('/member/login', {
        loginType: parameters.loginType,
        username: parameters.username,
        password:
            parameters.loginType === 'pwd' ? Md5.hashStr(parameters.password) : parameters.password,
    })
    // return new Promise<string>((resolve, reject) => {
    //     http.post('/member/login', {
    //         loginType,
    //         username,
    //         password: loginType === 'pwd' ? Md5.hashStr(password) : password,
    //     })
    //         .then((res) => {
    //             const data = res.data
    //             if (typeof data === 'object') {
    //                 const userLoginInfo = data as UserLoginInfo
    //                 // localStorageWrite(localStorageKey.userInfoKey, userLoginInfo.member)
    //                 // localStorageWrite(localStorageKey.userTokenKey, userLoginInfo.token)
    //             }
    //             resolve('登录成功')
    //         })
    //         .catch(reject)
    // })
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
 * 忘记密码/找回密码
 * @param mobile 手机号
 * @param verifyCode 验证码
 * @param password 密码
 * @returns
 */
function forget(parameters: FotgetParameters) {
    return new Promise<string>((resolve, reject) => {
        http.post('/member/forget', {
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

export { login, sendSMS, forget }
