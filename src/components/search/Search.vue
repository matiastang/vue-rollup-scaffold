<!--
 * @Author: matiastang
 * @Date: 2021-11-01 17:46:01
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-09 15:32:55
 * @FilePath: /datumwealth-openalpha-front/src/components/search/Search.vue
 * @Description: 搜索输入框
-->
<template>
    <el-input
        v-model="inputValue"
        :class="['search-input', { 'search-input-selected': inputFocusStatus }]"
        placeholder="请输入接口名称/接口CODE"
        @blur="inputBlur"
        @focus="inputFocus"
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
import { useRouter } from 'vue-router'

export default defineComponent({
    name: 'Search',
    props: {
        value: {
            type: String,
            default: '',
        },
    },
    setup(props) {
        let router = useRouter()
        let inputValue = ref(props.value)
        let inputFocusStatus = ref(false)
        /**
         * 在 Input 失去焦点时触发
         */
        const inputBlur = () => {
            console.log('blur')
            inputFocusStatus.value = false
        }
        /**
         * 在 Input 获得焦点时触发
         */
        const inputFocus = () => {
            inputFocusStatus.value = true
        }
        /**
         * 仅在输入框失去焦点或用户按下回车时触发
         */
        const inputEnter = () => {
            router.push({
                path: `/search/${inputValue.value}`,
            })
            inputValue.value = ''
        }
        /**
         * 搜索
         */
        const searchAction = () => {
            router.push({
                path: `/search/${inputValue.value}`,
            })
            inputValue.value = ''
        }
        return {
            inputValue,
            inputFocusStatus,
            inputBlur,
            inputFocus,
            inputEnter,
            searchAction,
        }
    },
})
</script>

<style lang="scss" scoped>
.search-input {
    width: 100%;
    height: 54px;
    border-radius: 8px;
    .search-button {
        width: 60px;
        height: 52px;
        background: $themeColor;
        border-radius: 0px 7px 7px 0px;
        margin: 1px;
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
        border: 1px solid $themeColor;
        padding: 0px 0px 0px 5px;
    }
    ::v-deep(.el-input__suffix) {
        right: 0px;
    }
}
.search-input-selected {
    ::v-deep(.search-button) {
        width: 58px;
        height: 50px;
        border-radius: 0px 6px 6px 0px;
        margin: 2px;
    }
    ::v-deep(input) {
        border: 2px solid $themeColor;
    }
}
</style>
