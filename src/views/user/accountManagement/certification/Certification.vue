<!--
 * @Author: matiastang
 * @Date: 2021-11-11 17:30:28
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-16 19:56:16
 * @FilePath: /datumwealth-openalpha-front/src/views/user/accountManagement/certification/Certification.vue
 * @Description: 个人中心-账号管理-实名认证
-->
<template>
    <div class="certification">
        <!-- 认证通过 -->
        <div v-if="certStatus && certStatus === 1" class="certification-content-through">
            <div class="certification-title defaultFont">实名认证</div>
            <div class="certification-through-content">
                <div class="certification-through-top-content">
                    <div class="certification-through-top flexRowCenter">
                        <img class="certification-through-top-img" />
                        <div class="certification-through-top-img-title defaultFont">
                            您已通过实名认证
                        </div>
                    </div>
                    <div class="certification-through-item flexRowCenter">
                        <div class="certification-through-item-title defaultFont">账号类型:</div>
                        <div class="certification-through-item-text defaultFont">
                            {{ userType && userType === 1 ? '个人账号' : '企业账号' }}
                        </div>
                    </div>
                    <div v-if="userType === 1" class="certification-through-item flexRowCenter">
                        <div class="certification-through-item-title defaultFont">姓名:</div>
                        <div class="certification-through-item-text defaultFont">
                            {{ userInfo.realName || '-' }}
                        </div>
                    </div>
                    <div v-if="userType === 1" class="certification-through-item flexRowCenter">
                        <div class="certification-through-item-title defaultFont">身份证号:</div>
                        <div class="certification-through-item-text defaultFont">
                            {{ userInfo.idNumber || '-' }}
                        </div>
                    </div>
                    <div v-if="userType === 2" class="certification-through-item flexRowCenter">
                        <div class="certification-through-item-title defaultFont">企业名称:</div>
                        <div class="certification-through-item-text defaultFont">
                            {{ userInfo.company || '-' }}
                        </div>
                    </div>
                    <div v-if="userType === 2" class="certification-through-item flexRowCenter">
                        <div class="certification-through-item-title defaultFont">
                            社会统一信用代码:
                        </div>
                        <div class="certification-through-item-text defaultFont">
                            {{ userInfo.unifiedCreditCode || '-' }}
                        </div>
                    </div>
                    <div class="certification-through-item flexRowCenter">
                        <div class="certification-through-item-title defaultFont">
                            认证到期时间:
                        </div>
                        <div class="certification-through-item-text defaultFont">
                            {{ userInfo.expireDate || '-' }}
                        </div>
                    </div>
                </div>
                <div class="certification-through-bottom-title">
                    如果您的账户信息有变更，请点击<span
                        class="certification-through-bottom-text cursorP"
                        >这里</span
                    >，重新进行实名认证
                </div>
            </div>
        </div>
        <!-- 审核中 -->
        <div v-if="certStatus === 2 || certStatus === 3" class="certification-content-auditing">
            <div class="certification-auditing-title defaultFont">认证申请</div>
            <div class="certification-auditing-content flexRowCenter">
                <img class="certification-auditing-img" />
                <div class="certification-auditing-right flexColumnCenter">
                    <div v-if="userType === 1" class="certification-auditing-item flexRowCenter">
                        <div class="certification-auditing-item-title defaultFont">姓名:</div>
                        <div class="certification-auditing-item-text defaultFont">
                            {{ userInfo.realName || '-' }}
                        </div>
                    </div>
                    <div v-if="userType === 1" class="certification-auditing-item flexRowCenter">
                        <div class="certification-auditing-item-title defaultFont">身份证号:</div>
                        <div class="certification-auditing-item-text defaultFont">
                            {{ userInfo.idNumber || '-' }}
                        </div>
                    </div>
                    <div v-if="userType === 2" class="certification-auditing-item flexRowCenter">
                        <div class="certification-auditing-item-title defaultFont">企业名称:</div>
                        <div class="certification-auditing-item-text defaultFont">
                            {{ userInfo.company || '-' }}
                        </div>
                    </div>
                    <div v-if="userType === 2" class="certification-auditing-item flexRowCenter">
                        <div class="certification-auditing-item-title defaultFont">
                            社会统一信用代码:
                        </div>
                        <div class="certification-auditing-item-text defaultFont">
                            {{ userInfo.unifiedCreditCode || '-' }}
                        </div>
                    </div>
                    <div class="certification-auditing-item flexRowCenter">
                        <div class="certification-auditing-item-title defaultFont">账号类型:</div>
                        <div class="certification-auditing-item-text defaultFont">
                            {{ userType && userType === 1 ? '个人账号' : '企业账号' }}
                        </div>
                    </div>
                    <div
                        v-if="certStatus && certStatus === 3"
                        class="certification-auditing-item flexRowCenter"
                    >
                        <div class="certification-auditing-item-title defaultFont">认证状态：</div>
                        <div
                            class="
                                certification-auditing-item-text certification-auditing-status
                                defaultFont
                            "
                        >
                            审核中
                        </div>
                    </div>
                    <div
                        v-if="certStatus && certStatus === 2"
                        class="certification-auditing-item flexRowCenter"
                    >
                        <div class="certification-auditing-item-title defaultFont">认证状态：</div>
                        <div
                            class="
                                certification-auditing-item-text certification-auditing-status
                                defaultFont
                            "
                        >
                            未通过
                        </div>
                        <div class="certification-audit-error-button cursorP defaultFont">
                            重新认证
                        </div>
                    </div>
                </div>
            </div>
            <!-- 审核失败 -->
            <div v-if="certStatus === 2" class="certification-content-error">
                <div class="certification-error-title defaultFont">申请记录</div>
                <el-table class="certification-audit-table" :data="tableData" style="width: 100%">
                    <el-table-column prop="date" label="提交时间" min-width="100" />
                    <el-table-column prop="name" label="企业名称" min-width="100" />
                    <el-table-column prop="state" label="认证状态" min-width="80" />
                    <el-table-column prop="city" label="描述" min-width="80" />
                </el-table>
            </div>
        </div>
        <!-- 提交认证 -->
        <div
            v-if="!certStatus || certStatus === 0"
            class="certification-content-post flexColumnCenter"
        >
            <div class="certification-post-top flexColumnCenter">
                <div class="certification-auditing-title defaultFont">认证申请</div>
                <el-tabs class="right-tabs" v-model="activeName" @tab-click="tabClick">
                    <el-tab-pane class="right-tab flexColumnCenter" label="企业认证" name="company">
                        <div class="tab-company-content flexColumnCenter">
                            <div class="tab-personage-item flexRowCenter">
                                <div class="tab-personage-item-left flexRowCenter">
                                    <div class="tab-personage-item-prefix defaultFont">*</div>
                                    <div class="tab-personage-item-title defaultFont">
                                        企业名称:
                                    </div>
                                </div>
                                <el-input
                                    class="tab-personage-item-right"
                                    v-model="personageName"
                                    maxlength="20"
                                    placeholder="请输入企业名称"
                                    clearable
                                />
                            </div>
                            <div class="tab-personage-item flexRowCenter">
                                <div class="tab-personage-item-left flexRowCenter">
                                    <div class="tab-personage-item-prefix defaultFont">*</div>
                                    <div class="tab-personage-item-title defaultFont">
                                        统一社会信用代码:
                                    </div>
                                </div>
                                <el-input
                                    class="tab-personage-item-right"
                                    v-model="personageIdNumber"
                                    maxlength="18"
                                    placeholder="请输入统一社会信用代码"
                                    clearable
                                />
                            </div>
                            <div class="tab-personage-item flexRowCenter">
                                <div class="tab-personage-item-left flexRowCenter">
                                    <div class="tab-personage-item-prefix defaultFont">*</div>
                                    <div class="tab-personage-item-title defaultFont">
                                        法定代表人:
                                    </div>
                                </div>
                                <el-input
                                    class="tab-personage-item-right"
                                    v-model="personageEmail"
                                    placeholder="请输入法定代表人名字"
                                    clearable
                                />
                            </div>
                            <div class="tab-personage-item flexRowCenter">
                                <div class="tab-personage-item-left flexRowCenter">
                                    <div class="tab-personage-item-prefix defaultFont">*</div>
                                    <div class="tab-personage-item-title defaultFont">
                                        企业邮箱:
                                    </div>
                                </div>
                                <el-input
                                    class="tab-personage-item-right"
                                    v-model="personageEmail"
                                    placeholder="请输入企业邮箱"
                                    clearable
                                />
                            </div>
                            <div class="tab-personage-item flexRowCenter">
                                <div class="tab-personage-item-left flexRowCenter">
                                    <div class="tab-personage-item-prefix defaultFont">*</div>
                                    <div class="tab-personage-item-title defaultFont">
                                        所在部门:
                                    </div>
                                </div>
                                <el-input
                                    class="tab-personage-item-right"
                                    v-model="personageEmail"
                                    placeholder="请输入您所在的部门名称"
                                    clearable
                                />
                            </div>
                            <div class="tab-personage-item flexRowCenter">
                                <div class="tab-personage-item-left flexRowCenter">
                                    <div class="tab-personage-item-prefix defaultFont">*</div>
                                    <div class="tab-personage-item-title defaultFont">
                                        应用场景:
                                    </div>
                                </div>
                                <el-input
                                    class="tab-personage-item-right tab-personage-item-textarea"
                                    v-model="personageNote"
                                    type="textarea"
                                    placeholder="请输入您使用数据的场景"
                                    clearable
                                />
                            </div>
                            <div class="tab-personage-item flexRowCenter">
                                <div class="tab-personage-item-left flexRowCenter">
                                    <div class="tab-personage-item-prefix defaultFont">*</div>
                                    <div class="tab-personage-item-title defaultFont">
                                        营业执照:
                                    </div>
                                </div>
                                <div class="tab-company-img"></div>
                            </div>
                            <div class="tab-personage-text-content flexRowCenter">
                                <el-checkbox
                                    v-model="checked"
                                    class="personage-text-checked"
                                ></el-checkbox>
                                <div class="personage-left-text cursorP defaultFont">
                                    《西筹开放平台认证服务协议》
                                </div>
                                <div class="personage-right-text defaultFont">
                                    请务必提供真实有效的信息以供审查
                                </div>
                            </div>
                            <div class="tab-personage-button-content flexRowCenter">
                                <div class="personage-ok-button cursorP defaultFont">提交认证</div>
                                <div class="personage-cancel-button cursorP defaultFont">取消</div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane class="right-tab" label="个人认证" name="personage">
                        <div class="tab-personage-content flexColumnCenter">
                            <div class="tab-personage-item flexRowCenter">
                                <div class="tab-personage-item-left flexRowCenter">
                                    <div class="tab-personage-item-prefix defaultFont">*</div>
                                    <div class="tab-personage-item-title defaultFont">姓名:</div>
                                </div>
                                <el-input
                                    class="tab-personage-item-right"
                                    v-model="personageName"
                                    maxlength="20"
                                    placeholder="请输入您的姓名"
                                    clearable
                                />
                            </div>
                            <div class="tab-personage-item flexRowCenter">
                                <div class="tab-personage-item-left flexRowCenter">
                                    <div class="tab-personage-item-prefix defaultFont">*</div>
                                    <div class="tab-personage-item-title defaultFont">
                                        身份证号:
                                    </div>
                                </div>
                                <el-input
                                    class="tab-personage-item-right"
                                    v-model="personageIdNumber"
                                    maxlength="18"
                                    placeholder="请输入您的身份证号"
                                    clearable
                                />
                            </div>
                            <div class="tab-personage-item flexRowCenter">
                                <div class="tab-personage-item-left flexRowCenter">
                                    <div class="tab-personage-item-prefix defaultFont">*</div>
                                    <div class="tab-personage-item-title defaultFont">邮箱:</div>
                                </div>
                                <el-input
                                    class="tab-personage-item-right"
                                    v-model="personageEmail"
                                    placeholder="请输入您的邮箱账号"
                                    clearable
                                />
                            </div>
                            <div class="tab-personage-item flexRowCenter">
                                <div class="tab-personage-item-left flexRowCenter">
                                    <div class="tab-personage-item-prefix defaultFont">*</div>
                                    <div class="tab-personage-item-title defaultFont">
                                        应用场景:
                                    </div>
                                </div>
                                <el-input
                                    class="tab-personage-item-right tab-personage-item-textarea"
                                    v-model="personageNote"
                                    type="textarea"
                                    placeholder="请输入您使用数据的场景"
                                    clearable
                                />
                            </div>
                            <div class="tab-personage-item flexRowCenter">
                                <div class="tab-personage-item-left flexRowCenter">
                                    <div class="tab-personage-item-prefix defaultFont">*</div>
                                    <div class="tab-personage-item-title defaultFont">
                                        身份证照片:
                                    </div>
                                </div>
                                <div class="tab-personage-item-img-right flexRowCenter">
                                    <div class="tab-personage-img-front"></div>
                                    <div class="tab-personage-img-bg"></div>
                                </div>
                            </div>
                            <div class="tab-personage-text-content flexRowCenter">
                                <el-checkbox
                                    v-model="checked"
                                    class="personage-text-checked"
                                ></el-checkbox>
                                <div class="personage-left-text cursorP defaultFont">
                                    《西筹开放平台认证服务协议》
                                </div>
                                <div class="personage-right-text defaultFont">
                                    请务必提供真实有效的信息以供审查
                                </div>
                            </div>
                            <div class="tab-personage-button-content flexRowCenter">
                                <div class="personage-ok-button cursorP defaultFont">提交认证</div>
                                <div class="personage-cancel-button cursorP defaultFont">取消</div>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class="certification-post-bottom flexColumnCenter">
                <div class="certification-post-bottom-text defaultFont">西筹开放平台提示：</div>
                <div class="certification-post-bottom-text defaultFont">
                    1、身份证号必须与身份证照片一致，且为有效期限
                </div>
                <div class="certification-post-bottom-text defaultFont">
                    2、上传材料支持原件照片，扫描件
                </div>
                <div class="certification-post-bottom-text defaultFont">
                    3、支持jpg、jpeg、png格式，大小不超过5M
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'store/index'

