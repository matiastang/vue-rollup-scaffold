<!--
 * @Author: your name
 * @Date: 2021-11-10 10:07:23
 * @LastEditTime: 2021-11-10 16:28:37
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/views/interfaceInfo/InterfaceInfo.vue
-->
<template>
    <div class="interface-info borderBox flexRowCenter">
        <div class="info-left borderBox">
            <InfoList class="left-list" :listData="interfaceData" />
        </div>
        <div class="info-right flexColumnCenter">
            <InfoCell class="right-base" :data="infoData" @trialAction="applyTrialAction" />
            <div class="right-bottom borderBox flexRowCenter">
                <el-tabs class="right-tabs" v-model="activeName" @tab-click="tabClick">
                    <el-tab-pane class="right-tab right-info" label="接口信息" name="info">
                        <FoldInfo class="tab-info-fold" :show="false" title="基本信息">
                            <div class="base-info-fold borderBox flexColumnCenter">
                                <div class="base-info-item flexRowCenter">
                                    <div class="base-info-item-title defaultFont">接口地址:</div>
                                    <div class="base-info-item-text defaultFont">
                                        http://open.api.tianyancha.com/services/open/cb/ipr/2.0
                                    </div>
                                </div>
                                <div class="base-info-item flexRowCenter">
                                    <div class="base-info-item-title defaultFont">请求方式:</div>
                                    <div class="base-info-item-text defaultFont">POST</div>
                                </div>
                                <div class="base-info-item flexRowCenter">
                                    <div class="base-info-item-title defaultFont">返回格式:</div>
                                    <div class="base-info-item-text defaultFont">JSON</div>
                                </div>
                                <div class="base-info-item flexRowCenter">
                                    <div class="base-info-item-title defaultFont">请求示例:</div>
                                    <div class="base-info-item-text base-info-item-url defaultFont">
                                        http://open.api.tianyancha.com/services/open/cb/ipr/2.0?keyword=XXXXXXXXXX
                                    </div>
                                </div>
                            </div>
                        </FoldInfo>
                        <FoldInfo class="tab-info-fold" :show="false" title="请求参数">
                            <div class="base-info-parameter borderBox flexRowCenter">
                                <InfoTable :header="tableHeader" :data="tableData" />
                            </div>
                        </FoldInfo>
                        <FoldInfo class="tab-info-fold" :show="false" title="返回结果">
                            <div class="base-info-result borderBox flexColumnCenter">
                                <div class="base-info-item-title defaultFont">JSON示例:</div>
                                <JsonView class="base-info-item-text" :data="resultJson" />
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
import { defineComponent, reactive, ref, computed } from 'vue'
import { InterfaceInfo } from './interfaceInfo'
import JsonView from 'vue3-json-view/src'
import InfoCell from './components/infoCell/InfoCell.vue'
import InfoTable from './components/infoTable/InfoTable.vue'
import InfoList from './components/infoList/InfoList.vue'
import FoldInfo from '@/components/foldInfo/FoldInfo.vue'
import { ElMessage } from 'element-plus'

export default defineComponent({
    name: 'InterfaceInfo',
    setup() {
        let infoData: InterfaceInfo = reactive({
            title: '基金基本要素',
            text: '可以通过基金名称/代码/交易日期获取该基金的一级分类基金指标历史滚动排名,包括1周到5年维度的区间收益、年化收益年化波动、夏普比率、下行风险、最大回撤、痛苦指数、索提诺比率、卡玛比率、欧米伽比率、涨跌幅异常次数、年化超额收益、跟踪误差、信息比例、月度胜率、上行捕获、下行捕获、上行年化收益、下行年化收益、相关系数、Beta暴露、詹森指数、拟合优度等字段信息。',
            id: '1314',
            price: '0.15',
        })
        let activeName = ref('info')
        let resultJson = reactive({
            result: {
                historyNames: '贵州力源液压股份有限公司;',
                cancelDate: null,
                regStatus: '存续',
                regCapital: '77800.32万人民币',
                city: '毕节市',
                staffNumRange: '5000-9999人',
                bondNum: '600765',
                historyNameList: ['贵州力源液压股份有限公司'],
                industry: '汽车制造业',
                bondName: '中航重机',
                revokeDate: null,
                type: 1,
                updateTimes: 1620622963000,
                legalPersonName: '姬苏春',
                revokeReason: '',
                regNumber: '520000000005018',
                creditCode: '91520000214434146R',
                property3: 'AVIC HeavyMachinery Co.,Ltd.',
                usedBondName: '力源液压->G力源->力源液压',
                approvedTime: 1582646400000,
                fromTime: 847900800000,
                socialStaffNum: 9023,
                actualCapitalCurrency: '人民币',
                alias: '中航重机',
                companyOrgType: '其他股份有限公司(上市)',
                id: 11684584,
                cancelReason: '',
                orgNumber: '214434146',
                toTime: null,
                actualCapital: '77800.32万人民币',
                estiblishTime: 847900800000,
                regInstitute: '贵阳市市场监督管理局贵州双龙航空港经济区分局',
                businessScope:
                    '法律、法规、国务院决定规定禁止的不得经营；法律、法规、国务院决定规定应当许可（审批）的，经审批机关批准后凭许可（审批）文件经营;法律、法规、国务院决定规定无需许可（审批）的，市场主体自主选择经营。（股权投资及经营管理；军民共用液压件、液压系统、锻件、铸件、换热器、飞机及航空发动机附件，汽车零备件的研制、开发、制造、修理及销售；经营本企业自产机电产品、成套设备及相关技术的出口业务；经营本企业生产、科研所需的原辅材料、机械设备、仪器仪表、备品备件、零配件及技术的进口业务；开展本企业进料加工和“三来一补”业务。液压、锻件、铸件、换热器技术开发、转让和咨询服务；物流；机械冷热加工、修理修配服务。）',
                taxNumber: '91520000214434146R',
                regLocation: '贵州双龙航空港经济区机场路9号太升国际A栋3单元5层',
                regCapitalCurrency: '人民币',
            },
        })
        let tableHeader = reactive([
            {
                title: '参数',
                key: 'cs',
            },
            {
                title: '必选',
                key: 'bx',
            },
            {
                title: '类型及范围',
                key: 'lx',
            },
            {
                title: '说明',
                key: 'sm',
            },
        ])
        let tableData = reactive([
            {
                cs: 'keyword',
                bx: 'true',
                lx: 'String',
                sm: '搜索关键字（公司名称、公司id、注册号或社会统一信用代码',
            },
            {
                cs: 'keyword',
                bx: 'true',
                lx: 'String',
                sm: '搜索关键字（公司名称、公司id、注册号或社会统一信用代码',
            },
        ])
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
        return {
            infoData,
            activeName,
            resultJson,
            tableHeader,
            tableData,
            interfaceData,
        }
    },
    components: {
        InfoCell,
        FoldInfo,
        InfoTable,
        JsonView,
        InfoList,
    },
    methods: {
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
