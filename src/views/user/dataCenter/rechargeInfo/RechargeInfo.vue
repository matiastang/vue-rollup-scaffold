<!--
 * @Author: matiastang
 * @Date: 2021-11-15 15:30:33
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-08 10:38:29
 * @FilePath: /datumwealth-openalpha-front/src/views/user/dataCenter/rechargeInfo/RechargeInfo.vue
 * @Description: 充值订单详情
-->
<template>
    <div class="recharge-info">
        <div class="recharge-info-top flexRowCenter">
            <div class="recharge-info-index defaultFont">当前位置:</div>
            <div class="recharge-info-title defaultFont">充值调用账单</div>
            <div class="recharge-info-right-icon defaultFont">{{ '>' }}</div>
            <div class="recharge-info-text defaultFont">账单详情</div>
        </div>
        <div class="recharge-info-content flexColumnCenter">
            <div class="recharge-info-title defaultFont">
                {{ `${rechargeTime} ${billType ? '日' : '月'}账单详情` }}
            </div>
            <div class="recharge-info-search-content flexRowCenter">
                <SearchInput
                    class="search-input"
                    placeholder="请输入需要查询的账单"
                    @search="searchAction"
                />
                <div class="recharge-info-export cursorP defaultFont" @click="exportAction">
                    账单导出
                </div>
            </div>
            <el-table class="recharge-info-table" :data="tableData.list" style="width: 100%">
                <el-table-column prop="apiInfoId" label="接口ID" min-width="80">
                    <template #default="scope">
                        {{ scope.row.apiInfoId !== null ? scope.row.apiInfoId : '-' }}
                    </template>
                </el-table-column>
                <el-table-column prop="apiName" label="接口名称" min-width="80">
                    <template #default="scope">
                        {{ scope.row.apiName !== null ? scope.row.apiName : '-' }}
                    </template>
                </el-table-column>
                <el-table-column prop="apiPrice" label="单价(元/次)" min-width="100">
                    <template #default="scope">
                        {{ scope.row.apiPrice !== null ? scope.row.apiPrice : '-' }}
                    </template>
                </el-table-column>
                <el-table-column prop="apiVersion" label="接口最新版本" min-width="105">
                    <template #default="scope">
                        {{ scope.row.apiVersion !== null ? scope.row.apiVersion : '-' }}
                    </template>
                </el-table-column>
                <el-table-column prop="costPrice" label="消费金额" min-width="80">
                    <template #default="scope">
                        {{ scope.row.costPrice !== null ? scope.row.costPrice : '-' }}
                    </template>
                </el-table-column>
                <el-table-column prop="costTimes" label="计费次数" min-width="80">
                    <template #default="scope">
                        {{ scope.row.costTimes !== null ? scope.row.costTimes : '-' }}
                    </template>
                </el-table-column>
                <el-table-column prop="countSum" label="总调用量" min-width="80">
                    <template #default="scope">
                        {{ scope.row.countSum !== null ? scope.row.countSum : '-' }}
                    </template>
                </el-table-column>
                <el-table-column prop="validSum" label="有效调用量" min-width="105">
                    <template #default="scope">
                        {{ scope.row.validSum !== null ? scope.row.validSum : '-' }}
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
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect, reactive, watchSyncEffect } from 'vue'
import SearchInput from '@/components/searchInput/SearchInput.vue'
import { useRoute } from 'vue-router'
import { userRechargeDetail, userRechargeExport } from '@/common/request/modules/pay/pay'
import {
    RechargeDetailRequest,
    RechargeDetailItemResponse,
} from '@/common/request/modules/pay/payInterface'
import ElMessage from '@/common/utils/message'
import { RejectType } from '@/common/request/request'

