<!--
 * @Author: matiastang
 * @Date: 2021-11-15 14:59:37
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-09 11:05:48
 * @FilePath: /datumwealth-openalpha-front/src/views/user/dataCenter/discountInfo/DiscountInfo.vue
 * @Description: 优惠套餐详情
-->
<template>
    <div class="discount-info">
        <div class="discount-info-top flexRowCenter">
            <div class="discount-info-index defaultFont">当前位置:</div>
            <div class="discount-info-title defaultFont">优惠套餐账单</div>
            <div class="discount-info-right-icon defaultFont">{{ '>' }}</div>
            <div class="discount-info-text defaultFont">账单详情</div>
        </div>
        <div class="discount-info-content flexColumnCenter">
            <div class="discount-info-title defaultFont">
                {{ `${discountTime} ${billType ? '日' : '月'}账单详情` }}
            </div>
            <div class="discount-info-search-content flexRowCenter">
                <SearchInput
                    class="search-input"
                    placeholder="请输入需要查询的账单"
                    @search="searchAction"
                />
                <div class="discount-info-export cursorP defaultFont" @click="exportAction">
                    账单导出
                </div>
            </div>
            <el-table class="discount-info-table" :data="tableData.list" style="width: 100%">
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
                <el-table-column prop="apiPrice" label="单价(元/次)" min-width="110">
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
                <el-table-column prop="validSum" label="有效调用量" min-width="90">
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
import { defineComponent, ref, reactive, watchEffect, watchSyncEffect } from 'vue'
import { useRoute } from 'vue-router'
import SearchInput from '@/components/searchInput/SearchInput.vue'
import { userDiscountDetail, userDiscountExport } from '@/common/request/modules/pay/pay'
import {
    RechargeDetailRequest,
    RechargeDetailItemResponse,
} from '@/common/request/modules/pay/payInterface'
import ElMessage from '@/common/utils/message'
import { RejectType } from '@/common/request/request'

export default defineComponent({
    name: 'DiscountInfo',
    setup() {
        const route = useRoute()
        // 时间
        const discountTime = ref('')
        // 类型
        const billType = ref(true)
        watchEffect(() => {
            if (route.query.type) {
                billType.value = `${route.query.type}` === 'day'
            }
            if (route.query.time) {
                discountTime.value = `${route.query.time}`
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
                parameter.billDay = discountTime.value
            } else {
                parameter.billMonth = discountTime.value
            }
            if (searchValue.value.trim() !== '') {
                parameter.keywords = searchValue.value
            }
            userDiscountDetail(parameter)
                .then((res) => {
                    totalPage.value = res.total
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
                parameter.billDay = discountTime.value
            } else {
                parameter.billMonth = discountTime.value
            }
            if (searchValue.value.trim() !== '') {
                parameter.keywords = searchValue.value
            }
            userDiscountExport(parameter)
        }
        return {
            discountTime,
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
.discount-info {
    width: 100%;
    box-sizing: border-box;
    padding: 20px 16px;
    overflow-y: scroll;
    .discount-info-top {
        justify-content: flex-start;
        .discount-info-index {
            font-size: fontSize(16px);
            color: $placeholderColor;
            line-height: 24px;
        }
        .discount-info-title {
            font-size: fontSize(16px);
            color: $titleColor;
            line-height: 24px;
            margin: 0px 6px;
        }
        .discount-info-right-icon {
            font-size: fontSize(16px);
            color: $titleColor;
            line-height: 24px;
            margin-right: 6px;
        }
        .discount-info-text {
            font-size: fontSize(16px);
            color: $themeColor;
            line-height: 24px;
        }
    }
    .discount-info-content {
        width: 100%;
        box-sizing: border-box;
        background: $themeBgColor;
        border-radius: 4px;
        margin-top: 20px;
        padding: 16px 24px;
        .discount-info-title {
            width: 100%;
            height: 36px;
            font-size: fontSize(14px);
            @include defaultFontMedium;
            color: $titleColor;
            line-height: 36px;
            border-bottom: 1px solid #dfdfdf;
            text-align: left;
        }
        .discount-info-search-content {
            width: 100%;
            justify-content: flex-start;
            margin-top: 18px;
            .search-input {
                width: 744px;
            }
            .discount-info-export {
                width: 118px;
                height: 42px;
                background: $themeColor;
                border-radius: 4px;
                font-size: fontSize(16px);
                color: $themeBgColor;
                line-height: 42px;
                margin-left: 18px;
            }
        }
        .discount-info-table {
            margin-top: 18px;
            box-sizing: border-box;
            border: 1px solid #dfdfdf;
            border-bottom: none;
            ::v-deep(th) {
                background: #e9e9e9;
            }
            .info-title {
                font-size: fontSize(16px);
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
