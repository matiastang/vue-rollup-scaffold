<!--
 * @Author: your name
 * @Date: 2021-11-10 14:37:21
 * @LastEditTime: 2021-12-17 17:09:42
 * @LastEditors: matiastang
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/views/web/interfaceInfo/components/infoTable/InfoTable.vue
-->
<template>
    <div class="info-table borderBox flexRowCenter">
        <div
            v-for="item in header"
            :key="item.title"
            class="table-item flexColumnCenter"
            :style="header.length === 2 ? 'max-width: 50%;' : ''"
        >
            <div class="table-header defaultFont">{{ item.title }}</div>
            <div
                v-for="(cellItem, index) in data"
                :key="cellItem.title"
                class="table-cell-content flexRowCenter"
                :style="{
                    'border-bottom': `${index === data.length - 1 ? 0 : 1}px dashed #dfdfdf`,
                }"
            >
                <div
                    v-if="item.key === 'paramRange'"
                    :class="[
                        'table-cell',
                        'defaultFont',
                        {
                            'table-show-cell': cellItem.isOptionalParams === 1,
                        },
                    ]"
                >
                    <div
                        v-if="cellItem.isOptionalParams === 1 && cellItem.optionalParamsValue"
                        @click="
                            getOptionalParams(cellItem.paramKey, cellItem.optionalParamsValue || '')
                        "
                    >
                        查看
                    </div>
                    <div
                        v-if="
                            cellItem.isOptionalParams === 1 &&
                            cellItem.optionalParamsValue === undefined
                        "
                        @click="paramsRemoteMethod(cellItem.apiInfoId, cellItem.paramKey)"
                    >
                        查看
                    </div>
                </div>
                <div v-else class="table-cell defaultFont">
                    {{
                        item.title === '必选'
                            ? `${cellItem[item.key] == 0 ? '否' : '是'}`
                            : `${cellItem[item.key] || ''}`
                    }}
                </div>
            </div>
        </div>
        <el-dialog
            v-model="showParams"
            :title="paramsTitle"
            @close="closeAction"
            :width="500"
            center
        >
            <el-table :data="params.data" :max-height="264">
                <el-table-column property="key" label="key" align="center"></el-table-column>
                <el-table-column property="value" label="value" align="center"></el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog
            v-model="showParamsTwo"
            :title="paramsTwoTitle"
            @close="closeTwoAction"
            :width="350"
            center
        >
            <el-table
                :data="paramsTwo.data"
                header-row-class-name="dialog-two-header"
                :max-height="264"
            >
                <el-table-column
                    property="value"
                    label="value"
                    align="center"
                    width="300"
                ></el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, reactive, watch } from 'vue'
import { InterfaceInfoTableHeader } from '../../interfaceInfo'
import { ApiParamType } from '@/common/request/modules/home/homeInterface'
import { apiParamsKey } from '@/common/request/modules/api/api'
import { useRoute } from 'vue-router'

export default defineComponent({
    name: 'InfoTable',
    props: {
        header: {
            type: Array as PropType<InterfaceInfoTableHeader[]>,
            default: () => {
                return []
            },
        },
        data: {
            type: Array as PropType<ApiParamType[]>,
            default: () => {
                return []
            },
        },
    },
    setup() {
        const route = useRoute()
        const showParams = ref(false)
        const paramsTitle = ref('')
        const params = reactive({
            data: [] as { key: string; value: string }[],
        })
        const showParamsTwo = ref(false)
        const paramsTwoTitle = ref('')
        const paramsTwo = reactive({
            data: [] as { value: string }[],
        })
        /**
         * 获取参数选项
         */
        const getOptionalParams = (paramKey: string, obj: string) => {
            paramsTitle.value = `${paramKey}可选值`
            try {
                params.data = JSON.parse(obj) as { key: string; value: string }[]
            } catch (err) {
                params.data = []
            }
            showParams.value = true
        }
        const closeAction = () => {
            showParams.value = false
        }
        const paramsRemoteMethod = (apiId: number, paramKey: string) => {
            showParamsTwo.value = true
            paramsTwoTitle.value = `${paramKey}可选值`
            apiParamsKey(apiId, paramKey)
                .then((res) => {
                    paramsTwo.data = res.map((item) => {
                        return {
                            value: item,
                        }
                    })
                })
                .catch((err) => {
                    paramsTwo.data = []
                })
                .finally(() => {})
        }
        const closeTwoAction = () => {
            showParamsTwo.value = false
        }
        watch(
            () => route.path,
            () => {
                showParams.value = false
                showParamsTwo.value = false
            }
        )
        return {
            showParams,
            paramsTitle,
            params,
            closeAction,
            getOptionalParams,
            showParamsTwo,
            paramsTwoTitle,
            paramsTwo,
            closeTwoAction,
            paramsRemoteMethod,
        }
    },
})
</script>

<style lang="scss" scoped>
.info-table {
    width: 100%;
    justify-content: space-between !important;
    align-items: flex-start !important;
    background: $themeBgColor;
    border: 1px solid #dfdfdf;
    .table-item {
        flex-shrink: 0;
        flex-grow: 1;
        justify-content: flex-start;
        .table-header {
            width: 100%;
            height: 60px;
            font-size: fontSize(14px);
            color: #595959;
            line-height: 60px;
            background: #f4f4f4;
        }
        .table-cell-content {
            width: 100%;
            height: 60px;
            padding: 0px 5px;
            box-sizing: border-box;
            .table-cell {
                font-size: fontSize(14px);
                color: $titleColor;
                line-height: 20px;
                word-wrap: break-word;
                white-space: normal;
                word-break: break-all;
            }
            .table-show-cell {
                color: #4e9aeb;
                cursor: pointer;
            }
        }
    }
    .table-item:first-child {
        max-width: 20%;
    }
    .table-item:nth-child(2) {
        max-width: 15%;
    }
    .table-item:nth-child(3) {
        max-width: 15%;
    }
    .table-item:last-child {
        max-width: 50%;
    }
    ::v-deep(.dialog-two-header) {
        display: none;
    }
}
</style>
