<!--
 * @Author: matiastang
 * @Date: 2021-11-15 16:31:59
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-06 11:19:37
 * @FilePath: /datumwealth-openalpha-front/src/components/changePasswordModel/ChangePasswordModel.vue
 * @Description: 修改密码弹窗
-->
<template>
    <div class="change-password-model">
        <el-dialog :="$attrs" center>
            <div class="model-title defaultFont">修改密码</div>
            <div class="model-content flexRowCenter">
                <div class="model-body-title defaultFont">原始密码:</div>
                <PasswordInput
                    v-model="oldInputPassword"
                    passwordClass="model-input"
                    placeholder="请输入原始密码"
                />
            </div>
            <div class="model-content flexRowCenter">
                <div class="model-body-title defaultFont">新建密码:</div>
                <PasswordInput
                    v-model="newInputPassword"
                    passwordClass="model-input"
                    placeholder="请输入新密码(8-20位数字和字母组合)"
                />
            </div>
            <div class="model-content flexRowCenter">
                <div class="model-body-title defaultFont">确认密码:</div>
                <PasswordInput
                    v-model="affirmNewInputPassword"
                    passwordClass="model-input"
                    placeholder="请再次输入新密码"
                />
            </div>
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
import { defineComponent, ref } from 'vue'
import PasswordInput from '@/components/passwordInput/PasswordInput.vue'
import ElMessage from '@/common/utils/message'
import { password_check } from 'utils/check/index'
import { changePassword } from '@/common/request/modules/user/user'
import { useStore } from 'store/index'

export default defineComponent({
    name: 'ChangePasswordModel',
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
        let oldInputPassword = ref('')
        let newInputPassword = ref('')
        let affirmNewInputPassword = ref('')
        const modelOkAction = () => {
            // 密码校验
            let oldPassword = oldInputPassword.value
            let oldPasswordError = password_check(oldPassword)
            if (oldPasswordError) {
                ElMessage({
                    message: oldPasswordError,
                    type: 'error',
                })
                return
            }
            // 密码校验
            let newPassword = newInputPassword.value
            let newPasswordError = password_check(newPassword, true)
            if (newPasswordError) {
                ElMessage({
                    message: newPasswordError,
                    type: 'error',
                })
                return
            }
            // 密码校验
            let affirmNewPassword = affirmNewInputPassword.value
            if (affirmNewPassword !== newPassword) {
                ElMessage({
                    message: '两次密码不一致',
                    type: 'error',
                })
                return
            }
            // 获取id
            let userId = store.state.userModule.userLoginInfo.member.id
            if (!userId) {
                ElMessage({
                    message: '用户信息错误',
                    type: 'error',
                })
                return
            }
            // 修改密码
            changePassword({
                id: userId,
                oldPassword,
                password: newPassword,
            })
                .then((res) => {
                    ElMessage({
                        message: res,
                        type: 'success',
                    })

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
        return {
            oldInputPassword,
            newInputPassword,
            affirmNewInputPassword,
            modelCancelAction,
            modelOkAction,
        }
    },
    components: {
        PasswordInput,
    },
})
</script>

<style lang="scss" scoped>
.change-password-model {
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
            font-size: 18px;
            color: $titleColor;
            line-height: 40px;
            text-align: left;
            border-bottom: 1px solid #dfdfdf;
        }
        .model-content {
            margin-top: 30px;
            justify-content: flex-start;
            .model-body-title {
                font-size: 16px;
                color: $titleColor;
                line-height: 24px;
                margin-right: 12px;
            }
            .model-input {
                width: 434px;
                height: 56px;
                border-radius: 2px;
                border: 1px solid #bfbfbf;
            }
        }
        .model-bottom {
            margin-top: 30px;
            justify-content: flex-end;
            .model-ok-button {
                width: 80px;
                height: 42px;
                background: $themeColor;
                border-radius: 4px;
                font-size: 16px;
                color: $themeBgColor;
                line-height: 42px;
                margin-left: 40px;
            }
            .model-cancel-button {
                width: 80px;
                height: 42px;
                background: $themeBgColor;
                border-radius: 4px;
                font-size: 16px;
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
