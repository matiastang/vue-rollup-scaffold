<!--
 * @Author: matiastang
 * @Date: 2021-11-11 16:04:58
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-25 17:08:29
 * @FilePath: /datumwealth-openalpha-front/src/views/user/dataCenter/interfaceStatement/InterfaceStatement.vue
 * @Description: 个人中心-数据中心-接口账单
-->
<template>
    <div class="interface-statement">
        <div class="interface-statement-content flexColumnCenter">
            <div class="interface-statement-top-content">
                <el-tabs class="right-tabs" v-model="activeName" @click="activeAction">
                    <el-tab-pane
                        class="right-tab flexColumnCenter"
                        label="充值调用账单"
                        name="recharge"
                    >
                        <div class="tab-recharge-content">
                            <div class="tab-discount-content">
                                <div class="account-information defaultFont">账户信息</div>
                                <div class="account-information-content flexRowCenter">
                                    <div class="account-information-left flexRowCenter">
                                        <div
                                            v-for="(item, index) in rechargeInfo"
                                            :key="item.count"
                                            class="discount-item flexColumnCenter"
                                            :style="{
                                                'border-right': `${
                                                    index === rechargeInfo.length - 1 ? 0 : 1
                                                }px solid #dfdfdf`,
                                            }"
                                        >
                                            <div class="discount-item-top flexRowCenter">
                                                <div
                                                    :class="[
                                                        'discount-item-top-title',
                                                        {
                                                            'discount-item-top-last':
                                                                index === rechargeInfo.length - 1,
                                                        },
                                                    ]"
                                                >
                                                    {{ item.count.toFixed(2) }}
                                                </div>
                                                <div class="discount-item-top-text defaultFont">
                                                    元
                                                </div>
                                            </div>
                                            <div class="discount-item-text defaultFont">
                                                {{ item.text }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="account-information-right flexRowCenter">
                                        <div
                                            class="account-information-buy cursorP defaultFont"
                                            @click="toRechargeAction"
                                        >
                                            购买
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane class="right-tab" label="优惠套餐账单" name="discount">
                        <div class="tab-discount-content">
                            <div class="account-information defaultFont">账户信息</div>
                            <div class="account-information-content flexRowCenter">
                                <div class="account-information-left flexRowCenter">
                                    <div
                                        v-for="(item, index) in discountInfo"
                                        :key="item.count"
                                        class="discount-item flexColumnCenter"
                                        :style="{
                                            'border-right': `${
                                                index === discountInfo.length - 1 ? 0 : 1
                                            }px solid #dfdfdf`,
                                        }"
                                    >
                                        <div class="discount-item-top flexRowCenter">
                                            <div
                                                :class="[
                                                    'discount-item-top-title',
                                                    {
                                                        'discount-item-top-last':
                                                            index === discountInfo.length - 1,
                                                    },
                                                ]"
                                            >
                                                {{ item.count }}
                                            </div>
                                            <div class="discount-item-top-text defaultFont">次</div>
                                        </div>
                                        <div class="discount-item-text defaultFont">
                                            {{ item.text }}
                                        </div>
                                    </div>
                                </div>
                                <div class="account-information-right flexRowCenter">
                                    <div
                                        class="account-information-buy cursorP defaultFont"
                                        @click="toDiscountAction"
                                    >
                                        购买
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class="interface-statement-bottom-content flexColumnCenter">
                <div class="account-information defaultFont">账单明细</div>
                <div class="bill-filter-content flexRowCenter">
                    <div
                        :class="[
                            'bill-day-filter',
                            'cursorP',
                            'defaultFont',
                            { 'bill-selected': billType },
                        ]"
                        @click="billAction(true)"
                    >
                        日账单
                    </div>
                    <div
                        :class="[
                            'bill-month-filter',
                            'cursorP',
                            'defaultFont',
                            { 'bill-selected': !billType },
                        ]"
                        @click="billAction(false)"
                    >
                        月账单
                    </div>
                    <div class="bill-time-title defaultFont">自定义：</div>
                    <el-date-picker
                        v-model="dateSelected"
                        type="daterange"
                        range-separator="~"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        format="YYYY-MM-DD"
                        value-format="YYYY-MM-DD"
                    >
                    </el-date-picker>
                    <div class="bill-filter-search cursorP defaultFont" @click="searchAction">
                        查询
                    </div>
                </div>
                <el-table class="bill-table" :data="tableData.list" style="width: 100%">
                    <el-table-column prop="billDate" label="日期" min-width="100">
                        <template #default="scope">
                            {{ scope.row.billDate || '-' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="totalTimes" label="总调用次数" min-width="100">
                        <template #default="scope">
                            {{ scope.row.totalTimes || '-' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="effectiveTimes" label="有效调用次数" min-width="100">
                        <template #default="scope">
                            {{ scope.row.effectiveTimes || '-' }}
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="times" label="剩余次数" min-width="100">
                        <template #default="scope">
                            {{ scope.row.times || '-' }}
                        </template>
                    </el-table-column> -->
                    <el-table-column label="操作">
                        <template #default="scope">
                            <div
                                class="info-title cursorP defaultFont"
                                @click="infoAction(scope.row.billDate)"
                            >
                                查看详情
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    v-if="totalPage > pageSize"
                    class="table-pagination"
                    layout="prev, pager, next"
                    :total="totalPage"
                    :page-size="pageSize"
                    v-model:currentPage="pageNum"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    Ref,
    reactive,
    computed,
    watch,
    watchSyncEffect,
    onMounted,
} from 'vue'
import TokenView from '@/components/tokenView/TokenView.vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import {
    userRechargeInfo,
    userRechargeList,
    userDiscountInfo,
    userDiscountList,
} from '@/common/request/modules/pay/pay'
import {
    RechargeListRequest,
    RechargeItemResponse,
} from '@/common/request/modules/pay/payInterface'
import { RejectType } from '@/common/request/request'

export default defineComponent({
    name: 'InterfaceStatement',
    setup() {
        const router = useRouter()
        const activeName = ref('recharge')
        // 账单类型
        const billType = ref(true)
        // 切换账单类型
        const billAction = (type: boolean) => {
            billType.value = type
        }
        // 日期选择
        const dateSelected: Ref<string[]> = ref([])
        const startDate = computed(() => {
            if (dateSelected.value.length > 0) {
                return dateSelected.value[0]
            }
            return ''
        })
        const endDate = computed(() => {
            if (dateSelected.value.length > 1) {
                return dateSelected.value[1]
            }
            return ''
        })
        // 页码
        const totalPage = ref(1)
        const pageNum = ref(1)
        const pageSize = ref(10)
        const activeAction = () => {
            pageNum.value = 1
            pageSize.value = 10
        }
        // 优惠套餐
        const discountInfo = reactive([
            {
                count: 0,
                text: '套餐次数',
            },
            {
                count: 0,
                text: '总调用量',
            },
            {
                count: 0,
                text: '总有效调用量',
            },
            {
                count: 0,
                text: '套餐剩余次数',
            },
        ])
        // 获取优惠套餐信息
        watchSyncEffect(() => {
            userDiscountInfo()
                .then((res) => {
                    rechargeInfo[0].count = res.totalTimes || 0
                    rechargeInfo[1].count = res.totalConsume || 0
                    rechargeInfo[2].count = res.effectiveUseNum || 0
                    rechargeInfo[2].count = res.times || 0
                })
                .catch((err: RejectType) => {
                    ElMessage({
                        message: err.msg,
                        type: 'error',
                    })
                })
        })
        // 跳转优惠套餐
        const toDiscountAction = () => {
            router.push({
                path: '/discount',
            })
        }
        // 充值信息
        const rechargeInfo = reactive([
            {
                count: 0,
                text: '充值金额',
            },
            {
                count: 0,
                text: '消费',
            },
            {
                count: 0,
                text: '账户余额',
            },
        ])
        // 获取充值信息
        watchSyncEffect(() => {
            userRechargeInfo()
                .then((res) => {
                    rechargeInfo[0].count = res.balance || 0
                    rechargeInfo[1].count = res.totalAmount || 0
                    rechargeInfo[2].count = res.totalConsume || 0
                })
                .catch((err: RejectType) => {
                    ElMessage({
                        message: err.msg,
                        type: 'error',
                    })
                })
        })
        // 跳转充值调用
        const toRechargeAction = () => {
            router.push({
                path: '/recharge',
            })
        }

        // table数据
        const tableData = reactive({
            list: Array<RechargeItemResponse>(),
        })
        const parameterData = reactive({
            parameter: {} as RechargeListRequest,
        })
        // 获取列表信息
        watchSyncEffect(() => {
            const parameter: RechargeListRequest = {
                billType: billType.value ? 'day' : 'month', //账单类型：day-日账单 month-月账单
                pageNum: pageNum.value,
                pageSize: pageSize.value,
            }
            if (startDate.value !== '') {
                parameter.startDate = startDate.value
            }
            if (endDate.value !== '') {
                parameter.endDate = endDate.value
            }
            parameterData.parameter = parameter
        })
        const searchAction = () => {
            if (activeName.value !== 'recharge') {
                userDiscountList(parameterData.parameter)
                    .then((res) => {
                        totalPage.value = res.pages
                        tableData.list = res.list
                    })
                    .catch((err: RejectType) => {
                        ElMessage({
                            message: err.msg,
                            type: 'error',
                        })
                    })
                return
            }
            userRechargeList(parameterData.parameter)
                .then((res) => {
                    totalPage.value = res.pages
                    tableData.list = res.list
                })
                .catch((err: RejectType) => {
                    ElMessage({
                        message: err.msg,
                        type: 'error',
                    })
                })
        }
        watch(
            () => billType.value,
            (newType) => {
                searchAction()
            }
        )
        // 查看详情
        const infoAction = (time: string) => {
            router.push({
                path: `/user/data/${activeName.value}/info`,
                query: {
                    type: billType.value ? 'day' : 'month', //账单类型：day-日账单 month-月账单
                    time,
                },
            })
        }
        onMounted(() => {
            searchAction()
        })
        return {
            activeName,
            activeAction,
            billType,
            totalPage,
            pageNum,
            pageSize,
            billAction,
            discountInfo,
            rechargeInfo,
            dateSelected,
            tableData,
            searchAction,
            infoAction,
            toRechargeAction,
            toDiscountAction,
        }
    },
})
</script>

<style lang="scss" scoped>
.interface-statement {
    width: 100%;
    box-sizing: border-box;
    padding: 20px 16px;
    overflow-y: scroll;
    .interface-statement-content {
        width: 100%;
        .interface-statement-top-content {
            width: 100%;
            box-sizing: border-box;
            padding: 16px 24px;
            background: $themeBgColor;
            border-radius: 4px;
            .right-tabs {
                width: 100%;
                .right-tab {
                    width: 100%;
                    .tab-recharge-content,
                    .tab-discount-content {
                        width: 100%;
                        .discount {
                            width: 100%;
                            height: 42px;
                            background: $themeBgColor;
                            margin: 25px 0px;
                            justify-content: flex-start;
                            .discount-type,
                            .discount-token-title,
                            .discount-token {
                                font-size: 16px;
                                color: $titleColor;
                                line-height: 24px;
                                margin-right: 18px;
                            }
                            .discount-token-title {
                                margin-left: 16px;
                            }
                            .discount-token-view {
                                width: 456px;
                            }
                        }
                        .account-information {
                            height: 36px;
                            font-size: 14px;
                            font-family: PingFangSC-Medium, PingFang SC;
                            font-weight: 500;
                            color: $titleColor;
                            line-height: 36px;
                            letter-spacing: 1px;
                            // border-bottom: 1px solid #dfdfdf;
                            text-align: left;
                        }
                        .account-information-content {
                            width: 100%;
                            height: 135px;
                            justify-content: space-between;
                            .account-information-left {
                                width: calc(100% - 138px);
                                height: 100%;
                                .discount-item {
                                    width: 25%;
                                    height: 60%;
                                    .discount-item-top {
                                        .discount-item-top-title {
                                            font-size: 22px;
                                            font-family: PingFangSC-Medium, PingFang SC;
                                            font-weight: 500;
                                            color: #595959;
                                            line-height: 30px;
                                            letter-spacing: 2px;
                                        }
                                        .discount-item-top-last {
                                            color: $themeColor;
                                        }
                                        .discount-item-top-text {
                                            font-size: 14px;
                                            color: $placeholderColor;
                                            line-height: 20px;
                                        }
                                    }
                                    .discount-item-text {
                                        font-size: 14px;
                                        color: $placeholderColor;
                                        line-height: 20px;
                                    }
                                }
                            }
                            .account-information-right {
                                width: 130px;
                                .account-information-buy {
                                    width: 83px;
                                    height: 42px;
                                    background: $themeColor;
                                    border-radius: 4px;
                                    font-size: 16px;
                                    color: $themeBgColor;
                                    line-height: 42px;
                                }
                            }
                        }
                    }
                    .tab-recharge-content {
                        .discount {
                            .discount-token-title {
                                margin-left: 0px;
                            }
                        }
                    }
                }
                ::v-deep(.el-tabs__item) {
                    height: 39px;
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
        .interface-statement-bottom-content {
            width: 100%;
            box-sizing: border-box;
            padding: 16px 24px;
            background: $themeBgColor;
            border-radius: 4px;
            margin-top: 20px;
            align-items: flex-start;
            .account-information {
                width: 100%;
                height: 36px;
                font-size: 14px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: $titleColor;
                line-height: 36px;
                letter-spacing: 1px;
                border-bottom: 1px solid #dfdfdf;
                text-align: left;
            }
            .bill-filter-content {
                margin: 18px 0px;
                justify-content: flex-start;
                .bill-day-filter,
                .bill-month-filter {
                    box-sizing: border-box;
                    width: 101px;
                    height: 42px;
                    background: $themeBgColor;
                    border-radius: 4px;
                    font-size: 16px;
                    color: $placeholderColor;
                    line-height: 42px;
                    border: 1px solid $placeholderColor;
                }
                .bill-selected {
                    background: $themeColor;
                    color: $themeBgColor;
                    border: none;
                }
                .bill-month-filter {
                    margin-left: 18px;
                }
                .bill-time-title {
                    font-size: 16px;
                    color: $titleColor;
                    line-height: 24px;
                    margin: 0px 18px 0px 30px;
                }
                .bill-filter-search {
                    margin-left: 18px;
                    width: 83px;
                    height: 42px;
                    border-radius: 4px;
                    border: 1px solid $themeColor;
                    font-size: 16px;
                    color: $themeColor;
                    line-height: 42px;
                }
            }
            .search-input {
                width: 744px;
            }
            .bill-table {
                margin-top: 18px;
                box-sizing: border-box;
                border: 1px solid #dfdfdf;
                border-bottom: none;
                ::v-deep(th) {
                    background: #e9e9e9;
                }
                .info-title {
                    font-size: 16px;
                    color: #4e9aeb;
                    line-height: 24px;
                    text-align: left;
                }
            }
            .table-pagination {
                align-self: flex-end;
            }
        }
    }
}
</style>
