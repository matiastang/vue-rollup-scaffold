<!--
 * @Author: matiastang
 * @Date: 2021-11-11 16:04:58
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-25 11:25:43
 * @FilePath: /datumwealth-openalpha-front/src/views/user/dataCenter/interfaceStatement/InterfaceStatement.vue
 * @Description: 个人中心-数据中心-接口账单
-->
<template>
    <div class="interface-statement">
        <div class="interface-statement-content flexColumnCenter">
            <div class="interface-statement-top-content">
                <el-tabs class="right-tabs" v-model="activeName" @tab-click="tabClick">
                    <el-tab-pane
                        class="right-tab flexColumnCenter"
                        label="充值调用账单"
                        name="recharge"
                    >
                        <div class="tab-recharge-content">
                            <div class="tab-discount-content">
                                <!-- <div class="discount borderBox flexRowCenter">
                                    <div class="discount-token-title defaultFont">关联token值:</div>
                                    <TokenView class="discount-token-view" :token="token" />
                                </div> -->
                                <div class="account-information defaultFont">账户信息</div>
                                <div class="account-information-content flexRowCenter">
                                    <div class="account-information-left flexRowCenter">
                                        <div
                                            v-for="(item, index) in rechargeInfo"
                                            :key="item.count"
                                            class="discount-item flexColumnCenter"
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
                            <!-- <div class="discount borderBox flexRowCenter">
                                <div class="discount-type defaultFont">订单编号:</div>
                                <el-select
                                    class="token-type-select"
                                    v-model="selectTokenType"
                                    placeholder="请选择"
                                >
                                    <el-option
                                        v-for="item in selectOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                                <div class="discount-token-title defaultFont">关联token值:</div>
                                <TokenView class="discount-token-view" :token="token" />
                            </div> -->
                            <div class="account-information defaultFont">账户信息</div>
                            <div class="account-information-content flexRowCenter">
                                <div class="account-information-left flexRowCenter">
                                    <div
                                        v-for="(item, index) in discountInfo"
                                        :key="item.count"
                                        class="discount-item flexColumnCenter"
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
            <div class="interface-statement-bottom-content">
                <div class="account-information defaultFont">账单明细</div>
                <div class="bill-filter-content flexRowCenter">
                    <div class="bill-day-filter cursorP bill-selected defaultFont">日账单</div>
                    <div class="bill-month-filter cursorP defaultFont">月账单</div>
                    <div class="bill-time-title defaultFont">自定义：</div>
                    <el-date-picker
                        v-model="dateSelected"
                        type="daterange"
                        range-separator="~"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    >
                    </el-date-picker>
                    <div class="bill-filter-search cursorP defaultFont">查询</div>
                </div>
                <!-- <SearchInput class="search-input" placeholder="请输入需要查询的账单" /> -->
                <el-table class="bill-table" :data="tableData" style="width: 100%">
                    <el-table-column prop="date" label="每日订单编号" min-width="100" />
                    <el-table-column prop="name" label="订单编号" min-width="100" />
                    <el-table-column prop="state" label="总调用量" min-width="80" />
                    <el-table-column prop="city" label="有效调用量" min-width="80" />
                    <el-table-column prop="address" label="剩余次数" min-width="80" />
                    <el-table-column prop="zip" label="剩余天数" min-width="80" />
                    <el-table-column prop="time" label="出账时间" min-width="100" />
                    <el-table-column label="操作">
                        <template #default="scope">
                            <div
                                class="info-title cursorP defaultFont"
                                @click="infoAction(scope.$index)"
                            >
                                查看详情
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watchSyncEffect } from 'vue'
import TokenView from '@/components/tokenView/TokenView.vue'
import SearchInput from '@/components/searchInput/SearchInput.vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { userRechargeInfo } from '@/common/request/modules/pay/pay'
import { RejectType } from '@/common/request/request'

export default defineComponent({
    name: 'InterfaceStatement',
    setup() {
        const router = useRouter()
        let activeName = ref('recharge')
        // token选择
        let selectOptions = reactive([
            {
                value: 0,
                label: 'S12345678',
            },
            {
                value: 1,
                label: 'S13579246',
            },
        ])
        let selectTokenType = ref(0)
        let token = computed(() =>
            selectTokenType.value === 0
                ? 'e2aef4ea-cf17-4485-b5c4-c11120197c03'
                : 'abcdefghi-cf17-4485-b5c4-c11120197c03'
        )
        // 优惠套餐
        let discountInfo = reactive([
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
        // 日期选择
        let dateSelected = ref('')
        // table数据
        let tableData = [
            {
                date: 'A20211020013003363848',
                name: 'S20211008174916250831',
                state: '10000',
                city: '9999',
                address: '35000',
                zip: '1',
                time: '2021-10-20 01:30:13',
            },
            {
                date: 'A20211020013003363848',
                name: 'S20211008174916250831',
                state: '10000',
                city: '9999',
                address: '35000',
                zip: '1',
                time: '2021-10-20 01:30:13',
            },
            {
                date: 'A20211020013003363848',
                name: 'S20211008174916250831',
                state: '10000',
                city: '9999',
                address: '35000',
                zip: '1',
                time: '2021-10-20 01:30:13',
            },
            {
                date: 'A20211020013003363848',
                name: 'S20211008174916250831',
                state: '10000',
                city: '9999',
                address: '35000',
                zip: '1',
                time: '2021-10-20 01:30:13',
            },
            {
                date: 'A20211020013003363848',
                name: 'S20211008174916250831',
                state: '10000',
                city: '9999',
                address: '35000',
                zip: '1',
                time: '2021-10-20 01:30:13',
            },
        ]
        // 查看详情
        const infoAction = (index: number) => {
            console.log(`跳转到${index}详情页面`)
            router.push({
                path: `/user/data/${activeName.value}/info/${index}`,
            })
        }
        return {
            activeName,
            selectOptions,
            selectTokenType,
            token,
            discountInfo,
            rechargeInfo,
            dateSelected,
            tableData,
            infoAction,
            toRechargeAction,
            toDiscountAction,
        }
    },
    components: {
        // TokenView,
        // SearchInput,
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
                            border-bottom: 1px solid #dfdfdf;
                            text-align: left;
                        }
                        .account-information-content {
                            width: 100%;
                            height: 135px;
                            justify-content: space-between;
                            .account-information-left {
                                width: calc(100% - 138px);
                                .discount-item {
                                    width: 25%;
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
            .account-information {
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
        }
    }
}
</style>
