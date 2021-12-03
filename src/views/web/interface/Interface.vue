<!--
 * @Author: your name
 * @Date: 2021-11-08 16:11:41
 * @LastEditTime: 2021-12-03 11:16:59
 * @LastEditors: matiastang
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/views/web/interface/Interface.vue
-->
<template>
    <div class="interface flexColumnCenter">
        <div class="interface-hot">
            <InterfaceHot :data="hotListData.list" />
        </div>
        <div class="interface-bottom flexRowCenter">
            <div class="interface-left borderBox flexRowCenter">
                <InterfaceList
                    v-if="interfaceTree.tree.length > 0"
                    class="interface-list"
                    :data="interfaceTree.tree"
                    :seletedCategoryId="seletedCategoryId"
                    @seletedCategoryAction="seletedCategoryAction"
                />
                <el-skeleton v-else class="interface-list-skeleton" :rows="20" animated />
            </div>
            <div
                v-if="interfaceTree.tree.length > 0 && seletedCategoryId !== 0"
                class="interface-right borderBox flexColumnCenter"
            >
                <div class="interface-right-title defaultFont">
                    {{ `${selectInterfaceData.categoryName}(${selectInterfaceData.count})` }}
                </div>
                <div v-if="selectInterfaceData.categoryType === 0">
                    <div v-for="dataItem in selectInterfaceData.data" :key="dataItem.categoryId">
                        <div class="interface-next-content flexRowCenter">
                            <div class="interface-next-line"></div>
                            <div class="interface-next-title">
                                {{ `${dataItem.categoryName}(${dataItem.apiInfoList.length})` }}
                            </div>
                        </div>
                        <BaseInfoCell
                            v-for="item in dataItem.apiInfoList"
                            :key="item.apiInfoId"
                            :data="item"
                        />
                    </div>
                </div>
                <div v-else-if="selectInterfaceData.categoryType === 1">
                    <BaseInfoCell
                        v-for="item in selectInterfaceData.data[0].apiInfoList"
                        :key="item.apiInfoId"
                        :data="item"
                    />
                </div>
            </div>
            <div
                v-if="
                    interfaceTree.tree.length > 0 &&
                    seletedCategoryId === 0 &&
                    searchRes.list.length > 0
                "
                class="interface-right borderBox flexColumnCenter"
            >
                <div class="interface-right-title defaultFont">
                    {{ `搜索结果(${searchRes.list.length})` }}
                </div>
                <BaseInfoCell v-for="item in searchRes.list" :key="item.apiInfoId" :data="item" />
            </div>
            <div
                v-if="
                    interfaceTree.tree.length > 0 &&
                    seletedCategoryId === 0 &&
                    searchRes.list.length === 0
                "
                class="interface-right borderBox flexColumnCenter"
            >
                <div class="interface-right-title defaultFont">未搜索到接口</div>
            </div>
            <el-skeleton
                v-if="interfaceTree.tree.length <= 0"
                class="interface-right-skeleton"
                :rows="5"
                animated
            />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, computed, watchSyncEffect, watchEffect } from 'vue'
import InterfaceList from './components/interfaceList/InterfaceList.vue'
import BaseInfoCell from './components/baseInfoCell/BaseInfoCell.vue'
import InterfaceHot from './components/interfaceHot/InterfaceHot.vue'
// import { ElMessage } from 'element-plus'
import {
    apiHotInterface,
    apiSearch,
    categoryList,
    categoryInterfaceList,
} from '@/common/request/modules/api/api'
import { homeInterfaceTree } from '@/common/request/modules/home/home'
import { HotType, ApiInfoType } from '@/common/request/modules/home/homeInterface'
import {
    ListRecoType,
    CategoryType,
    CategoryApiType,
} from '@/common/request/modules/api/apiInterface'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

