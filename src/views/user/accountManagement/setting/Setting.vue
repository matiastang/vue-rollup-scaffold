<!--
 * @Author: matiastang
 * @Date: 2021-11-11 17:28:34
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-08 11:21:59
 * @FilePath: /datumwealth-openalpha-front/src/views/user/accountManagement/setting/Setting.vue
 * @Description: 个人中心-账号管理-账号设置
-->
<template>
    <div class="setting">
        <div class="setting-content">
            <div class="setting-title defaultFont">账单明细</div>
            <div class="setting-info-content flexRowCenter">
                <div class="setting-info-left flexColumnCenter">
                    <div class="setting-info-item flexRowCenter">
                        <div class="setting-info-item-title defaultFont">登录账号:</div>
                        <div class="setting-info-item-text defaultFont">
                            {{ userInfo.userName || '-' }}
                        </div>
                    </div>
                    <div class="setting-info-item flexRowCenter">
                        <div class="setting-info-item-title defaultFont">手机号码:</div>
                        <div class="setting-info-item-text defaultFont">
                            {{ desensitizationPhone || '未设置' }}
                        </div>
                    </div>
                    <div class="setting-info-item flexRowCenter">
                        <div class="setting-info-item-title defaultFont">邮箱地址:</div>
                        <div class="setting-info-item-text defaultFont">
                            {{ desensitizationEmail || '未设置' }}
                        </div>
                    </div>
                </div>
                <div
                    v-if="!certStatus || certStatus !== 1"
                    class="setting-info-right-authentication flexRowCenter"
                >
                    <img
                        class="setting-authentication-left"
                        src="static/user/authentication_off.svg"
                    />
                    <div class="setting-authentication-right flexColumnCenter">
                        <div class="setting-authentication-title defaultFont">
                            您还没有实名认证哦~
                        </div>
                        <div
                            class="setting-authentication-button cursorP defaultFont"
                            @click="authenticationAction"
                        >
                            立即认证
                        </div>
                    </div>
                </div>
                <div
                    v-if="certStatus && certStatus === 1 && userType && userType === 2"
                    class="setting-info-right-authentication flexColumnCenter"
                >
                    <div class="setting-authentication-item flexRowCenter">
                        <div class="setting-authentication-title defaultFont">企业名称:</div>
                        <div class="setting-authentication-text defaultFont">
                            {{ userInfo.company || '-' }}
                        </div>
                        <div class="setting-authentication-status defaultFont">已认证</div>
                    </div>
                    <div class="setting-authentication-item flexRowCenter">
                        <div class="setting-authentication-title defaultFont">
                            统一社会信用代码:
                        </div>
                        <div class="setting-authentication-text defaultFont">
                            {{ userInfo.unifiedCreditCode || '-' }}
                        </div>
                    </div>
                </div>
                <div
                    v-if="certStatus && certStatus === 1 && userType && userType === 1"
                    class="setting-info-right-authentication flexColumnCenter"
                >
                    <div class="setting-authentication-item flexRowCenter">
                        <div class="setting-authentication-title defaultFont">姓名:</div>
                        <div class="setting-authentication-text defaultFont">
                            {{ userInfo.realName || '-' }}
                        </div>
                        <div class="setting-authentication-status defaultFont">已认证</div>
                    </div>
                    <div class="setting-authentication-item flexRowCenter">
                        <div class="setting-authentication-title defaultFont">身份证号:</div>
                        <div class="setting-authentication-text defaultFont">
                            {{ userInfo.idNumber || '-' }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="setting-info-content flexRowCenter">
                <div class="setting-info-left flexColumnCenter">
                    <div class="setting-left-top-content flexRowCenter">
                        <div class="setting-info-title defaultFont">API KEY</div>
                        <el-popover
                            placement="bottom-start"
                            :width="270"
                            trigger="click"
                            popper-class="explain-popover"
                            content="该API Token值可作为调用接口服务的凭证"
                        >
                            <template #reference>
                                <img
                                    class="setting-secret-explain cursorP"
                                    src="static/api/explain.svg"
                                />
                            </template>
                        </el-popover>
                    </div>
                    <div class="setting-left-bottom-content flexRowCenter">
                        <PasswordInput
                            passwordClass="setting-secret-input"
                            v-model="appSecret"
                            readonly
                        />
                        <div class="setting-copy-content cursorP flexRowCenter" @click="copyToken">
                            <img class="setting-secret-copy" src="static/user/copy.svg" />
                        </div>
                    </div>
                </div>
                <div class="setting-info-right cursorP defaultFont" @click="resetAction">重置</div>
            </div>
            <div class="setting-info-content setting-info-type-content flexRowCenter">
                <div class="setting-info-type-title defaultFont">优先扣款类型</div>
                <el-select
                    class="setting-info-type-select"
                    v-model="selectType"
                    placeholder="请选择扣款类型"
                >
                    <el-option
                        v-for="item in selectOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                </el-select>
            </div>
            <div class="setting-info-content flexRowCenter">
                <div class="setting-info-left flexColumnCenter">
                    <div class="setting-info-title defaultFont">登录密码</div>
                    <div class="setting-info-text defaultFont">
                        互联网账号存在盗号风险，建议您定期修改密码以保护账号安全
                    </div>
                </div>
                <div class="setting-info-right cursorP defaultFont" @click="changePasswordAction">
                    修改密码
                </div>
            </div>
            <div class="setting-info-content flexRowCenter">
                <div class="setting-info-left flexColumnCenter">
                    <div class="setting-info-title defaultFont">绑定手机号</div>
                    <div class="setting-info-text defaultFont">
                        {{
                            userInfo.phone
                                ? `您已绑定手机${desensitizationPhone}`
                                : '您未绑定手机，请绑定提升账号安全性'
                        }}
                    </div>
                </div>
                <div class="setting-info-right cursorP defaultFont" @click="changePhoneAction">
                    {{ userInfo.phone ? '修改手机' : '绑定手机' }}
                </div>
            </div>
            <div class="setting-info-content flexRowCenter">
                <div class="setting-info-left flexColumnCenter">
                    <div class="setting-info-title defaultFont">绑定邮箱</div>
                    <div class="setting-info-text defaultFont">
                        {{
                            userInfo.email
                                ? `您已绑定邮箱${desensitizationEmail}`
                                : '您未绑定邮箱，请绑定提升账号安全性'
                        }}
                    </div>
                </div>
                <div class="setting-info-right cursorP defaultFont" @click="mailAction">
                    {{ userInfo.email ? '修改邮箱' : '绑定邮箱' }}
                </div>
            </div>
        </div>
        <ChangePasswordModel
            v-model="changePasswordVisible"
            @cancelAction="changePasswordCancelAction"
        />
        <ChangePhoneModel v-model="changePhoneVisible" @cancelAction="changePhoneCancelAction" />
        <ChangeMailModel
            v-model="changeMailVisible"
            :isChange="isChange"
            @cancelAction="changeMailCancelAction"
        />
        <OpenalphaModel
            v-model="explainDialogVisible"
            title="token值每天仅可重置一次,确认要重置"
            okText="确定"
            cancelText="取消"
            :cancelStyle="{ color: '#8C8C8C', border: '1px solid #8C8C8C', background: 'white' }"
            @okAction="explainOkAction"
            @cancelAction="explainCancelAction"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive, watchEffect, watchSyncEffect } from 'vue'