export default defineComponent({
    name: 'Certification',
    setup() {
        let store = useStore()
        // 用户信息
        let userInfo = computed(() => store.state.userModule.userLoginInfo.member)
        // 认证状态
        let certStatus = computed(() => userInfo.value.certStatus)
        // 认证类型
        let userType = computed(() => userInfo.value.userType)
        // 类型切换
        let activeName = ref('company')
        // 公司认证company
        // 个人认证personage
        let personageName = ref('')
        let personageIdNumber = ref('')
        let personageEmail = ref('')
        let personageNote = ref('')
        const checked = ref(false)
        // table数据
        let tableData = [
            {
                date: '2021-10-20 14:41:37 ',
                name: '成都西筹金融科技有限公司',
                state: '未通过',
                city: '您上传的材料错误，当前仅支持营业执照+申请公函，烦请重新上传',
            },
        ]
        return {
            userInfo,
            certStatus,
            userType,
            activeName,
            personageName,
            personageIdNumber,
            personageEmail,
            personageNote,
            checked,
            tableData,
        }
    },
})
</script>

<style lang="scss" scoped>
.certification {
    width: 100%;
    min-height: 100%;
    padding: 20px 16px;
    box-sizing: border-box;
    .certification-content-through {
        width: 100%;
        height: 100%;
        padding: 16px 24px;
        box-sizing: border-box;
        background: $themeBgColor;
        border-radius: 4px;
        .certification-title {
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
        .certification-through-top-content {
            width: 100%;
            box-sizing: border-box;
            padding: 30px 24px;
            border: 1px solid $themeColor;
            justify-content: flex-start;
            margin-top: 34px;
            .certification-through-top {
                margin-bottom: 30px;
                justify-content: flex-start;
                .certification-through-top-img {
                    width: 30px;
                    height: 30px;
                    background: #15ad31;
                    margin-right: 16px;
                }
                .certification-through-top-img-title {
                    font-size: 22px;
                    color: $titleColor;
                    line-height: 30px;
                    letter-spacing: 2px;
                }
            }
            .certification-through-item {
                margin-top: 12px;
                justify-content: flex-start;
                .certification-through-item-title {
                    font-size: 14px;
                    color: $placeholderColor;
                    line-height: 20px;
                    margin-right: 12px;
                }
                .certification-through-item-text {
                    font-size: 14px;
                    color: $titleColor;
                    line-height: 20px;
                }
            }
        }
        .certification-through-bottom-title {
            margin-top: 20px;
            font-size: 14px;
            color: #595959;
            line-height: 20px;
            .certification-through-bottom-text {
                color: rgba(78, 154, 235, 1);
            }
        }
    }
    .certification-content-auditing {
        width: 100%;
        height: 100%;
        padding: 16px 24px 20px 24px;
        box-sizing: border-box;
        background: $themeBgColor;
        border-radius: 4px;
        .certification-auditing-title {
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
        .certification-auditing-content {
            margin-top: 13px;
            justify-content: flex-start;
            .certification-auditing-img {
                width: 134px;
                height: 134px;
                background: rgba(255, 169, 65, 0.3);
                border-radius: 6px;
                margin-right: 24px;
            }
            .certification-auditing-right {
                align-items: flex-start;
                .certification-auditing-item {
                    margin: 7px 0px;
                    justify-content: flex-start;
                    .certification-auditing-item-title {
                        font-size: 16px;
                        color: $titleColor;
                        line-height: 24px;
                        margin-right: 12px;
                    }
                    .certification-auditing-item-text {
                        font-size: 16px;
                        color: $titleColor;
                        line-height: 24px;
                    }
                    .certification-auditing-status {
                        color: #ffa941;
                    }
                    .certification-audit-error-button {
                        font-size: 16px;
                        color: #4e9aeb;
                        line-height: 24px;
                        margin-left: 24px;
                    }
                }
            }
        }
        .certification-content-error {
            margin-top: 100px;
            .certification-error-title {
                font-size: 16px;
                color: $titleColor;
                line-height: 24px;
                text-align: left;
                margin-bottom: 18px;
            }
            .certification-audit-table {
                margin-top: 18px;
                ::v-deep(th) {
                    background: #e9e9e9;
                }
                .info-title {
                    font-size: 16px;
                    color: #4e9aeb;
                    line-height: 24px;
                    text-align: left;
                }
            }
        }
    }
    .certification-content-post {
        width: 100%;
        height: 100%;
        .certification-post-top {
            width: 100%;
            padding: 16px 24px;
            box-sizing: border-box;
            background: $themeBgColor;
            border-radius: 4px;
            flex-grow: 1;
            justify-content: flex-start;
            align-items: flex-start;
            .certification-auditing-title {
                width: 100%;
                height: 36px;
                font-size: 14px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: $titleColor;
                line-height: 36px;
                letter-spacing: 1px;
                text-align: left;
                margin-bottom: 8px;
            }
            .right-tabs {
                width: 100%;
                .right-tab {
                    width: 100%;
                    .tab-company-content,
                    .tab-personage-content {
                        width: 100%;
                        padding-top: 5px;
                        align-items: flex-start;
                        .tab-personage-item {
                            margin: 12px 0px;
                            justify-content: flex-start;
                            align-items: flex-start;
                            .tab-personage-item-left {
                                width: 113px;
                                margin: 6px 18px 6px 0px;
                                justify-content: flex-end;
                                .tab-personage-item-prefix {
                                    font-size: 16px;
                                    color: $themeColor;
                                    line-height: 24px;
                                    margin-right: 3px;
                                }
                                .tab-personage-item-title {
                                    font-size: 16px;
                                    color: $titleColor;
                                    line-height: 24px;
                                }
                            }
                            .tab-personage-item-right {
                                width: 372px;
                                height: 36px;
                                ::v-deep(.el-input__inner) {
                                    width: 100%;
                                    height: 100%;
                                    box-sizing: border-box;
                                    border-radius: 2px;
                                    border: 1px solid #bfbfbf;
                                }
                                ::v-deep(.el-textarea__inner) {
                                    width: 100%;
                                    height: 100%;
                                    box-sizing: border-box;
                                    border-radius: 2px;
                                    border: 1px solid #bfbfbf;
                                }
                            }
                            .tab-personage-item-textarea {
                                height: 108px !important;
                            }
                            .tab-personage-item-img-right {
                                .tab-personage-img-front {
                                    width: 152px;
                                    height: 134px;
                                    border-radius: 2px;
                                    border: 1px solid #bfbfbf;
                                    margin-right: 9px;
                                }
                                .tab-personage-img-bg {
                                    width: 152px;
                                    height: 134px;
                                    border-radius: 2px;
                                    border: 1px solid #bfbfbf;
                                    margin-left: 9px;
                                }
                            }
                        }
                        .tab-personage-text-content {
                            margin: 24px 0px 34px 116px;
                            justify-content: flex-start;
                            .personage-text-checked {
                                margin-right: 6px;
                            }
                            .personage-left-text {
                                font-size: 14px;
                                color: $themeColor;
                                line-height: 20px;
                            }
                            .personage-right-text {
                                font-size: 14px;
                                color: $titleColor;
                                line-height: 20px;
                            }
                        }
                        .tab-personage-button-content {
                            margin: 0px 0px 0px 116px;
                            justify-content: flex-start;
                            .personage-ok-button {
                                width: 118px;
                                height: 42px;
                                background: $themeColor;
                                border-radius: 4px;
                                font-size: 16px;
                                color: $themeBgColor;
                                line-height: 42px;
                            }
                            .personage-cancel-button {
                                width: 83px;
                                height: 42px;
                                border-radius: 4px;
                                border: 1px solid $placeholderColor;
                                font-size: 16px;
                                color: $placeholderColor;
                                line-height: 42px;
                                margin-left: 30px;
                            }
                        }
                    }
                    .tab-company-content {
                        .tab-personage-item-left {
                            width: 160px !important;
                        }
                        .tab-personage-button-content,
                        .tab-personage-text-content {
                            margin-left: 160px !important;
                        }
                        .tab-company-img {
                            width: 120px;
                            height: 180px;
                            border-radius: 2px;
                            border: 1px solid #bfbfbf;
                        }
                    }
                }
                ::v-deep(.el-tabs__item) {
                    height: 33px;
                    font-size: 16px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: $placeholderColor;
                    line-height: 24px;
                    letter-spacing: 1px;
                }
                ::v-deep(.is-active) {
                    color: $themeColor !important;
                }
                ::v-deep(.el-tabs__active-bar) {
                    background: $themeColor;
                }
            }
        }
        .certification-post-bottom {
            width: 100%;
            box-sizing: border-box;
            padding-left: 24px;
            align-items: flex-start;
            margin-top: 6px;
            .certification-post-bottom-text {
                font-size: 12px;
                color: #595959;
                line-height: 18px;
                margin: 3px 0px;
            }
        }
    }
}
</style>
