<!--
 * @Author: your name
 * @Date: 2021-11-04 20:01:27
 * @LastEditTime: 2021-11-04 20:14:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /datumwealth-openalpha-front/src/views/home/components/collapse/Collapse.vue
-->
<template>
    <div class="flexColumnCenter collapse">
        <CollapseCell
            class="collapse-cell"
            v-for="item in data"
            :title="item.title"
            :text="item.text"
            :key="item.title"
        />
        <div class="defaultFont cursorP collapse-all">查看全部接口</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CollapseCell from '../collapseCell/CollapseCell.vue'

export default defineComponent({
    name: 'dw-collapse',
    props: ['data'],
    data() {
        return {}
    },
    components: {
        CollapseCell,
    },
})
</script>

<style lang="scss" scoped>
.collapse {
    height: 100%;
    width: 100%;
    background: $themeColor;
    .collapse-cell {
        width: 100%;
    }
    .collapse-all {
        width: 100%;
        height: 76px;
        font-size: fontSize(18px);
        font-weight: 500;
        color: $themeBgColor;
        line-height: 76px;
    }
}
</style>
