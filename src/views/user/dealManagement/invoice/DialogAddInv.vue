<template>
    <el-dialog
        v-model="open"
        width="725px"
        append-to-body
        @close="handleClose"
        custom-class="DialogAddInvoice"
    >
        <template #title>
            <div class="title">开发票</div>
        </template>
        <el-descriptions :column="1">
            <el-descriptions-item label="订单编号"
                >A20211012013003363848,B20211012013003363848</el-descriptions-item
            >
            <el-descriptions-item label="发票金额"
                ><strong>2,078,00078万元</strong></el-descriptions-item
            >
            <el-descriptions-item label="发票时间">2021-10-20</el-descriptions-item>
            <el-descriptions-item label="开具内容"
                ><el-input style="width: 200px" placeholder="请输入内容"></el-input
            ></el-descriptions-item>
        </el-descriptions>
        <el-form ref="SpecialOnvoice" :model="form" :rules="rules" label-width="80px">
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="tips">
                        <strong>发票信息</strong>
                    </div>
                    <el-form-item label="发票抬头" prop="invPayee">
                        <el-input v-model="form.invPayee" placeholder="请输入发票抬头"></el-input>
                    </el-form-item>
                    <el-form-item label="发票税号" prop="invPayeeNumber">
                        <el-input
                            v-model="form.invPayeeNumber"
                            placeholder="请输入发票税号"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="银行账号" prop="blankNo">
                        <el-input
                            v-model="form.invPayeeNumber"
                            placeholder="请输入银行账号"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="开户银行" prop="blank">
                        <el-input
                            v-model="form.invPayeeNumber"
                            placeholder="请输入开户银行"
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <div class="tips">
                        <strong>收件信息</strong>
                    </div>
                    <el-form-item label="收件人" prop="consignee">
                        <el-input v-model="form.invPayee" placeholder="请输入收件人"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="contact">
                        <el-input v-model="form.tel" placeholder="请输入联系电话"></el-input>
                    </el-form-item>
                    <el-form-item label="邮寄地址" prop="address">
                        <el-input v-model="form.address" placeholder="请输入邮寄地址"></el-input>
                    </el-form-item>
                    <el-form-item label="邮寄编号" prop="zipcode">
                        <el-input
                            v-model="form.invoiceInfo"
                            placeholder="请输入邮寄编号"
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
            <el-button type="primary" plain @click="handleClose">取消</el-button>
            <el-button type="primary" @click="handleSumbit">确定</el-button>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({})
const rules = ref({
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
defineProps({
    open: Boolean,
})
const emit = defineEmits(['on-close'])

const handleClose = () => emit('on-close')
</script>

<style lang="scss" scope>
.DialogAddInvoice {
    .el-dialog__header {
        border: 1px solid #ddd;
    }

    .tips {
        border-bottom: 1px solid #ddd;
        height: 30px;
        margin: 10px;
    }
}
</style>
