<!--
 * @Author: your name
 * @Date: 2021-11-09 16:39:34
 * @LastEditTime: 2021-11-09 18:55:07
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/views/interface/components/interfaceList/InterfaceList.vue
-->
<template>
    <div class="interface-list flexColumnCenter">
        <div class="list-title-content borderBox flexRowCenter">
            <div class="interface-list-title defaultFont">接口目录</div>
            <div class="interface-list-value defaultFont">{{ `(${getDataCount})` }}</div>
        </div>
        <InterfaceListCell
            v-for="(item, index) in listData"
            :key="item.title"
            :title="item.title"
            :count="item.count"
            :selected="item.selected"
            @click="clickAction(index)"
        />
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { InterfaceData } from '../../interface'
import InterfaceListCell from '../interfaceListCell/InterfaceListCell.vue'

export default defineComponent({
    name: 'InterfaceList',
    props: {
        listData: {
            type: Array as PropType<InterfaceData[]>,
            default: () => {
                return []
            },
        },
    },
    emits: ['selectAction'],
    components: {
        InterfaceListCell,
    },
    computed: {
        getDataCount() {
            let count = 0
            for (let i = 0; i < this.listData.length; i++) {
                const list = this.listData[i].data
                if (Array.isArray(list)) {
                    count += list.length
                }
            }
            return count
        },
    },
    methods: {
        clickAction(index: number) {
            this.$emit('selectAction', index)
        },
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
