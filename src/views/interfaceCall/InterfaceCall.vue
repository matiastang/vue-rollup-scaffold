<!--
 * @Author: your name
 * @Date: 2021-11-10 10:19:32
 * @LastEditTime: 2021-11-10 19:37:18
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/views/interfaceCall/InterfaceCall.vue
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
            <div class="call-top-token defaultFont">{{ token }}</div>
        </div>
        <div class="call-bottom borderBox flexRowCenter">
            <div class="call-bottom-left borderBox">
                <InfoList class="left-list" :listData="interfaceData" />
            </div>
            <div class="call-bottom-right borderBox flexRowCenter">
                <div class="call-bottom-right-content">
                    <div class="bottom-right-header-title defaultFont">接口测试</div>
                    <div class="bottom-right-content borderBox flexRowCenter">
                        <div class="bottom-right-parameters borderBox flexColumnCenter">
                            <div class="parameters-item flexRowCenter">
                                <div class="parameters-item-title defaultFont">接口名称:</div>
                                <div class="parameters-item-text defaultFont">机构信息</div>
                            </div>
                            <div class="parameters-item flexRowCenter">
                                <div class="parameters-item-title defaultFont">接口ID:</div>
                                <div class="parameters-item-text defaultFont">1314</div>
                            </div>
                            <div class="parameters-item flexRowCenter">
                                <div class="parameters-item-title defaultFont">请求方式:</div>
                                <div class="parameters-item-text defaultFont">POST</div>
                            </div>
                            <div class="parameters-item flexRowCenter">
                                <div class="parameters-item-title defaultFont">返回格式:</div>
                                <div class="parameters-item-text defaultFont">JSON</div>
                            </div>
                            <div class="parameters-title borderBox defaultFont">API参数:</div>
                            <div
                                v-for="item in parametersData"
                                :key="item.key"
                                class="parameters-input-item borderBox flexRowCenter"
                            >
                                <div class="parameters-item-key-content borderBox flexRowCenter">
                                    <div
                                        v-show="item.must"
                                        class="parameters-item-must defaultFont"
                                    >
                                        *
                                    </div>
                                    <div class="parameters-item-key defaultFont">
                                        {{ item.key }}
                                    </div>
                                </div>

                                <el-input
                                    class="parameters-item-input defaultFont"
                                    v-model="item.value"
                                    :placeholder="`请输入${item.text}`"
                                />
                            </div>
                            <div
                                class="apply-trial-button borderBox defaultFont"
                                @click="showApplyTrialModel"
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
                                <JsonView class="result-json" :data="resultJson" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <InterfaceAffix @click="showApplyTrialModel" />
        <ApplyTrialModel
            v-model="applyTrialDialogVisible"
            @okAction="applyTrialOkAction"
            @cancelAction="applyTrialCancelAction"
        />
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue'
import JsonView from 'vue3-json-view/src'
import InfoList from '../interfaceInfo/components/infoList/InfoList.vue'
import InterfaceAffix from '@/components/interfaceAffix/InterfaceAffix.vue'
import ApplyTrialModel from '@/components/applyTrialModel/ApplyTrialModel.vue'
import { ElMessage } from 'element-plus'

