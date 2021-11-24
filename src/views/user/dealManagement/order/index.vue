<template>
    <div class="order">
        <el-form ref="form" :model="queryParams" inline label-width="100px">
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
            <el-form-item label="支付方式">
                <el-select v-model="queryParams.type" placeholder="Select">
                    <el-option label="全部" value=""> </el-option>
                    <el-option label="充值" :value="1"> </el-option>
                    <el-option label="套餐" :value="2"> </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="" label-width="0">
                <el-button @click="doQuery" type="primary" plain>查询</el-button>
                <el-button @click="doReset" plain>重置</el-button>
                <el-button type="primary">开发票</el-button>
            </el-form-item>
        </el-form>
        <el-card shadow="never">
            <template #header>
                <h5 class="header">订单明细</h5>
            </template>
            <el-skeleton v-if="loading" :rows="5" animated />
            <el-table
                v-else
                height="60vh"
                :header-cell-style="{
                    background: '#e9e9e9',
                }"
                :data="list"
                stripe
            >
                <el-table-column
                    prop="orderSn"
                    label="账单编号"
                    show-overflow-tooltip
                    width="180"
                />
                <el-table-column prop="orderType" label="类型" show-overflow-tooltip>
                    <template #default="scope"
                        >{{ orderTypeToText(scope.row.orderType) }}
                    </template>
                </el-table-column>
                <el-table-column prop="goodsAmount" label="订单金额（元）" show-overflow-tooltip />
                <el-table-column prop="orderAmount" label="实付金额（元）" show-overflow-tooltip />
                <el-table-column prop="payName" label="支付方式" show-overflow-tooltip />
                <el-table-column
                    prop="addTime"
                    :width="180"
                    label="订单时间"
                    show-overflow-tooltip
                />
                <el-table-column prop="PayStatus" :width="120" label="支付状态">
                    <template #default="scope"
                        >{{
                            payStatusToText(
                                Number(scope.row.payId),
                                Number(scope.row.payStatus),
                                Number(scope.row.payVoucher)
                            )
                        }}
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="操作" width="400px">
                    <template #default="scope">
                        <template v-if="isPayStatusInUpload(scope.row)">
                            <el-button type="text">下载采购单 </el-button>
                            <el-button type="text">上传凭证 </el-button>
                        </template>
                        <template v-if="isPayStatusNotPay(scope.row)">
                            <el-button type="text">去支付 </el-button>
                            <el-button type="text">取消 </el-button>
                        </template>
                        <template v-if="isPayStatusFinish(scope.row)">
                            <el-button type="text">去开票 </el-button>
                        </template>
                        <template v-if="isPayStatusChecking(scope.row)">
                            <el-button type="text">查看详情 </el-button>
                        </template>
                        <template v-if="isPayStatusFailure(scope.row)">
                            <el-button type="text">重新上传 </el-button>
                            <el-button type="text">查看详情 </el-button>
                        </template>
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
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { Search } from '@element-plus/icons'
import { Order } from '@/@types'
import { ElMessageBox } from 'element-plus'
import { addDateRange, orderTypeToText, payStatusToText } from '@/common/utils'
import { getOrderList, getOrderCancel } from '@/api'

const loading = ref(true)
const list = ref<Array<Order.AsObject>>([])
const date = ref([])
const form = ref()
const queryParams = reactive({
    orderSn: '',
    type: '',
    pageNum: 1,
    pageSize: 10,
    total: 0,
})

onMounted(() => {
    doQuery()
})

const doQuery = async () => {
    try {
        const query = addDateRange(queryParams, date.value)
        const response = await getOrderList(query)
        loading.value = false
        list.value = response.data.rows
    } catch (error) {
        loading.value = false
        throw error
    }
}
const isPayStatusInUpload = (row: Order.AsObject) => {
    const payText = payStatusToText(Number(row.payId), Number(row.payStatus), row.payVoucher || '')
    return payText === '未上传凭证'
}
const isPayStatusNotPay = (row: Order.AsObject) => {
    const payText = payStatusToText(Number(row.payId), Number(row.payStatus), row.payVoucher || '')
    return payText === '未支付'
}
const isPayStatusFinish = (row: Order.AsObject) => {
    const payText = payStatusToText(Number(row.payId), Number(row.payStatus), row.payVoucher || '')
    return payText === '已支付'
}
const isPayStatusChecking = (row: Order.AsObject) => {
    const payText = payStatusToText(Number(row.payId), Number(row.payStatus), row.payVoucher || '')
    return payText === '已上传待审核'
}
const isPayStatusFailure = (row: Order.AsObject) => {
    const payText = payStatusToText(Number(row.payId), Number(row.payStatus), row.payVoucher || '')
    return payText === '审核未通过'
}

const handleCancel = async (id: Number, name?: String) => {
    ElMessageBox.confirm(`确定删除${name}?`, '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
    })
        .then(async () => {
            try {
                const response = await getOrderCancel({ orderId: id })
                loading.value = false
                list.value = response.data.rows
                queryParams.total = response.data.total
            } catch (error) {
                loading.value = false
                throw error
            }
        })
        .catch(() => {})
}
const doReset = () => {
    Object.assign(
        {
            orderSn: '',
            type: '',
            pageNum: 1,
            pageSize: 10,
            total: 0,
        },
        queryParams
    )
    date.value = []
    form.value.resetFields()
    doQuery()
}
const asyncPageNumber = (count: number) => {
    queryParams.pageNum = count
}
const asyncPageSize = (count: number) => {
    queryParams.pageSize = count
}
</script>

<style lang="scss" scoped>
.order {
    padding: 20px;
    .header {
        margin: 0;
    }
}
.th {
    background: #e9e9e9;
}
</style>
