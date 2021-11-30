<!--
 * @Author: your name
 * @Date: 2021-11-10 10:19:32
 * @LastEditTime: 2021-11-30 16:31:43
 * @LastEditors: matiastang
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/views/web/interfaceCall/InterfaceCall.vue
-->
<template>
    <div class="interface-call borderBox flexColumnCenter">
        <div class="call-top borderBox flexRowCenter">
            <div class="call-top-type defaultFont">订单类型:</div>
            <el-select class="token-type-select" v-model="selectTokenType" placeholder="请选择">
                <el-option
                    v-for="item in selectOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
            </el-select>
            <div class="call-top-token-title defaultFont">API KEY:</div>
            <div v-if="appSecret" class="call-top-token defaultFont">{{ appSecret }}</div>
        </div>
        <div class="call-bottom borderBox flexRowCenter">
            <div class="call-bottom-left borderBox">
                <InfoList
                    class="left-list"
                    v-if="interfaceTree.tree.length > 0"
                    :data="interfaceTree.tree"
                    :selectedId="selectApiId"
                    @select="selectApiAction"
                />
                <el-skeleton v-else class="left-list-skeleton" :rows="20" animated />
            </div>
            <div class="call-bottom-right borderBox flexRowCenter">
                <div class="call-bottom-right-content">
                    <div class="bottom-right-header-title defaultFont">接口测试</div>
                    <div class="bottom-right-content borderBox flexRowCenter">
                        <div class="bottom-right-parameters borderBox flexColumnCenter">
                            <div class="parameters-item flexRowCenter">
                                <div class="parameters-item-title defaultFont">接口名称:</div>
                                <div v-if="getApiInfo" class="parameters-item-text defaultFont">
                                    {{ getApiInfo.apiName }}
                                </div>
                                <el-skeleton v-else style="padding-right: 12px">
                                    <template #template>
                                        <el-skeleton-item variant="p" />
                                    </template>
                                </el-skeleton>
                            </div>
                            <div class="parameters-item flexRowCenter">
                                <div class="parameters-item-title defaultFont">接口code:</div>
                                <div v-if="getApiInfo" class="parameters-item-text defaultFont">
                                    {{ getApiInfo.apiCode }}
                                </div>
                                <el-skeleton v-else style="padding-right: 12px">
                                    <template #template>
                                        <el-skeleton-item variant="p" />
                                    </template>
                                </el-skeleton>
                            </div>
                            <div class="parameters-item flexRowCenter">
                                <div class="parameters-item-title defaultFont">请求方式:</div>
                                <div v-if="getApiInfo" class="parameters-item-text defaultFont">
                                    {{ getApiInfo.requestMethod }}
                                </div>
                                <el-skeleton v-else style="padding-right: 12px">
                                    <template #template>
                                        <el-skeleton-item variant="p" />
                                    </template>
                                </el-skeleton>
                            </div>
                            <div class="parameters-item flexRowCenter">
                                <div class="parameters-item-title defaultFont">返回格式:</div>
                                <div v-if="getApiInfo" class="parameters-item-text defaultFont">
                                    {{ getApiInfo.returnFormat }}
                                </div>
                                <el-skeleton v-else style="padding-right: 12px">
                                    <template #template>
                                        <el-skeleton-item variant="p" />
                                    </template>
                                </el-skeleton>
                            </div>
                            <div
                                v-if="getApiInfo && getApiInfo.apiParamList.length > 0"
                                class="parameters-content"
                            >
                                <div class="parameters-title borderBox defaultFont">API参数:</div>
                                <div class="parameters-list-content borderBox flexRowCenter">
                                    <div class="parameters-key-content borderBox flexColumnCenter">
                                        <div
                                            v-for="item in getApiInfo.apiParamList.sort(
                                                (left, right) => left.paramId - right.paramId
                                            )"
                                            :key="item.paramKey"
                                            class="
                                                parameters-item-key-content
                                                borderBox
                                                flexRowCenter
                                            "
                                        >
                                            <div
                                                v-show="item.paramIsRequired === 1"
                                                class="parameters-item-must defaultFont"
                                            >
                                                *
                                            </div>
                                            <div class="parameters-item-key defaultFont">
                                                {{ `${item.paramKey}:` }}
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="parameters-input-content borderBox flexColumnCenter"
                                    >
                                        <el-input
                                            v-for="item in getApiInfo.apiParamList.sort(
                                                (left, right) => left.paramId - right.paramId
                                            )"
                                            :key="item.paramKey"
                                            class="parameters-item-input defaultFont"
                                            v-model="item.paramValue"
                                            :placeholder="`请输入${item.paramKey}`"
                                            clearable
                                        />
                                    </div>
                                </div>
                                <!-- <div
                                    v-for="item in getApiInfo.apiParamList.sort(
                                        (left, right) => left.paramId - right.paramId
                                    )"
                                    :key="item.paramKey"
                                    class="parameters-input-item borderBox flexRowCenter"
                                >
                                    <div
                                        class="parameters-item-key-content borderBox flexRowCenter"
                                    >
                                        <div
                                            v-show="item.paramIsRequired === 1"
                                            class="parameters-item-must defaultFont"
                                        >
                                            *
                                        </div>
                                        <div class="parameters-item-key defaultFont">
                                            {{ item.paramKey }}
                                        </div>
                                    </div>

                                    <el-input
                                        class="parameters-item-input defaultFont"
                                        v-model="item.paramValue"
                                        :placeholder="`请输入${item.paramKey}`"
                                        clearable
                                    />
                                </div> -->
                            </div>
                            <el-button
                                v-if="getApiInfo"
                                type="primary"
                                :loading="testLoading"
                                class="apply-trial-button borderBox defaultFont"
                                @click="apiCallAction"
                                >调用接口</el-button
                            >
                        </div>
                        <div class="bottom-right-json borderBox flexColumnCenter">
                            <div class="json-content borderBox flexColumnCenter">
                                <div class="json-title defaultFont">请求内容:</div>
                                <div v-if="getApiInfo" class="request-json">
                                    <JsonView class="request-json" :data="requestJson" />
                                </div>
                                <el-skeleton
                                    v-else
                                    :rows="5"
                                    animated
                                    style="padding: 12px; box-sizing: border-box"
                                />
                            </div>
                            <div
                                class="json-content borderBox flexColumnCenter"
                                style="margin-top: 42px"
                            >
                                <div class="json-title defaultFont">返回内容:</div>
                                <JsonView
                                    v-if="getApiInfo"
                                    class="result-json"
                                    :data="resultJson.result"
                                />
                                <el-skeleton
                                    v-else
                                    :rows="5"
                                    animated
                                    style="padding: 12px; box-sizing: border-box"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <LoginModel v-model="loginDialogVisible" @login="loginAction" />
        <OpenalphaModel
            v-model="authenticationDialogVisible"
            title="您还未实名认证，无法申请试用套餐"
            okText="立即认证"
            :hiddenCancel="true"
            @okAction="authenticationOkAction"
        />
        <OpenalphaModel
            v-model="buyDialogVisible"
            title="您的优惠套餐已过期，请重新购买"
            okText="立即购买"
            :hiddenCancel="true"
            @okAction="discountOkAction"
        />
        <OpenalphaModel
            v-model="overdueDialogVisible"
            title="您已经申请过试用套餐，不能再次申请"
            okText="立即充值"
            cancelText="购买套餐"
            @okAction="overdueOkAction"
            @cancelAction="overdueCancelAction"
        />
        <OpenalphaModel
            v-model="nsfDialogVisible"
            title="您的账户余额不足，请先充值"
            okText="立即充值"
            cancelText="申请试用"
            :cancelStyle="{ color: '#8C8C8C', border: '1px solid #8C8C8C', background: 'white' }"
            @okAction="rechargeOkAction"
            @cancelAction="rechargeCancelAction"
        />
        <ApplyTrialModel
            v-model="applyTrialDialogVisible"
            :name="userName"
            :phone="userPhone"
            :email="userEmail"
            @okAction="applyTrialOkAction"
            @cancelAction="applyTrialCancelAction"
        />
        <InterfaceAffix v-if="isApplyTry === 0" @click="showApplyTrialModel" />
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, computed, watchEffect, watchSyncEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import JsonView from 'vue3-json-view/src'
import InfoList from '../interfaceInfo/components/infoList/InfoList.vue'
import InterfaceAffix from '@/components/interfaceAffix/InterfaceAffix.vue'
import ApplyTrialModel from '@/components/applyTrialModel/ApplyTrialModel.vue'
import { ElMessage } from 'element-plus'
import { checkAvailable } from '@/common/request/modules/user/user'
import { homeInterfaceTree } from '@/common/request/modules/home/home'
import { apiTool } from '@/common/request/modules/api/api'
import { HotType, ApiParamType } from '@/common/request/modules/home/homeInterface'
import { useStore } from 'store/index'
import { localStorageKey, localStorageRead } from 'utils/storage/localStorage'
import { addOd, orderType } from '@/common/request/modules/pay/pay'

