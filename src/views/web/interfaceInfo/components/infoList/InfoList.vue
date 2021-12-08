<!--
 * @Author: matiastang
 * @Date: 2021-11-11 17:58:07
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-03 15:14:53
 * @FilePath: /datumwealth-openalpha-front/src/views/web/interfaceInfo/components/infoList/InfoList.vue
 * @Description: 详情接口列表树
-->
<template>
    <div class="info-list flexColumnCenter">
        <div class="list-title-content borderBox flexRowCenter">
            <div class="info-list-title defaultFont">接口目录</div>
            <div class="info-list-value defaultFont">{{ `(${count})` }}</div>
        </div>
        <InfoListGroup
            class="info-list-group"
            v-for="groupItem in data"
            :key="groupItem.categoryId"
            :title="groupItem.categoryName"
            :url="groupItem.categoryIconUrl"
            :count="getCount(groupItem)"
            :selected="firstSelectedGroup && groupItem.categoryId === firstSelectedGroup"
        >
            <div v-if="groupItem.categoryType === 0">
                <InfoListGroup
                    v-for="dataItem in groupItem.children"
                    :key="dataItem.categoryId"
                    :title="dataItem.categoryName"
                    :count="getCount(dataItem)"
                    :selected="secondSelectedGroup && dataItem.categoryId === secondSelectedGroup"
                >
                    <InfoListCell
                        v-for="item in dataItem.apiInfoList.sort(
                            (left, right) => left.apiOrderNum - right.apiOrderNum
                        )"
                        :key="item.apiInfoId"
                        :title="item.apiName"
                        :selected="selectedApiId === item.apiInfoId"
                        @click="apiSelectAction(item.apiInfoId)"
                    />
                </InfoListGroup>
            </div>
            <div v-else-if="groupItem.categoryType === 1">
                <InfoListCell
                    v-for="item in groupItem.apiInfoList.sort(
                        (left, right) => left.apiOrderNum - right.apiOrderNum
                    )"
                    :key="item.apiInfoId"
                    :title="item.apiName"
                    :selected="selectedApiId === item.apiInfoId"
                    @click="apiSelectAction(item.apiInfoId)"
                />
            </div>
        </InfoListGroup>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType, Ref, ref, computed, watchEffect } from 'vue'
import InfoListGroup from '../infoListGroup/InfoListGroup.vue'
import InfoListCell from '../infoListCell/InfoListCell.vue'
import { HotType } from '@/common/request/modules/home/homeInterface'

export default defineComponent({
    name: 'InfoList',
    props: {
        data: {
            type: Array as PropType<HotType[]>,
            default: () => {
                return []
            },
        },
        selectedId: {
            type: Number,
            default: -1,
        },
    },
    emits: ['select'],
    setup(props, context) {
        // 选中的api
        const selectedApiId: Ref<number> = ref(props.selectedId)
        watchEffect(() => {
            selectedApiId.value = props.selectedId
            console.log(`selectedApiId=${selectedApiId.value}`)
        })
        // Group是否展开
        const firstSelectedGroup: Ref<number | null> = ref(null)
        const secondSelectedGroup: Ref<number | null> = ref(null)
        watchEffect(() => {
            for (let i = 0; i < props.data.length; i++) {
                const item = props.data[i]
                if (item.categoryType === 1) {
                    // 叶子节点
                    let apiList = item.apiInfoList
                    for (let j = 0; j < apiList.length; j++) {
                        if (apiList[j].apiInfoId === props.selectedId) {
                            firstSelectedGroup.value = item.categoryId
                            secondSelectedGroup.value = null
                            break
                        }
                    }
                } else {
                    const children = item.children
                    if (children) {
                        for (let j = 0; j < children.length; j++) {
                            const element = children[j]
                            if (element.categoryType === 1) {
                                // 叶子节点
                                let childrenApiList = element.apiInfoList
                                for (let j = 0; j < childrenApiList.length; j++) {
                                    if (childrenApiList[j].apiInfoId === props.selectedId) {
                                        firstSelectedGroup.value = item.categoryId
                                        secondSelectedGroup.value = element.categoryId
                                        break
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
        /**
         * 接口总数
         */
        const count = computed(() => {
            let num = 0
            for (let i = 0; i < props.data.length; i++) {
                const item = props.data[i]
                if (item.categoryType === 1) {
                    // 叶子节点
                    let apiList = item.apiInfoList
                    num += apiList.length
                } else {
                    const children = item.children
                    if (children) {
                        for (let j = 0; j < children.length; j++) {
                            const element = children[j]
                            if (element.categoryType === 1) {
                                // 叶子节点
                                let childrenApiList = element.apiInfoList
                                num += childrenApiList.length
                            }
                        }
                    }
                }
            }
            return num
        })
        // 接口点击
        const apiSelectAction = (id: number) => {
            selectedApiId.value = id
            context.emit('select', id)
        }
        /**
         * 获取分类接口数
         */
        const getCount = (item: HotType) => {
            let num = 0
            if (item.categoryType === 1) {
                // 叶子节点
                let apiList = item.apiInfoList
                num += apiList.length
            } else {
                const children = item.children
                if (children) {
                    for (let j = 0; j < children.length; j++) {
                        const element = children[j]
                        if (element.categoryType === 1) {
                            // 叶子节点
                            let childrenApiList = element.apiInfoList
                            num += childrenApiList.length
                        }
                    }
                }
            }
            return num
        }
        return {
            firstSelectedGroup,
            secondSelectedGroup,
            count,
            selectedApiId,
            getCount,
            apiSelectAction,
        }
    },
    components: {
        InfoListCell,
        InfoListGroup,
    },
})
</script>

<style lang="scss" scoped>
.info-list {
    width: 100%;
    justify-content: flex-start;
    .list-title-content {
        width: 100%;
        padding: 21px 12px 21px 16px;
        justify-content: space-between;
        border-bottom: 1px solid #dfdfdf;
        .info-list-title,
        .info-list-value {
            font-size: fontSize(16px);
            color: $titleColor;
            line-height: 24px;
        }
    }
    .info-list-group {
        width: 100%;
        .info-list-group-content {
            width: 100%;
            .info-list-second-level-group {
                width: 100%;
            }
        }
    }
}
</style>
