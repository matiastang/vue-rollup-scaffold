<!--
 * @Author: matiastang
 * @Date: 2021-11-18 17:44:47
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-08 11:00:34
 * @FilePath: /datumwealth-openalpha-front/src/views/user/dealManagement/invoice/DialogTips.vue
 * @Description: 
-->
<template>
    <el-dialog
        v-model="open"
        width="725px"
        append-to-body
        @close="handleClose"
        custom-class="invoiceTipsDialog"
    >
        <template #title>
            <div class="title">开票说明</div>
        </template>
        <ol>
            <li>充值金额大于300元即可开具发票。</li>

            <li>
                <el-row type="flex" justify="start" align="middle">
                    个人用户若需要开具增值税专用发票需下载
                    <el-link
                        href="https://datumwealth.oss-cn-chengdu.aliyuncs.com/doc/%E5%BC%80%E5%85%B7%E5%A2%9E%E5%80%BC%E7%A8%8E%E4%B8%93%E7%94%A8%E5%8F%91%E7%A5%A8%E4%BF%A1%E6%81%AF%E8%A1%A8.doc"
                        target="_blank"
                        rel="noopener noreferrer"
                        type="primary"
                    >
                        开具增值税专用发票.doc
                    </el-link>
                    加盖公章，即可申请
                </el-row>
            </li>
            <li>用户在提交开票申请之后，相关财务人员会在七个工作日内审核开具</li>
            <li>增值税专用发票请填写与上传附件内容一致的发票</li>
        </ol>
    </el-dialog>
</template>

<script setup lang="ts">
defineProps({
    open: Boolean,
})
const emit = defineEmits(['on-close'])

const handleClose = () => emit('on-close')
const downloadAction = () => {
    window.open(
        'https://datumwealth.oss-cn-chengdu.aliyuncs.com/doc/%E5%BC%80%E5%85%B7%E5%A2%9E%E5%80%BC%E7%A8%8E%E4%B8%93%E7%94%A8%E5%8F%91%E7%A5%A8%E4%BF%A1%E6%81%AF%E8%A1%A8.doc'
    )
}
</script>

<style lang="scss" scope>
.invoiceTipsDialog {
    .el-dialog__header {
        border: 1px solid #ddd;
    }
    .el-dialog__body {
        padding: 10px;
    }
    li {
        font-size: 14px;
        @include fontWeight;
        color: #262626;
        line-height: 20px;
        letter-spacing: 1px;
    }
}
</style>
