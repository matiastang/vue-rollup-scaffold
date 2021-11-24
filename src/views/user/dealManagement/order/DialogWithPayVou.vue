<template>
    <el-dialog
        v-model="open"
        width="526px"
        append-to-body
        @close="handleClose"
        custom-class="DialogWithPayVou"
    >
        <template #title>
            <div class="title">上传支付凭证</div>
        </template>
        <ImageUpload :limit="1" @input="handleSuccess" />
    </el-dialog>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { postAddOrderVoucher } from '@/api'
import { ElMessage } from 'element-plus'
// import ImageUpload from '@/components/ImageUpload'
const props = defineProps({
    open: Boolean,
    orderId: String,
})
const prop = reactive(props)
const url = ref('')
const loading = ref('')
const activeName = ref('first')
const DialogWithPayVou = ref()
const emit = defineEmits(['on-close', 'on-next'])
const handleClose = () => emit('on-close')
const handleSuccess = (payVoucher) => {
    if (payVoucher) {
        loading.value = true
        postAddOrderVoucher({
            payVoucher,
            orderId: prop.orderId,
        }).then((response) => {
            loading.value = false
            ElMessage.success('操作成功')
            emit('on-next')
        })
    }
}
</script>

<style lang="scss" scope>
.DialogWithPayVou {
    .el-dialog__header {
        border: 1px solid #ddd;
    }
    .el-dialog__body {
        padding: 10px 20px;
    }
}
</style>
