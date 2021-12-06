<!--
 * @Author: your name
 * @Date: 2021-11-10 10:07:23
 * @LastEditTime: 2021-12-06 17:09:16
 * @LastEditors: matiastang
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/views/web/interfaceInfo/InterfaceInfo.vue
-->
<template>
    <div class="interface-info borderBox flexRowCenter">
        <div class="info-left borderBox">
            <InfoList
                class="left-list"
                v-if="interfaceTree.tree.length > 0"
                :data="interfaceTree.tree"
                :selectedId="selectApiId"
                @select="selectApiAction"
            />
            <el-skeleton v-else class="left-list-skeleton" :rows="20" animated />
        </div>
        <div class="info-right flexColumnCenter">
            <InfoCell
                class="right-base"
                :url="getApiInfoData.data.apiIconUrl"
                :title="getApiInfoData.data.apiName"
                :text="getApiInfoData.data.apiDescribe"
                :id="getApiInfoData.data.apiInfoId"
                :code="getApiInfoData.data.apiCode"
                :price="getApiInfoData.data.apiPrice"
            />
            <div class="right-bottom borderBox flexRowCenter">
                <el-tabs class="right-tabs" v-model="activeName">
                    <el-tab-pane class="right-tab right-info" label="接口信息" name="info">
                        <FoldInfo class="tab-info-fold" :show="true" title="基本信息">
                            <div class="base-info-fold borderBox flexColumnCenter">
                                <div class="base-info-item flexRowCenter">
                                    <div class="base-info-item-title defaultFont">接口地址:</div>
                                    <div
                                        v-if="getApiInfoData.data.apiAddress"
                                        class="base-info-item-text defaultFont"
                                    >
                                        {{ getApiInfoData.data.apiAddress }}
                                    </div>
                                    <el-skeleton v-else>
                                        <template #template>
                                            <el-skeleton-item variant="p" />
                                        </template>
                                    </el-skeleton>
                                </div>
                                <div class="base-info-item flexRowCenter">
                                    <div class="base-info-item-title defaultFont">请求方式:</div>
                                    <div
                                        v-if="getApiInfoData.data.requestMethod"
                                        class="base-info-item-text defaultFont"
                                    >
                                        {{ getApiInfoData.data.requestMethod }}
                                    </div>
                                    <el-skeleton v-else>
                                        <template #template>
                                            <el-skeleton-item variant="p" />
                                        </template>
                                    </el-skeleton>
                                </div>
                                <div class="base-info-item flexRowCenter">
                                    <div class="base-info-item-title defaultFont">返回格式:</div>
                                    <div
                                        v-if="getApiInfoData.data.returnFormat"
                                        class="base-info-item-text defaultFont"
                                    >
                                        {{ getApiInfoData.data.returnFormat }}
                                    </div>
                                    <el-skeleton v-else>
                                        <template #template>
                                            <el-skeleton-item variant="p" />
                                        </template>
                                    </el-skeleton>
                                </div>
                                <div class="base-info-item flexRowCenter">
                                    <div class="base-info-item-title defaultFont">请求示例:</div>
                                    <div
                                        v-if="getApiInfoData.data.apiDocAddress"
                                        class="base-info-item-text base-info-item-url defaultFont"
                                    >
                                        {{ getApiInfoData.data.apiDocAddress }}
                                    </div>
                                    <el-skeleton v-else>
                                        <template #template>
                                            <el-skeleton-item variant="p" />
                                        </template>
                                    </el-skeleton>
                                </div>
                            </div>
                        </FoldInfo>
                        <FoldInfo class="tab-info-fold" :show="true" title="请求参数">
                            <el-skeleton
                                v-if="!getApiInfoData.data.apiInfoId"
                                :rows="5"
                                animated
                                style="padding: 12px; box-sizing: border-box"
                            />
                            <div
                                v-else-if="
                                    Array.isArray(getApiInfoData.data.apiParamList) &&
                                    getApiInfoData.data.apiParamList.length > 0
                                "
                                class="base-info-parameter borderBox flexRowCenter"
                            >
                                <InfoTable
                                    :header="tableHeader"
                                    :data="
                                        getApiInfoData.data.apiParamList.sort(
                                            (left, right) => left.paramId - right.paramId
                                        )
                                    "
                                />
                            </div>
                            <div v-else class="base-info-parameter borderBox flexRowCenter">无</div>
                        </FoldInfo>
                        <FoldInfo class="tab-info-fold" :show="true" title="返回结果">
                            <div class="base-info-result borderBox flexColumnCenter">
                                <div class="base-info-item-title defaultFont">JSON示例:</div>
                                <JsonView
                                    v-if="returnResult"
                                    class="base-info-item-text"
                                    :data="returnResult"
                                />
                                <el-skeleton
                                    v-else
                                    :rows="5"
                                    animated
                                    style="padding: 12px; box-sizing: border-box"
                                />
                            </div>
                        </FoldInfo>
                    </el-tab-pane>
                    <el-tab-pane class="right-tab right-error" label="错误代码" name="error">
                        <InfoTable :header="errorTableHeader" :data="errorTableData" />
                    </el-tab-pane>
                    <el-tab-pane class="right-tab right-sample" label="示例代码" name="sample">
                        <!-- <pre>
                            {{ requestExample }}
                        </pre> -->
                        <RequestExample />
                        <!-- <JsonView
                            v-if="requestExample"
                            class="base-info-item-text"
                            :data="requestExample"
                        />
                        <el-skeleton
                            v-else
                            :rows="5"
                            animated
                            style="padding: 12px; box-sizing: border-box"
                        /> -->
                    </el-tab-pane>
                    <!-- <el-tab-pane class="right-tab right-document" label="接口文档" name="document">
                        <div class="text">接口文档功能开发中</div>
                    </el-tab-pane>
                    <el-tab-pane class="right-tab right-version" label="升级版本" name="version">
                        <div class="text">升级版本功能开发中</div>
                    </el-tab-pane> -->
                </el-tabs>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watch, watchEffect, watchSyncEffect, computed } from 'vue'
