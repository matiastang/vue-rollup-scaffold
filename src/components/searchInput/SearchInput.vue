<!--
 * @Author: matiastang
 * @Date: 2021-11-15 14:17:56
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-15 14:29:53
 * @FilePath: /datumwealth-openalpha-front/src/components/searchInput/SearchInput.vue
 * @Description: 个人中心搜索样式
-->
<template>
    <el-input
        v-model="inputValue"
        class="search-input"
        :placeholder="placeholder"
        @keyup.enter="inputEnter"
    >
        <template #suffix>
            <div class="search-button cursorP flexRowCenter" @click="searchAction">
                <img class="search-icon" src="static/header/search.svg" />
            </div>
        </template>
    </el-input>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElMessage } from 'element-plus'

export default defineComponent({
    name: 'Search',
    props: {
        value: {
            type: String,
            default: '',
        },
        placeholder: {
            type: String,
            default: '请输入需要查询的账单',
        },
    },
    emits: {
        search: (value: string) => {
            if (value.trim() === '') {
                ElMessage({
                    message: '请求输入搜索内容',
                    type: 'warning',
                })
                return false
            }
            return true
        },
    },
    setup(props, context) {
        let inputValue = ref(props.value)
        /**
         * 仅在输入框失去焦点或用户按下回车时触发
         */
        const inputEnter = () => {
            context.emit('search', inputValue.value)
        }
        /**
         * 搜索
         */
        const searchAction = () => {
            context.emit('search', inputValue.value)
        }
        return {
            inputValue,
            inputEnter,
            searchAction,
        }
    },
})
</script>

<style lang="scss" scoped>
.search-input {
    width: 100%;
    height: 42px;
    border-radius: 4px;
    .search-button {
        width: 60px;
        height: 40px;
        border-radius: 0px 3px 3px 0px;
        margin: 1px;
        background: $themeColor;
        .search-icon {
            width: 29px;
            height: 29px;
        }
    }
    ::v-deep(input) {
        width: 100%;
        height: 100%;
        border-radius: 8px;
        padding-right: 0px;
        border-radius: 8px;
        border-radius: 8px;
        border: 1px solid $placeholderColor;
        border-radius: 4px;
        padding: 0px 0px 0px 5px;
    }
    ::v-deep(.el-input__suffix) {
        right: 0px;
    }
}
</style>
