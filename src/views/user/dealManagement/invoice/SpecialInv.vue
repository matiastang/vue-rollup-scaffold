<template>
    <el-form ref="SpecialOnvoice" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="发票抬头" prop="invPayee">
            <el-input v-model="form.invPayee" placeholder="请输入发票抬头"></el-input>
        </el-form-item>
        <el-form-item label="发票税号" prop="invPayeeNumber">
            <el-input v-model="form.invPayeeNumber" placeholder="请输入发票税号"></el-input>
        </el-form-item>
        <el-form-item label="银行账号" prop="blankNo">
            <el-input v-model="form.blankNo" placeholder="请输入银行账号"></el-input>
        </el-form-item>
        <el-form-item label="开户银行" prop="blank">
            <el-input v-model="form.blank" placeholder="请输入开户银行"></el-input>
        </el-form-item>
        <el-form-item label-width="0">
            <div class="tips">
                <strong>添加收件信息</strong>
            </div>
        </el-form-item>
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
            <el-input v-model="form.invoiceInfo" placeholder="请输入邮寄编号"></el-input>
        </el-form-item>
    </el-form>
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
    blankNo: [
        {
            required: true,
            message: '请输入银行账号',
            trigger: 'blur',
        },
    ],
    blank: [
        {
            required: true,
            message: '请输入开户银行',
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
</script>

<style lang="scss" scoped>
.tips {
    border-bottom: 1px solid #ddd;
}
</style>