import { useRoute } from 'vue-router'
import JsonView from 'vue3-json-view/src'
import InfoCell from './components/infoCell/InfoCell.vue'
import InfoTable from './components/infoTable/InfoTable.vue'
import InfoList from './components/infoList/InfoList.vue'
import FoldInfo from '@/components/foldInfo/FoldInfo.vue'
// import { ElMessage } from 'element-plus'
import { homeInterfaceTree } from '@/common/request/modules/home/home'
import { HotType, ApiInfoType } from '@/common/request/modules/home/homeInterface'
import { detailCategoryList, detailInterfaceInfo } from '@/common/request/modules/api/api'
import RequestExample from './components/requestExample/RequestExample.vue'

export default defineComponent({
    name: 'InterfaceInfo',
    setup() {
        const route = useRoute()
        // 接口列表树
        const interfaceTree = reactive({
            tree: Array<HotType>(),
        })
        watchSyncEffect(async () => {
            // interfaceTree.tree = await homeInterfaceTree()
            interfaceTree.tree = await detailCategoryList()
        })
        // 选择了api
        const selectApiId = ref(0)
        watch(
            () => route.params.id,
            (newId, oldId) => {
                try {
                    selectApiId.value = Number(newId)
                } catch (error) {
                    selectApiId.value = 1
                }
            }
        )
        try {
            selectApiId.value = Number(route.params.id)
        } catch (error) {
            selectApiId.value = 1
        }
        // watchEffect(() => {
        //     const id = route.params.id
        //     if (id) {
        //         selectApiId.value = Number(route.params.id)
        //         console.log(`selectApiId=${selectApiId.value}`)
        //         return
        //     }
        //     selectApiId.value = 1
        // })
        // 选择的api信息
        // const getApiInfo = computed(() => {
        //     const apiTree = interfaceTree.tree
        //     for (let i = 0; i < apiTree.length; i++) {
        //         const item = apiTree[i]
        //         if (item.categoryType === 1) {
        //             const apiList = item.apiInfoList
        //             for (let j = 0; j < apiList.length; j++) {
        //                 if (apiList[j].apiInfoId === selectApiId.value) {
        //                     return apiList[j]
        //                 }
        //             }
        //         } else {
        //             const children = item.children
        //             if (children) {
        //                 console.log(children)
        //                 for (let j = 0; j < children.length; j++) {
        //                     const childrenItem = children[j]
        //                     if (childrenItem.categoryType === 1) {
        //                         const apiList = childrenItem.apiInfoList
        //                         for (let k = 0; k < apiList.length; k++) {
        //                             if (apiList[k].apiInfoId === selectApiId.value) {
        //                                 return apiList[k]
        //                             }
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //     }
        //     console.log('未查询到接口')
        //     return null
        // })
        const getApiInfoData = reactive({
            data: {} as ApiInfoType,
        })
        watchSyncEffect(async () => {
            if (selectApiId.value <= 0) {
                return
            }
            getApiInfoData.data = await detailInterfaceInfo(selectApiId.value)
        })
        // 返回json
        const returnResult = computed(() => {
            const res = getApiInfoData.data.returnResult
            if (!res || res === '') {
                return {} as object
            }
            try {
                return JSON.parse(res)
            } catch (error) {
                return {} as object
            }
        })
        // 切换选择
        const selectApiAction = (id: number) => {
            selectApiId.value = id
        }
        let activeName = ref('info')
        let tableHeader = reactive([
            {
                title: '参数',
                key: 'paramKey',
            },
            {
                title: '必选',
                key: 'paramIsRequired',
            },
            {
                title: '类型及范围',
                key: 'paramTypeRange',
            },
            {
                title: '说明',
                key: 'paramExplain',
            },
        ])
        // 错误代码
        const errorTableHeader = reactive([
            {
                title: '错误代码',
                key: 'key',
            },
            {
                title: '说明',
                key: 'value',
            },
        ])
        const errorTableData = reactive([
            {
                key: '0000',
                value: '查询成功',
            },
            {
                key: '1001',
                value: '查询无结果',
            },
            {
                key: '1002',
                value: '查询参数错误',
            },
            {
                key: '1003',
                value: '请求数据的条目数超过上限（5000）',
            },
            {
                key: '1004',
                value: '无权限访问此api',
            },
            {
                key: '1005',
                value: 'TOKEN无效',
            },
            {
                key: '1006',
                value: '账号异常',
            },
            {
                key: '1007',
                value: '访问频率过快',
            },
            {
                key: '1008',
                value: '余额不足',
            },
            {
                key: '1009',
                value: '剩余次数不足',
            },
            {
                key: '1010',
                value: '请求超过每日调用总量限制',
            },
            {
                key: '1011',
                value: '账号信息有误',
            },
            {
                key: '1012',
                value: 'URL不存在',
            },
            {
                key: '1013',
                value: '此IP已被禁用',
            },
        ])
        // 返回json
        const requestExample = computed(() => {
            const res = getApiInfoData.data.requestExample
            return res
            // console.log(res)
            // if (!res || res === '') {
            //     return {} as object
            // }
            // try {
            //     return JSON.parse(res)
            // } catch (error) {
            //     console.log(error)
            //     return {} as object
            // }
        })
        return {
            interfaceTree,
            getApiInfoData,
            selectApiId,
            selectApiAction,
            activeName,
            tableHeader,
            returnResult,
            errorTableHeader,
            errorTableData,
            requestExample,
        }
    },
    components: {
        InfoCell,
        FoldInfo,
        InfoTable,
        JsonView,
        InfoList,
        RequestExample,
    },
})
</script>