export default defineComponent({
    name: 'RechargeInfo',
    setup() {
        const route = useRoute()
        // 时间
        const rechargeTime = ref('')
        // 类型
        const billType = ref(true)
        watchEffect(() => {
            if (route.query.type) {
                billType.value = `${route.query.type}` === 'day'
            }
            if (route.query.time) {
                rechargeTime.value = `${route.query.time}`
            }
        })
        // table数据
        const tableData = reactive({
            list: Array<RechargeDetailItemResponse>(),
        })
        // 页码
        const totalPage = ref(1)
        const pageNum = ref(1)
        const pageSize = ref(10)
        // 搜索内容
        const searchValue = ref('')
        watchSyncEffect(() => {
            const parameter: RechargeDetailRequest = {
                billType: billType.value ? 'day' : 'month', //账单类型：day-日账单 month-月账单
                pageNum: pageNum.value,
                pageSize: pageSize.value,
            }
            if (billType.value) {
                parameter.billDay = rechargeTime.value
            } else {
                parameter.billMonth = rechargeTime.value
            }
            if (searchValue.value.trim() !== '') {
                parameter.keywords = searchValue.value
            }
            userRechargeDetail(parameter)
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
        })
        /**
         * 搜索
         */
        const searchAction = (value: string) => {
            searchValue.value = value
        }
        /**
         * 导出
         */
        const exportAction = () => {
            const parameter: RechargeDetailRequest = {
                billType: billType.value ? 'day' : 'month', //账单类型：day-日账单 month-月账单
                pageNum: pageNum.value,
                pageSize: pageSize.value,
            }
            if (billType.value) {
                parameter.billDay = rechargeTime.value
            } else {
                parameter.billMonth = rechargeTime.value
            }
            if (searchValue.value.trim() !== '') {
                parameter.keywords = searchValue.value
            }
            userRechargeExport(parameter)
        }
        return {
            rechargeTime,
            billType,
            totalPage,
            pageNum,
            pageSize,
            tableData,
            searchAction,
            exportAction,
        }
    },
    components: {
        SearchInput,
    },
})
</script>

<style lang="scss" scoped>
.recharge-info {
    width: 100%;
    box-sizing: border-box;
    padding: 20px 16px;
    overflow-y: scroll;
    .recharge-info-top {
        justify-content: flex-start;
        .recharge-info-index {
            font-size: 16px;
            color: $placeholderColor;
            line-height: 24px;
        }
        .recharge-info-title {
            font-size: 16px;
            color: $titleColor;
            line-height: 24px;
            margin: 0px 6px;
        }
        .recharge-info-right-icon {
            font-size: 16px;
            color: $titleColor;
            line-height: 24px;
            margin-right: 6px;
        }
        .recharge-info-text {
            font-size: 16px;
            color: $themeColor;
            line-height: 24px;
        }
    }
    .recharge-info-content {
        width: 100%;
        box-sizing: border-box;
        background: $themeBgColor;
        border-radius: 4px;
        margin-top: 20px;
        padding: 16px 24px;
        .recharge-info-title {
            width: 100%;
            height: 36px;
            font-size: 14px;
            @include defaultFontMedium;
            color: $titleColor;
            line-height: 36px;
            border-bottom: 1px solid #dfdfdf;
            text-align: left;
        }
        .recharge-base-info-content {
            width: 100%;
            margin-top: 18px;
            justify-content: flex-start;
            .recharge-base-info-title {
                font-size: 14px;
                color: $placeholderColor;
                line-height: 20px;
                margin-right: 12px;
            }
            .recharge-base-info-text {
                font-size: 14px;
                color: $titleColor;
                line-height: 20px;
                margin-right: 24px;
            }
        }
        .recharge-info-search-content {
            width: 100%;
            justify-content: flex-start;
            margin-top: 18px;
            .search-input {
                width: 744px;
            }
            .recharge-info-export {
                width: 118px;
                height: 42px;
                background: $themeColor;
                border-radius: 4px;
                font-size: 16px;
                color: $themeBgColor;
                line-height: 42px;
                margin-left: 18px;
            }
        }
        .recharge-info-table {
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
</style>
