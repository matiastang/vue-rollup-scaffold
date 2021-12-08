<!--
 * @Author: matiastang
 * @Date: 2021-11-26 13:37:30
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-08 11:16:29
 * @FilePath: /datumwealth-openalpha-front/src/views/web/about/feedback/Feedback.vue
 * @Description: 意见反馈
-->
<template>
    <div class="feedback flexColumnCenter">
        <div class="feedback-title defaultFont">意见反馈</div>
        <div class="feedback-text defaultFont">
            尊敬的用户：<br />您好，为了给您提供更好的服务，希望收到您使用我们产品的看法或建议。期待能得到您的真实想法与宝贵意见，感谢您的支持!
        </div>
        <el-input
            class="feedback-textarea"
            v-model="feedbackValue"
            type="textarea"
            placeholder="请将您的建议或者遇到的问题告诉我们，我们会认真听取并及时反馈（支持5-500个字符)"
            maxlength="500"
            show-word-limit
            clearable
        />
        <div class="feedback-phone-content flexRowCenter">
            <div class="feedback-phone-prefix defaultFont">*</div>
            <div class="feedback-phone-title defaultFont">手机号码:</div>
            <PhoneInput
                v-model="feedbackPhone"
                phoneClass="feedback-phone"
                placeholder="以便我们及时反馈您"
            />
        </div>
        <div class="feedback-ok cursorP defaultFont" @click="backAction">提交反馈</div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import PhoneInput from '@/components/phoneinput/PhoneInput.vue'
import { phone_check } from 'utils/check/index'
import ElMessage from '@/common/utils/message'
import { feedback } from '@/common/request/index'
import { RejectType } from '@/common/request/request'

export default defineComponent({
    name: 'Feedback',
    setup() {
        const feedbackValue = ref('')
        const feedbackPhone = ref('')

        const backAction = () => {
            const backContent = feedbackValue.value
            if (backContent.length <= 0) {
                ElMessage.warning('请输入反馈内容')
                return
            }
            if (backContent.length < 5) {
                ElMessage.warning('反馈内容至少5个字符')
                return
            }
            if (backContent.length > 500) {
                ElMessage.warning('反馈内容最多500个字符')
                return
            }
            const backPhone = feedbackPhone.value
            const phoneError = phone_check(backPhone)
            if (phoneError) {
                ElMessage.warning(phoneError)
                return
            }
            feedback(backPhone, backContent)
                .then((res) => {
                    if (res) {
                        ElMessage.success('反馈成功')
                    } else {
                        ElMessage.error('反馈失败')
                    }
                })
                .catch((err: RejectType) => {
                    ElMessage.error(err.msg)
                })
        }
        return {
            feedbackValue,
            feedbackPhone,
            backAction,
        }
    },
    components: {
        PhoneInput,
    },
})
</script>

<style lang="scss" scoped>
.feedback {
    width: 100%;
    height: 100%;
    padding: 20px 16px 60px 16px;
    box-sizing: border-box;
    background: $themeBgColor;
    justify-content: flex-start;
    align-items: flex-start;
    .feedback-title {
        width: 100%;
        height: 42px;
        font-size: fontSize(18px);
        color: $titleColor;
        line-height: 26px;
        text-align: left;
        border-bottom: 1px solid #dfdfdf;
    }
    .feedback-text {
        width: 100%;
        font-size: fontSize(14px);
        color: #595959;
        line-height: 20px;
        letter-spacing: 1px;
        margin: 18px 0px;
        text-align: left;
    }
    .feedback-textarea {
        width: 100%;
        height: 260px !important;
        ::v-deep(.el-textarea__inner) {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border-radius: 2px;
            background: #ededed;
        }
        ::v-deep(.el-input__count) {
            background: transparent;
        }
    }
    .feedback-phone-content {
        width: 100%;
        margin-top: 24px;
        margin-bottom: 30px;
        justify-content: flex-start;
        .feedback-phone-prefix {
            width: 16px;
            font-size: fontSize(16px);
            color: #e62412;
            line-height: 24px;
        }
        .feedback-phone-title {
            width: 80px;
            font-size: fontSize(16px);
            color: $titleColor;
            line-height: 24px;
            text-align: left;
            flex-shrink: 0;
        }
        .feedback-phone {
            width: 372px;
            height: 42px;
            border-radius: 2px;
            border: 1px solid #dfdfdf;
            :deep(.el-input) {
                height: 40px;
                .el-input__inner {
                    height: 40px;
                }
            }
        }
    }
    .feedback-ok {
        font-size: fontSize(18px);
        color: $placeholderColor;
        line-height: 56px;
        width: 100%;
        box-sizing: border-box;
        height: 56px;
        border-radius: 4px;
        border: 1px solid #dfdfdf;
    }
}
</style>