<style lang="scss" scoped>
.interface-info {
    position: relative;
    padding: 20px calc(50% - 712px) 60px calc(50% - 712px);
    align-items: flex-start;
    .info-left {
        width: 24.7%;
        background: $themeBgColor;
        .left-list {
            width: 100%;
        }
        .left-list-skeleton {
            width: 100%;
            box-sizing: border-box;
            padding: 12px;
        }
    }
    .info-right {
        width: 75.3%;
        padding-left: 16px;
        .right-base {
            width: 100%;
        }
        .right-bottom {
            width: 100%;
            margin-top: 20px;
            background: $themeBgColor;
            padding: 24px;
            .right-tabs {
                width: 100%;
                .right-tab {
                    width: 100%;
                    .text {
                        width: 100%;
                        text-align: center;
                    }
                }
                .right-info {
                    .tab-info-fold {
                        margin-top: 32px;
                    }
                    .base-info-fold {
                        width: 100%;
                        padding: 12px 36px;
                        justify-content: flex-start;
                        .base-info-item {
                            width: 100%;
                            justify-content: flex-start;
                            align-items: center;
                            margin-bottom: 12px;
                            .base-info-item-title {
                                font-size: 14px;
                                color: $titleColor;
                                line-height: 20px;
                                margin-right: 12px;
                                flex-shrink: 0;
                            }
                            .base-info-item-text {
                                font-size: 14px;
                                color: #595959;
                                line-height: 20px;
                            }
                            .base-info-item-url {
                                color: #4e9aeb;
                            }
                        }
                    }
                    .base-info-parameter {
                        width: 100%;
                        padding: 24px 36px;
                    }
                    .base-info-result {
                        width: 100%;
                        padding: 12px 36px;
                        justify-content: flex-start;
                        align-items: flex-start;
                        .base-info-item-title {
                            font-size: 14px;
                            color: $titleColor;
                            line-height: 20px;
                            margin-right: 12px;
                        }
                        .base-info-item-text {
                            font-size: 14px;
                            color: #595959;
                            line-height: 20px;
                        }
                    }
                }
                ::v-deep(.el-tabs__item) {
                    height: 36px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    letter-spacing: 1px;
                    font-size: 18px;
                    color: $titleColor;
                    line-height: 26px;
                }
                ::v-deep(.is-active) {
                    font-weight: 500 !important;
                    color: $themeColor !important;
                }
                ::v-deep(.el-tabs__active-bar) {
                    background: $themeColor;
                }
            }
        }
    }
}
@media screen and (max-width: 1500px) {
    .interface-info {
        padding: 20px 30px 60px 30px;
    }
}
</style>