export default defineComponent({
    name: 'InterfaceCall',
    setup() {
        const store = useStore()
        const route = useRoute()
        const router = useRouter()
        const appSecret = computed(() => store.state.userModule.userLoginInfo.member.appSecret)
        const certStatus = computed(() => store.state.userModule.userLoginInfo.member.certStatus)
        const userName = computed(() => store.state.userModule.userLoginInfo.member.realName)
        const userPhone = computed(() => store.state.userModule.userLoginInfo.member.phone)
        const userEmail = computed(() => store.state.userModule.userLoginInfo.member.email)
        const isApplyTry = computed(() => store.state.userModule.userLoginInfo.member.isApplyTry)
        // 接口列表树
        const interfaceTree = reactive({
            tree: Array<HotType>(),
        })
        watchSyncEffect(async () => {
            interfaceTree.tree = await homeInterfaceTree()
        })
        // 返回类型
        const resultJson = reactive({
            result: {} as { res: any } | { err: any },
        })
        // 选择了api
        const selectApiId = ref(1)
        watchEffect(() => {
            resultJson.result = { res: {} }
            if (route.params.id) {
                selectApiId.value = Number(route.params.id)
                return
            }
            selectApiId.value = 1
        })
        // 选择的api信息
        const getApiInfo = computed(() => {
            const apiTree = interfaceTree.tree
            for (let i = 0; i < apiTree.length; i++) {
                const item = apiTree[i]
                if (item.categoryType === 1) {
                    const apiList = item.apiInfoList
                    for (let j = 0; j < apiList.length; j++) {
                        if (apiList[j].apiInfoId === selectApiId.value) {
                            return apiList[j]
                        }
                    }
                } else {
                    const children = item.children
                    if (children) {
                        for (let j = 0; j < children.length; j++) {
                            const element = children[j]
                            if (element.categoryType === 1) {
                                const apiList = element.apiInfoList
                                for (let k = 0; k < apiList.length; k++) {
                                    if (apiList[k].apiInfoId === selectApiId.value) {
                                        return apiList[k]
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return null
        })
        // 切换选择
        const selectApiAction = (id: number) => {
            selectApiId.value = id
        }
        // 请求参数
        const requestJson = computed(() => {
            let json = Object.create(null)
            const info = getApiInfo.value
            if (info) {
                for (let i = 0; i < info.apiParamList.length; i++) {
                    const item = info.apiParamList[i]
                    if (item.paramValue) {
                        json[item.paramKey] = item.paramValue
                    }
                }
            }
            return json
        })

        // token选择
        const selectOptions = reactive([
            {
                value: 0,
                label: '充值调用',
            },
            {
                value: 1,
                label: '优惠调用',
            },
        ])
        const selectTokenType = ref(0)
        const loginDialogVisible = ref(false)
        const loginAction = () => {
            loginDialogVisible.value = false
        }
        const authenticationDialogVisible = ref(false)
        const authenticationOkAction = () => {
            router.push({
                path: '/user/account/certification',
            })
        }
        const buyDialogVisible = ref(false)
        const discountOkAction = () => {
            buyDialogVisible.value = false
            router.push({
                path: '/discount',
            })
        }
        const overdueDialogVisible = ref(false)
        const overdueOkAction = () => {
            overdueDialogVisible.value = false
            router.push({
                path: '/recharge',
            })
        }
        const overdueCancelAction = () => {
            overdueDialogVisible.value = false
            router.push({
                path: '/discount',
            })
        }
        const nsfDialogVisible = ref(false)
        const rechargeOkAction = () => {
            nsfDialogVisible.value = false
            router.push({
                path: '/recharge',
            })
        }
        const rechargeCancelAction = () => {
            nsfDialogVisible.value = false
            if (isApplyTry.value === 1) {
                overdueDialogVisible.value = true
                return
            }
            // 申请试用
            addOd({
                goodsAmount: 0,
                orderType: orderType.test,
                payId: 0,
            })
                .then((oreder) => {
                    ElMessage({
                        message: '试用申请成功',
                        type: 'success',
                    })
                    store.commit('setApplyTry', 1)
                })
                .catch((err) => {
                    ElMessage({
                        message: err.msg || '接口id错误',
                        type: 'error',
                    })
                })
        }
        // 申请接口试用
        const applyTrialDialogVisible = ref(false)
        const showApplyTrialModel = () => {
            applyTrialDialogVisible.value = true
        }
        const applyTrialOkAction = () => {
            applyTrialDialogVisible.value = false
        }
        const applyTrialCancelAction = () => {
            applyTrialDialogVisible.value = false
            router.push({
                path: '/user/account/setting',
            })
        }
        /**
         * 拼接测试请求参数
         */
        const getRequestParams = () => {
            let params = ''
            const obj = requestJson.value
            for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    if (params === '') {
                        params += `${key}=${obj[key]}`
                    } else {
                        params += `&${key}=${obj[key]}`
                    }
                }
            }
            return params
        }
        /**
         * 校验必填参数是否传递
         */
        const checkParams = (paramList: ApiParamType[]) => {
            const obj = requestJson.value
            for (let i = 0; i < paramList.length; i++) {
                const item = paramList[i]
                if (item.paramIsRequired === 1) {
                    const paramValue = obj[item.paramKey]
                    if (!paramValue) {
                        return false
                    }
                }
            }
            return true
        }
        const testLoading = ref(false)
        /**
         * 测试接口
         */
        const apiTest = () => {
            const info = getApiInfo.value
            if (info) {
                if (!checkParams(info.apiParamList)) {
                    ElMessage({
                        message: '必填参数项为空',
                        type: 'error',
                    })
                    return
                }
                testLoading.value = true
                apiTool({
                    apiCode: info.apiCode,
                    apiVersion: 'v1',
                    requestParams: getRequestParams(),
                    requestType: info.requestMethod,
                    requestUrl: info.apiAddress,
                    billingMethod: selectTokenType.value === 0 ? '1' : '2',
                })
                    .then((res: any) => {
                        resultJson.result = {
                            res,
                        }
                    })
                    .catch((err: any) => {
                        resultJson.result = {
                            err,
                        }
                    })
                    .finally(() => {
                        testLoading.value = false
                    })
                return
            }
            ElMessage({
                message: '接口信息错误',
                type: 'error',
            })
        }
        /**
         * 接口试用
         */
        const apiCallAction = () => {
            // 用户token
            const userToken = localStorageRead<string>(localStorageKey.userTokenKey)
            if (!userToken || userToken.trim() === '') {
                // 未登录
                loginDialogVisible.value = true
                return
            }
            // 实名认证
            if (certStatus.value !== 1) {
                authenticationDialogVisible.value = true
                return
            }
            checkAvailable(selectTokenType.value + 1)
                .then((can: boolean) => {
                    if (!can) {
                        if (selectTokenType.value === 0) {
                            nsfDialogVisible.value = true
                        }
                        if (selectTokenType.value === 1) {
                            buyDialogVisible.value = true
                        }
                        return
                    }
                    apiTest()
                })
                .catch((err: any) => {
                    ElMessage({
                        message: err.msg || '调用接口校验错误',
                        type: 'error',
                    })
                })
        }
        return {
            appSecret,
            interfaceTree,
            getApiInfo,
            selectApiId,
            selectApiAction,
            requestJson,
            resultJson,
            selectOptions,
            selectTokenType,
            applyTrialOkAction,
            applyTrialCancelAction,
            apiCallAction,
            loginDialogVisible,
            loginAction,
            authenticationDialogVisible,
            authenticationOkAction,
            buyDialogVisible,
            discountOkAction,
            overdueDialogVisible,
            overdueOkAction,
            overdueCancelAction,
            nsfDialogVisible,
            rechargeOkAction,
            rechargeCancelAction,
            userName,
            userPhone,
            userEmail,
            applyTrialDialogVisible,
            showApplyTrialModel,
            isApplyTry,
            testLoading,
        }
    },
    components: {
        InfoList,
        InterfaceAffix,
        ApplyTrialModel,
        JsonView,
    },
})
</script>

<style lang="scss" scoped>
.interface-call {
    position: relative;
    padding: 20px calc(50% - 712px) 60px calc(50% - 712px);
    align-items: flex-start;
    .call-top {
        width: 100%;
        height: 90px;
        background: $themeBgColor;
        box-shadow: 0px 2px 6px 0px rgba(218, 218, 218, 0.5);
        margin-bottom: 20px;
        justify-content: flex-start;
        padding: 0px 16px;
        .token-type-select {
            width: 118px;
        }
        .call-top-type,
        .call-top-token-title,
        .call-top-token {
            font-size: 16px;
            color: $titleColor;
            line-height: 24px;
            margin-right: 12px;
        }
        .call-top-token-title {
            margin-left: 36px;
        }
    }
    .call-bottom {
        width: 100%;
        align-items: flex-start;
        .call-bottom-left {
            width: 24.7%;
            background: $themeBgColor;
            .left-list {
                width: 100%;
            }
            .left-list-skeleton {
                padding: 12px;
                box-sizing: border-box;
            }
        }
        .call-bottom-right {
            width: 75.3%;
            padding-left: 16px;
            .call-bottom-right-content {
                width: 100%;
                padding: 8px 24px 48px 24px;
                background: $themeBgColor;
                .bottom-right-header-title {
                    width: 100%;
                    height: 60px;
                    font-size: 18px;
                    color: $titleColor;
                    line-height: 60px;
                    text-align: left;
                    border-bottom: 1px solid #dfdfdf;
                }
                .bottom-right-content {
                    width: 100%;
                    align-items: stretch;
                    .bottom-right-parameters {
                        width: 50%;
                        border-right: 1px solid #dfdfdf;
                        justify-content: flex-start;
                        align-items: flex-start;
                        .parameters-item {
                            width: 100%;
                            justify-content: flex-start;
                            align-items: flex-start;
                            margin-top: 20px;
                            .parameters-item-title {
                                font-size: 16px;
                                color: #595959;
                                line-height: 24px;
                                width: 90px;
                                text-align: right;
                                margin-right: 12px;
                                flex-shrink: 0;
                            }
                            .parameters-item-text {
                                font-size: 16px;
                                color: #595959;
                                line-height: 24px;
                            }
                        }
                        .parameters-content {
                            width: 100%;
                            .parameters-input-item {
                                width: 100%;
                                justify-content: flex-start;
                                align-items: center;
                                margin-top: 20px;
                                padding-right: 24px;
                                .parameters-item-key-content {
                                    width: 100px;
                                    .parameters-item-must,
                                    .parameters-item-key {
                                        max-width: 90%;
                                        font-size: 16px;
                                        color: $titleColor;
                                        line-height: 24px;
                                        margin-right: 8px;
                                    }
                                    .parameters-item-must {
                                        max-width: 10%;
                                        color: $themeColor;
                                    }
                                }
                                .parameters-item-input {
                                    flex-shrink: 0;
                                    width: calc(100% - 100px);
                                }
                            }
                            .parameters-title {
                                width: 100%;
                                padding-left: 18px;
                                margin-top: 20px;
                                font-size: 16px;
                                color: $themeColor;
                                line-height: 24px;
                                text-align: left;
                            }
                            .parameters-list-content {
                                justify-content: space-between;
                                .parameters-key-content {
                                    flex-grow: 0;
                                    flex-shrink: 0;
                                    align-items: flex-end;
                                    .parameters-item-key-content {
                                        height: 40px;
                                        margin: 12px 0px;
                                        .parameters-item-must,
                                        .parameters-item-key {
                                            font-size: 16px;
                                            color: $titleColor;
                                            line-height: 24px;
                                            margin-right: 8px;
                                        }
                                        .parameters-item-must {
                                            color: $themeColor;
                                        }
                                    }
                                }
                                .parameters-input-content {
                                    flex-grow: 1;
                                    padding-right: 8px;
                                    .parameters-item-input {
                                        margin: 12px 0px;
                                    }
                                }
                            }
                        }
                        .apply-trial-button {
                            width: 118px;
                            height: 42px;
                            background: $themeColor;
                            border-radius: 4px;
                            font-size: 16px;
                            color: $themeBgColor;
                            margin-top: 24px;
                            align-self: flex-end;
                            margin-right: 24px;
                        }
                    }
                    .bottom-right-json {
                        width: 50%;
                        padding: 23px 23px 0px 23px;
                        .json-content {
                            width: 100%;
                            align-items: flex-start;
                            .json-title {
                                font-size: 18px;
                                color: $titleColor;
                                line-height: 25px;
                                margin-bottom: 12px;
                            }
                            ::v-deep(.json-view-container) {
                                background: #ededed;
                                padding: 0px;
                            }
                            .request-json {
                                width: 100%;
                                min-height: 160px;
                                background: #ededed;
                                border: 1px solid #dfdfdf;
                            }
                            .result-json {
                                width: 100%;
                                min-height: 360px;
                                background: #ededed;
                                border: 1px solid #dfdfdf;
                            }
                        }
                    }
                }
            }
        }
    }
}
@media screen and (max-width: 1500px) {
    .interface-call {
        padding: 20px 30px 60px 30px;
    }
}
</style>
