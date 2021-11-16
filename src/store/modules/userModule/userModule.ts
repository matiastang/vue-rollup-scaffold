/*
 * @Author: matiastang
 * @Date: 2021-11-12 13:49:53
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-16 17:49:27
 * @FilePath: /datumwealth-openalpha-front/src/store/modules/userModule/userModule.ts
 * @Description: 用户状态管理
 */
import { Module } from 'vuex'
import { RootStateTypes } from 'store/indexInterface'
import { UserModuleTypes } from './userInterface'
import { UserInfo } from '@/user'
import { UserLoginInfo } from '@/user'
import { LoginParameters } from '@/common/request/modules/userInterface'
import { login } from '@/common/request/modules/user'
import { localStorageKey, localStorageWrite, localStorageRemove } from 'utils/storage/localStorage'

/**
 * UserModule
 */
const UserModule: Module<UserModuleTypes, RootStateTypes> = {
    state: {
        name: 'user module',
        userLoginInfo: {
            member: {
                // 密钥key
                appKey: null,
                // 密钥
                appSecret: null,
                // 头像
                avatar: null,
                // 认证状态：0-未认证 1-认证成功 2-认证不通过
                certStatus: null,
                // 验证码
                code: null,
                // 公司名称
                company: null,
                // 创建时间
                createTime: null,
                // 所在部门
                dept: null,
                // 邮箱
                email: null,
                // 认证到期时间
                expireDate: null,
                // 用户id
                id: null,
                // 身份证号
                idNumber: null,
                // 是否限流：0=否 1=是
                isLimiting: null,
                // 法人
                legalPerson: null,
                // 限流数量
                linitingNumber: null,
                // 手机号
                phone: null,
                // 真实姓名
                realName: null,
                // 备注
                remark: null,
                // 状态：0=正常 1=禁用
                status: null,
                // 统一社会征信代码
                unifiedCreditCode: null,
                // 修改时间
                updateTime: null,
                // 用户名称
                userName: null,
                // 用户类型: 1-个人 2-企业
                userType: null,
            },
            token: null,
        },
    },
    getters: {},
    mutations: {
        /**
         * 设置邮箱
         * @param state
         * @param email
         */
        setEmail(state, email: string) {
            state.userLoginInfo.member.email = email
        },
        /**
         * 设置phone
         * @param state
         * @param phone
         */
        setPhone(state, phone: string) {
            state.userLoginInfo.member.phone = phone
        },
        /**
         * 设置token
         * @param state
         * @param token
         */
        setToken(state, token: string | null) {
            if (token) {
                localStorageWrite(localStorageKey.userTokenKey, token)
            } else {
                localStorageRemove(localStorageKey.userTokenKey)
            }
            state.userLoginInfo.token = token
        },
        /**
         * 设置用户信息
         * @param state
         * @param info
         */
        setUserLoginInfo(state, info: UserInfo | null) {
            if (info) {
                state.userLoginInfo.member = info
            } else {
                state.userLoginInfo.member = {
                    appKey: null,
                    appSecret: null,
                    avatar: null,
                    certStatus: null,
                    code: null,
                    company: null,
                    createTime: null,
                    dept: null,
                    email: null,
                    expireDate: null,
                    id: null,
                    idNumber: null,
                    isLimiting: null,
                    legalPerson: null,
                    linitingNumber: null,
                    phone: null,
                    realName: null,
                    remark: null,
                    status: null,
                    unifiedCreditCode: null,
                    updateTime: null,
                    userName: null,
                    userType: null,
                }
            }
        },
    },
    actions: {
        /**
         * 校验session
         */
        userLogin({ commit }, parameters: LoginParameters) {
            return new Promise<string>((resolve, reject) => {
                login(parameters)
                    .then((res) => {
                        const data = res.data
                        if (typeof data === 'object') {
                            const userLoginInfo = data as UserLoginInfo
                            commit('setUserLoginInfo', userLoginInfo.member)
                            commit('setToken', userLoginInfo.token)
                        }
                        resolve('登录成功')
                    })
                    .catch(reject)
            })
        },
    },
}
export default UserModule
