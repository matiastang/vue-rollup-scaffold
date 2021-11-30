<template>
    <el-dialog
        v-model="open"
        width="725px"
        append-to-body
        @close="handleClose"
        :close-on-click-modal="false"
        custom-class="DialogAddInvoice"
    >
        <template #title>
            <div class="title">开发票</div>
        </template>
        <el-descriptions :column="1">
            <el-descriptions-item label="订单编号">
                <span>{{ orderSn }}</span>
            </el-descriptions-item>
            <el-descriptions-item label="发票类型">
                <div class="type">
                    <el-radio-group v-model="form.invType">
                        <el-radio :label="1">增值税普通发票</el-radio>
                        <el-radio :label="2">增值税专用发票</el-radio>
                        <!-- <el-radio :label="3">电子发票</el-radio> -->
                    </el-radio-group>
                </div>
            </el-descriptions-item>
            <el-descriptions-item label="发票金额"
                ><strong class="orderAmount">{{ orderAmount }}</strong></el-descriptions-item
            >
            <el-descriptions-item label="发票时间">{{ addTime || '-' }}</el-descriptions-item>
            <el-descriptions-item label="开具内容"
                ><el-input
                    style="width: 300px"
                    size="mini"
                    v-model="form.invContent"
                    placeholder="请输入内容"
                ></el-input
            ></el-descriptions-item>
        </el-descriptions>
        <el-form ref="SpecialOnvoice" :model="form" :rules="rules" label-width="80px">
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="tips">
                        <strong>发票信息</strong>
                    </div>
                    <el-form-item label="发票抬头" prop="invPayee">
                        <el-input
                            size="mini"
                            v-model="form.invPayee"
                            placeholder="请输入发票抬头"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="发票税号" prop="invPayeeNumber">
                        <el-input
                            size="mini"
                            v-model="form.invPayeeNumber"
                            placeholder="请输入发票税号"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="银行账号" prop="bankNo">
                        <el-input
                            size="mini"
                            v-model="form.bankNo"
                            placeholder="请输入银行账号"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="开户银行" prop="bank">
                        <el-input
                            size="mini"
                            v-model="form.bank"
                            placeholder="请输入开户银行"
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <div class="tips">
                        <strong>收件信息</strong>
                    </div>
                    <el-form-item label="收件人" prop="consignee">
                        <el-input
                            size="mini"
                            v-model="form.consignee"
                            placeholder="请输入收件人"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="contact">
                        <el-input
                            size="mini"
                            v-model="form.contact"
                            placeholder="请输入联系电话"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="邮寄地址" prop="address">
                        <el-input
                            size="mini"
                            v-model="form.address"
                            placeholder="请输入邮寄地址"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="邮寄编号" prop="zipcode">
                        <el-input
                            size="mini"
                            v-model="form.zipcode"
                            placeholder="请输入邮寄编号"
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
            <el-button type="primary" plain @click="handleClose">取消</el-button>
            <el-button type="primary" :disabled="loading" :loading="loading" @click="handleSumbit"
                >确定</el-button
            >
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue'
import { Invoic } from '@/@types'
import { postAddInv } from '@/api'
import { ElMessage } from 'element-plus'
const SpecialOnvoice = ref()
const loading = ref(false)
const form = reactive<Invoic.AddQuery>({
    invType: 1,
})
const rules = reactive({
    invPayee: [
        {
            required: true,
            message: '请输入发票抬头',
            trigger: 'blur',
        },
    ],
    invPayeeNumber: [
        {
            required: true,
            message: '请输入发票税号',
            trigger: 'blur',
        },
    ],
    consignee: [
        {
            required: true,
            message: '请输入收件人',
            trigger: 'blur',
        },
    ],
    contact: [
        {
            required: true,
            message: '请输入联系电话',
            trigger: 'blur',
        },
    ],
    address: [
        {
            required: true,
            message: '请输入邮寄地址',
            trigger: 'blur',
        },
    ],
    zipcode: [
        {
            required: true,
            message: '请输入邮寄编号',
            trigger: 'blur',
        },
    ],
})
const props = defineProps({
    open: Boolean,
    orderSn: String,
    orderAmount: String,
    orderId: String,
    addTime: String,
})
const data = reactive(props)
const emit = defineEmits(['on-close', 'on-next'])

const handleClose = () => emit('on-close')
const handleSumbit = () => {
    SpecialOnvoice.value.validate((valid: boolean) => {
        if (valid) {
            loading.value = true
            if (data.orderSn) form.orderSn = data.orderSn || ''
            postAddInv(form)
                .then(() => {
                    loading.value = false
                    ElMessage.success('操作成功')
                    emit('on-next')
                })
                .catch(() => {
                    loading.value = false
                })
        }
    })
}
</script>

<style lang="scss" scope>
.DialogAddInvoice {
    .el-dialog__header {
        border: 1px solid #ddd;
    }
    .type {
        display: inline-block;
    }
    .tips {
        border-bottom: 1px solid #ddd;
        height: 30px;
        margin: 10px;
    }
    .orderAmount {
        color: $themeColor;
    }
}
</style>
