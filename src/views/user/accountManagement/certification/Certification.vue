<!--
 * @Author: matiastang
 * @Date: 2021-11-11 17:30:28
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-15 19:35:30
 * @FilePath: /datumwealth-openalpha-front/src/views/user/accountManagement/certification/Certification.vue
 * @Description: 个人中心-账号管理-实名认证
-->
<template>
    <div class="certification">
        <!-- 认证通过 -->
        <div v-if="false" class="certification-content-through">
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
                        <div class="certification-through-item-text defaultFont">个人账号</div>
                    </div>
                    <div class="certification-through-item flexRowCenter">
                        <div class="certification-through-item-title defaultFont">姓名:</div>
                        <div class="certification-through-item-text defaultFont">安琪拉</div>
                    </div>
                    <div class="certification-through-item flexRowCenter">
                        <div class="certification-through-item-title defaultFont">身份证号:</div>
                        <div class="certification-through-item-text defaultFont">
                            1243568943376541345
                        </div>
                    </div>
                    <div class="certification-through-item flexRowCenter">
                        <div class="certification-through-item-title defaultFont">认证时间:</div>
                        <div class="certification-through-item-text defaultFont">2021-10-20</div>
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
        <div class="certification-content-auditing">
            <div class="certification-auditing-title defaultFont">认证申请</div>
            <div class="certification-auditing-content flexRowCenter">
                <img class="certification-auditing-img" />
                <div class="certification-auditing-right flexColumnCenter">
                    <div class="certification-auditing-item flexRowCenter">
                        <div class="certification-auditing-item-title defaultFont">企业名称:</div>
                        <div class="certification-auditing-item-text defaultFont">
                            成都西筹金融科技有限公司
                        </div>
                    </div>
                    <div class="certification-auditing-item flexRowCenter">
                        <div class="certification-auditing-item-title defaultFont">
                            社会统一信用代码:
                        </div>
                        <div class="certification-auditing-item-text defaultFont">
                            91510100MA68DEK87Y
                        </div>
                    </div>
                    <div class="certification-auditing-item flexRowCenter">
                        <div class="certification-auditing-item-title defaultFont">账号类型:</div>
                        <div class="certification-auditing-item-text defaultFont">企业账号</div>
                    </div>
                    <div v-if="false" class="certification-auditing-item flexRowCenter">
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
                    <div class="certification-auditing-item flexRowCenter">
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
            <div class="certification-content-error">
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
        <div class="certification-content-post"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Certification',
    setup() {
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
            tableData,
        }
    },
})
</script>

<style lang="scss" scoped>
.certification {
    width: 100%;
    height: 100%;
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
        padding: 16px 24px;
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
}
</style>
