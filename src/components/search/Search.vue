<!--
 * @Author: your name
 * @Date: 2021-10-29 16:47:14
 * @LastEditTime: 2021-11-02 17:55:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-scaffold/src/components/header/search.vue
-->
<template>
    <el-input
        v-model="inputValue"
        :class="['search-input', { 'search-input-selected': focus }]"
        :placeholder="placeholder"
        @blur="inputBlur"
        @focus="inputFocus"
    >
        <template #suffix>
            <div class="search-button"></div>
        </template>
    </el-input>
</template>

<script>
import { ref } from 'vue'

export default {
    data() {
        return {
            focus: false,
        }
    },
    setup() {
        let inputValue = ref('')
        return {
            inputValue,
            placeholder: '请输入接口名称/接口ID',
        }
    },
    computed: {},
    methods: {
        /**
         * 在 Input 失去焦点时触发
         */
        inputBlur() {
            this.focus = false
        },
        /**
         * 在 Input 获得焦点时触发
         */
        inputFocus() {
            this.focus = true
        },
    },
}
</script>

<style lang="scss" scoped>
.search-input {
    width: 100%;
    height: 54px;
    border-radius: 8px;
    ::v-deep .search-button {
        width: 60px;
        height: 52px;
        background: #d65928;
        border-radius: 0px 7px 7px 0px;
        margin: 1px;
    }
    ::v-deep input {
        width: 100%;
        height: 100%;
        border-radius: 8px;
        padding-right: 0px;
        border-radius: 8px;
        border-radius: 8px;
        border: 1px solid #d65928;
        padding: 0px 0px 0px 5px;
    }
    ::v-deep .el-input__suffix {
        right: 0px;
    }
}
.search-input-selected {
    ::v-deep .search-button {
        height: 50px;
        border-radius: 0px 6px 6px 0px;
        margin: 2px;
    }
    ::v-deep input {
        border: 2px solid #d65928;
    }
}
</style>
