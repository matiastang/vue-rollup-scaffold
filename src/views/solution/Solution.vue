<!--
 * @Author: your name
 * @Date: 2021-11-08 16:10:50
 * @LastEditTime: 2021-11-09 16:19:05
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/views/solution/Solution.vue
-->
<template>
    <div class="about">
        <h1>功能开发中</h1>
        <h1 @click="showLoginModel">未登录弹窗</h1>
        <h1 @click="showAuthenticationModel">未认证弹窗</h1>
        <h1 @click="showBugModel">套餐过期弹窗</h1>
        <h1 @click="showOverdueModel">已申请试用过弹窗</h1>
        <h1 @click="showNSFModel">余额不足弹窗</h1>
        <h1 @click="showApplyTrialModel">申请试用弹窗</h1>
        <LoginModel v-model="loginDialogVisible" />
        <OpenalphaModel
            v-model="authenticationDialogVisible"
            title="您还未实名认证，无法申请试用套餐"
            okText="立即认证"
            :hiddenCancel="true"
        />
        <OpenalphaModel
            v-model="buyDialogVisible"
            title="您的优惠套餐已过期，请重新购买"
            okText="立即购买"
            :hiddenCancel="true"
        />
        <OpenalphaModel
            v-model="overdueDialogVisible"
            title="您已经申请过试用套餐，不能再次申请"
            okText="立即充值"
            cancelText="购买套餐"
        />
        <OpenalphaModel
            v-model="nsfDialogVisible"
            title="您的账户余额不足，请先充值"
            okText="立即充值"
            cancelText="申请试用"
            :cancelStyle="{ color: '#8C8C8C', border: '1px solid #8C8C8C', background: 'white' }"
        />
        <ApplyTrialModel v-model="applyTrialDialogVisible" />
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginModel from '@/components/loginModel/LoginModel.vue'
import OpenalphaModel from '@/components/openalphaModel/OpenalphaModel.vue'
import ApplyTrialModel from '@/components/applyTrialModel/ApplyTrialModel.vue'

export default defineComponent({
    name: 'Solution',
    setup() {
        let loginDialogVisible = ref(false)
        const showLoginModel = () => {
            loginDialogVisible.value = true
        }
        let authenticationDialogVisible = ref(false)
        const showAuthenticationModel = () => {
            authenticationDialogVisible.value = true
        }
        let buyDialogVisible = ref(false)
        const showBugModel = () => {
            buyDialogVisible.value = true
        }
        let overdueDialogVisible = ref(false)
        const showOverdueModel = () => {
            overdueDialogVisible.value = true
        }
        let nsfDialogVisible = ref(false)
        const showNSFModel = () => {
            nsfDialogVisible.value = true
        }
        let applyTrialDialogVisible = ref(false)
        const showApplyTrialModel = () => {
            applyTrialDialogVisible.value = true
        }
        return {
            loginDialogVisible,
            showLoginModel,
            authenticationDialogVisible,
            showAuthenticationModel,
            buyDialogVisible,
            showBugModel,
            overdueDialogVisible,
            showOverdueModel,
            nsfDialogVisible,
            showNSFModel,
            applyTrialDialogVisible,
            showApplyTrialModel,
        }
    },
    components: {
        LoginModel,
        OpenalphaModel,
        ApplyTrialModel,
    },
})
</script>

<style lang="scss" scoped></style>
