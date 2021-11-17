<!--
 * @Author: matiastang
 * @Date: 2021-11-11 17:30:28
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-17 15:26:23
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
                                    :action="uploadURL"
                                    :show-file-list="false"
                                    :limit="1"
                                    :multiple="false"
                                    :on-success="companyImageAvatarSuccess"
                                    :before-upload="companyImageBeforeAvatarUpload"
                                >
                                    <img
                                        v-if="companyImageUrl"
                                        :src="companyImageUrl"
                                        class="avatar"
                                    />
                                    <div v-else class="company-img-content">
                                        <img class="company-image-front-icon" />
                                        <div class="company-image-title">上传</div>
                                    </div>
                                </el-upload>
                            </div>
                            <div class="tab-personage-text-content flexRowCenter">
                                <el-checkbox
                                    v-model="companyChecked"
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
                                <div
                                    class="personage-ok-button cursorP defaultFont"
                                    @click="comapnyOkAction"
                                >
                                    提交认证
                                </div>
                                <!-- <div class="personage-cancel-button cursorP defaultFont">取消</div> -->
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
                                        :action="uploadURL"
                                        :show-file-list="false"
                                        :limit="1"
                                        :multiple="false"
                                        accept=""
                                        :on-success="personageImageFrontAvatarSuccess"
                                        :before-upload="personageImageFrontBeforeAvatarUpload"
                                    >
                                        <img
                                            v-if="personageImageFrontUrl"
                                            :src="personageImageFrontUrl"
                                            class="avatar"
                                        />
                                        <div v-else class="personage-img-content">
                                            <img class="personage-image-front-icon" />
                                            <div class="personage-image-title">人像面</div>
                                        </div>
                                    </el-upload>
                                    <el-upload
                                        class="tab-personage-img-bg"
                                        :action="uploadURL"
                                        :show-file-list="false"
                                        :limit="1"
                                        :multiple="false"
                                        :on-success="personageImageBgAvatarSuccess"
                                        :before-upload="personageImageBgBeforeAvatarUpload"
                                    >
                                        <img
                                            v-if="personageImageBgUrl"
                                            :src="personageImageBgUrl"
                                            class="avatar"
                                        />
                                        <div v-else class="personage-img-content">
                                            <img class="personage-image-bg-icon" />
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
                                <div class="personage-left-text cursorP defaultFont">
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
                                <!-- <div class="personage-cancel-button cursorP defaultFont">取消</div> -->
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
import { defineComponent, ref, Ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useStore } from 'store/index'
import { baseURL } from '@/common/request/config'
import { personal, enterprise } from '@/common/request/modules/user'
import { email_check } from 'utils/check/index'

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
        // 图片上传地址
        const uploadURL = ref(`${baseURL}/member/upload`)
        // 公司认证company
        let companyName = ref('')
        let companyUnifiedCreditCode = ref('')
        let companyLegalPerson = ref('')
        let companyDept = ref('')
        let companyEmail = ref('')
        let companyNote = ref('')
        const companyChecked = ref(false)
        // 营业执照
        const companyImageUrl: Ref<string | null> = ref(null)
        const companyImageAvatarSuccess = (res: any, file: any) => {
            let url = res.data
            if (url) {
                companyImageUrl.value = url
            }
        }
        const companyImageBeforeAvatarUpload = (file: any) => {
            const isJPG = file.type === 'image/jpeg'
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isJPG) {
                ElMessage({
                    message: '只能选择JPG格式的图片',
                    type: 'error',
                })
                return false
            }
            if (!isLt2M) {
                ElMessage({
                    message: '图片大小不能超过2MB!',
                    type: 'error',
                })
                return false
            }
            return isJPG && isLt2M
        }
        // 公司认证提交
        const comapnyOkAction = () => {
            // 姓名校验
            let name = companyName.value
            if (name.trim() === '') {
                ElMessage({
                    message: '请输入企业名称',
                    type: 'warning',
                })
                return
            }
            // 社会信用校验
            let unifiedCreditCode = companyUnifiedCreditCode.value
            if (unifiedCreditCode.trim() === '') {
                ElMessage({
                    message: '请输入统一社会信用代码',
                    type: 'warning',
                })
                return
            }
            // 法人校验
            let legalPerson = companyLegalPerson.value
            if (legalPerson.trim() === '') {
                ElMessage({
                    message: '请输入法人代表名字',
                    type: 'warning',
                })
                return
            }
            // 邮箱账号校验
            let email = companyEmail.value
            let emailErr = email_check(email)
            if (emailErr) {
                ElMessage({
                    message: emailErr,
                    type: 'warning',
                })
                return
            }
            // 部门校验
            let dept = companyDept.value
            if (dept.trim() === '') {
                ElMessage({
                    message: '请输入您所在的部门',
                    type: 'warning',
                })
                return
            }
            // 场景校验
            let note = companyNote.value
            if (note.trim() === '') {
                ElMessage({
                    message: '请输入您使用数据的场景',
                    type: 'warning',
                })
                return
            }
            let companyUrl = companyImageUrl.value
            if (!companyUrl) {
                ElMessage({
                    message: '请上传营业执照',
                    type: 'warning',
                })
                return
            }
            // 服务协议
            let check = companyChecked.value
            if (!check) {
                ElMessage({
                    message: '请阅读并同意《西筹开放平台认证服务协议》',
                    type: 'warning',
                })
                return
            }
            // 提交个人认证
            let userId = computed(() => userInfo.value.id)
            if (!userId.value) {
                ElMessage({
                    message: '用户信息错误',
                    type: 'error',
                })
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
                    ElMessage({
                        message: res,
                        type: 'success',
                    })
                    store.commit('setEnterpriseInfo', parameters)
                })
                .catch((err) => {
                    ElMessage({
                        message: err.msg || '修改手机号失败',
                        type: 'error',
                    })
                })
        }
        // 个人认证personage
        let personageName = ref('唐道勇')
        let personageIdNumber = ref('123456789012345678')
        let personageEmail = ref('18380449615@163.com')
        let personageNote = ref('开发，测试')
        const personageChecked = ref(true)
        // 身份证正面
        const personageImageFrontUrl: Ref<string | null> = ref(
            'https://datumwealth.oss-cn-chengdu.aliyuncs.com/dw/2021-11-17/openalpha/member/7d8dc47b-74e3-4210-b338-0aa454b7bcfd.jpeg'
        )
        const personageImageFrontAvatarSuccess = (res: any, file: any) => {
            let url = res.data
            if (url) {
                personageImageFrontUrl.value = url
            }
        }
        const personageImageFrontBeforeAvatarUpload = (file: any) => {
            const isJPG = file.type === 'image/jpeg'
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isJPG) {
                ElMessage({
                    message: '只能选择JPG格式的图片',
                    type: 'error',
                })
                return false
            }
            if (!isLt2M) {
                ElMessage({
                    message: '图片大小不能超过2MB!',
                    type: 'error',
                })
                return false
            }
            return isJPG && isLt2M
        }
        // 身份证反面
        const personageImageBgUrl: Ref<string | null> = ref(
            'https://datumwealth.oss-cn-chengdu.aliyuncs.com/dw/2021-11-17/openalpha/member/2710016c-3603-42be-b19f-1a8aaccfcdd3.jpeg'
        )
        const personageImageBgAvatarSuccess = (res: any, file: any) => {
            let url = res.data
            if (url) {
                personageImageBgUrl.value = url
            }
        }
        const personageImageBgBeforeAvatarUpload = (file: any) => {
            const isJPG = file.type === 'image/jpeg'
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isJPG) {
                ElMessage({
                    message: '只能选择JPG格式的图片',
                    type: 'error',
                })
                return false
            }
            if (!isLt2M) {
                ElMessage({
                    message: '图片大小不能超过2MB!',
                    type: 'error',
                })
                return false
            }
            return isJPG && isLt2M
        }
        // 个人认证提交
        const personageOkAction = () => {
            // 姓名校验
            let realName = personageName.value
            if (realName.trim() === '') {
                ElMessage({
                    message: '请输入您的姓名',
                    type: 'warning',
                })
                return
            }
            // 身份证号校验
            let idNumber = personageIdNumber.value
            if (idNumber.trim() === '') {
                ElMessage({
                    message: '请输入您的身份证号',
                    type: 'warning',
                })
                return
            }
            // 邮箱账号校验
            let email = personageEmail.value
            let emailErr = email_check(email)
            if (emailErr) {
                ElMessage({
                    message: emailErr,
                    type: 'warning',
                })
                return
            }
            // 身份证号校验
            let note = personageNote.value
            if (note.trim() === '') {
                ElMessage({
                    message: '请输入您使用数据的场景',
                    type: 'warning',
                })
                return
            }
            let frontUrl = personageImageFrontUrl.value
            if (!frontUrl) {
                ElMessage({
                    message: '请上传身份证正面照',
                    type: 'warning',
                })
                return
            }
            let bgUrl = personageImageBgUrl.value
            if (!bgUrl) {
                ElMessage({
                    message: '请上传身份证反面照',
                    type: 'warning',
                })
                return
            }
            // 服务协议
            let check = personageChecked.value
            if (!check) {
                ElMessage({
                    message: '请阅读并同意《西筹开放平台认证服务协议》',
                    type: 'warning',
                })
                return
            }
            // 提交个人认证
            let userId = computed(() => userInfo.value.id)
            if (!userId.value) {
                ElMessage({
                    message: '用户信息错误',
                    type: 'error',
                })
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
                    ElMessage({
                        message: res,
                        type: 'success',
                    })
                    store.commit('setPersonalInfo', parameters)
                })
                .catch((err) => {
                    ElMessage({
                        message: err.msg || '修改手机号失败',
                        type: 'error',
                    })
                })
        }
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
            // 公司认证
            companyChecked,
            companyImageUrl,
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
            personageImageFrontAvatarSuccess,
            personageImageFrontBeforeAvatarUpload,
            personageImageBgUrl,
            personageImageBgAvatarSuccess,
            personageImageBgBeforeAvatarUpload,
            personageOkAction,
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
                                .tab-personage-img-front,
                                .tab-personage-img-bg {
                                    width: 152px;
                                    height: 134px;
                                    border-radius: 2px;
                                    border: 1px solid #bfbfbf;
                                    margin-left: 9px;
                                    .avatar {
                                        width: 152px;
                                        height: 134px;
                                        background: $themeColor;
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
                                            background: $themeColor;
                                        }
                                        .personage-image-title {
                                            margin-top: 11px;
                                            font-size: 14px;
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
                            padding: 11px 12px;
                            box-sizing: border-box;
                            border-radius: 2px;
                            border: 1px solid #bfbfbf;
                            .company-img-content {
                                width: 100%;
                                height: 100%;
                                .company-image-front-icon {
                                    width: 96px;
                                    height: 128px;
                                    background: #e7f3fd;
                                }
                                .company-image-title {
                                    margin-top: 11px;
                                    font-size: 14px;
                                    color: #4e9aeb;
                                    line-height: 20px;
                                }
                            }
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
