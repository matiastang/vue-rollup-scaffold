<template>
    <div class="order">
        <el-form ref="form" :model="queryParams" inline label-width="80px">
            <el-row type="flex" justify="center" align="middle">
                <el-col :span="22">
                    <el-form-item label="" label-width="0">
                        <el-input
                            v-model="queryParams.orderSn"
                            placeholder="订单编号"
                            @keyup.enter="doQuery"
                            @keyup.capture.enter="doQuery"
                        />
                    </el-form-item>
                    <el-form-item label="查询日期">
                        <el-date-picker
                            v-model="date"
                            type="daterange"
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            style="width: 240px"
                            format="YYYY-MM-DD"
                            value-format="YYYY-MM-DD"
                            @change="doQuery"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="支付方式">
                        <el-select
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
                        <el-button class="search-button" @click="doQuery" type="primary" plain
                            >查询</el-button
                        >
                        <el-button @click="doReset" plain>重置</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="2">
                    <el-row style="align-self: flex-start" type="flex" justify="end" align="start">
                        <el-form-item>
                            <el-button
                                :disabled="currentOrder.orderSn"
                                @click="currentOrder.open = true"
                                type="primary"
                                style="color: white; background: #d65928"
                                plain
                                >开发票</el-button
                            >
                        </el-form-item>
                    </el-row>
                </el-col>
            </el-row>
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
                size="mini"
                height="60vh"
                :data="list"
                class="table"
                stripe
                @selection-change="handleSelectionChange"
            >
                <el-table-column :selectable="disableSelect" type="selection" width="55" />
                <el-table-column
                    prop="orderSn"
                    label="账单编号"
                    show-overflow-tooltip
                    width="180"
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
                                    scope.row.payVoucher
                                )
                            }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="orderType" label="类型" width="120" show-overflow-tooltip>
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

                <el-table-column prop="address" fixed="right" label="操作" width="280px">
                    <template #default="scope">
                        <router-link
                            class="paystatus-primary"
                            style="margin-right: 10px"
                            :to="`/user/deal/order/${scope.row.orderId}`"
                        >
                            <el-button class="paystatus-primary" type="text"> 详情 </el-button>
                        </router-link>
                        <template v-if="isPayStatusInUpload(scope.row)">
                            <el-button
                                type="text"
                                style="margin-right: 10px"
                                @click="handleDownload(scope.row)"
                                >下载采购单
                            </el-button>
                            <el-button
                                class="paystatus-primary"
                                style="margin-right: 10px"
                                type="text"
                                @click="handleShowUpload(scope.row)"
                                >上传凭证
                            </el-button>
                            <el-button
                                @click="handleCancel(scope.row.orderId, scope.row.orderSn)"
                                class="paystatus-red"
                                type="text"
                                style="margin-right: 10px"
                                >取消
                            </el-button>
                        </template>
                        <template v-if="isPayStatusNotPay(scope.row)">
                            <el-button
                                class="paystatus-primary"
                                type="text"
                                @click="payAction(scope.row)"
                                >去支付
                            </el-button>
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
                        <el-button
                            class="paystatus-red"
                            style="margin-right: 10px"
                            type="text"
                            v-if="scope.row.orderStatus === 2"
                            @click="handleDeleteInvoice(scope.row)"
                        >
                            删除
                        </el-button>
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
    <WeixinModel
        :price="orderInfo.orderAmount"
        :order="orderInfo.orderId"
        :codeUrl="orderInfo.codeUrl"
        :orderType="orderInfo.orderType"
        :orderSn="orderInfo.orderSn"
        v-model="weixinDialogVisible"
        @statusChange="doQuery"
        @close="weixinPayClose"
    />
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { Search } from '@element-plus/icons'
import { Order } from '@/@types'
import { ElMessageBox } from 'element-plus'
import ElMessage from '@/common/utils/message'
import { addDateRange, orderTypeToText, payStatusToText } from '@/common/utils'
import { getOrderList, getOrderCancel, getDeleteOrder, getDownloadOrder } from '@/api'
import WeixinModel from '@/components/weixinModel/WeixinModel.vue'
import DialogAddInvoice from '@/views/user/dealManagement/invoice/DialogAddInv.vue'
import DialogWithPayVou from '@/views/user/dealManagement/order/DialogWithPayVou.vue'
import { RejectType } from '@/common/request/request'

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
onMounted(() => {
    doQuery()
})
const handleDeleteInvoice = (row: Order.AsObject) => {
    ElMessageBox.confirm(`确定删除订单${row.orderSn}?`, '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
    })
        .then(() => getDeleteOrder({ orderId: row.orderId }))
        .then((response) => {
            ElMessage({
                message: '操作成功',
                type: 'success',
            })
            doQuery()
        })
        .catch((err: RejectType) => {
            const msg = err.msg
            if (msg.trim() !== '') {
                ElMessage.error(msg)
            }
        })
}
const handleDownload = (row: Order.AsObject) => {
    console.log(row)
    debugger
    if (row.orderId) {
        getDownloadOrder(row.orderSn || '', row.orderId).then((response) => {
            if (response) {
                const blob = new Blob([response as BlobPart])
                // 3.创建一个临时的url指向blob对象
                const url = window.URL.createObjectURL(blob)
                // 4.创建url之后可以模拟对此文件对象的一系列操作，例如：预览、下载
                const a = document.createElement('a')
                a.href = url
                a.download = `${row.orderSn}.pdf`
                a.click()
                // 5.释放这个临时的对象url
                window.URL.revokeObjectURL(url)
            }
        })
    }
}
const handleShowUpload = (row: Order.AsObject) => {
    Object.assign(payVoucher, row)
    payVoucher.open = true
}
const disableSelect = (row: Order.AsObject) => Boolean(!row.invId) && isPayStatusFinish(row)

