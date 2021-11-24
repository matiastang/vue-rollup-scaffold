<!--
 * @Author: your name
 * @Date: 2021-11-08 19:35:04
 * @LastEditTime: 2021-11-24 18:15:28
 * @LastEditors: matiastang
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/components/applyTrialModel/ApplyTrialModel.vue
-->
<template>
    <div class="apply-model">
        <el-dialog :="$attrs" center>
            <div class="model-title defaultFont">申请试用套餐</div>
            <div class="model-warning-content flexRowCenter">
                <img class="model-warning-icon" src="static/api/warning.svg" />
                <div class="model-warning defaultFont">
                    试用套餐仅能申请一次，请仔细核对账号信息！
                </div>
            </div>
            <div class="model-info-content flexRowCenter">
                <div class="model-info-left-content flexRowCenter">
                    <div class="model-info-title defaultFont">总调用次数:</div>
                    <div class="model-info-value">{{ `${count}次` }}</div>
                </div>
                <!-- <div class="model-info-right-content flexRowCenter">
                    <div class="model-info-title defaultFont">有效期限:</div>
                    <div class="model-info-value">{{ time }}</div>
                </div> -->
            </div>
            <div class="model-content flexRowCenter">
                <div class="model-body-title defaultFont">登录账号:</div>
                <div class="model-value">{{ name }}</div>
            </div>
            <div class="model-content flexRowCenter">
                <div class="model-body-title defaultFont">手机号码:</div>
                <div class="model-value">{{ phone }}</div>
            </div>
            <div class="model-content flexRowCenter">
                <div class="model-body-title defaultFont">邮箱地址:</div>
                <div class="model-value">{{ email }}</div>
            </div>
            <div class="model-bottom flexRowCenter">
                <div class="model-cancel-button cursorP defaultFont" @click="modelCancelAction">
                    修改信息
                </div>
                <div class="model-ok-button cursorP defaultFont" @click="modelOkAction">
                    确定申请
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { addOd, orderType } from '@/common/request/modules/pay/pay'
import { ElMessage } from 'element-plus'
import { PaymentType, WeiXinOdResponse } from '@/common/request/modules/pay/payInterface'
import { localStorageKey, localStorageRead } from 'utils/storage/localStorage'

export default defineComponent({
    name: 'ApplyTrialModel',
    inheritAttrs: false,
    props: {
        count: {
            type: Number,
            default: 200,
        },
        time: {
            type: String,
            default: '2021.10.10～2021.11.09',
        },
        name: {
            type: String,
            default: '-',
        },
        phone: {
            type: String,
            default: '-',
        },
        email: {
            type: String,
            default: '-',
        },
    },
    emits: ['okAction', 'cancelAction'],
    methods: {
        modelOkAction() {
            addOd({
                goodsAmount: 0,
                orderType: orderType.test,
                payId: 0,
            })
                .then((oreder) => {
                    ElMessage({
                        message: '试用申请成功',
                        type: 'success',
                    })
                    this.$emit('okAction')
                })
                .catch((err) => {
                    ElMessage({
                        message: err.msg || '接口id错误',
                        type: 'error',
                    })
                })
        },
        modelCancelAction() {
            this.$emit('cancelAction')
        },
    },
})
</script>

<style lang="scss" scoped>
.apply-model {
    ::v-deep(.el-dialog) {
        width: 526px;
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
        .model-warning-content {
            width: 100%;
            margin: 11px 0px;
            justify-content: flex-start;
            .model-warning-icon {
                width: 14px;
                height: 14px;
                flex-flow: 0;
                margin-right: 5px;
            }
            .model-warning {
                font-size: 12px;
                color: #e62412;
                line-height: 18px;
            }
        }
        .model-info-content {
            justify-content: flex-start;
            margin-bottom: 27px;
            .model-info-left-content,
            .model-info-right-content {
                justify-content: flex-start;
                .model-info-title {
                    font-size: 14px;
                    color: #595959;
                    line-height: 20px;
                    margin-right: 12px;
                }
                .model-info-value {
                    font-size: 14px;
                    color: $themeColor;
                    line-height: 20px;
                }
            }
            .model-info-left-content {
                margin-right: 30px;
            }
        }
        .model-content {
            margin-bottom: 26px;
            justify-content: flex-start;
            .model-body-title {
                font-size: 16px;
                color: $titleColor;
                line-height: 24px;
                margin-right: 12px;
            }
            .model-value {
                font-size: 16px;
                color: $titleColor;
                line-height: 24px;
            }
        }
        .model-bottom {
            margin-top: 30px;
            justify-content: flex-end;
            .model-ok-button {
                width: 118px;
                height: 42px;
                background: $themeColor;
                border-radius: 4px;
                font-size: 16px;
                color: $themeBgColor;
                line-height: 42px;
                margin-left: 40px;
            }
            .model-cancel-button {
                width: 118px;
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
