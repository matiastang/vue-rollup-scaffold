<!--
 * @Author: your name
 * @Date: 2021-11-08 16:10:50
 * @LastEditTime: 2021-11-08 16:33:46
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/views/solution/Solution.vue
-->
<template>
    <div class="solution">
        <div class="solution-top"></div>
        <el-dialog v-model="dialogVisible" title="Tips" width="30%" :before-close="handleClose">
            <span>This is a message</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { ElMessage } from 'element-plus'

export default defineComponent({
    name: 'Solution',
    setup() {
        return {}
    },
    components: {},
})
</script>

<style lang="scss" scoped>
.recharge {
    width: 100%;
    padding: 20px 10% 60px 10%;
    .recharge-top-content {
        width: 100%;
        background: $themeBgColor;
        padding: 24px 16px 42px 16px;
        margin-bottom: 20px;
        .recharge-money-content {
            justify-content: flex-start;
            align-items: flex-start;
            .recharge-title {
                font-size: 14px;
                color: $titleColor;
                line-height: 20px;
            }
        }
        .pay-button {
            margin-left: 73px;
            width: 118px;
            height: 42px;
            background: $themeColor;
            border-radius: 4px;
            font-size: 16px;
            color: $themeBgColor;
            line-height: 42px;
            text-align: center;
        }
    }
    .recharge-bottom-content {
        width: 100%;
        background: $themeBgColor;
        padding: 24px 16px;
        .recharge-service-content {
            width: 100%;
            .recharge-title-content {
                width: 100%;
                justify-content: flex-start;
                .recharge-line {
                    width: 2px;
                    height: 14px;
                    background: $themeColor;
                    margin-right: 4px;
                }
                .recharge-title {
                    font-size: 14px;
                    color: $titleColor;
                    line-height: 20px;
                }
            }
            .recharge-service-bottom-content {
                width: 100%;
                .recharge-service-item {
                    width: 25%;
                    padding: 16px 0px 32px 0px;
                    margin: 0px 8px;
                    .recharge-service-item-img-content {
                        background: #fdf6f4;
                        width: 100%;
                        height: 218px;
                        .recharge-service-item-img {
                            width: 120px;
                            height: 120px;
                        }
                    }
                    .recharge-service-item-title {
                        width: 100%;
                        font-size: 18px;
                        color: $titleColor;
                        line-height: 26px;
                        text-align: center;
                        margin-top: 12px;
                    }
                }
                .recharge-service-item-start {
                    margin: 0px 8px 0px 0px;
                }
                .recharge-service-item-end {
                    margin: 0px 0px 0px 8px;
                }
            }
        }
        .recharge-course-content {
            width: 100%;
            .recharge-title-content {
                width: 100%;
                justify-content: flex-start;
                .recharge-line {
                    width: 2px;
                    height: 14px;
                    background: $themeColor;
                    margin-right: 4px;
                }
                .recharge-title {
                    font-size: 14px;
                    color: $titleColor;
                    line-height: 20px;
                }
            }
            .recharge-course-bottom-content {
                width: 100%;
                padding: 56px 0px 58px;
                align-items: flex-start;
                .recharge-course-item {
                    width: 100%;
                    .recharge-course-item-top-content {
                        width: 100%;
                        .recharge-course-item-hidden-line {
                            background: transparent !important;
                        }
                        .recharge-course-item-left {
                            flex-grow: 1;
                            height: 1px;
                            background: $themeColor;
                            margin-right: 36px;
                        }
                        .recharge-course-item-index {
                            flex-grow: 0;
                            flex-flow: 0;
                            width: 56px;
                            height: 56px;
                            background: $themeColor;
                            border-radius: 28px;
                            box-shadow: 0px 5px 12px 0px #ffc2aa;
                            font-size: 18px;
                            color: $themeBgColor;
                            line-height: 56px;
                            text-align: center;
                        }
                        .recharge-course-item-right {
                            flex-grow: 1;
                            height: 1px;
                            background: $themeColor;
                            margin-left: 36px;
                        }
                    }
                    .recharge-course-item-title {
                        width: 100%;
                        text-align: center;
                        font-size: 18px;
                        color: $titleColor;
                        line-height: 26px;
                        margin-top: 26px;
                    }
                    .recharge-course-item-text {
                        width: 100%;
                        text-align: center;
                        font-size: 14px;
                        color: $placeholderColor;
                        line-height: 20px;
                        margin-top: 6px;
                    }
                }
            }
        }
    }
}
@media screen and (max-width: 1360px) {
    .recharge {
        padding: 20px 5% 60px 5%;
    }
}
</style>