const handleSelectionChange = (row: Array<Order.AsObject>) => {
    currentOrder.orderSn = row.map((it) => it.orderSn).toString()
    currentOrder.orderAmount = row
        .map((it) => it.orderAmount || 0)
        .reduce((curr, next) => curr + next, 0)
}
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
        list.value = response.rows
        total.value = response.total
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
        .catch((err: RejectType) => {
            const msg = err.msg
            if (msg.trim() !== '') {
                ElMessage.error(msg)
            }
        })
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
/**
 * 支付相关
 */
import { paySubmit } from '@/common/request'
import { useRouter } from 'vue-router'
const router = useRouter()
const weixinDialogVisible = ref(false)
// 支付信息
const orderInfo = reactive({} as Order.OrderObject)
// 去支付
const payAction = async (order: Order.AsObject) => {
    const orderId = order.orderId
    const payId = order.payId
    if (!orderId || !payId) {
        ElMessage.error('支付id或订单id错误')
        return
    }
    try {
        const info = await paySubmit(orderId, payId)
        if (order.payId === 1) {
            const codeUrl = info.codeUrl
            if (!codeUrl) {
                ElMessage.error('支付地址错误')
                return
            }
            orderInfo.orderId = orderId
            orderInfo.orderAmount = order.orderAmount
            orderInfo.orderType = order.OrderType
            orderInfo.orderSn = info.orderSn
            orderInfo.codeUrl = codeUrl
            weixinPay()
        } else {
            const payUrl = info.payUrl
            if (!payUrl) {
                ElMessage.error('支付地址错误')
                return
            }
            alipay(payUrl)
        }
    } catch (error: any) {
        ElMessage.error(error.msg || '支付错误')
    }
}
/**
 * 微信支付相关
 */
const weixinPay = () => {
    weixinDialogVisible.value = true
}
const weixinPayClose = () => {
    orderInfo.codeUrl = ''
    orderInfo.orderSn = ''
    orderInfo.orderId = -1
}
/**
 * 支付宝支付相关
 */
const alipay = (payUrl: string) => {
    let routerData = router.resolve({
        path: '/alipay',
        query: { payUrl },
    })
    window.open(routerData.href, '_blank')
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
    :deep(.search-button) {
        color: $themeColor;
        background: transparent;
    }
    :deep(.search-button:hover) {
        color: $themeBgColor;
        background: $themeColor;
    }
}
</style>
