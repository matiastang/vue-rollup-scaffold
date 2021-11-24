<template>
    <div class="order">
        <el-form ref="form" :model="queryParams" inline label-width="80px">
            <el-form-item label="" label-width="0">
                <el-input
                    v-model="queryParams.orderSn"
                    placeholder="订单编号"
                    @keyup.enter="doQuery"
                    size="mini"
                    @keyup.capture.enter="doQuery"
                />
            </el-form-item>
            <el-form-item label="查询日期">
                <el-date-picker
                    size="mini"
                    v-model="date"
                    type="datetimerange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="YYYY-MM-DD HH:mm:ss"
                    value-format="YYYY-MM-DD HH:mm:ss"
                    @change="doQuery"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item label="支付方式">
                <el-select
                    size="mini"
                    @change="doQuery"
                    v-model="queryParams.payId"
                    placeholder="Select"
                >
                    <el-option label="全部" value=""> </el-option>
                    <el-option label="微信" :value="1"> </el-option>
                    <el-option label="支付宝" :value="2"> </el-option>
                    <el-option label="对公转账" :value="3"> </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="" label-width="0">
                <el-button size="mini" @click="doQuery" type="primary" plain>查询</el-button>
                <el-button size="mini" @click="doReset" plain>重置</el-button>
                <el-button size="mini" type="primary" plain>开发票</el-button>
            </el-form-item>
        </el-form>
        <el-card shadow="never">
            <template #header>
                <h5 class="header">订单明细</h5>
            </template>
            <el-skeleton v-if="loading" :rows="5" animated />
            <el-table
                v-else
                :header-cell-style="{
                    background: '#e9e9e9',
                }"
                height="60vh"
                :data="list"
                class="table"
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
                <el-table-column
                    prop="goodsAmount"
                    :width="120"
                    label="订单金额（元）"
                    show-overflow-tooltip
                />
                <el-table-column
                    prop="orderAmount"
                    :width="120"
                    label="实付金额（元）"
                    show-overflow-tooltip
                />
                <el-table-column prop="payName" label="支付方式" show-overflow-tooltip />
                <el-table-column
                    prop="addTime"
                    :width="180"
                    label="订单时间"
                    show-overflow-tooltip
                />
                <el-table-column prop="PayStatus" :width="120" label="支付状态">
                    <template #default="scope">
                        <span
                            :class="{
                                'paystatus-red':
                                    isPayStatusInUpload(scope.row) || isPayStatusNotPay(scope.row),
                                'paystatus-black': isPayStatusNotPay(scope.row),
                                'paystatus-yellow': isPayStatusChecking(scope.row),
                            }"
                        >
                            {{
                                payStatusToText(
                                    Number(scope.row.payId),
                                    Number(scope.row.payStatus),
                                    Number(scope.row.payVoucher)
                                )
                            }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="操作" width="200px">
                    <template #default="scope">
                        <template v-if="isPayStatusInUpload(scope.row)">
                            <!-- <el-button type="text">下载采购单 </el-button> -->
                            <el-button class="paystatus-primary" type="text">上传凭证 </el-button>
                        </template>
                        <template v-if="isPayStatusNotPay(scope.row)">
                            <el-button class="paystatus-primary" type="text">去支付 </el-button>
                            <el-button
                                @click="handleCancel(scope.row.orderId, scope.row.orderSn)"
                                class="paystatus-red"
                                type="text"
                                style="margin-right: 10px"
                                >取消
                            </el-button>
                        </template>
                        <template v-if="isPayStatusFinish(scope.row)">
                            <el-button
                                class="paystatus-primary"
                                style="margin-right: 10px"
                                type="text"
                                v-if="!scope.row.invId"
                                @click="handleOpenInvoice(scope.row)"
                            >
                                去开票
                            </el-button>
                        </template>
                        <!-- <template v-if="isPayStatusChecking(scope.row)">
                            <el-button type="text">查看详情 </el-button>
                        </template> -->
                        <template v-if="isPayStatusFailure(scope.row)">
                            <el-button
                                @click="handleShowUpload(scope.row)"
                                class="paystatus-primary"
                                type="text"
                                style="margin-right: 10px"
                                >重新上传
                            </el-button>
                        </template>
                        <router-link
                            class="paystatus-primary"
                            :to="`/user/deal/order/${scope.row.orderId}`"
                        >
                            <el-button class="paystatus-primary" type="text"> 查看详情 </el-button>
                        </router-link>
                    </template>
                </el-table-column>
            </el-table>
            <pagination
                v-show="total > 0"
                :total="total"
                :page="queryParams.pageNum"
                :limit="queryParams.pageSize"
                @page="asyncPageNumber"
                @limit="asyncPageSize"
                @pagination="handlePagination"
            />
        </el-card>
    </div>
    <DialogAddInvoice
        :orderSn="currentOrder.orderSn"
        :orderAmount="currentOrder.orderAmount"
        :open="currentOrder.open"
        @on-close="currentOrder.open = false"
        @on-next="handleNext"
    />
    <DialogWithPayVou
        :orderId="payVoucher.orderId"
        :open="payVoucher.open"
        @on-close="payVoucher.open = false"
        @on-next="handleNext"
    />
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { Search } from '@element-plus/icons'
import { Order } from '@/@types'
import { ElMessageBox, ElMessage } from 'element-plus'
import { addDateRange, orderTypeToText, payStatusToText } from '@/common/utils'
import { getOrderList, getOrderCancel } from '@/api'
import DialogAddInvoice from '@/views/user/dealManagement/invoice/DialogAddInv.vue'
import DialogWithPayVou from '@/views/user/dealManagement/order/DialogWithPayVou.vue'

const loading = ref(true)
const openAdd = ref(false)
const list = ref<Array<Order.AsObject>>([])
const date = ref([])
const form = ref()
const total = ref()
const initQueryParams = {
    orderSn: '',
    payId: '',
    pageNum: 1,
    pageSize: 10,
    total: 0,
}
const queryParams = reactive(initQueryParams)
const currentOrder = reactive({
    open: false,
    orderId: 0,
    orderSn: '',
    orderAmount: 0,
})
const payVoucher = reactive({
    open: false,
    orderId: 0,
})
const handleShowUpload = (row: Order.AsObject) => {
    Object.assign(payVoucher, row)
    payVoucher.open = true
}

onMounted(() => {
    doQuery()
})
const handleNext = () => {
    currentOrder.open = false
    payVoucher.open = false
    doQuery()
}
const handleOpenInvoice = (row: Order.AsObject) => {
    Object.assign(currentOrder, row)
    currentOrder.open = true
}
const doQuery = async () => {
    try {
        const query = addDateRange(queryParams, date.value)
        const response = await getOrderList(query)
        loading.value = false
        list.value = response.data.rows
        total.value = response.data.total
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
    return payText === '支付中'
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

const handleCancel = async (id: number, name?: string) => {
    ElMessageBox.confirm(`确定取消订单${name}?`, '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
    })
        .then(() => getOrderCancel({ orderId: id }))
        .then((response) => {
            ElMessage({
                message: '操作成功',
                type: 'success',
            })
            doQuery()
        })
        .catch(() => {})
}

const doReset = () => {
    Object.assign(initQueryParams, queryParams)
    date.value = []
    form.value.resetFields()
    doQuery()
}
const handlePagination = (params: Order.Pagination) => {
    if (params.page) {
        queryParams.pageNum = params.page
    }
    if (params.limit) {
        queryParams.pageSize = params.limit
    }
    doQuery()
}
</script>

<style lang="scss" scoped>
.order {
    padding: 20px;
    .header {
        margin: 0;
    }
    .table {
        border: 1px solid #ddd;
    }
    .paystatus-primary {
        color: #4e9aeb;
        font-weight: normal;
    }
    .paystatus-red {
        color: #e62412;
        font-weight: normal;
    }
    .paystatus-black {
        color: #262626;
        font-weight: normal;
    }
    .paystatus-yellow {
        color: #ffa941;
        font-weight: normal;
    }
}
</style>
