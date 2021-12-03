<!--
 * @Author: your name
 * @Date: 2021-11-09 16:39:34
 * @LastEditTime: 2021-12-03 10:13:18
 * @LastEditors: matiastang
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/views/web/interface/components/interfaceList/InterfaceList.vue
-->
<template>
    <div class="interface-list flexColumnCenter">
        <div class="list-title-content borderBox flexRowCenter">
            <div class="interface-list-title defaultFont">接口目录</div>
            <div class="interface-list-value defaultFont">{{ `(${count})` }}</div>
        </div>
        <InterfaceListCell
            v-for="item in data"
            :key="item.categoryId"
            :data="item"
            :selected="seletedCategoryId === item.categoryId"
            @click="clickAction(item.categoryId)"
        />
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import InterfaceListCell from '../interfaceListCell/InterfaceListCell.vue'
// import { HotType } from '@/common/request/modules/home/homeInterface'
import { CategoryType } from '@/common/request/modules/api/apiInterface'

export default defineComponent({
    name: 'InterfaceList',
    props: {
        data: {
            // type: Array as PropType<HotType[]>,
            type: Array as PropType<CategoryType[]>,
            default: () => {
                return []
            },
        },
        seletedCategoryId: {
            type: Number,
            default: 0,
        },
    },
    emits: ['seletedCategoryAction'],
    setup(props, context) {
        /**
         * 接口总数
         */
        const count = computed(() => {
            let num = 0
            // for (let i = 0; i < props.data.length; i++) {
            //     const item = props.data[i]
            //     if (item.categoryType === 1) {
            //         // 叶子节点
            //         let apiList = item.apiInfoList
            //         num += apiList.length
            //     } else {
            //         const children = item.children
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
            // }
            for (let i = 0; i < props.data.length; i++) {
                const item = props.data[i]
                num += item.cnt
            }
            return num
        })
        // 点击分类
        const clickAction = (id: number) => {
            context.emit('seletedCategoryAction', id)
        }
        return {
            count,
            clickAction,
        }
    },
    components: {
        InterfaceListCell,
    },
})
</script>

<style lang="scss" scoped>
.interface-list {
    width: 100%;
    justify-content: flex-start;
    .list-title-content {
        width: 100%;
        padding: 21px 12px 21px 16px;
        justify-content: space-between;
        .interface-list-title,
        .interface-list-value {
            font-size: 16px;
            color: $titleColor;
            line-height: 24px;
        }
    }
}
</style>
