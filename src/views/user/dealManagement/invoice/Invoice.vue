<template>
    <div class="Invoice">
        <el-card shadow="never">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="我的发票" name="first"><MyInvoice /></el-tab-pane>
                <el-tab-pane label="开票记录" name="second"><InvoiceRecord /></el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import MyInvoice from '@/views/user/dealManagement/invoice/myinvoice.vue'
import InvoiceRecord from '@/views/user/dealManagement/invoice/invoicerecord.vue'
const activeName = ref('first')
</script>

<style lang="scss" scoped>
.Invoice {
    padding: 20px;
}
</style>