import ChangePasswordModel from '@/components/changePasswordModel/ChangePasswordModel.vue'
import ChangePhoneModel from '@/components/changePhoneModel/ChangePhoneModel.vue'
import ChangeMailModel from '@/components/changeMailModel/ChangeMailModel.vue'
import PasswordInput from '@/components/passwordInput/PasswordInput.vue'
import OpenalphaModel from '@/components/openalphaModel/OpenalphaModel.vue'
import { useStore } from 'store/index'
import { phoneDesensitization } from 'utils/index'
import { useRouter } from 'vue-router'
import useClipboard from 'vue-clipboard3'
import { resetToken } from '@/common/request/modules/user/user'
import { chargingSequence } from '@/common/request'
import ElMessage from '@/common/utils/message'

export default defineComponent({
    name: 'Setting',
    setup() {
        let store = useStore()
        let router = useRouter()
        // 用户信息
        let userInfo = computed(() => store.state.userModule.userLoginInfo.member)
        const appSecret = computed(() => store.state.userModule.userLoginInfo.member.appSecret)
        // 脱敏phone
        let desensitizationPhone = computed(() => phoneDesensitization(userInfo.value.phone || ''))
        // 脱敏email
        let desensitizationEmail = computed(() => phoneDesensitization(userInfo.value.email || ''))
        // 认证状态
        let certStatus = computed(() => userInfo.value.certStatus)
        // 认证类型
        let userType = computed(() => userInfo.value.userType)
        // 修改密码
        let changePasswordVisible = ref(false)
        const changePasswordAction = () => {
            changePasswordVisible.value = true
        }
        const changePasswordCancelAction = () => {
            changePasswordVisible.value = false
        }
        // 修改手机号
        let changePhoneVisible = ref(false)
        const changePhoneAction = () => {
            changePhoneVisible.value = true
        }
        const changePhoneCancelAction = () => {
            changePhoneVisible.value = false
        }
        // 修改邮箱
        let isChange = ref(false)
        let changeMailVisible = ref(false)
        const mailAction = () => {
            changeMailVisible.value = true
        }
        const changeMailCancelAction = () => {
            changeMailVisible.value = false
        }
        // 跳转认证
        const authenticationAction = () => {
            router.push({
                path: '/user/account/certification',
            })
        }
        let explainDialogVisible = ref(false)
        const explainOkAction = async () => {
            try {
                const token = await resetToken()
                store.commit('setSecret', token)
                explainDialogVisible.value = false
                ElMessage({
                    message: '重置成功',
                    type: 'success',
                })
            } catch (error) {
                explainDialogVisible.value = false
                ElMessage({
                    message: '重置失败',
                    type: 'error',
                })
            }
        }
        const explainCancelAction = () => {
            explainDialogVisible.value = false
        }
        // 拷贝token
        const { toClipboard } = useClipboard()
        const copyToken = async () => {
            const secret = appSecret.value
            if (!secret) {
                ElMessage({
                    message: '复制失败',
                    type: 'error',
                })
                return
            }
            try {
                await toClipboard(secret)
                ElMessage({
                    message: '复制成功',
                    type: 'success',
                })
            } catch (e) {
                ElMessage({
                    message: '复制失败',
                    type: 'error',
                })
            }
        }
        // 扣款顺序设置
        // setDeductionSequence
        const selectOptions = reactive([
            {
                value: 'BALANCE',
                label: '账号余额',
            },
            {
                value: 'COMBO',
                label: '优惠套餐',
            },
        ])
        const deductionSequence = userInfo.value.deductionSequence
        const type =
            deductionSequence && deductionSequence.startsWith('BALANCE') ? 'BALANCE' : 'COMBO'
        const selectType = ref(type)
        watchSyncEffect(async () => {
            if (
                !userInfo.value.deductionSequence ||
                userInfo.value.deductionSequence.startsWith(selectType.value)
            ) {
                return
            }
            try {
                const res = await chargingSequence(
                    selectType.value === 'BALANCE' ? ['BALANCE', 'COMBO'] : ['COMBO', 'BALANCE']
                )
                if (res) {
                    store.commit(
                        'setDeductionSequence',
                        selectType.value === 'BALANCE' ? 'BALANCE,COMBO' : 'COMBO,BALANCE'
                    )
                    ElMessage.success('设置成功')
                    return
                }
                ElMessage.error('设置失败')
            } catch (error: any) {
                ElMessage.error(error.msg || '设置失败')
            }
        })
        // 充值token
        const resetAction = () => {
            explainDialogVisible.value = true
        }
        return {
            selectOptions,
            selectType,
            appSecret,
            userInfo,
            desensitizationPhone,
            desensitizationEmail,
            certStatus,
            userType,
            changePasswordVisible,
            changePasswordAction,
            changePasswordCancelAction,
            changePhoneVisible,
            changePhoneAction,
            changePhoneCancelAction,
            isChange,
            changeMailVisible,
            mailAction,
            changeMailCancelAction,
            authenticationAction,
            copyToken,
            resetAction,
            explainDialogVisible,
            explainOkAction,
            explainCancelAction,
        }
    },
    components: {
        ChangePasswordModel,
        ChangePhoneModel,
        ChangeMailModel,
        PasswordInput,
        OpenalphaModel,
    },
})
</script>

