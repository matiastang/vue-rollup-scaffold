<!--
 * @Author: your name
 * @Date: 2021-11-10 10:19:32
 * @LastEditTime: 2021-11-10 10:42:28
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/views/interfaceCall/InterfaceCall.vue
-->
<template>
    <div class="interface flexColumnCenter">
        <div class="interface-hot"></div>
        <div class="interface-bottom flexRowCenter">
            <div class="interface-left borderBox flexRowCenter"></div>
            <div class="interface-right borderBox flexColumnCenter">
                <div class="interface-right-title defaultFont">
                    {{ `基金基本信息(${interfaceAllCount})` }}
                </div>
                <div v-for="dataItem in interfaceListData" :key="dataItem.title"></div>
            </div>
        </div>
        <InterfaceAffix @click="showApplyTrialModel" />
        <ApplyTrialModel
            v-model="applyTrialDialogVisible"
            @okAction="applyTrialOkAction"
            @cancelAction="applyTrialCancelAction"
        />
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import InterfaceAffix from '@/components/interfaceAffix/InterfaceAffix.vue'
import ApplyTrialModel from '@/components/applyTrialModel/ApplyTrialModel.vue'
import { ElMessage } from 'element-plus'

export default defineComponent({
    name: 'InterfaceCall',
    setup() {
        const router = useRouter()
        let selectIndex = ref(4)
        let interfaceData = reactive([
            {
                title: '基本信息',
                count: 1,
                selected: false,
                data: [
                    {
                        title: '基金基本要素',
                        text: '可以通过公司名称或ID获取相关基金信息，包括私募基金管理人名称、法定代表人/执行事务合伙人、机构类型、登记编号、成立日期等字段的相关信息',
                        id: '1314',
                        price: '0.15',
                    },
                ],
            },
            {
                title: '基本信息',
                count: 2,
                selected: false,
                data: [
                    {
                        title: '基金基本要素',
                        text: '可以通过公司名称或ID获取相关基金信息，包括私募基金管理人名称、法定代表人/执行事务合伙人、机构类型、登记编号、成立日期等字段的相关信息',
                        id: '1314',
                        price: '0.15',
                    },
                    {
                        title: '基金基本要素',
                        text: '可以通过公司名称或ID获取相关基金信息，包括私募基金管理人名称、法定代表人/执行事务合伙人、机构类型、登记编号、成立日期等字段的相关信息',
                        id: '1314',
                        price: '0.15',
                    },
                ],
            },
            {
                title: '基本信息',
                count: 3,
                selected: false,
                data: [
                    {
                        title: '基金基本要素',
                        text: '可以通过公司名称或ID获取相关基金信息，包括私募基金管理人名称、法定代表人/执行事务合伙人、机构类型、登记编号、成立日期等字段的相关信息',
                        id: '1314',
                        price: '0.15',
                    },
                    {
                        title: '基金基本要素',
                        text: '可以通过公司名称或ID获取相关基金信息，包括私募基金管理人名称、法定代表人/执行事务合伙人、机构类型、登记编号、成立日期等字段的相关信息',
                        id: '1314',
                        price: '0.15',
                    },
                    {
                        title: '基金基本要素',
                        text: '可以通过公司名称或ID获取相关基金信息，包括私募基金管理人名称、法定代表人/执行事务合伙人、机构类型、登记编号、成立日期等字段的相关信息',
                        id: '1314',
                        price: '0.15',
                    },
                ],
            },
            {
                title: '基本信息',
                count: 4,
                selected: false,
                data: [
                    {
                        title: '基金基本要素',
                        text: '可以通过公司名称或ID获取相关基金信息，包括私募基金管理人名称、法定代表人/执行事务合伙人、机构类型、登记编号、成立日期等字段的相关信息',
                        id: '1314',
                        price: '0.15',
                    },
                    {
                        title: '基金基本要素',
                        text: '可以通过公司名称或ID获取相关基金信息，包括私募基金管理人名称、法定代表人/执行事务合伙人、机构类型、登记编号、成立日期等字段的相关信息',
                        id: '1314',
                        price: '0.15',
                    },
                    {
                        title: '基金基本要素',
                        text: '可以通过公司名称或ID获取相关基金信息，包括私募基金管理人名称、法定代表人/执行事务合伙人、机构类型、登记编号、成立日期等字段的相关信息',
                        id: '1314',
                        price: '0.15',
                    },
                    {
                        title: '基金基本要素',
                        text: '可以通过公司名称或ID获取相关基金信息，包括私募基金管理人名称、法定代表人/执行事务合伙人、机构类型、登记编号、成立日期等字段的相关信息',
                        id: '1314',
                        price: '0.15',
                    },
                ],
            },
            {
                title: '基本信息',
                count: 5,
                selected: true,
                data: [
                    {
                        title: '基金资产配置',
                        data: [
                            {
                                title: '基金基本要素',
                                text: '可以通过公司名称或ID获取相关基金信息，包括私募基金管理人名称、法定代表人/执行事务合伙人、机构类型、登记编号、成立日期等字段的相关信息',
                                id: '1314',
                                price: '0.15',
                            },
                            {
                                title: '基金基本要素',
                                text: '可以通过公司名称或ID获取相关基金信息，包括私募基金管理人名称、法定代表人/执行事务合伙人、机构类型、登记编号、成立日期等字段的相关信息',
                                id: '1314',
                                price: '0.15',
                            },
                        ],
                    },
                    {
                        title: '基金资产配置',
                        data: [
                            {
                                title: '基金基本要素',
                                text: '可以通过公司名称或ID获取相关基金信息，包括私募基金管理人名称、法定代表人/执行事务合伙人、机构类型、登记编号、成立日期等字段的相关信息',
                                id: '1314',
                                price: '0.15',
                            },
                            {
                                title: '基金基本要素',
                                text: '可以通过公司名称或ID获取相关基金信息，包括私募基金管理人名称、法定代表人/执行事务合伙人、机构类型、登记编号、成立日期等字段的相关信息',
                                id: '1314',
                                price: '0.15',
                            },
                            {
                                title: '基金基本要素',
                                text: '可以通过公司名称或ID获取相关基金信息，包括私募基金管理人名称、法定代表人/执行事务合伙人、机构类型、登记编号、成立日期等字段的相关信息',
                                id: '1314',
                                price: '0.15',
                            },
                        ],
                    },
                ],
            },
        ])
        let interfaceListData = computed(() => interfaceData[selectIndex.value].data)
        let interfaceAllCount = computed(() => interfaceData[selectIndex.value].count)
        const selectAction = (index: number) => {
            selectIndex.value = index
            for (let i = 0; i < interfaceData.length; i++) {
                interfaceData[i].selected = i === index
            }
        }
        // 申请接口试用
        let applyTrialDialogVisible = ref(false)
        const showApplyTrialModel = () => {
            applyTrialDialogVisible.value = true
        }
        return {
            selectIndex,
            selectAction,
            interfaceData,
            interfaceAllCount,
            interfaceListData,
            applyTrialDialogVisible,
            showApplyTrialModel,
        }
    },
    components: {
        InterfaceAffix,
        ApplyTrialModel,
    },
    methods: {
        applyTrialOkAction() {
            // TODO: - 校验
            ElMessage({
                message: '申请功能开发中...',
                type: 'warning',
            })
        },
        applyTrialCancelAction() {
            // TODO: - 校验
            ElMessage({
                message: '修改信息功能开发中...',
                type: 'warning',
            })
        },
        infoCellAction() {
            console.log('点击cell')
        },
    },
})
</script>

