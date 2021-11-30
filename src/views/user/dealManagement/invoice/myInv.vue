<template>
    <el-row :gutter="20" class="row">
        <el-col :span="8" class="cell">
            <el-skeleton v-if="loadingInv" :rows="5" animated />
            <el-descriptions v-else title="发票信息" :column="1">
                <!-- <template #extra>
                    <el-button
                        class="status-primary"
                        type="text"
                        size="small"
                        @click="handleUpdateInv"
                        >修改发票信息</el-button
                    >
                </template> -->
                <el-descriptions-item label="发票抬头">{{
                    lastInvoice.invPayee
                }}</el-descriptions-item>
                <el-descriptions-item label="发票税号">{{
                    lastInvoice.invPayeeNumber
                }}</el-descriptions-item>
                <el-descriptions-item v-if="lastInvoice.invType === 2" label="银行账号">{{
                    lastInvoice.bankNo || '-'
                }}</el-descriptions-item>
                <el-descriptions-item v-if="lastInvoice.invType === 2" label="开户银行">
                    {{ lastInvoice.bank || '-' }}</el-descriptions-item
                >
            </el-descriptions>
        </el-col>
        <el-col :span="8" class="cell">
            <el-skeleton v-if="loadingInv" :rows="5" animated />
            <el-descriptions v-else v-show="lastInvoice.address" title="收件信息" :column="1">
                <!-- <template #extra>
                    <el-button
                        class="status-primary"
                        type="text"
                        size="small"
                        @click="handleUpdateInv"
                        >修改收件信息</el-button
                    >
                </template> -->
                <el-descriptions-item label="收件人">{{
                    lastInvoice.address.consignee
                }}</el-descriptions-item>
                <el-descriptions-item label="联系电话">{{
                    lastInvoice.address.contact
                }}</el-descriptions-item>
                <el-descriptions-item label="邮寄地址">{{
                    lastInvoice.address.address
                }}</el-descriptions-item>
                <el-descriptions-item label="邮寄编号">
                    {{ lastInvoice.address.zipcode }}</el-descriptions-item
                >
            </el-descriptions>
        </el-col>
        <!-- <div class="invoice-list-add" @click="openAction = true">
            <Plus class="icon" />&nbsp;新增开票信息
        </div> -->
    </el-row>
    <p class="tips">
        <strong class="order-count">{{ currentOrder.orderSn }}</strong
        >，发票金额共计: <strong>{{ currentOrder.orderAmount }}元</strong>
    </p>

    <el-form ref="form" :model="queryParams" inline label-width="70px">
        <el-row type="flex" justify="center" align="middle">
            <el-col :span="20">
                <el-form-item label="" label-width="0">
                    <el-input
                        v-model="queryParams.orderSn"
                        placeholder="订单编号"
                        :suffix-icon="Search"
                        @keyup.enter="doQuery"
                        size="mini"
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
                        size="mini"
                    >
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="" label-width="0">
                    <el-button size="mini" @click="doQuery" type="primary" plain>查询</el-button>
                    <el-button size="mini" @click="doReset" plain>重置</el-button>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-row type="flex" justify="end" align="middle">
                    <el-form-item label="" label-width="0">
                        <el-button size="mini" @click="open = true" type="text">开票说明</el-button>
                        <el-button
                            size="mini"
                            :disabled="currentOrder.orderSn"
                            type="primary"
                            @click="currentOrder.open = true"
                            >开发票</el-button
                        >
                    </el-form-item>
                </el-row>
            </el-col>
        </el-row>
    </el-form>
    <div>
        <el-skeleton v-if="loading" :rows="5" animated />
        <el-table
            v-else
            :header-cell-style="{
                background: '#e9e9e9',
            }"
            height="45vh"
            :data="list.value"
            class="table"
            stripe
            size="mini"
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" :selectable="disableSelect" width="55" />
            <el-table-column prop="orderSn" label="账单编号" show-overflow-tooltip width="180" />
            <el-table-column prop="orderType" label="类型" show-overflow-tooltip>
                <template #default="scope">{{ orderTypeToText(scope.row.orderType) }} </template>
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
            <el-table-column prop="addTime" :width="180" label="订单时间" show-overflow-tooltip />
            <el-table-column prop="address" label="操作">
                <template #default="scope">
                    <el-button
                        v-if="!scope.row.invId"
                        type="text"
                        @click="handleOpenInvoice(scope.row)"
                        >去开票
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
    <InvoiceTipsDialog :open="open" @on-close="open = false" />
    <InvoiceActionDialog
        :open="updateInv.open"
        :invId="updateInv.invId"
        :invType="updateInv.invType"
        @on-close="handleCloseInv"
        @on-next="handleNextInv"
    />
    <DialogAddInvoice
        :orderSn="currentOrder.orderSn"
        :orderAmount="currentOrder.orderAmount"
        :open="currentOrder.open"
        @on-close="currentOrder.open = false"
        @on-next="handleNext"
    />
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { Order } from '@/@types'
import { Plus } from '@element-plus/icons'
import InvoiceTipsDialog from '@/views/user/dealManagement/invoice/DialogTips.vue'
import InvoiceActionDialog from '@/views/user/dealManagement/invoice/DialogAction.vue'
import DialogAddInvoice from '@/views/user/dealManagement/invoice/DialogAddInv.vue'
import { addDateRange, orderTypeToText, payStatusToText } from '@/common/utils'
import { getOrderList, postInvList } from '@/api'

