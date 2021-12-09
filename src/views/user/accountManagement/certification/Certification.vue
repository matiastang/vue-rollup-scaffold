<!--
 * @Author: matiastang
 * @Date: 2021-11-11 17:30:28
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-09 14:36:58
 * @FilePath: /datumwealth-openalpha-front/src/views/user/accountManagement/certification/Certification.vue
 * @Description: 个人中心-账号管理-实名认证
-->
<template>
    <div class="certification flexColumnCenter">
        <!-- 认证通过 -->
        <div
            v-if="!recertification && certStatus && certStatus === 1"
            class="certification-content-through"
        >
            <div class="certification-title defaultFont">实名认证</div>
            <div class="certification-through-content">
                <div class="certification-through-top-content">
                    <div class="certification-through-top flexRowCenter">
                        <img
                            class="certification-through-top-img"
                            src="static/user/certification_success.svg"
                        />
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
                        @click="recertificationAction"
                        >这里</span
                    >，重新进行实名认证
                </div>
            </div>
        </div>
        <!-- 审核中 -->
        <div
            v-if="!recertification && (certStatus === 2 || certStatus === 3)"
            class="certification-content-auditing"
        >
            <div class="certification-auditing-title defaultFont">认证申请</div>
            <div class="certification-auditing-content flexRowCenter">
                <img
                    v-if="certStatus && certStatus === 3"
                    class="certification-auditing-img"
                    src="static/user/reviewing.svg"
                />
                <img v-else class="certification-auditing-img" src="static/user/review_err.svg" />
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
                    <div v-if="userType" class="certification-auditing-item flexRowCenter">
                        <div class="certification-auditing-item-title defaultFont">账号类型:</div>
                        <div class="certification-auditing-item-text defaultFont">
                            {{ userType === 1 ? '个人账号' : '企业账号' }}
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
                                certification-auditing-item-text certification-auditing-status-2
                                defaultFont
                            "
                        >
                            未通过
                        </div>
                        <div
                            class="certification-audit-error-button cursorP defaultFont"
                            @click="recertificationAction"
                        >
                            重新认证
                        </div>
                    </div>
                </div>
            </div>
            <!-- 审核失败 -->
            <div v-if="certStatus && certStatus === 2" class="certification-content-error">
                <div class="certification-error-title defaultFont">申请记录</div>
                <el-table
                    class="certification-audit-table"
                    :data="tableData.list"
                    style="width: 100%"
                >
                    <el-table-column class="certification-table-item" label="提交时间">
                        <template #default="scope">
                            <div class="certification-table-status">{{ scope.row.time }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        class="certification-table-item"
                        v-if="userType === 1"
                        label="姓名"
                    >
                        <template #default="scope">
                            <div class="certification-table-status">{{ scope.row.name }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        class="certification-table-item"
                        v-if="userType === 2"
                        label="企业名称"
                    >
                        <template #default="scope">
                            <div class="certification-table-status">{{ scope.row.name }}</div>
                        </template></el-table-column
                    >
                    <el-table-column class="certification-table-item" label="认证状态">
                        <template #default="scope">
                            <div v-if="scope.row.status === 1" class="certification-table-status-1">
                                认证成功
                            </div>
                            <div
                                v-else-if="scope.row.status === 2"
                                class="certification-table-status-2"
                            >
                                未通过
                            </div>
                            <div
                                v-else-if="scope.row.status === 3"
                                class="certification-table-status-3 defaultFont"
                            >
                                认证中
                            </div>
                            <div v-else class="certification-table-status">未认证</div>
                        </template>
                    </el-table-column>
                    <el-table-column class="certification-table-item" label="描述">
                        <template #default="scope">
                            <div class="certification-table-status">{{ scope.row.certResult }}</div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!-- 提交认证 -->
        <div
            v-if="recertification || !certStatus || certStatus === 0"
            class="certification-content-post flexColumnCenter"
        >
            <div class="certification-post-top flexColumnCenter">
                <div class="certification-auditing-title defaultFont">认证申请</div>
                <el-tabs class="right-tabs" v-model="activeName">
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
                                    v-model="companyName"
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
                                    v-model="companyUnifiedCreditCode"
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
                                    v-model="companyLegalPerson"
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
                                    v-model="companyEmail"
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
                                    v-model="companyDept"
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
                                    v-model="companyNote"
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
                                <el-upload
                                    class="tab-company-img"
                                    ref="businessLicenseRoot"
                                    :headers="uploadHeaders"
                                    :action="uploadURL"
                                    :show-file-list="false"
                                    :limit="1"
                                    :multiple="false"
                                    :on-success="companyImageAvatarSuccess"
                                    :on-error="imageAvatarError"
                                    :before-upload="companyImageBeforeAvatarUpload"
                                >
                                    <img
                                        v-if="companyImageUrl"
                                        :src="companyImageUrl"
                                        class="avatar"
                                    />
                                    <div v-else class="company-img-content">
                                        <img
                                            class="company-image-front-icon"
                                            src="static/user/license.svg"
                                        />
                                        <div class="company-image-title">上传</div>
                                    </div>
                                </el-upload>
                            </div>
                            <div class="tab-personage-text-content flexRowCenter">
                                <el-checkbox
                                    v-model="companyChecked"
                                    class="personage-text-checked"
                                ></el-checkbox>
                                <div
                                    class="personage-left-text cursorP defaultFont"
                                    @click="jumpAction"
                                >
                                    《西筹开放平台认证服务协议》
                                </div>
                                <div class="personage-right-text defaultFont">
                                    请务必提供真实有效的信息以供审查
                                </div>
                            </div>
                            <div class="tab-personage-button-content flexRowCenter">
                                <div
                                    class="personage-ok-button cursorP defaultFont"
                                    @click="comapnyOkAction"
                                >
                                    提交认证
                                </div>
                                <div
                                    v-if="recertification"
                                    class="personage-cancel-button cursorP defaultFont"
                                    @click="cancelRecertificationAction"
                                >
                                    取消
                                </div>
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
                                    <el-upload
                                        class="tab-personage-img-front"
                                        ref="personageFrontRoot"
                                        :headers="uploadHeaders"
                                        :action="uploadURL"
                                        :show-file-list="false"
                                        :limit="1"
                                        :multiple="false"
                                        accept=""
                                        :on-success="personageImageFrontAvatarSuccess"
                                        :on-error="imageAvatarError"
                                        :before-upload="personageImageFrontBeforeAvatarUpload"
                                    >
                                        <img
                                            v-if="personageImageFrontUrl"
                                            :src="personageImageFrontUrl"
                                            class="avatar"
                                        />
                                        <div v-else class="personage-img-content">
                                            <img
                                                class="personage-image-front-icon"
                                                src="static/user/identityCardOn.svg"
                                            />
                                            <div class="personage-image-title">人像面</div>
                                        </div>
                                    </el-upload>
                                    <el-upload
                                        class="tab-personage-img-bg"
                                        ref="personageBgRoot"
                                        :headers="uploadHeaders"
                                        :action="uploadURL"
                                        :show-file-list="false"
                                        :limit="1"
                                        :multiple="false"
                                        :on-success="personageImageBgAvatarSuccess"
                                        :on-error="imageAvatarError"
                                        :before-upload="personageImageBgBeforeAvatarUpload"
                                    >
                                        <img
                                            v-if="personageImageBgUrl"
                                            :src="personageImageBgUrl"
                                            class="avatar"
                                        />
                                        <div v-else class="personage-img-content">
                                            <img
                                                class="personage-image-bg-icon"
                                                src="static/user/identityCardOff.svg"
                                            />
                                            <div class="personage-image-title">国徽面</div>
                                        </div>
                                    </el-upload>
                                </div>
                            </div>
                            <div class="tab-personage-text-content flexRowCenter">
                                <el-checkbox
                                    v-model="personageChecked"
                                    class="personage-text-checked"
                                ></el-checkbox>
                                <div
                                    class="personage-left-text cursorP defaultFont"
                                    @click="jumpAction"
                                >
                                    《西筹开放平台认证服务协议》
                                </div>
                                <div class="personage-right-text defaultFont">
                                    请务必提供真实有效的信息以供审查
                                </div>
                            </div>
                            <div class="tab-personage-button-content flexRowCenter">
                                <div
                                    class="personage-ok-button cursorP defaultFont"
                                    @click="personageOkAction"
                                >
                                    提交认证
                                </div>
                                <div
                                    v-if="recertification"
                                    class="personage-cancel-button cursorP defaultFont"
                                    @click="cancelRecertificationAction"
                                >
                                    取消
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class="certification-post-bottom flexColumnCenter">
                <div class="certification-post-bottom-text defaultFont">西筹开放平台提示：</div>
                <div class="certification-post-bottom-text defaultFont">
                    {{
                        `1、${
                            activeName === 'company'
                                ? '营业执照号必须与营业执照照片一致'
                                : '身份证号必须与身份证照片一致'
                        }，且为有效期限`
                    }}
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
import { defineComponent, ref, Ref, computed, watchSyncEffect, reactive } from 'vue'
import { useStore } from 'store/index'
import { baseURL } from '@/common/request/config'
import {
    personal,
    enterprise,
    certificationList,
    certificationLast,
} from '@/common/request/modules/user/user'
import { certificationLog } from './certification'
import { email_check, identity_card_check, organization_code_check } from 'utils/check/index'
import { ElUpload } from 'element-plus'
import ElMessage from '@/common/utils/message'
import { useRouter } from 'vue-router'

// el-upload

export default defineComponent({
    name: 'Certification',
    setup() {
        const router = useRouter()
        let store = useStore()
        // 用户信息
        let userInfo = computed(() => store.state.userModule.userLoginInfo.member)
        // 认证状态
        let certStatus = computed(() => userInfo.value.certStatus)
        // 认证类型
        let userType = computed(() => userInfo.value.userType)
        // 重新认证表示
        let recertification = ref(false)
        // 类型切换
        let activeName = ref('company')
        // 图片上传地址
        const uploadURL = ref(`${baseURL}/member/upload`)
        const userToken = computed(() => store.state.userModule.userLoginInfo.token)
        const uploadHeaders = computed(() => {
            return {
                Authorization: `Bearer ${userToken.value}`,
                viewType: 'front',
            }
        })
        // 公司认证company
        let companyName = ref('')
        let companyUnifiedCreditCode = ref('')
        let companyLegalPerson = ref('')
        let companyDept = ref('')
        let companyEmail = ref('')
        let companyNote = ref('')
        const companyChecked = ref(false)
        // 上传组件类型
        type uploadType = InstanceType<typeof ElUpload>
        // 营业执照
        const companyImageUrl: Ref<string | null> = ref(null)
        const businessLicenseRoot: Ref<uploadType | null> = ref(null)
        const companyImageAvatarSuccess = (res: any, file: any) => {
            const code = res.code
            if (code !== 200) {
                ElMessage.error(res.msg || '上传失败')
                return
            }
            let url = res.data
            if (url) {
                companyImageUrl.value = url
            }
            const blRoot = businessLicenseRoot.value
            if (blRoot) {
                blRoot.clearFiles()
            }
        }
        const imageAvatarError = (err: any) => {
            ElMessage.error(err.msg || '上传失败')
        }
        const companyImageBeforeAvatarUpload = (file: any) => {
            const isJPG = file.type === 'image/jpeg'
            const isPNG = file.type === 'image/png'
            const isLt5M = file.size / 1024 / 1024 < 5
            if (!isJPG && !isPNG) {
                ElMessage.error('只能选择jpg、jpeg、png格式的图片')
                return false
            }
            if (!isLt5M) {
                ElMessage.error('图片大小不能超过5MB!')
                return false
            }
            return true
        }
        // 公司认证提交
        const comapnyOkAction = () => {
            // 姓名校验
            let name = companyName.value
            if (name.trim() === '') {
                ElMessage.error('请输入企业名称')
                return
            }
            // 社会信用校验
            const unifiedCreditCode = companyUnifiedCreditCode.value
            const organizationErr = organization_code_check(unifiedCreditCode)
            if (organizationErr) {
                ElMessage.error(organizationErr)
                return
            }
            // 法人校验
            let legalPerson = companyLegalPerson.value
            if (legalPerson.trim() === '') {
                ElMessage.error('请输入法人代表名字')
                return
            }
            // 邮箱账号校验
            let email = companyEmail.value
            let emailErr = email_check(email)
            if (emailErr) {
                ElMessage.error(emailErr)
                return
            }
            // 部门校验
            let dept = companyDept.value
            if (dept.trim() === '') {
                ElMessage.error('请输入您所在的部门')
                return
            }
            // 场景校验
            let note = companyNote.value
            if (note.trim() === '') {
                ElMessage.error('请输入您使用数据的场景')
                return
            }
            let companyUrl = companyImageUrl.value
            if (!companyUrl) {
                ElMessage.error('请上传营业执照')
                return
            }
            // 服务协议
            let check = companyChecked.value
            if (!check) {
                ElMessage.warning('请阅读并同意《西筹开放平台认证服务协议》')
                return
            }
            // 提交个人认证
            let userId = computed(() => userInfo.value.id)
            if (!userId.value) {
                ElMessage.error('用户信息错误')
                return
            }
            let parameters = {
                userId: userId.value,
                company: name,
                unifiedCreditCode,
                legalPerson,
                email,
                dept,
                useScenario: note,
                certMaterials: JSON.stringify([companyUrl]),
            }
            enterprise(parameters)
                .then((res) => {
                    ElMessage.success(res)
                    recertification.value = false
                    store.commit('setEnterpriseInfo', parameters)
                })
                .catch((err) => {
                    ElMessage.error(err.msg || '修改手机号失败')
                })
        }
        // 个人认证personage
        let personageName = ref('')
        let personageIdNumber = ref('')
        let personageEmail = ref('')
        let personageNote = ref('')
        const personageChecked = ref(false)
        // 身份证正面
        const personageImageFrontUrl: Ref<string | null> = ref(null)
        const personageFrontRoot: Ref<uploadType | null> = ref(null)
        const personageImageFrontAvatarSuccess = (res: any, file: any) => {
            const code = res.code
            if (code !== 200) {
                ElMessage.error(res.msg || '上传失败')
                return
            }
            let url = res.data
            if (url) {
                personageImageFrontUrl.value = url
            }
            const pfRoot = personageFrontRoot.value
            if (pfRoot) {
                pfRoot.clearFiles()
            }
        }
        const personageImageFrontBeforeAvatarUpload = (file: any) => {
            const isJPG = file.type === 'image/jpeg'
            const isPNG = file.type === 'image/png'
            const isLt5M = file.size / 1024 / 1024 < 5
            if (!isJPG && !isPNG) {
                ElMessage.error('只能选择jpg、jpeg、png格式的图片')
                return false
            }
            if (!isLt5M) {
                ElMessage.error('图片大小不能超过5MB!')
                return false
            }
            return true
        }
        // 身份证反面
        const personageImageBgUrl: Ref<string | null> = ref(null)
        const personageBgRoot: Ref<uploadType | null> = ref(null)
        const personageImageBgAvatarSuccess = (res: any, file: any) => {
            const code = res.code
            if (code !== 200) {
                ElMessage.error(res.msg || '上传失败')
                return
            }
            let url = res.data
            if (url) {
                personageImageBgUrl.value = url
            }
            const pbRoot = personageBgRoot.value
            if (pbRoot) {
                pbRoot.clearFiles()
            }
        }
        const personageImageBgBeforeAvatarUpload = (file: any) => {
            const isJPG = file.type === 'image/jpeg'
            const isPNG = file.type === 'image/png'
            const isLt5M = file.size / 1024 / 1024 < 5
            if (!isJPG && !isPNG) {
                ElMessage.error('只能选择jpg、jpeg、png格式的图片')
                return false
            }
            if (!isLt5M) {
                ElMessage.error('图片大小不能超过5MB!')
                return false
            }
            return true
        }
        // 个人认证提交
        const personageOkAction = () => {
            // 姓名校验
            let realName = personageName.value
            if (realName.trim() === '') {
                ElMessage.error('请输入您的姓名')
                return
            }
            // 身份证号校验
            let idNumber = personageIdNumber.value
            const idCardError = identity_card_check(idNumber)
            if (idCardError) {
                ElMessage.error(idCardError)
                return
            }
            // 邮箱账号校验
            let email = personageEmail.value
            let emailErr = email_check(email)
            if (emailErr) {
                ElMessage.error(emailErr)
                return
            }
            // 场景校验
            let note = personageNote.value
            if (note.trim() === '') {
                ElMessage.error('请输入您使用数据的场景')
                return
            }
            let frontUrl = personageImageFrontUrl.value
            if (!frontUrl) {
                ElMessage.error('请上传身份证正面照')
                return
            }
            let bgUrl = personageImageBgUrl.value
            if (!bgUrl) {
                ElMessage.error('请上传身份证反面照')
                return
            }
            // 服务协议
            let check = personageChecked.value
            if (!check) {
                ElMessage.warning('请阅读并同意《西筹开放平台认证服务协议》')
                return
            }
            // 提交个人认证
            let userId = computed(() => userInfo.value.id)
            if (!userId.value) {
                ElMessage.error('用户信息错误')
                return
            }
            let parameters = {
                userId: userId.value,
                email,
                idNumber,
                realName,
                useScenario: note,
                certMaterials: JSON.stringify([frontUrl, bgUrl]),
            }
            personal(parameters)
                .then((res) => {
                    ElMessage.success(res)
                    recertification.value = false
                    store.commit('setPersonalInfo', parameters)
                })
                .catch((err) => {
                    ElMessage.error(err.msg || '修改手机号失败')
                })
        }
        // table数据
        let tableData = reactive({
            list: Array<certificationLog>(),
        })
        watchSyncEffect(async () => {
            if (!certStatus.value || certStatus.value !== 2) {
                return
            }
            let userId = userInfo.value.id
            if (userId && certStatus.value && certStatus.value === 2) {
                let arr = await certificationList(userId)
                tableData.list = arr.map((item) => {
                    return {
                        time: item.certDate.replace('T', ' '),
                        name: '-',
                        certResult: item.certResult || '-',
                        status: item.certStatus,
                    }
                })
            }
        })
        // 重新认证
        const recertificationAction = () => {
            recertification.value = true
            if (userType.value === 1) {
                activeName.value = 'personage'
                personageName.value = userInfo.value.realName || ''
                personageIdNumber.value = userInfo.value.idNumber || ''
                personageEmail.value = userInfo.value.email || ''
                personageNote.value = userInfo.value.mbMemberAuthLogs?.useScenario || ''
                let certMaterials = userInfo.value.mbMemberAuthLogs?.certMaterials
                if (certMaterials) {
                    try {
                        let urls = JSON.parse(certMaterials)
                        if (Array.isArray(urls)) {
                            if (urls.length >= 1) {
                                personageImageFrontUrl.value = urls[0]
                            }
                            if (urls.length >= 2) {
                                personageImageBgUrl.value = urls[1]
                            }
                        }
                    } catch (error) {
                        console.warn('个人认证 certMaterials 解析 json 失败')
                    }
                }
            } else {
                companyName.value = userInfo.value.company || ''
                companyUnifiedCreditCode.value = userInfo.value.unifiedCreditCode || ''
                companyLegalPerson.value = userInfo.value.legalPerson || ''
                companyDept.value = userInfo.value.dept || ''
                companyEmail.value = userInfo.value.email || ''
                companyNote.value = userInfo.value.mbMemberAuthLogs?.useScenario || ''
                let certMaterials = userInfo.value.mbMemberAuthLogs?.certMaterials
                if (certMaterials) {
                    try {
                        let urls = JSON.parse(certMaterials)
                        if (Array.isArray(urls) && urls.length >= 1) {
                            companyImageUrl.value = urls[0]
                        }
                    } catch (error) {
                        console.warn('公司认证 certMaterials 解析 json 失败')
                    }
                }
            }
        }
        // 取消重新认证
        const cancelRecertificationAction = () => {
            recertification.value = false
        }
        // 审核中状态刷新
        if (certStatus && certStatus.value === 3) {
            let userId = computed(() => userInfo.value.id)
            watchSyncEffect(async () => {
                if (!userId.value) {
                    ElMessage.error('用户信息错误')
                    return
                }
                let info = await certificationLast(userId.value)
                if (info.certStatus !== certStatus.value) {
                    store.commit('setAuthInfo', info)
                }
            })
        }
        const jumpAction = () => {
            router.push({
                path: '/about/authProtocol',
            })
        }
        return {
            userInfo,
            certStatus,
            userType,
            activeName,
            // 公司认证
            companyChecked,
            companyImageUrl,
            businessLicenseRoot,
            companyImageAvatarSuccess,
            companyImageBeforeAvatarUpload,
            companyName,
            companyUnifiedCreditCode,
            companyLegalPerson,
            companyDept,
            companyEmail,
            companyNote,
            comapnyOkAction,
            // 个人认证
            personageName,
            personageIdNumber,
            personageEmail,
            personageNote,
            personageChecked,
            uploadURL,
            personageImageFrontUrl,
            personageFrontRoot,
            personageImageFrontAvatarSuccess,
            personageImageFrontBeforeAvatarUpload,
            personageImageBgUrl,
            personageBgRoot,
            personageImageBgAvatarSuccess,
            personageImageBgBeforeAvatarUpload,
            personageOkAction,
            tableData,
            recertification,
            recertificationAction,
            cancelRecertificationAction,
            uploadHeaders,
            imageAvatarError,
            jumpAction,
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
    justify-content: flex-start;
    .certification-content-through {
        flex-grow: 1;
        width: 100%;
        height: 100%;
        padding: 16px 24px;
        box-sizing: border-box;
        background: $themeBgColor;
        border-radius: 4px;
        .certification-title {
            @include defaultFontMedium;
            height: 36px;
            font-size: fontSize(14px);
            color: $titleColor;
            line-height: 36px;
            border-bottom: 1px solid #dfdfdf;
            text-align: left;
        }
        .certification-through-top-content {
            width: 375px;
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
                    margin-right: 16px;
                }
                .certification-through-top-img-title {
                    font-size: fontSize(22px);
                    color: $titleColor;
                    line-height: 30px;
                    letter-spacing: 2px;
                }
            }
            .certification-through-item {
                margin-top: 12px;
                justify-content: flex-start;
                .certification-through-item-title {
                    font-size: fontSize(14px);
                    color: $placeholderColor;
                    line-height: 20px;
                    margin-right: 12px;
                }
                .certification-through-item-text {
                    font-size: fontSize(14px);
                    color: $titleColor;
                    line-height: 20px;
                }
            }
        }
        .certification-through-bottom-title {
            margin-top: 20px;
            font-size: fontSize(14px);
            color: #595959;
            line-height: 20px;
            .certification-through-bottom-text {
                color: rgba(78, 154, 235, 1);
                margin: 0px 5px;
            }
        }
    }
    .certification-content-auditing {
        flex-grow: 1;
        width: 100%;
        height: 100%;
        padding: 16px 24px 20px 24px;
        box-sizing: border-box;
        background: $themeBgColor;
        border-radius: 4px;
        .certification-auditing-title {
            @include defaultFontMedium;
            height: 36px;
            font-size: fontSize(14px);
            color: $titleColor;
            line-height: 36px;
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
                        font-size: fontSize(16px);
                        color: $titleColor;
                        line-height: 24px;
                        margin-right: 12px;
                    }
                    .certification-auditing-item-text {
                        font-size: fontSize(16px);
                        color: $titleColor;
                        line-height: 24px;
                    }
                    .certification-auditing-status {
                        color: #ffa941;
                    }
                    .certification-auditing-status-2 {
                        color: #e62412;
                    }
                    .certification-audit-error-button {
                        font-size: fontSize(16px);
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
                font-size: fontSize(16px);
                color: $titleColor;
                line-height: 24px;
                text-align: left;
                margin-bottom: 18px;
            }
            .certification-audit-table {
                margin-top: 18px;
                box-sizing: border-box;
                border: 1px solid #dfdfdf;
                border-bottom: none;
                ::v-deep(.certification-table-status) {
                    font-size: fontSize(16px);
                    color: $titleColor;
                    line-height: 24px;
                }
                ::v-deep(.certification-table-status-1) {
                    font-size: fontSize(16px);
                    color: #4e9aeb;
                    line-height: 24px;
                }
                ::v-deep(.certification-table-status-2) {
                    font-size: fontSize(16px);
                    color: #e62412;
                    line-height: 24px;
                }
                ::v-deep(.certification-table-status-3) {
                    font-size: fontSize(16px);
                    color: #ffa941;
                    line-height: 24px;
                }
                ::v-deep(th) {
                    background: #e9e9e9;
                }
                .info-title {
                    font-size: fontSize(16px);
                    color: #4e9aeb;
                    line-height: 24px;
                    text-align: left;
                }
            }
        }
    }
    .certification-content-post {
        flex-grow: 1;
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
                font-size: fontSize(14px);
                @include defaultFontMedium;
                color: $titleColor;
                line-height: 36px;
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
                                    font-size: fontSize(16px);
                                    color: $themeColor;
                                    line-height: 24px;
                                    margin-right: 3px;
                                }
                                .tab-personage-item-title {
                                    font-size: fontSize(16px);
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
                                    border: 1px solid $borderColor;
                                }
                                ::v-deep(.el-textarea__inner) {
                                    width: 100%;
                                    height: 100%;
                                    box-sizing: border-box;
                                    border-radius: 2px;
                                    border: 1px solid $borderColor;
                                }
                            }
                            .tab-personage-item-textarea {
                                height: 108px !important;
                            }
                            .tab-personage-item-img-right {
                                .tab-personage-img-front,
                                .tab-personage-img-bg {
                                    width: 152px;
                                    height: 134px;
                                    border-radius: 2px;
                                    border: 1px solid $borderColor;
                                    margin-left: 9px;
                                    .avatar {
                                        width: 152px;
                                        height: 134px;
                                        // background: $themeColor;
                                        object-fit: contain;
                                    }
                                    .personage-img-content {
                                        width: 152px;
                                        height: 134px;
                                        padding: 11px 12px;
                                        box-sizing: border-box;
                                        .personage-image-front-icon,
                                        .personage-image-bg-icon {
                                            width: 128px;
                                            height: 82px;
                                            // background: $themeColor;
                                            object-fit: contain;
                                        }
                                        .personage-image-title {
                                            margin-top: 11px;
                                            font-size: fontSize(14px);
                                            color: #4e9aeb;
                                            line-height: 20px;
                                        }
                                    }
                                }
                                .tab-personage-img-front {
                                    margin: 0px 9px 0px 0px;
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
                                font-size: fontSize(14px);
                                color: $themeColor;
                                line-height: 20px;
                            }
                            .personage-right-text {
                                font-size: fontSize(14px);
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
                                font-size: fontSize(16px);
                                color: $themeBgColor;
                                line-height: 42px;
                            }
                            .personage-cancel-button {
                                width: 83px;
                                height: 42px;
                                border-radius: 4px;
                                border: 1px solid $placeholderColor;
                                font-size: fontSize(16px);
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
                            border: 1px solid $borderColor;
                            .avatar {
                                width: 120px;
                                height: 180px;
                                // background: $themeColor;
                                object-fit: contain;
                            }
                            .company-img-content {
                                width: 100%;
                                height: 100%;
                                padding: 11px 12px;
                                box-sizing: border-box;
                                .company-image-front-icon {
                                    width: 96px;
                                    height: 128px;
                                    background: #e7f3fd;
                                    object-fit: contain;
                                }
                                .company-image-title {
                                    margin-top: 11px;
                                    font-size: fontSize(14px);
                                    color: #4e9aeb;
                                    line-height: 20px;
                                }
                            }
                        }
                    }
                }
                ::v-deep(.el-tabs__item) {
                    height: 33px;
                    font-size: fontSize(16px);
                    @include defaultFont;
                    color: $placeholderColor;
                    line-height: 24px;
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
                font-size: fontSize(12px);
                color: #595959;
                line-height: 18px;
                margin: 3px 0px;
            }
        }
    }
}
</style>
