<template>
    <el-dialog
        v-model="open"
        width="526px"
        append-to-body
        @close="handleClose"
        custom-class="invoiceActionDialog"
    >
        <template #title>
            <div class="title">发票信息</div>
        </template>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :disabled="props.invType === 2" label="普票" name="first"></el-tab-pane>
            <el-tab-pane :disabled="props.invType === 1" label="专票" name="second"></el-tab-pane>
            <NormalInv
                :id="props.invId"
                @on-close="handleClose"
                @on-next="handleSumbit"
                ref="specialOnvoice"
            />
        </el-tabs>
    </el-dialog>
</template>

<script setup>
import { reactive, ref, watchEffect } from 'vue'
import NormalInv from '@/views/user/dealManagement/invoice/NormalInv.vue'
const _props = defineProps({
    open: Boolean,
    invId: Number,
    invType: Number,
})
const props = reactive(_props)
const activeName = ref('first')
const normalOnvoice = ref()
const specialOnvoice = ref()
watchEffect(() => {
    activeName.value = props.invType === 1 ? 'first' : 'second'
})

const emit = defineEmits(['on-close', 'on-next'])
const handleClose = () => emit('on-close')
const handleSumbit = () => emit('on-next')
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
