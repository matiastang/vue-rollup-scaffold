<!--
 * @Author: matiastang
 * @Date: 2021-11-15 17:06:17
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-15 17:42:16
 * @FilePath: /datumwealth-openalpha-front/src/components/changePhoneModel/ChangePhoneModel.vue
 * @Description: 修改手机号
-->
<template>
    <div class="change-phone-model">
        <el-dialog :="$attrs" center>
            <div class="model-title defaultFont">修改手机号</div>
            <div class="model-old-content flexRowCenter">
                <div class="model-old-phone-title defaultFont">原手机号:</div>
                <div class="model-old-phone defaultFont">18380440000</div>
            </div>
            <PhoneInput
                v-model="inputPhone"
                phoneClass="model-phone-input"
                placeholder="请输入新手机号码"
            />
            <CodeInput
                v-model="inputCode"
                codeInputClass="model-code-input"
                placeholder="请输入4位验证码"
                @getCode="getCodeAction"
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
import { defineComponent, ref } from 'vue'
import PhoneInput from '@/components/phoneinput/PhoneInput.vue'
import CodeInput from '@/components/codeInput/CodeInput.vue'
import { ElMessage } from 'element-plus'
import { phone_check, code_check } from 'utils/check/index'

export default defineComponent({
    name: 'ChangePhoneModel',
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
        let inputPhone = ref('')
        let inputCode = ref('')
        const modelOkAction = () => {
            // 手机号校验
            let phone = inputPhone.value
            let phoneError = phone_check(phone)
            if (phoneError) {
                ElMessage({
                    message: phoneError,
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
            context.emit('okAction')
        }
        const modelCancelAction = () => {
            context.emit('cancelAction')
        }
        // 获取验证码
        const getCodeAction = () => {
            console.log('获取验证码')
        }
        return {
            inputPhone,
            inputCode,
            modelCancelAction,
            modelOkAction,
            getCodeAction,
        }
    },
    components: {
        PhoneInput,
        CodeInput,
    },
})
</script>

<style lang="scss" scoped>
.change-phone-model {
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
        .model-old-content {
            margin-top: 23px;
            justify-content: flex-start;
            .model-old-phone-title {
                font-size: 16px;
                color: $titleColor;
                line-height: 24px;
                margin-right: 12px;
            }
            .model-old-phone {
                font-size: 14px;
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
