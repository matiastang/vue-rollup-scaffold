/*
 * @Author: matiastang
 * @Date: 2021-11-12 13:49:53
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-12 18:01:42
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
            },
            token: null,
        },
    },
    getters: {},
    mutations: {
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