<style lang="scss" scoped>
.setting {
    width: 100%;
    min-height: 100%;
    padding: 20px 16px;
    box-sizing: border-box;
    .setting-content {
        width: 100%;
        height: 100%;
        padding: 16px 24px;
        box-sizing: border-box;
        background: $themeBgColor;
        border-radius: 4px;
        .setting-title {
            height: 36px;
            font-size: fontSize(14px);
            @include defaultFontMedium;
            color: $titleColor;
            line-height: 36px;
            border-bottom: 1px solid #dfdfdf;
            text-align: left;
        }
        .setting-info-content {
            width: 100%;
            border-bottom: 1px solid #dfdfdf;
            box-sizing: border-box;
            padding: 24px;
            justify-content: space-between;
            .setting-info-left {
                align-items: flex-start;
                .setting-info-title {
                    font-size: fontSize(16px);
                    color: $titleColor;
                    line-height: 24px;
                }
                .setting-info-text {
                    font-size: fontSize(12px);
                    color: $placeholderColor;
                    line-height: 18px;
                    margin-top: 8px;
                }
                .setting-info-item {
                    justify-content: flex-start;
                    margin: 9px 0px;
                    .setting-info-item-title {
                        font-size: fontSize(12px);
                        color: $placeholderColor;
                        line-height: 18px;
                    }
                    .setting-info-item-text {
                        font-size: fontSize(16px);
                        color: $titleColor;
                        line-height: 24px;
                        margin-left: 12px;
                    }
                }
                .setting-left-top-content {
                    position: relative;
                    .setting-info-title {
                        font-size: fontSize(16px);
                        @include defaultFontMedium;
                        color: $themeColor;
                        line-height: 24px;
                    }
                    .setting-secret-explain {
                        width: 18px;
                        height: 14px;
                        box-sizing: border-box;
                        margin-left: 8px;
                        padding-left: 4px;
                    }
                    .explain-popover {
                        background: black;
                    }
                }
                .setting-left-bottom-content {
                    margin-top: 18px;
                    .setting-secret-input {
                        width: 456px;
                        height: 42px;
                        border-radius: 2px;
                        border: 1px solid $borderColor;
                        :deep(.el-input) {
                            height: 40px;
                            .el-input__inner {
                                height: 40px;
                            }
                        }
                    }
                    .setting-copy-content {
                        margin-left: 14px;
                        width: 40px;
                        height: 42px;
                        background: $themeColor;
                        border-radius: 2px;
                        .setting-secret-copy {
                            width: 32px;
                            height: 32px;
                        }
                    }
                }
            }
            .setting-info-right {
                width: 118px;
                height: 42px;
                background: $themeColor;
                border-radius: 4px;
                font-size: fontSize(16px);
                color: $themeBgColor;
                line-height: 42px;
            }
            .setting-info-right-authentication {
                flex-grow: 1;
                .setting-authentication-left {
                    width: 142px;
                    height: 96px;
                    margin-right: 20px;
                }
                .setting-authentication-right {
                    justify-content: flex-start;
                    align-items: flex-start;
                    .setting-authentication-title {
                        font-size: fontSize(14px);
                        color: $placeholderColor;
                        line-height: 20px;
                    }
                    .setting-authentication-button {
                        font-size: fontSize(16px);
                        color: $themeColor;
                        line-height: 24px;
                        padding: 18px 0px;
                    }
                }
                .setting-authentication-item {
                    margin: 9px 0px;
                    .setting-authentication-title {
                        font-size: fontSize(14px);
                        color: $placeholderColor;
                        line-height: 20px;
                        margin-right: 12px;
                    }
                    .setting-authentication-text {
                        font-size: fontSize(14px);
                        color: $titleColor;
                        line-height: 20px;
                    }
                    .setting-authentication-status {
                        font-size: fontSize(12px);
                        color: #64d16d;
                        line-height: 18px;
                        width: 52px;
                        height: 18px;
                        background: rgba(100, 209, 109, 0.15);
                        border-radius: 9px;
                        border: 1px solid #64d16d;
                        margin-left: 8px;
                    }
                }
            }
            .setting-info-type-title {
                font-size: fontSize(16px);
                color: $titleColor;
                line-height: 24px;
            }
            .setting-info-type-select {
                margin-left: 12px;
            }
        }
        .setting-info-type-content {
            justify-content: flex-start;
        }
    }
}
</style>
