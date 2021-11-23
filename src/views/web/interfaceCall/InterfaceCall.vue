<!--
 * @Author: your name
 * @Date: 2021-11-10 10:19:32
 * @LastEditTime: 2021-11-23 19:27:14
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
            <div class="call-top-token-title defaultFont">token值:</div>
            <div class="call-top-token defaultFont">{{ appSecret ? appSecret : '-' }}</div>
        </div>
        <div class="call-bottom borderBox flexRowCenter">
            <div class="call-bottom-left borderBox">
                <InfoList
                    class="left-list"
                    :data="interfaceTree.tree"
                    :selectedId="selectApiId"
                    @select="selectApiAction"
                />
            </div>
            <div class="call-bottom-right borderBox flexRowCenter">
                <div class="call-bottom-right-content">
                    <div class="bottom-right-header-title defaultFont">接口测试</div>
                    <div class="bottom-right-content borderBox flexRowCenter">
                        <div class="bottom-right-parameters borderBox flexColumnCenter">
                            <div class="parameters-item flexRowCenter">
                                <div class="parameters-item-title defaultFont">接口名称:</div>
                                <div class="parameters-item-text defaultFont">
                                    {{ getApiInfo ? getApiInfo.apiName : '-' }}
                                </div>
                            </div>
                            <div class="parameters-item flexRowCenter">
                                <div class="parameters-item-title defaultFont">接口ID:</div>
                                <div class="parameters-item-text defaultFont">
                                    {{ getApiInfo ? getApiInfo.apiInfoId : '-' }}
                                </div>
                            </div>
                            <div class="parameters-item flexRowCenter">
                                <div class="parameters-item-title defaultFont">请求方式:</div>
                                <div class="parameters-item-text defaultFont">
                                    {{ getApiInfo ? getApiInfo.requestMethod : '-' }}
                                </div>
                            </div>
                            <div class="parameters-item flexRowCenter">
                                <div class="parameters-item-title defaultFont">返回格式:</div>
                                <div class="parameters-item-text defaultFont">
                                    {{ getApiInfo ? getApiInfo.returnFormat : '-' }}
                                </div>
                            </div>
                            <div
                                v-if="getApiInfo && getApiInfo.apiParamList.length > 0"
                                class="parameters-content"
                            >
                                <div class="parameters-title borderBox defaultFont">API参数:</div>
                                <div
                                    v-for="item in getApiInfo.apiParamList"
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
                                    />
                                </div>
                            </div>
                            <div
                                class="apply-trial-button borderBox defaultFont"
                                @click="apiCallAction"
                            >
                                调用接口
                            </div>
                        </div>
                        <div class="bottom-right-json borderBox flexColumnCenter">
                            <div class="json-content borderBox flexColumnCenter">
                                <div class="json-title defaultFont">请求内容:</div>
                                <div class="request-json">
                                    <JsonView class="request-json" :data="requestJson" />
                                </div>
                            </div>
                            <div
                                class="json-content borderBox flexColumnCenter"
                                style="margin-top: 42px"
                            >
                                <div class="json-title defaultFont">返回内容:</div>
                                <JsonView class="result-json" :data="resultJson.result" />
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
        <InterfaceAffix @click="showApplyTrialModel" />
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, computed, watchSyncEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import JsonView from 'vue3-json-view/src'
import InfoList from '../interfaceInfo/components/infoList/InfoList.vue'
import InterfaceAffix from '@/components/interfaceAffix/InterfaceAffix.vue'
import ApplyTrialModel from '@/components/applyTrialModel/ApplyTrialModel.vue'
import { ElMessage } from 'element-plus'
import { homeInterfaceNavigationTree } from '@/common/request/modules/home/home'
import { apiInfoCode } from '@/common/request/modules/api/api'
import { HotType } from '@/common/request/modules/home/homeInterface'
import { useStore } from 'store/index'
import { localStorageKey, localStorageRead } from 'utils/storage/localStorage'

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
        // 接口列表树
        const interfaceTree = reactive({
            tree: Array<HotType>(),
        })
        watchSyncEffect(async () => {
            interfaceTree.tree = await homeInterfaceNavigationTree()
        })
        // 选择了api
        const selectApiId = ref(Number(route.params.id))
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
                    return null
                } else {
                    const children = item.children
                    if (children) {
                        for (let j = 0; j < children.length; j++) {
                            const element = children[j]
                            if (element.categoryType === 1) {
                                const apiList = item.apiInfoList
                                for (let k = 0; k < apiList.length; k++) {
                                    if (apiList[k].apiInfoId === selectApiId.value) {
                                        return apiList[k]
                                    }
                                }
                                return null
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
                    json[item.paramKey] = item.paramValue
                }
            }
            return json
        })
        // 返回类型
        const resultJson = reactive({
            result: {} as { res: any } | { err: any },
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
            overdueDialogVisible.value = true
        }
        // 申请接口试用
        const applyTrialDialogVisible = ref(false)
        const showApplyTrialModel = () => {
            applyTrialDialogVisible.value = true
        }
        const applyTrialOkAction = () => {
            // TODO: - 校验
            ElMessage({
                message: '申请功能开发中...',
                type: 'warning',
            })
        }
        const applyTrialCancelAction = () => {
            router.push({
                path: '/user/account/setting',
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
            if (certStatus.value !== 1) {
                authenticationDialogVisible.value = true
                return
            }
            if (selectTokenType.value === 0) {
                nsfDialogVisible.value = true
                return
            }
            if (selectTokenType.value === 1) {
                buyDialogVisible.value = true
                return
            }
            const info = getApiInfo.value
            if (info) {
                apiInfoCode(info.apiCode, 'v1', requestJson)
                    .then((res) => {
                        resultJson.result = {
                            res,
                        }
                    })
                    .catch((err) => {
                        resultJson.result = {
                            err,
                        }
                    })
                return
            }
            ElMessage({
                message: '接口信息错误',
                type: 'error',
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
    padding: 20px 10% 60px 10%;
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
                        }
                        .apply-trial-button {
                            width: 118px;
                            height: 42px;
                            background: $themeColor;
                            border-radius: 4px;
                            font-size: 16px;
                            color: $themeBgColor;
                            line-height: 42px;
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
@media screen and (max-width: 1360px) {
    .interface-call {
        padding: 20px 5% 60px 5%;
    }
}
</style>
