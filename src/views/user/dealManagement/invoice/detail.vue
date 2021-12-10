<!--
 * @Author: matiastang
 * @Date: 2021-11-25 19:11:12
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-29 16:32:08
 * @FilePath: /datumwealth-openalpha-front/src/views/user/dealManagement/invoice/detail.vue
 * @Description: 
-->
<template>
    <el-skeleton v-if="loading" :rows="8" animated />
    <div class="app-container" v-else>
        <el-descriptions title="发票信息" :column="1">
            <template #extra>
                <el-button type="primary" size="mini" plain @click="handleGoBack">返回</el-button>
            </template>
            <el-descriptions-item label="客户账号">{{
                detail.member.userName
            }}</el-descriptions-item>
            <el-descriptions-item v-if="detail.member.realName" label="企业名称/姓名">{{
                detail.member.realName
            }}</el-descriptions-item>
            <el-descriptions-item v-if="detail.company" label="企业名称/姓名">{{
                detail.company
            }}</el-descriptions-item>
            <el-descriptions-item label="订单编号"> {{ detail.target }}</el-descriptions-item>
            <el-descriptions-item label="发票编号">{{ detail.invNo }}</el-descriptions-item>
            <el-descriptions-item label="提交日期">{{ detail.applyTime }}</el-descriptions-item>
            <el-descriptions-item
                v-if="detail.invoiceInfo"
                :label="detail.status === 5 ? '物流编号' : '卖家留言'"
                >{{ detail.invoiceInfo }}</el-descriptions-item
            >
            <el-descriptions-item v-if="detail.toBuyer" :label="'卖家留言'">{{
                detail.toBuyer
            }}</el-descriptions-item>
        </el-descriptions>
        <el-divider></el-divider>
        <el-descriptions :column="1">
            <el-descriptions-item label="开票金额">{{ detail.tax }}</el-descriptions-item>
            <el-descriptions-item label="开票内容">{{ detail.invContent }}</el-descriptions-item>
            <el-descriptions-item label="发票类型">{{
                invTypeToText(detail.invType)
            }}</el-descriptions-item>
            <el-descriptions-item label="发票抬头">{{ detail.invPayee }}</el-descriptions-item>
            <el-descriptions-item label="发票税号">{{
                detail.invPayeeNumber
            }}</el-descriptions-item>
            <el-descriptions-item v-if="detail.invType === 2" label="银行账号">{{
                detail.bankNo
            }}</el-descriptions-item>
            <el-descriptions-item v-if="detail.invType === 2" label="开户银行">{{
                detail.bank
            }}</el-descriptions-item>
            <el-descriptions-item v-if="detail.invType === 2" label="公司电话">{{
                detail.tel
            }}</el-descriptions-item>
            <el-descriptions-item v-if="detail.invType === 2" label="公司地址">{{
                detail.companyAddress
            }}</el-descriptions-item>
            <el-descriptions-item v-if="detail.remark" label="备注">{{
                detail.remark
            }}</el-descriptions-item>
        </el-descriptions>
        <el-divider v-if="detail.address"></el-divider>
        <el-descriptions v-if="detail.address" :column="1">
            <el-descriptions-item label="收件人">{{
                detail.address.consignee
            }}</el-descriptions-item>
            <el-descriptions-item label="联系方式">{{
                detail.address.contact
            }}</el-descriptions-item>
            <el-descriptions-item label="邮寄地址">{{
                detail.address.address
            }}</el-descriptions-item>
            <el-descriptions-item label="邮寄编码">{{
                detail.address.zipcode
            }}</el-descriptions-item>
        </el-descriptions>
    </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getInv } from '@/api'
import { invTypeToText } from '@/common/utils'
const route = useRoute()
const router = useRouter()
const detail = reactive({})
const loading = ref(true)
onMounted(() => {
    doFetchDetail()
})
const doFetchDetail = () => {
    loading.value = true
    const id = Number(route.params.id)
    getInv(id)
        .then((response) => {
            loading.value = false
            Object.assign(detail, response)
        })
        .catch((err) => {
            throw err
        })
}
const handleGoBack = () => {
    router.back()
}
</script>

<style scoped lang="scss">
.app-container {
    padding: 20px;
    background-color: white;
    ::v-deep(.el-descriptions__label)::after {
        content: ':';
    }
}
</style>
