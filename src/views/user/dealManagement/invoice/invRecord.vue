<template>
    <div>
        <el-form ref="form" :model="queryParams" inline label-width="70px">
            <el-row>
                <el-col :span="22">
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
                        <el-button @click="doQuery" size="mini" type="primary" plain
                            >查询</el-button
                        >
                        <el-button @click="doReset" size="mini" plain>重置</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="2">
                    <el-row type="flex" justify="end">
                        <el-form-item label="" label-width="0">
                            <el-button type="text" size="mini" @click="open = true"
                                >开票说明</el-button
                            >
                        </el-form-item>
                    </el-row>
                </el-col>
            </el-row>
        </el-form>
    </div>
    <div>
        <el-skeleton v-if="loading" :rows="5" animated />
        <el-table
            size="mini"
            v-else
            :header-cell-style="{
                background: '#e9e9e9',
            }"
            :data="list.value"
            stripe
            class="table"
        >
            <el-table-column label="发票编号" :min-width="120" align="center" prop="invNo" />
            <el-table-column label="发票抬头" align="center" prop="invPayee" />
            <el-table-column
                label="发票类型"
                :width="140"
                show-overflow-tooltip
                align="center"
                prop="invType"
            >
                <template #default="scope">
                    {{ invTypeToText(scope.row.invType) }}
                </template>
            </el-table-column>
            <el-table-column
                label="发票内容"
                :width="150"
                show-overflow-tooltip
                align="center"
                prop="invContent"
            />
            <el-table-column label="发票金额(元)" align="center" prop="tax" />
            <el-table-column label="开票时间" align="center" prop="applyTime" />
            <el-table-column label="发票状态" align="center" prop="status">
                <template #default="scope">
                    <div
                        :class="{
                            'status-yellow ': scope.row.status === 0,
                            'status-green ': scope.row.status === 2,
                            'status-red ': scope.row.status === 6,
                        }"
                    >
                        {{ invStatesToText(scope.row.status) }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作" :width="140" align="center" prop="status">
                <template #default="scope">
                    <el-button
                        class="status-primary"
                        @click="handleUpdateInv(scope.row)"
                        type="text"
                        >修改</el-button
                    >
                    <el-button type="text">
                        <router-link
                            class="status-primary"
                            :to="`/user/deal/invoice/${scope.row.invId}`"
                            >详情</router-link
                        >
                    </el-button>
                    <el-button @click="handleDeleteInv(scope.row)" type="text">删除</el-button>
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
    <InvoiceActionDialog
        :open="updateInv.open"
        :invId="updateInv.invId"
        :invType="updateInv.invType"
        @on-close="handleCloseInv"
        @on-next="handleNextInv"
    />
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { postInvList, deleteInv } from '@/api'
import { ElMessageBox } from 'element-plus'
import { invTypeToText, invStatesToText } from '@/common/utils'
import DialogTips from '@/views/user/dealManagement/invoice/DialogTips.vue'
import InvoiceActionDialog from '@/views/user/dealManagement/invoice/DialogAction.vue'

const loading = ref(true)
const list = reactive({ value: [] })
const date = reactive([])
const open = ref(false)
const total = ref(false)

const queryParams = reactive({
    orderSn: '',
    type: '',
    pageNum: 1,
    pageSize: 10,
    total: 0,
})

const updateInv = reactive({
    open: false,
    invId: '',
})
onMounted(() => {
    doQuery()
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
const handleUpdateInv = (row) => {
    Object.assign(updateInv, row)
    updateInv.open = true
}
const handleDeleteInv = (row) => {
    ElMessageBox.confirm(`确定删除${row.invNo ?? row.target}?`, '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
    })
        .then(() => deleteInv(row.invId))
        .then((response) => {
            ElMessage({
                message: '操作成功',
                type: 'success',
            })
            doQuery()
        })
        .catch(() => {})
}
const doQuery = () => {
    postInvList(queryParams)
        .then((data) => {
            Object.assign(list, { value: data.rows })
            total.value = data.total
            loading.value = false
        })
        .catch((err) => {
            loading.value = false
            throw err
        })
}
</script>

<style lang="scss" scoped>
.table {
    border: 1px solid #ddd;
}
.status-primary {
    color: #4e9aeb;
    font-weight: normal;
}
.status-red {
    color: #e62412;
    font-weight: normal;
}
.status-black {
    color: #262626;
    font-weight: normal;
}
.status-yellow {
    color: #ffa941;
    font-weight: normal;
}
.status-green {
    color: green;
    font-weight: normal;
}
</style>
