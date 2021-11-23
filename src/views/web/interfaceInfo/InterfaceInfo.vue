<!--
 * @Author: your name
 * @Date: 2021-11-10 10:07:23
 * @LastEditTime: 2021-11-23 16:55:14
 * @LastEditors: matiastang
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/views/web/interfaceInfo/InterfaceInfo.vue
-->
<template>
    <div class="interface-info borderBox flexRowCenter">
        <div class="info-left borderBox">
            <InfoList
                class="left-list"
                :data="interfaceTree.tree"
                :selectedId="selectApiId"
                @select="selectApiAction"
            />
        </div>
        <div class="info-right flexColumnCenter">
            <InfoCell
                class="right-base"
                :url="getApiInfo && getApiInfo.apiIconUrl"
                :title="getApiInfo && getApiInfo.apiName"
                :text="getApiInfo && getApiInfo.apiDescribe"
                :id="getApiInfo && getApiInfo.apiInfoId"
                :price="getApiInfo && getApiInfo.apiPrice"
            />
            <div class="right-bottom borderBox flexRowCenter">
                <el-tabs class="right-tabs" v-model="activeName">
                    <el-tab-pane class="right-tab right-info" label="接口信息" name="info">
                        <FoldInfo class="tab-info-fold" :show="false" title="基本信息">
                            <div class="base-info-fold borderBox flexColumnCenter">
                                <div class="base-info-item flexRowCenter">
                                    <div class="base-info-item-title defaultFont">接口地址:</div>
                                    <div class="base-info-item-text defaultFont">
                                        {{ getApiInfo ? getApiInfo.apiDocAddress : '-' }}
                                    </div>
                                </div>
                                <div class="base-info-item flexRowCenter">
                                    <div class="base-info-item-title defaultFont">请求方式:</div>
                                    <div class="base-info-item-text defaultFont">
                                        {{ getApiInfo ? getApiInfo.requestMethod : '-' }}
                                    </div>
                                </div>
                                <div class="base-info-item flexRowCenter">
                                    <div class="base-info-item-title defaultFont">返回格式:</div>
                                    <div class="base-info-item-text defaultFont">
                                        {{ getApiInfo ? getApiInfo.returnFormat : '-' }}
                                    </div>
                                </div>
                                <div class="base-info-item flexRowCenter">
                                    <div class="base-info-item-title defaultFont">请求示例:</div>
                                    <div class="base-info-item-text base-info-item-url defaultFont">
                                        {{ getApiInfo ? getApiInfo.apiDocAddress : '-' }}
                                    </div>
                                </div>
                            </div>
                        </FoldInfo>
                        <FoldInfo class="tab-info-fold" :show="false" title="请求参数">
                            <div
                                v-if="getApiInfo && getApiInfo.apiParamList.length > 0"
                                class="base-info-parameter borderBox flexRowCenter"
                            >
                                <InfoTable :header="tableHeader" :data="getApiInfo.apiParamList" />
                            </div>
                            <div v-else class="base-info-parameter borderBox flexRowCenter">无</div>
                        </FoldInfo>
                        <FoldInfo class="tab-info-fold" :show="false" title="返回结果">
                            <div class="base-info-result borderBox flexColumnCenter">
                                <div class="base-info-item-title defaultFont">JSON示例:</div>
                                <!-- // TODO: - 接口未返回该字段 -->
                                <JsonView class="base-info-item-text" :data="{}" />
                            </div>
                        </FoldInfo>
                    </el-tab-pane>
                    <el-tab-pane class="right-tab right-error" label="错误代码" name="error">
                        <div class="text">错误代码功能开发中</div>
                    </el-tab-pane>
                    <el-tab-pane class="right-tab right-sample" label="示例代码" name="sample">
                        <div class="text">示例代码功能开发中</div>
                    </el-tab-pane>
                    <el-tab-pane class="right-tab right-document" label="接口文档" name="document">
                        <div class="text">接口文档功能开发中</div>
                    </el-tab-pane>
                    <el-tab-pane class="right-tab right-version" label="升级版本" name="version">
                        <div class="text">升级版本功能开发中</div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watchSyncEffect, computed } from 'vue'
import { useRoute } from 'vue-router'
import JsonView from 'vue3-json-view/src'
import InfoCell from './components/infoCell/InfoCell.vue'
import InfoTable from './components/infoTable/InfoTable.vue'
import InfoList from './components/infoList/InfoList.vue'
import FoldInfo from '@/components/foldInfo/FoldInfo.vue'
// import { ElMessage } from 'element-plus'
import { homeInterfaceNavigationTree } from '@/common/request/modules/home/home'
import { HotType } from '@/common/request/modules/home/homeInterface'

export default defineComponent({
    name: 'InterfaceInfo',
    setup() {
        const route = useRoute()
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
        return {
            interfaceTree,
            getApiInfo,
            selectApiId,
            selectApiAction,
            activeName,
            tableHeader,
        }
    },
    components: {
        InfoCell,
        FoldInfo,
        InfoTable,
        JsonView,
        InfoList,
    },
})
</script>

<style lang="scss" scoped>
.interface-info {
    position: relative;
    padding: 20px 10% 60px 10%;
    align-items: flex-start;
    .info-left {
        width: 24.7%;
        background: $themeBgColor;
        .left-list {
            width: 100%;
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
@media screen and (max-width: 1360px) {
    .interface-info {
        padding: 20px 5% 60px 5%;
    }
}
</style>
