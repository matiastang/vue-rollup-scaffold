/*
 * @Author: your name
 * @Date: 2021-10-15 17:42:33
 * @LastEditTime: 2021-11-12 14:57:05
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
 * 用户信息
 */
export interface UserInfo {
    appKey: string | null
    appSecret: string | null
    avatar: string | null
    certStatus: number | null
    code: string | null
    company: string | null
    createTime: string | null // "2021-11-11T12:12:53"
    dept: string | null
    email: string | null
    expireDate: string | null
    id: number | null
    idNumber: string | null
    isLimiting: number | null
    legalPerson: string | null
    linitingNumber: number | null
    phone: string | null // "18380449615"
    realName: string | null
    remark: string | null
    status: number | null
    unifiedCreditCode: string | null
    updateTime: string | null // "2021-11-11T12:12:53"
    userName: string | null // "DW9615347653"
    userType: number | null
}

/**
 * 用户登录信息
 */
export interface UserLoginInfo {
    member: UserInfo
    token: string | null
}
