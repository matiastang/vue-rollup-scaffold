<template>
    <div :class="{ hidden: hidden }" class="pagination-container">
        <el-pagination
            :background="background"
            :current-page="currentPage"
            :page-size="pageSize"
            :layout="layout"
            :page-sizes="pageSizes"
            :pager-count="pagerCount"
            :total="total"
            v-bind="$attrs"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
    </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue'
const props = defineProps({
    total: Number,
    page: {
        type: Number,
        default: 1,
    },
    limit: {
        type: Number,
        default: 20,
    },
    pageSizes: {
        type: Array,
        default() {
            return [10, 20, 30, 50]
        },
    },
    // 移动端页码按钮的数量端默认值5
    pagerCount: {
        type: Number,
        default: document.body.clientWidth < 992 ? 5 : 7,
    },
    layout: {
        type: String,
        default: 'total, sizes, prev, pager, next, jumper',
    },
    background: {
        type: Boolean,
        default: true,
    },
    autoScroll: {
        type: Boolean,
        default: true,
    },
    hidden: {
        type: Boolean,
        default: false,
    },
})
const emits = defineEmits(['page', 'limit', 'pagination'])

const currentPage = computed({
    get() {
        return toRefs(props).page.value
    },
    set(val) {
        emits('page', val)
    },
})
const pageSize = computed({
    get() {
        return toRefs(props).limit.value
    },
    set(val) {
        emits('limit', val)
    },
})
const handleSizeChange = (val: Number) => {
    emits('pagination', { page: currentPage.value, limit: val })
}
const handleCurrentChange = (val: Number) => {
    const params = { page: val, limit: pageSize.value }
    emits('pagination', params)
}
</script>

<style scoped>
.pagination-container {
    background: #fff;
    padding-top: 10px;
}
.pagination-container.hidden {
    display: none;
}
</style>
