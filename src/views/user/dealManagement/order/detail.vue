<template>
    <div class="order-detail">
        <el-card shadow="never" v-loading="loading">
            <el-descriptions title="订单详情" :column="1">
                <el-descriptions-item label="订单编号"> {{ order.orderSn }}</el-descriptions-item>
                <el-descriptions-item v-if="order.orderType" label="订单类型">{{
                    order.orderType === 1 ? '充值' : '套餐'
                }}</el-descriptions-item>
                <el-descriptions-item label="套餐内容">{{ order.channel }}</el-descriptions-item>
                <el-descriptions-item label="订单金额">
                    {{ order.orderAmount }}
                </el-descriptions-item>
                <el-descriptions-item label="支付状态">{{
                    order.orderStatus
                }}</el-descriptions-item>
                <el-descriptions-item label="支付方式">{{ order.payName }}</el-descriptions-item>
                <el-descriptions-item label="下单时间">{{ order.addTime }}</el-descriptions-item>
                <el-descriptions-item label="支付时间">{{ order.payTime }}</el-descriptions-item>
                <el-descriptions-item label="支付凭证">
                    <a :href="order.payVoucher" target="_blank" rel="noopener noreferrer">
                        <img style="max-height: 200px" :src="order.payVoucher" alt="" />
                    </a>
                </el-descriptions-item>
            </el-descriptions>
            <el-divider v-if="order.member"></el-divider>
            <el-descriptions :column="1" v-if="order.member">
                <el-descriptions-item label="客户账号">{{
                    order.member?.userName
                }}</el-descriptions-item>
                <el-descriptions-item label="企业名称/姓名">{{
                    order.member?.userType === 1 ? order.member.realName : order.member.company
                }}</el-descriptions-item>
                <el-descriptions-item label="手机号码">{{
                    order.member?.phone
                }}</el-descriptions-item>
            </el-descriptions>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getOrderDetail } from '@/api'
import { Order } from '@/@types'
const loading = ref(true)
const order = reactive<Order.AsObject>({})
const router = useRoute()
onMounted(() => {
    init()
})

const init = () => {
    const id = Number(router.params.id)
    loading.value = true
    getOrderDetail(id).then((response) => {
        loading.value = false
        Object.assign(order, response.data)
    })
}
</script>

<style lang="scss" scoped>
.order-detail {
    padding: 20px;
}
</style>
