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
                    size="mini"
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
                border
                v-else
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
                <el-table-column prop="addTime" label="订单时间" show-overflow-tooltip />
                <el-table-column prop="PayStatus" label="支付状态">
                    <template #default="scope"
                        >{{ payStatusToText(scope.row.PayStatus) }}
                    </template>
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
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Search } from '@element-plus/icons'
import { ElMessageBox } from 'element-plus'
import { addDateRange, orderTypeToText, payStatusToText } from '@/common/utils'
import { getOrderList, getOrderCancel } from '@/api'

const loading = ref(true)
const list = ref([])
const date = ref([])
const form = ref()
const queryParams = ref({
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
        const query = addDateRange(queryParams.value, date.value)
        const response = await getOrderList(query)
        loading.value = false
        list.value = response.data.rows
    } catch (error) {
        loading.value = false
        throw error
    }
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
                queryParams.value.total = response.data.total
            } catch (error) {
                loading.value = false
                throw error
            }
        })
        .catch(() => {})
}
const doRest = () => {
    queryParams.value = {
        orderSn: '',
        type: '',
        pageNum: 1,
        pageSize: 10,
        total: 0,
    }
    date.value = []
    form.value.resetFields()
}
const asyncPageNumber = (count: number) => {
    queryParams.value.pageNum = count
}
const asyncPageSize = (count: number) => {
    queryParams.value.pageSize = count
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
