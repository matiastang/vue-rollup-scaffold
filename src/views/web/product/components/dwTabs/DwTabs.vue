<!--
 * @Author: matiastang
 * @Date: 2021-12-27 16:10:56
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-27 17:12:32
 * @FilePath: /datumwealth-openalpha-front/src/views/web/product/components/dwTabs/DwTabs.vue
 * @Description: 西筹tabs组件
-->
<template>
    <div class="dw-tabs borderBox flexRowCenter">
        <div v-for="(item, index) in data" :key="item" class="dw-tabs-header flexRowCenter">
            <DwTitle
                :title="item"
                :selected="selectIndex === index"
                class="dw-tabs-header-selected"
                @click="titleAction(index)"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, PropType, ref, watch } from 'vue'
import DwTitle from '../dwTitle/DwTitle.vue'

const props = defineProps({
    /**
     * 数据
     */
    data: {
        type: Array as PropType<string[]>,
        default: () => {
            return []
        },
    },
    /**
     * 选择的数据
     */
    modelValue: {
        type: Number,
        default: 0,
    },
})

const selectIndex = ref(props.modelValue)
watch(
    () => props.modelValue,
    (newValue, oldValue) => {
        selectIndex.value = newValue
    }
)

const emit = defineEmits({
    'update:modelValue': (value: number) => {
        return true
    },
})

const titleAction = (index: number) => {
    if (index === selectIndex.value) {
        return
    }
    if (index >= props.data.length) {
        console.error('数据长度异常')
        return
    }
    selectIndex.value = index
    emit('update:modelValue', index)
}
</script>

<style lang="scss" scoped>
.dw-tabs {
    width: 100%;
    .dw-tabs-header {
        width: 100%;
    }
}
</style>
