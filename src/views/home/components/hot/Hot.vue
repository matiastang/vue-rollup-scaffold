<!--
 * @Author: your name
 * @Date: 2021-11-05 14:16:38
 * @LastEditTime: 2021-11-05 15:11:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /datumwealth-openalpha-front/src/views/home/components/hot/Hot.vue
-->
<template>
    <div class="borderBox flexRowCenter hot">
        <HotLeftCell
            class="hot-cell"
            :title="data.title"
            :text="data.text"
            :style="{
                background: `linear-gradient(${data.topColor}, ${data.bottomColor})`,
            }"
        />
        <HotCell class="hot-cell" v-for="item in data.dataList" :key="item.title" :data="item" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HotLeftCell from '../hotLeftCell/HotLeftCell.vue'
import HotCell from '../hotCell/HotCell.vue'

export default defineComponent({
    name: 'HomeHot',
    props: ['data'],
    data() {
        return {}
    },
    components: {
        HotLeftCell,
        HotCell,
    },
})
</script>

<style lang="scss" scoped>
.hot {
    width: 100%;
    justify-content: flex-start !important;
    align-items: stretch !important;
    .hot-cell {
        width: 20%;
    }
}
</style>
