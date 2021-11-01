<!--
 * @Author: your name
 * @Date: 2021-10-29 16:47:14
 * @LastEditTime: 2021-11-01 19:00:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-scaffold/src/components/header/search.vue
-->
<template>
    <div class="search">
        <el-input class="search-input" v-model="inputValue" placeholder="请输入接口名称/接口ID" />
        <!-- <input class="search-input" placeholder="请输入接口名称/接口ID" /> -->
        <div class="search-button"></div>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    data() {
        return {
            titleArr: [
                {
                    title: '首页',
                    selected: true,
                },
                {
                    title: '数据接口',
                    selected: false,
                },
                {
                    title: '解决方案',
                    selected: false,
                },
                {
                    title: '充值调用',
                    selected: false,
                },
                {
                    title: '优惠套餐',
                    selected: false,
                },
            ],
            // title: undefined,
            // obj: {
            //     name: 'matiastang',
            //     age: undefined,
            // },
        }
    },
    setup() {
        let inputValue = ref('')
        return {
            inputValue,
            phone: '18380449615',
        }
    },
    computed: {
        getUserName() {
            return '登录/注册'
        },
    },
}
</script>

<style lang="scss" scoped>
.search {
    width: 100%;
    height: 54px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    .search-input {
        width: calc(100% - 60px);
        height: calc(100% - 2px);
        border: none;
        border-radius: 8px 0px 0px 8px;
        border: 1px solid #d65928;
        padding: 0px 0px 0px 5px;
    }
    .search-button {
        width: 60px;
        height: 100%;
        background: #d65928;
        border-radius: 0px 8px 8px 0px;
    }
}
</style>