<style lang="scss" scoped>
.interface {
    position: relative;
    padding: 20px 10% 60px 10%;
    .interface-hot {
        width: 100%;
        height: 238px;
        background: $themeBgColor;
    }
    .interface-bottom {
        width: 100%;
        align-items: stretch;
        margin-top: 20px;
        .interface-left {
            width: 25.8%;
            padding-right: 16px;
            justify-content: flex-start;
            align-items: stretch;
            .interface-list {
                width: 100%;
                background: $themeBgColor;
                justify-content: flex-start;
            }
        }
        .interface-right {
            width: 74.2%;
            background: $themeBgColor;
            padding: 0px 24px;
            justify-content: flex-start;
            .interface-right-title {
                font-size: 18px;
                color: $titleColor;
                line-height: 26px;
                width: 100%;
                padding: 24px 0px 16px 0px;
                text-align: left;
                border-bottom: 1px solid #dfdfdf;
            }
            ::v-deep(.interface-next-content) {
                justify-content: flex-start;
                margin-top: 17px;
                .interface-next-line {
                    width: 2px;
                    height: 18px;
                    background: $themeColor;
                    margin-right: 4px;
                }
                .interface-next-title {
                    font-size: 18px;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: $themeColor;
                    line-height: 26px;
                    letter-spacing: 1px;
                }
            }
        }
    }
}
@media screen and (max-width: 1360px) {
    .interface {
        padding: 20px 5% 60px 5%;
    }
}
</style>