export default defineComponent({
    name: 'Interface',
    setup() {
        const route = useRoute()
        // 热榜
        const hotListData = reactive({
            list: [] as Array<ListRecoType>,
        })
        watchSyncEffect(async () => {
            hotListData.list = await apiHotInterface()
        })
        // 接口列表树
        const interfaceTree = reactive({
            // tree: Array<HotType>(),
            tree: Array<CategoryType>(),
        })
        watchSyncEffect(async () => {
            try {
                // interfaceTree.tree = await homeInterfaceTree()
                interfaceTree.tree = await categoryList()
            } catch (error: any) {
                ElMessage.error(error.msg || '请求错误')
            }
        })
        // 选择的分类
        let seletedCategoryId = ref(0)
        if (route.path.startsWith('/interface')) {
            watchEffect(() => {
                if (route.params.id) {
                    seletedCategoryId.value = Number(route.params.id)
                    return
                }
                seletedCategoryId.value = 1
            })
        }
        const searchRes = reactive({
            list: [] as ApiInfoType[],
        })
        if (route.path.startsWith('/search')) {
            watchSyncEffect(async () => {
                const keyword = route.params.id
                seletedCategoryId.value = 0
                if (keyword === undefined) {
                    seletedCategoryId.value = 1
                    return
                }
                let searchKeyword = ''
                if (typeof keyword !== 'string') {
                    if (keyword.length <= 0) {
                        seletedCategoryId.value = 1
                        return
                    }
                    searchKeyword = keyword[0]
                } else {
                    searchKeyword = keyword
                }
                if (searchKeyword === '') {
                    seletedCategoryId.value = 1
                    return
                }
                searchRes.list = await apiSearch(searchKeyword)
            })
        } else {
            watchSyncEffect(async () => {
                const category = interfaceTree.tree.find((item) => {
                    return item.categoryId === seletedCategoryId.value
                })
                if (!category) {
                    return
                }
                const res = await categoryInterfaceList(category.categoryId, category.categoryType)
                selectInterfaceData.categoryId = category.categoryId
                selectInterfaceData.categoryName = category.categoryName
                selectInterfaceData.categoryType = category.categoryType
                selectInterfaceData.count = category.cnt
                selectInterfaceData.data = res
            })
        }
        // 切换分类
        const seletedCategoryAction = (id: number) => {
            seletedCategoryId.value = id
        }
        // const selectInterfaceData = computed(() => {
        //     for (let i = 0; i < interfaceTree.tree.length; i++) {
        //         const element = interfaceTree.tree[i]
        //         if (element.categoryId === seletedCategoryId.value) {
        //             return element
        //         }
        //     }
        //     return {} as HotType
        // })
        const selectInterfaceData = reactive({
            categoryId: 0,
            categoryName: '',
            categoryType: 0,
            count: 0,
            data: Array<CategoryApiType>(),
        })

        // const allCount = computed(() => {
        //     let num = 0
        //     const data = selectInterfaceData.value
        //     if (!data) {
        //         return num
        //     }
        //     if (data.categoryType === 1) {
        //         // 叶子节点
        //         let apiList = data.apiInfoList
        //         num += apiList.length
        //     } else {
        //         const children = data.children
        //         if (children) {
        //             for (let j = 0; j < children.length; j++) {
        //                 const element = children[j]
        //                 if (element.categoryType === 1) {
        //                     // 叶子节点
        //                     let childrenApiList = element.apiInfoList
        //                     num += childrenApiList.length
        //                 }
        //             }
        //         }
        //     }
        //     return num
        // })
        return {
            hotListData,
            interfaceTree,
            seletedCategoryId,
            seletedCategoryAction,
            // allCount,
            selectInterfaceData,
            searchRes,
        }
    },
    components: {
        InterfaceList,
        BaseInfoCell,
        InterfaceHot,
    },
})
</script>

<style lang="scss" scoped>
.interface {
    position: relative;
    padding: 20px calc(50% - 712px) 60px calc(50% - 712px);
    .interface-hot {
        width: 100%;
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
            .interface-list-skeleton {
                background: $themeBgColor;
                padding: 12px;
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
        .interface-right-skeleton {
            width: 74.2%;
            background: $themeBgColor;
            padding: 12px 24px;
        }
    }
    .apply-trial-affix {
        position: fixed;
        width: 76px;
        height: 109px;
        background: $themeColor;
        border-radius: 2px;
        right: 17px !important;
        bottom: 298px !important;
        .apply-trial-img {
            width: 40px;
            height: 40px;
            color: $themeBgColor;
            margin-bottom: 5px;
        }
        .apply-trial-title {
            font-size: 18px;
            color: $themeBgColor;
            line-height: 26px;
            width: 40px;
        }
    }
}
@media screen and (max-width: 1500px) {
    .interface {
        padding: 20px 30px 60px 30px;
    }
}
</style>
