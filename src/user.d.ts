/*
 * @Author: your name
 * @Date: 2021-10-15 17:42:33
 * @LastEditTime: 2021-11-17 19:32:35
 * @LastEditors: matiastang
 * @Description: In User Settings Edit
 * @FilePath: /datumwealth-openalpha-front/src/user.d.ts
 */
/* eslint-disable */
// declare module '*.vue' {
//   import type { DefineComponent } from 'vue'
//   const component: DefineComponent<{}, {}, any>
//   export default component
// }
/**
 * 认证对象
 */
export interface MbMemberAuthLogs {
    applyDate: string | null
    certDate: string | null
    certMaterials: string | null
    certResult: string | null
    certStatus: number | null
    expireDate: string | null
    id: number | null
    useScenario: string | null
    userId: number | null
}

/**
 * 用户信息
 */
export interface UserInfo {
    appKey: string | null
    appSecret: string | null
    avatar: string | null
    certStatus: number | null
    code: string | null
    company: string | null
    createTime: string | null
    dept: string | null
    email: string | null
    expireDate: string | null
    id: number | null
    idNumber: string | null
    isLimiting: number | null
    legalPerson: string | null
    linitingNumber: number | null
    phone: string | null
    realName: string | null
    remark: string | null
    useScenario: string | null
    status: number | null
    unifiedCreditCode: string | null
    updateTime: string | null
    userName: string | null
    userType: number | null
    mbMemberAuthLogs: MbMemberAuthLogs | null
}

/**
 * 用户登录信息
 */
export interface UserLoginInfo {
    member: UserInfo
    token: string | null
}