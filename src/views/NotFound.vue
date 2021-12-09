<!--
 * @Author: your name
 * @Date: 2021-11-02 19:04:28
 * @LastEditTime: 2021-12-09 12:09:58
 * @LastEditors: matiastang
 * @Description: In User Settings Edit
 * @FilePath: /datumwealth-openalpha-front/src/views/NotFound.vue
-->
<template>
    <div class="about">
        <div class="content flexColumnCenter">
            <!-- <el-icon :size="size" :color="color">
                <edit></edit>
            </el-icon> -->
            <div class="text">Not Found</div>
            <!-- <h1 @click="showLoginModel">未登录弹窗</h1>
            <h1 @click="showAuthenticationModel">未认证弹窗</h1>
            <h1 @click="showBugModel">套餐过期弹窗</h1>
            <h1 @click="showOverdueModel">已申请试用过弹窗</h1>
            <h1 @click="showNSFModel">余额不足弹窗</h1>
            <h1 @click="showApplyTrialModel">申请试用弹窗</h1> -->
        </div>

        <!-- <LoginModel v-model="loginDialogVisible" />
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
        <ApplyTrialModel v-model="applyTrialDialogVisible" /> -->
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
// import { defineComponent, ref } from 'vue'
// import LoginModel from '@/components/loginModel/LoginModel.vue'
// import OpenalphaModel from '@/components/openalphaModel/OpenalphaModel.vue'
// import ApplyTrialModel from '@/components/applyTrialModel/ApplyTrialModel.vue'
// import { Edit } from '@element-plus/icons'

export default defineComponent({
    name: 'Solution',
    setup() {
        // let loginDialogVisible = ref(false)
        // const showLoginModel = () => {
        //     loginDialogVisible.value = true
        // }
        // let authenticationDialogVisible = ref(false)
        // const showAuthenticationModel = () => {
        //     authenticationDialogVisible.value = true
        // }
        // let buyDialogVisible = ref(false)
        // const showBugModel = () => {
        //     buyDialogVisible.value = true
        // }
        // let overdueDialogVisible = ref(false)
        // const showOverdueModel = () => {
        //     overdueDialogVisible.value = true
        // }
        // let nsfDialogVisible = ref(false)
        // const showNSFModel = () => {
        //     nsfDialogVisible.value = true
        // }
        // let applyTrialDialogVisible = ref(false)
        // const showApplyTrialModel = () => {
        //     applyTrialDialogVisible.value = true
        // }
        return {
            // loginDialogVisible,
            // showLoginModel,
            // authenticationDialogVisible,
            // showAuthenticationModel,
            // buyDialogVisible,
            // showBugModel,
            // overdueDialogVisible,
            // showOverdueModel,
            // nsfDialogVisible,
            // showNSFModel,
            // applyTrialDialogVisible,
            // showApplyTrialModel,
        }
    },
    components: {
        // LoginModel,
        // OpenalphaModel,
        // ApplyTrialModel,
        // Edit,
    },
})
</script>

<style lang="scss" scoped>
.content {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .text {
        font-size: fontSize(14px);
        @include defaultFont;
        color: $placeholderColor;
        line-height: 20px;
        text-align: center;
    }
}
</style>
