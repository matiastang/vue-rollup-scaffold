<!--
 * @Author: your name
 * @Date: 2021-11-10 19:40:09
 * @LastEditTime: 2021-11-10 20:10:35
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/views/interface/components/interfaceHot/InterfaceHot.vue
-->
<template>
    <div class="Interface-hot-cell borderBox flexRowCenter">
        <HotCell
            class="hot-cell"
            v-for="(item, index) in data"
            :key="item.title"
            :title="title"
            :showLine="index === 0"
        />
        <div class="hot-icon"></div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import HotCell from '../hotCell/HotCell.vue'

export default defineComponent({
    name: 'InterfaceHot',
    props: {
        title: {
            type: String,
            default: '名称',
        },
        count: {
            type: Number,
            default: 0,
        },
        selected: {
            type: Boolean,
            default: false,
        },
    },
    setup() {
        let data = reactive([
            {
                title: '1',
            },
            {
                title: '2',
            },
            {
                title: '3',
            },
            {
                title: '4',
            },
        ])
        return {
            data,
        }
    },
    components: {
        HotCell,
    },
})
</script>

<style lang="scss" scoped>
.Interface-hot-cell {
    width: 100%;
    padding: 24px 0px;
    position: relative;
    .hot-cell {
        width: 25%;
    }
    .hot-icon {
        position: absolute;
        width: 60px;
        height: 60px;
        top: 0px;
        right: 0px;
        background: #e62412;
    }
}
</style>
