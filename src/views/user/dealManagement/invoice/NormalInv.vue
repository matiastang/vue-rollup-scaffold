<template>
    <el-skeleton v-if="!form.invId" :rows="8" animated />
    <el-form v-else ref="NormalOnvoice" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="发票抬头" prop="invPayee">
            <el-input v-model="form.invPayee" placeholder="请输入发票抬头"></el-input>
        </el-form-item>
        <el-form-item label="发票税号" prop="invPayeeNumber">
            <el-input v-model="form.invPayeeNumber" placeholder="请输入发票税号"></el-input>
        </el-form-item>
        <el-form-item
            v-if="form.invType === 2"
            label="银行账号"
            :prop="form.invType === 2 && 'bankNo'"
        >
            <el-input v-model="form.bankNo" placeholder="请输入银行账号"></el-input>
        </el-form-item>
        <el-form-item
            v-if="form.invType === 2"
            label="开户银行"
            :prop="form.invType === 2 && 'bank'"
        >
            <el-input v-model="form.bank" placeholder="请输入开户银行"></el-input>
        </el-form-item>
        <el-form-item label-width="0">
            <div class="tips">
                <strong>收件信息</strong>
            </div>
        </el-form-item>
        <el-form-item label="收件人" prop="consignee">
            <el-input v-model="form.consignee" placeholder="请输入收件人"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="contact">
            <el-input v-model="form.contact" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="邮寄地址" prop="address">
            <el-input v-model="form.address" placeholder="请输入邮寄地址"></el-input>
        </el-form-item>
        <el-form-item label="邮寄编号" prop="zipcode">
            <el-input v-model="form.zipcode" placeholder="请输入邮寄编号"></el-input>
        </el-form-item>
    </el-form>
    <el-row type="flex" justify="end" align="middle">
        <el-button type="primary" plain @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSumbit">确定</el-button>
    </el-row>
    <br />
</template>

<script setup>
import { ref, onMounted, reactive, useAttrs, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { getInv, postInvUpdate } from '@/api'
const attrs = useAttrs()
const form = reactive({})
const NormalOnvoice = ref()
const _props = defineProps({
    id: Number,
})
const props = reactive(_props)
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
    bankNo: [
        {
            required: true,
            message: '请输入银行账号',
            trigger: 'blur',
        },
    ],
    bank: [
        {
            required: true,
            message: '请输入开户银行',
            trigger: 'blur',
        },
    ],
})
const _emits = defineEmits(['on-close', 'on-next'])
onMounted(() => {
    doFetchDetail()
})
watch(
    () => props.id,
    () => {
        if (props.id) doFetchDetail()
    }
)
const handleSumbit = () => {
    NormalOnvoice.value.validate((valid) => {
        if (valid) {
            const params = {
                address: form.address,
                bank: form.bank,
                bankNo: form.bankNo,
                companyAddress: form.companyAddress,
                consignee: form.consignee,
                contact: form.contact,
                invContent: form.invContent,
                invId: form.invId,
                invPayee: form.invPayee,
                invPayeeNumber: form.invPayeeNumber,
                invType: form.invType,
                orderSn: form.target,
                tel: form.tel,
                zipcode: form.zipcode,
            }
            postInvUpdate(params)
                .then((response) => {
                    ElMessage.success('操作成功')
                    _emits('on-next')
                })
                .catch((err) => {
                    throw err
                })
        }
    })
}

const handleClose = () => {
    NormalOnvoice.value.resetFields()
    _emits('on-close')
}
const doFetchDetail = () => {
    getInv(props.id).then((response) => {
        Object.assign(form, response)
        form.address = ''
        Object.assign(form, response.address)
    })
}
</script>

<style lang="scss" scoped>
.tips {
    border-bottom: 1px solid #ddd;
}
</style>
