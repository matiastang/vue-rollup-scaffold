<template>
    <div class="Invoice">
        <el-card shadow="never">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="我的发票" name="first"></el-tab-pane>
                <el-tab-pane label="开票记录" name="second"></el-tab-pane>
            </el-tabs>
            <MyInvoice v-if="activeName === 'first'" />
            <InvoiceRecord v-else-if="activeName === 'second'" />
        </el-card>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import MyInvoice from '@/views/user/dealManagement/invoice/myInv.vue'
import InvoiceRecord from '@/views/user/dealManagement/invoice/invRecord.vue'
const activeName = ref('first')
</script>

<style lang="scss" scoped>
.Invoice {
    padding: 20px;
}
</style>
