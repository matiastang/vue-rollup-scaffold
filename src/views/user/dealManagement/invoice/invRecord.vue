<template>
    <div>
        <el-form ref="form" :model="queryParams" inline label-width="70px">
            <el-form-item label="" label-width="0">
                <el-input
                    v-model="queryParams.orderSn"
                    placeholder="订单编号"
                    :suffix-icon="Search"
                    @keyup.enter="doQuery"
                />
            </el-form-item>
            <el-form-item label="查询日期">
                <el-date-picker
                    v-model="date"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                >
                </el-date-picker>
            </el-form-item>

            <el-form-item label="" label-width="0">
                <el-button @click="doQuery" type="primary" plain>查询</el-button>
                <el-button @click="doReset" plain>重置</el-button>
                <el-button type="text" @click="open = true">开票说明</el-button>
            </el-form-item>
        </el-form>
    </div>
    <br />
    <div>
        <el-skeleton v-if="loading" :rows="5" animated />
        <el-table
            border
            v-else
            :header-cell-style="{
                background: '#e9e9e9',
            }"
            :data="list"
            stripe
        >
            <el-table-column prop="orderSn" label="账单编号" show-overflow-tooltip width="180" />
            <el-table-column prop="orderType" label="类型" show-overflow-tooltip>
                <template #default="scope">{{ orderTypeToText(scope.row.orderType) }} </template>
            </el-table-column>
            <el-table-column prop="goodsAmount" label="订单金额（元）" show-overflow-tooltip />
            <el-table-column prop="orderAmount" label="实付金额（元）" show-overflow-tooltip />
            <el-table-column prop="payName" label="支付方式" show-overflow-tooltip />
            <el-table-column prop="addTime" label="订单时间" show-overflow-tooltip />
            <el-table-column prop="PayStatus" label="支付状态">
                <template #default="scope">{{ payStatusToText(scope.row.PayStatus) }} </template>
            </el-table-column>
            <el-table-column prop="address" label="操作">
                <template #default="scope">
                    <el-button type="text">下载采购单 </el-button>
                    <el-button type="text">上传凭证 </el-button>
                    <el-button type="text">去支付 </el-button>
                    <el-button type="text">取消 </el-button>
                    <el-button type="text">去开票 </el-button>
                    <el-button type="text">查看详情 </el-button>
                    <el-button type="text">重新上传 </el-button>
                    <el-button type="text" @click="handleCancel(scope.row.id)">
                        取消订单
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination
            v-show="total > 0"
            :total="total"
            :page="queryParams.pageNum"
            :limit="queryParams.pageSize"
            @update:page="asyncPageNumber"
            @update:limit="asyncPageSize"
            @pagination="doQuery"
        />
    </div>
    <DialogTips :open="open" @on-close="open = false" />
</template>

<script setup>
import { ref } from 'vue'
import DialogTips from '@/views/user/dealManagement/invoice/DialogTips.vue'

const loading = ref(true)
const list = ref([])
const date = ref([])
const open = ref(false)

const queryParams = ref({
    orderSn: '',
    type: '',
    pageNum: 1,
    pageSize: 10,
    total: 0,
})
</script>

<style lang="scss" scoped></style>
