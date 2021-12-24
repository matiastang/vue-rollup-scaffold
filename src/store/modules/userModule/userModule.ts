/*
 * @Author: matiastang
 * @Date: 2021-11-12 13:49:53
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-24 11:07:07
 * @FilePath: /datumwealth-openalpha-front/src/store/modules/userModule/userModule.ts
 * @Description: 用户状态管理
 */
import { Module } from 'vuex'
import { RootStateTypes } from 'store/indexInterface'
import { MbMemberAuthLogs } from '@/user'
import { UserModuleTypes, PersonalInfoTypes, EnterpriseInfoTypes } from './userInterface'
import { UserInfo } from '@/user'
// import { UserLoginInfo } from '@/user'
import { LoginParameters } from '@/common/request/modules/user/userInterface'
import { login } from '@/common/request/modules/user/user'
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
                // 扣款顺序
                deductionSequence: null,
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
                // 是否申请了试用
                isApplyTry: null,
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
                // 使用场景
                useScenario: null,
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
                // 认证对象
                mbMemberAuthLogs: null,
                // 是否绑定微信
                isBindWechat: null,
            },
            token: null,
        },
        wechatState: null,
    },
    getters: {},
    mutations: {
        /**
         * 设置是否绑定
         * @param state
         * @param value
         */
        setBindWechat(state, value: number) {
            state.userLoginInfo.member.isBindWechat = value
        },
        /**
         * 设置wechatState
         * @param state
         * @param value
         */
        setWechatState(state, value: string) {
            state.wechatState = value
        },
        /**
         * 设置扣款顺序
         * @param state
         * @param value
         */
        setDeductionSequence(state, value: string) {
            state.userLoginInfo.member.deductionSequence = value
        },
        /**
         * 设置是否试用
         * @param state
         * @param statue
         */
        setApplyTry(state, statue: number) {
            state.userLoginInfo.member.isApplyTry = statue
        },
        /**
         * 认证信息更新
         * @param state
         * @param info
         */
        setAuthInfo(state, info: MbMemberAuthLogs) {
            state.userLoginInfo.member.certStatus = info.certStatus
            if (state.userLoginInfo.member.mbMemberAuthLogs) {
                state.userLoginInfo.member.mbMemberAuthLogs.applyDate = info.applyDate
                state.userLoginInfo.member.mbMemberAuthLogs.certDate = info.certDate
                state.userLoginInfo.member.mbMemberAuthLogs.certMaterials = info.certMaterials
                state.userLoginInfo.member.mbMemberAuthLogs.certResult = info.certResult
                state.userLoginInfo.member.mbMemberAuthLogs.certStatus = info.certStatus
                state.userLoginInfo.member.mbMemberAuthLogs.expireDate = info.expireDate
                state.userLoginInfo.member.mbMemberAuthLogs.id = info.id
                state.userLoginInfo.member.mbMemberAuthLogs.useScenario = info.useScenario
                state.userLoginInfo.member.mbMemberAuthLogs.userId = info.userId
            } else {
                state.userLoginInfo.member.mbMemberAuthLogs = info
            }
        },
        /**
         * 更新个人信息
         * @param state
         * @param info
         */
        setPersonalInfo(state, info: PersonalInfoTypes) {
            state.userLoginInfo.member.email = info.email
            state.userLoginInfo.member.idNumber = info.idNumber
            state.userLoginInfo.member.realName = info.realName
            state.userLoginInfo.member.useScenario = info.useScenario
            state.userLoginInfo.member.certStatus = 3
            if (state.userLoginInfo.member.mbMemberAuthLogs) {
                state.userLoginInfo.member.mbMemberAuthLogs.certStatus = 3
            }
            state.userLoginInfo.member.userType = 1
        },
        /**
         * 更新公司信息
         * @param state
         * @param info
         */
        setEnterpriseInfo(state, info: EnterpriseInfoTypes) {
            state.userLoginInfo.member.company = info.company
            state.userLoginInfo.member.dept = info.dept
            state.userLoginInfo.member.email = info.email
            state.userLoginInfo.member.legalPerson = info.legalPerson
            state.userLoginInfo.member.useScenario = info.useScenario
            state.userLoginInfo.member.unifiedCreditCode = info.unifiedCreditCode
            state.userLoginInfo.member.certStatus = 3
            if (state.userLoginInfo.member.mbMemberAuthLogs) {
                state.userLoginInfo.member.mbMemberAuthLogs.certStatus = 3
            }
            state.userLoginInfo.member.userType = 2
        },
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
         * 设置Secret
         * @param state
         * @param token
         */
        setSecret(state, secret: string | null) {
            state.userLoginInfo.member.appSecret = secret
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
                    deductionSequence: null,
                    dept: null,
                    email: null,
                    expireDate: null,
                    id: null,
                    idNumber: null,
                    isApplyTry: null,
                    isLimiting: null,
                    legalPerson: null,
                    linitingNumber: null,
                    phone: null,
                    realName: null,
                    remark: null,
                    useScenario: null,
                    status: null,
                    unifiedCreditCode: null,
                    updateTime: null,
                    userName: null,
                    userType: null,
                    mbMemberAuthLogs: null,
                    isBindWechat: null,
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
                        commit('setUserLoginInfo', res.member)
                        commit('setToken', res.token)
                        resolve('登录成功')
                    })
                    .catch(reject)
            })
        },
    },
}
export default UserModule
