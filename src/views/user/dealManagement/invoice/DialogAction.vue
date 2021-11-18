<template>
    <el-dialog
        v-model="open"
        width="526px"
        append-to-body
        @close="handleClose"
        custom-class="invoiceActionDialog"
    >
        <template #title>
            <div class="title">添加发票抬头</div>
        </template>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="普票" name="first"><NormalInv ref="normalOnvoice" /></el-tab-pane>
            <el-tab-pane label="专票" name="second"
                ><SpecialInv ref="specialOnvoice"
            /></el-tab-pane>
        </el-tabs>
        <template #footer>
            <el-button type="primary" plain @click="handleClose">取消</el-button>
            <el-button type="primary" @click="handleSumbit">确定</el-button>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import NormalInv from '@/views/user/dealManagement/invoice/NormalInv.vue'
import SpecialInv from '@/views/user/dealManagement/invoice/SpecialInv.vue'
defineProps({
    open: Boolean,
})
const activeName = ref('first')
const normalOnvoice = ref()
const specialOnvoice = ref()
const emit = defineEmits(['on-close'])
const handleClose = () => emit('on-close')
const handleSumbit = () => {
    console.log(normalOnvoice.value, specialOnvoice.value)
}
</script>

<style lang="scss" scope>
.invoiceActionDialog {
    .el-dialog__header {
        border: 1px solid #ddd;
    }
    .el-dialog__body {
        padding: 10px 20px;
    }
}
</style>
