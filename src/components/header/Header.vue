<!--
 * @Author: your name
 * @Date: 2021-10-29 15:30:38
 * @LastEditTime: 2021-11-03 18:49:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-scaffold/src/components/header/Header.vue
-->
<template>
    <div class="header">
        <div class="header-left">
            <img class="header-left-logo" src="static/header/logo.png" />
            <Search class="header-left-input" />
            <!-- <div class="header-left-input"></div> -->
        </div>
        <div class="header-right">
            <div v-for="item in titleArr" :key="item.title" class="header-right-button">
                <div
                    :class="[
                        'header-right-title',
                        { 'header-right-title-selected': item.selected },
                    ]"
                >
                    {{ item.title }}
                </div>
            </div>
            <div class="header-right-button">
                <div class="header-right-title">
                    {{ getUserName }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Search from '../search/Search.vue'

export default defineComponent({
    components: {
        Search,
    },
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
        return {
            phone: '18380449615',
        }
    },
    computed: {
        getUserName() {
            return '登录/注册'
        },
    },
})
</script>

<style lang="scss" scoped>
.header {
    width: 100%;
    height: 96px;
    background: #ffffff;
    box-shadow: 0px 4px 4px -4px rgba(218, 218, 218, 0.5);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header-left {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex: 1 1 auto;
        margin-left: 80px;
        .header-left-logo {
            width: 173px;
            height: 60px;
        }
        .header-left-input {
            min-width: 300px;
            max-width: 676px;
            height: 54px;
            margin: 0px 80px;
            flex: 1 1 auto;
        }
    }
    .header-right {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 80px;
        .header-right-button {
            margin: 16px;
            cursor: pointer;
            .header-right-title {
                font-size: 16px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #262626;
                line-height: 24px;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .header-right-title-selected {
                color: #d65928;
            }
        }
    }
}
</style>
