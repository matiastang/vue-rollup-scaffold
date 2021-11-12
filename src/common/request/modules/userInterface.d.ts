/*
 * @Author: matiastang
 * @Date: 2021-11-12 15:14:50
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-12 15:18:39
 * @FilePath: /datumwealth-openalpha-front/src/common/request/modules/userInterface.d.ts
 * @Description: user 请求参数声明
 */
/**
 * 登录接口参数类型
 */
export interface LoginParameters {
    loginType: string
    username: string
    password: string
}
/**
 * 忘记密码接口参数类型
 */
export interface FotgetParameters {
    mobile: string
    verifyCode: string
    password: string
}
