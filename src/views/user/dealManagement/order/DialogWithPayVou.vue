<!--
 * @Author: matiastang
 * @Date: 2021-12-02 10:20:14
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-08 11:03:56
 * @FilePath: /datumwealth-openalpha-front/src/views/user/dealManagement/order/DialogWithPayVou.vue
 * @Description: 
-->
<template>
    <el-dialog
        v-model="open"
        width="526px"
        append-to-body
        @close="handleClose"
        :close-on-click-modal="false"
        custom-class="DialogWithPayVou"
    >
        <template #title>
            <div class="title">上传凭证</div>
        </template>
        <el-alert
            title="请确保图片包含清晰完整的转账人信息、收款人信息、汇款用途等"
            type="info"
            show-icon
        >
        </el-alert>
        <br />
        <ImageUpload :limit="1" @input="handleSuccess">
            <el-row type="flex" justify="center" align="middle">
                <Plus class="icon" />
                <strong>上传汇款凭证</strong>
            </el-row>
        </ImageUpload>
        <br />
        <el-row type="flex" justify="center">
            <el-button
                @click="handleSumbitPayVoucher"
                :disabled="loading"
                :loading="loading"
                class="sumbit"
                type="primary"
                >提交审核</el-button
            >
        </el-row>
    </el-dialog>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { postAddOrderVoucher } from '@/api'
import ElMessage from '@/common/utils/message'
import { Plus } from '@element-plus/icons'
// import ImageUpload from '@/components/ImageUpload'
const props = defineProps({
    open: Boolean,
    orderId: String,
})
const prop = reactive(props)
const loading = ref(false)
const payVoucher = ref('')
const emit = defineEmits(['on-close', 'on-next'])
const handleClose = () => emit('on-close')
const handleSumbitPayVoucher = () => {
    if (payVoucher.value) {
        loading.value = true
        postAddOrderVoucher({
            payVoucher: payVoucher.value,
            orderId: prop.orderId,
        })
            .then(() => {
                loading.value = false
                ElMessage.success('操作成功')
                emit('on-next')
            })
            .catch((err) => {
                loading.value = false
                throw err
            })
    }
}
const handleSuccess = (value) => {
    payVoucher.value = value
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
    .icon {
        height: 30px;
        width: 30px;
        @include fontWeightBold;
        margin-right: 10px;
    }
    .sumbit {
        width: 118px;
        font-size: 16px;
    }
}
</style>
