<!--
 * @Author: matiastang
 * @Date: 2021-11-15 17:22:45
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-25 12:08:11
 * @FilePath: /datumwealth-openalpha-front/src/components/changeMailModel/ChangeMailModel.vue
 * @Description: 修改有效
-->
<template>
    <div class="change-mail-model">
        <el-dialog :="$attrs" center>
            <div class="model-title defaultFont">
                {{ userInfo.email ? '修改邮箱' : '绑定邮箱' }}
            </div>
            <div v-if="userInfo.email" class="model-old-content flexRowCenter">
                <div class="model-old-phone-title defaultFont">原邮箱地址:</div>
                <div class="model-old-phone defaultFont">{{ userInfo.email }}</div>
            </div>
            <EmailInput
                v-model="inputEmail"
                phoneClass="model-phone-input"
                placeholder="请输入新邮箱地址"
            />
            <CodeInput
                v-model="inputCode"
                codeInputClass="model-code-input"
                placeholder="请输入邮箱验证码"
                @CodeInputGetCode="getCodeAction"
                ref="codeRef"
            />
            <div class="model-bottom flexRowCenter">
                <div class="model-cancel-button cursorP defaultFont" @click="modelCancelAction">
                    取消
                </div>
                <div class="model-ok-button cursorP defaultFont" @click="modelOkAction">确定</div>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, Ref } from 'vue'
import EmailInput from '@/components/emailInput/EmailInput.vue'
import CodeInput, { CodeInputRefTypes } from '@/components/codeInput/CodeInput.vue'
import ElMessage from '@/common/utils/message'
import { useStore } from 'store/index'
import { code_check, email_check } from 'utils/check/index'
import { sendEmail, changeEmail } from '@/common/request/modules/user/user'

export default defineComponent({
    name: 'ChangeMailModel',
    inheritAttrs: false,
    emits: {
        okAction: () => {
            return true
        },
        cancelAction: () => {
            return true
        },
    },
    setup(props, context) {
        let store = useStore()
        // 用户信息
        let userInfo = computed(() => store.state.userModule.userLoginInfo.member)
        let inputEmail = ref('')
        let inputCode = ref('')
        const modelOkAction = () => {
            // 邮箱校验
            let email = inputEmail.value
            let emailError = email_check(email)
            if (emailError) {
                ElMessage({
                    message: emailError,
                    type: 'warning',
                })
                return
            }
            // 验证码校验
            let code = inputCode.value
            let codeError = code_check(code)
            if (codeError) {
                ElMessage({
                    message: codeError,
                    type: 'warning',
                })
                return
            }
            // 获取id
            let userId = store.state.userModule.userLoginInfo.member.id
            if (!userId) {
                ElMessage({
                    message: '用户信息错误',
                    type: 'warning',
                })
                return
            }
            // 修改/绑定邮箱
            changeEmail({
                id: userId,
                email,
                code,
            })
                .then((res) => {
                    ElMessage({
                        message: res,
                        type: 'success',
                    })
                    store.commit('setEmail', email)
                    context.emit('cancelAction')
                })
                .catch((err) => {
                    ElMessage({
                        message: err.msg || '修改密码失败',
                        type: 'error',
                    })
                })
        }
        const modelCancelAction = () => {
            context.emit('cancelAction')
        }
        let codeRef: Ref<CodeInputRefTypes | null> = ref(null)
        // 获取验证码
        const getCodeAction = () => {
            // 邮箱校验
            let email = inputEmail.value
            let emailError = email_check(email)
            if (emailError) {
                ElMessage({
                    message: emailError,
                    type: 'warning',
                })
                return
            }
            // 启动到计时
            if (codeRef.value) {
                codeRef.value.runCountDown()
            }
            // 获取邮箱验证码
            sendEmail(email)
                .then((res) => {
                    ElMessage({
                        message: res,
                        type: 'success',
                    })
                })
                .catch((err) => {
                    ElMessage({
                        message: err.msg || '邮箱验证码发送失败',
                        type: 'error',
                    })
                })
        }
        return {
            userInfo,
            inputEmail,
            inputCode,
            modelCancelAction,
            modelOkAction,
            getCodeAction,
            codeRef,
        }
    },
    components: {
        EmailInput,
        CodeInput,
    },
})
</script>

<style lang="scss" scoped>
.change-mail-model {
    ::v-deep(.el-dialog) {
        width: 576px;
        background: $themeBgColor;
        box-shadow: 0px 2px 32px 0px rgba(104, 104, 104, 0.5);
        border-radius: 8px;
    }
    ::v-deep(.el-dialog__header) {
        padding: 25px 25px 0px 25px;
        width: 100%;
        height: 41px;
        box-sizing: border-box;
        button {
            width: 16px;
            height: 16px;
            top: 25px;
            right: 25px;
        }
    }
    ::v-deep(.el-dialog__body) {
        padding: 0px 25px 40px 25px;
        .model-title {
            height: 41px;
            width: 100%;
            font-size: fontSize(18px);
            color: $titleColor;
            line-height: 40px;
            text-align: left;
            border-bottom: 1px solid #dfdfdf;
        }
        .model-old-content {
            margin-top: 23px;
            justify-content: flex-start;
            .model-old-phone-title {
                font-size: fontSize(16px);
                color: $titleColor;
                line-height: 24px;
                margin-right: 12px;
            }
            .model-old-phone {
                font-size: fontSize(14px);
                color: #595959;
                line-height: 20px;
            }
        }
        .model-phone-input {
            margin-top: 30px;
            width: 539px;
            height: 56px;
            border: 1px solid #bfbfbf;
        }
        .model-code-input {
            margin-top: 30px;
            width: 539px;
            height: 56px;
            border: 1px solid #bfbfbf;
        }
        .model-bottom {
            margin-top: 30px;
            justify-content: flex-end;
            .model-ok-button {
                width: 80px;
                height: 42px;
                background: $themeColor;
                border-radius: 4px;
                font-size: fontSize(16px);
                color: $themeBgColor;
                line-height: 42px;
                margin-left: 40px;
            }
            .model-cancel-button {
                width: 80px;
                height: 42px;
                background: $themeBgColor;
                border-radius: 4px;
                font-size: fontSize(16px);
                color: $placeholderColor;
                line-height: 42px;
                border: 1px solid $placeholderColor;
            }
        }
    }
    ::v-deep(.el-dialog__footer) {
        display: none;
    }
}
</style>