const loading = ref(true)
const loadingInv = ref(true)
const open = ref(false)
const openAction = ref(false)
const openAdd = ref(false)
const list = reactive({ value: [] })
const date = ref([])
const total = ref([])
const queryParams = reactive({
    orderSn: '',
    type: '',
    pageNum: 1,
    pageSize: 10,
    total: 0,
    payStatus: 2,
})
const currentOrder = reactive({
    open: false,
    orderId: 0,
    orderSn: '',
    orderAmount: 0,
})
const lastInvoice = reactive({})
const updateInv = reactive({
    open: false,
    invId: '',
})

onMounted(() => {
    doQuery()
    doFetchInvLastInfo()
})
const handleNextInv = () => {
    handleCloseInv()
    doFetchInvLastInfo()
}
const handleCloseInv = () => {
    Object.assign(updateInv, {
        open: false,
        invId: '',
    })
}
const handleUpdateInv = () => {
    Object.assign(updateInv, lastInvoice)
    updateInv.open = true
}
const doFetchInvLastInfo = () => {
    loadingInv.value = true
    postInvList({ pageSize: 1 })
        .then((data) => {
            Object.assign(lastInvoice, data.rows[0])
            loadingInv.value = false
        })
        .catch((err) => {
            loadingInv.value = false
            throw err
        })
}
const handleNext = () => {
    currentOrder.open = false
    doQuery()
}
const disableSelect = (row: Order.AsObject) => Boolean(!row.invId)

const handleSelectionChange = (row: Array<Order.AsObject>) => {
    currentOrder.orderSn = row.map((it) => it.orderSn).toString()
    currentOrder.orderAmount = row
        .map((it) => it.orderAmount || 0)
        .reduce((curr, next) => curr + next, 0)
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
        Object.assign(list, { value: response.rows })
        total.value = response.total
    } catch (error) {
        loading.value = false
        throw error
    }
}
</script>

<style lang="scss" scoped>
.table {
    border: 1px solid rgba($color: #dfdfdf, $alpha: 0.4);
}
.row {
    border-bottom: 1px solid rgba($color: #dfdfdf, $alpha: 0.4);
}
.cell {
    border-right: 1px solid rgba($color: #dfdfdf, $alpha: 0.4);

    ::v-deep(.el-descriptions__title) {
        // font-size: 18px;
        font-weight: 400;
        color: #262626;
        line-height: 25px;
        letter-spacing: 1px;
    }
    ::v-deep(.el-descriptions__header) {
        margin-bottom: 12px;
    }
    ::v-deep(.el-descriptions :not(.is-bordered) .el-descriptions__cell) {
        padding-bottom: 3px;
    }
    ::v-deep(.el-descriptions__label:not(.is-bordered-label)) {
        // font-size: 14px;
        font-weight: 400;
        color: #8c8c8c;
        line-height: 20px;
        letter-spacing: 1px;
    }
    ::v-deep(.el-descriptions__body .el-descriptions__table .el-descriptions__cell.is-left) {
        // font-size: 14px;
        font-weight: 400;
        color: #262626;
        line-height: 20px;
        letter-spacing: 1px;
    }
}
.tips {
    height: 20px;
    font-size: 14px;
    font-weight: 400;
    color: #8c8c8c;
    line-height: 20px;
    letter-spacing: 1px;
    strong {
        height: 24px;
        font-size: 16px;
        font-weight: 500;
        color: #d65928;
    }
    // .order-count::before {
    //     content: ' | ';
    //     color: #8c8c8c;
    //     font-size: 14px;
    //     font-weight: 400;
    // }
}
.status-primary {
    color: #4e9aeb;
    font-weight: normal;
}
</style>
