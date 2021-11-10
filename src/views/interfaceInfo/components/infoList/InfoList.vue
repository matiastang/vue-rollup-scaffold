<!--
 * @Author: your name
 * @Date: 2021-11-10 15:19:42
 * @LastEditTime: 2021-11-10 16:24:01
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/views/infoInfo/components/infoList/InfoList.vue
-->
<template>
    <div class="info-list flexColumnCenter">
        <div class="list-title-content borderBox flexRowCenter">
            <div class="info-list-title defaultFont">接口目录</div>
            <div class="info-list-value defaultFont">{{ `(${getDataCount})` }}</div>
        </div>
        <InfoListGroup
            class="info-list-group"
            v-for="groupItem in listData"
            :key="groupItem.title"
            :data="groupItem"
        >
            <div
                v-for="dataItem in groupItem.data"
                :key="dataItem.title"
                class="info-list-group-content flexColumnCenter"
            >
                <div class="info-list-second-level-group" v-if="Array.isArray(dataItem.data)">
                    <InfoListGroup :data="dataItem">
                        <InfoListCell
                            v-for="cellItem in dataItem.data"
                            :key="cellItem.title"
                            :data="cellItem"
                            :left="64"
                            @click="clickAction(index)"
                        />
                    </InfoListGroup>
                </div>
                <InfoListCell v-else :data="dataItem" @click="clickAction(index)" />
            </div>
        </InfoListGroup>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
// import { InterfaceData } from '../../interface'
import InfoListGroup from '../infoListGroup/InfoListGroup.vue'
import InfoListCell from '../infoListCell/InfoListCell.vue'

export default defineComponent({
    name: 'infoList',
    props: {
        listData: {
            type: Array,
            default: () => {
                return []
            },
        },
    },
    emits: ['selectAction'],
    components: {
        InfoListCell,
        InfoListGroup,
    },
    computed: {
        getDataCount() {
            let count = 0
            for (let i = 0; i < this.listData.length; i++) {
                // const list = this.listData[i].data
                // if (Array.isArray(list)) {
                //     count += list.length
                // }
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
            font-size: 16px;
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