export default defineComponent({
    name: 'InterfaceCall',
    setup() {
        let requestJson = reactive({
            result: {
                historyNames: '贵州力源液压股份有限公司;',
                cancelDate: null,
                regStatus: '存续',
            },
        })
        let resultJson = reactive({
            result: {
                historyNames: '贵州力源液压股份有限公司;',
                cancelDate: null,
                regStatus: '存续',
            },
        })
        let interfaceData = reactive([
            {
                title: '基本信息',
                count: 1,
                selected: false,
                url: 'static/header/search.png',
                data: [
                    {
                        title: '基金基本要素',
                        text: '可以通过公司名称或ID获取相关基金信息，包括私募基金管理人名称、法定代表人/执行事务合伙人、机构类型、登记编号、成立日期等字段的相关信息',
                        id: '1314',
                        price: '0.15',
                    },
                ],
            },
            {
                title: '基本信息',
                count: 2,
                selected: false,
                url: 'static/header/search.png',
                data: [
                    {
                        title: '基金基本要素',
                        text: '可以通过公司名称或ID获取相关基金信息，包括私募基金管理人名称、法定代表人/执行事务合伙人、机构类型、登记编号、成立日期等字段的相关信息',
                        id: '1314',
                        price: '0.15',
                    },
                    {
                        title: '基金基本要素',
                        text: '可以通过公司名称或ID获取相关基金信息，包括私募基金管理人名称、法定代表人/执行事务合伙人、机构类型、登记编号、成立日期等字段的相关信息',
                        id: '1314',
                        price: '0.15',
                    },
                ],
            },
            {
                title: '基本信息',
                count: 3,
                selected: false,
                url: 'static/header/search.png',
                data: [
                    {
                        title: '基金基本要素',
                        text: '可以通过公司名称或ID获取相关基金信息，包括私募基金管理人名称、法定代表人/执行事务合伙人、机构类型、登记编号、成立日期等字段的相关信息',
                        id: '1314',
                        price: '0.15',
                    },
                    {
                        title: '基金基本要素',
                        text: '可以通过公司名称或ID获取相关基金信息，包括私募基金管理人名称、法定代表人/执行事务合伙人、机构类型、登记编号、成立日期等字段的相关信息',
                        id: '1314',
                        price: '0.15',
                    },
                    {
                        title: '基金基本要素',
                        text: '可以通过公司名称或ID获取相关基金信息，包括私募基金管理人名称、法定代表人/执行事务合伙人、机构类型、登记编号、成立日期等字段的相关信息',
                        id: '1314',
                        price: '0.15',
                    },
                ],
            },
            {
                title: '基本信息',
                count: 4,
                selected: false,
                url: 'static/header/search.png',
                data: [
                    {
                        title: '基金基本要素',
                        text: '可以通过公司名称或ID获取相关基金信息，包括私募基金管理人名称、法定代表人/执行事务合伙人、机构类型、登记编号、成立日期等字段的相关信息',
                        id: '1314',
                        price: '0.15',
                    },
                    {
                        title: '基金基本要素',
                        text: '可以通过公司名称或ID获取相关基金信息，包括私募基金管理人名称、法定代表人/执行事务合伙人、机构类型、登记编号、成立日期等字段的相关信息',
                        id: '1314',
                        price: '0.15',
                    },
                    {
                        title: '基金基本要素',
                        text: '可以通过公司名称或ID获取相关基金信息，包括私募基金管理人名称、法定代表人/执行事务合伙人、机构类型、登记编号、成立日期等字段的相关信息',
                        id: '1314',
                        price: '0.15',
                    },
                    {
                        title: '基金基本要素',
                        text: '可以通过公司名称或ID获取相关基金信息，包括私募基金管理人名称、法定代表人/执行事务合伙人、机构类型、登记编号、成立日期等字段的相关信息',
                        id: '1314',
                        price: '0.15',
                    },
                ],
            },
            {
                title: '基本信息',
                count: 5,
                selected: true,
                url: 'static/header/search.png',
                data: [
                    {
                        title: '基金资产配置',
                        count: 2,
                        selected: true,
                        data: [
                            {
                                title: '基金基本要素',
                                text: '可以通过公司名称或ID获取相关基金信息，包括私募基金管理人名称、法定代表人/执行事务合伙人、机构类型、登记编号、成立日期等字段的相关信息',
                                id: '1314',
                                price: '0.15',
                            },
                            {
                                title: '基金基本要素',
                                text: '可以通过公司名称或ID获取相关基金信息，包括私募基金管理人名称、法定代表人/执行事务合伙人、机构类型、登记编号、成立日期等字段的相关信息',
                                id: '1314',
                                price: '0.15',
                            },
                        ],
                    },
                    {
                        title: '基金资产配置',
                        count: 3,
                        selected: false,
                        data: [
                            {
                                title: '基金基本要素',
                                text: '可以通过公司名称或ID获取相关基金信息，包括私募基金管理人名称、法定代表人/执行事务合伙人、机构类型、登记编号、成立日期等字段的相关信息',
                                id: '1314',
                                price: '0.15',
                            },
                            {
                                title: '基金基本要素',
                                text: '可以通过公司名称或ID获取相关基金信息，包括私募基金管理人名称、法定代表人/执行事务合伙人、机构类型、登记编号、成立日期等字段的相关信息',
                                id: '1314',
                                price: '0.15',
                            },
                            {
                                title: '基金基本要素',
                                text: '可以通过公司名称或ID获取相关基金信息，包括私募基金管理人名称、法定代表人/执行事务合伙人、机构类型、登记编号、成立日期等字段的相关信息',
                                id: '1314',
                                price: '0.15',
                            },
                        ],
                    },
                ],
            },
        ])
        // token选择
        let selectOptions = reactive([
            {
                value: 0,
                label: '充值调用',
            },
            {
                value: 1,
                label: '优惠调用',
            },
        ])
        let selectTokenType = ref(0)
        let token = computed(() =>
            selectTokenType.value === 0
                ? 'e2aef4ea-cf17-4485-b5c4-c11120197c03'
                : 'abcdefghi-cf17-4485-b5c4-c11120197c03'
        )
        // 参数信息
        let parametersData = reactive([
            {
                key: 'name',
                text: '名字',
                must: true,
                value: '',
            },
            {
                key: 'age',
                text: '年龄',
                must: false,
                value: '',
            },
        ])
        // 申请接口试用
        let applyTrialDialogVisible = ref(false)
        const showApplyTrialModel = () => {
            applyTrialDialogVisible.value = true
        }
        return {
            requestJson,
            resultJson,
            interfaceData,
            applyTrialDialogVisible,
            showApplyTrialModel,
            selectOptions,
            selectTokenType,
            token,
            parametersData,
        }
    },
    components: {
        InfoList,
        InterfaceAffix,
        ApplyTrialModel,
        JsonView,
    },
    methods: {
        applyTrialOkAction() {
            // TODO: - 校验
            ElMessage({
                message: '申请功能开发中...',
                type: 'warning',
            })
        },
        applyTrialCancelAction() {
            // TODO: - 校验
            ElMessage({
                message: '修改信息功能开发中...',
                type: 'warning',
            })
        },
        /**
         * 跳转接口试用
         */
        applyTrialAction(id: string) {
            this.$router.push({
                path: `/interface/call/${id}`,
            })
        },
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
