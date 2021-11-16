<!--
 * @Author: matiastang
 * @Date: 2021-11-11 17:28:34
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-16 11:30:40
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
                            {{ userInfo.phone || '未设置' }}
                        </div>
                    </div>
                    <div class="setting-info-item flexRowCenter">
                        <div class="setting-info-item-title defaultFont">邮箱地址:</div>
                        <div class="setting-info-item-text defaultFont">
                            {{ userInfo.email || '未设置' }}
                        </div>
                    </div>
                </div>
                <div v-if="false" class="setting-info-right-authentication flexRowCenter">
                    <img class="setting-authentication-left" />
                    <div class="setting-authentication-right flexColumnCenter">
                        <div class="setting-authentication-title defaultFont">
                            您还没有实名认证哦~
                        </div>
                        <div class="setting-authentication-button cursorP defaultFont">
                            立即认证
                        </div>
                    </div>
                </div>
                <div v-if="false" class="setting-info-right-authentication flexColumnCenter">
                    <div class="setting-authentication-item flexRowCenter">
                        <div class="setting-authentication-title defaultFont">企业名称:</div>
                        <div class="setting-authentication-text defaultFont">
                            成都西筹金融科技有限公司
                        </div>
                        <div class="setting-authentication-status defaultFont">已认证</div>
                    </div>
                    <div class="setting-authentication-item flexRowCenter">
                        <div class="setting-authentication-title defaultFont">
                            统一社会信用代码:
                        </div>
                        <div class="setting-authentication-text defaultFont">
                            91510100MA68DEK87Y
                        </div>
                    </div>
                </div>
                <div class="setting-info-right-authentication flexColumnCenter">
                    <div class="setting-authentication-item flexRowCenter">
                        <div class="setting-authentication-title defaultFont">姓名:</div>
                        <div class="setting-authentication-text defaultFont">安琪拉</div>
                        <div class="setting-authentication-status defaultFont">已认证</div>
                    </div>
                    <div class="setting-authentication-item flexRowCenter">
                        <div class="setting-authentication-title defaultFont">身份证号:</div>
                        <div class="setting-authentication-text defaultFont">
                            187081123465751324
                        </div>
                    </div>
                </div>
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
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import ChangePasswordModel from '@/components/changePasswordModel/ChangePasswordModel.vue'
import ChangePhoneModel from '@/components/changePhoneModel/ChangePhoneModel.vue'
import ChangeMailModel from '@/components/changeMailModel/ChangeMailModel.vue'
import { useStore } from 'store/index'
import { phoneDesensitization } from 'utils/index'
export default defineComponent({
    name: 'Setting',
    setup() {
        let store = useStore()
        // 用户信息
        let userInfo = computed(() => store.state.userModule.userLoginInfo.member)
        // 脱敏phone
        let desensitizationPhone = computed(() => phoneDesensitization(userInfo.value.phone))
        // 脱敏email
        let desensitizationEmail = computed(() => phoneDesensitization(userInfo.value.email))
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
        return {
            userInfo,
            desensitizationPhone,
            desensitizationEmail,
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
        }
    },
    components: {
        ChangePasswordModel,
        ChangePhoneModel,
        ChangeMailModel,
    },
})
</script>

<style lang="scss" scoped>
.setting {
    width: 100%;
    height: 100%;
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
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: $titleColor;
            line-height: 36px;
            letter-spacing: 1px;
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
                .etting-info-title {
                    font-size: 16px;
                    color: $titleColor;
                    line-height: 24px;
                }
                .setting-info-text {
                    font-size: 12px;
                    color: $placeholderColor;
                    line-height: 18px;
                    margin-top: 8px;
                }
                .setting-info-item {
                    justify-content: flex-start;
                    margin: 9px 0px;
                    .setting-info-item-title {
                        font-size: 12px;
                        color: $placeholderColor;
                        line-height: 18px;
                    }
                    .setting-info-item-text {
                        font-size: 16px;
                        color: $titleColor;
                        line-height: 24px;
                        margin-left: 12px;
                    }
                }
            }
            .setting-info-right {
                width: 118px;
                height: 42px;
                background: $themeColor;
                border-radius: 4px;
                font-size: 16px;
                color: $themeBgColor;
                line-height: 42px;
            }
            .setting-info-right-authentication {
                flex-grow: 1;
                .setting-authentication-left {
                    width: 142px;
                    height: 96px;
                    background: #d8d8d8;
                    border-radius: 9px;
                    border: 1px solid #979797;
                    margin-right: 20px;
                }
                .setting-authentication-right {
                    justify-content: flex-start;
                    align-items: flex-start;
                    .setting-authentication-title {
                        font-size: 14px;
                        color: $placeholderColor;
                        line-height: 20px;
                    }
                    .setting-authentication-button {
                        font-size: 16px;
                        color: $themeColor;
                        line-height: 24px;
                        padding: 18px 0px;
                    }
                }
                .setting-authentication-item {
                    margin: 9px 0px;
                    .setting-authentication-title {
                        font-size: 14px;
                        color: $placeholderColor;
                        line-height: 20px;
                        margin-right: 12px;
                    }
                    .setting-authentication-text {
                        font-size: 14px;
                        color: $titleColor;
                        line-height: 20px;
                    }
                    .setting-authentication-status {
                        font-size: 12px;
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
        }
    }
}
</style>
