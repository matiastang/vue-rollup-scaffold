<!--
 * @Author: matiastang
 * @Date: 2021-11-01 17:46:01
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-01 19:46:52
 * @FilePath: /datumwealth-openalpha-front/src/components/header/Header.vue
 * @Description: header
-->
<template>
    <div class="header borderBox flexRowCenter">
        <div class="header-left flexRowCenter">
            <router-link to="/">
                <img class="header-left-logo" src="static/header/datum-wealth-logo.svg" />
            </router-link>
            <Search class="header-left-input" />
        </div>
        <div class="header-right flexRowCenter">
            <div v-for="item in titleArr" :key="item.title" class="header-right-button cursorP">
                <div
                    :class="[
                        'header-right-title',
                        { 'header-right-title-selected': item.selected },
                    ]"
                    @click="headerSelectAction(item.name)"
                >
                    {{ item.title }}
                </div>
            </div>
            <div
                v-if="!userToken"
                class="header-name-button cursorP flexRowCenter"
                @click="headerLoginAction"
            >
                <div class="header-name textLine1">
                    {{ '登录/注册' }}
                </div>
            </div>
            <div
                v-if="userToken"
                class="header-name-button flexRowCenter"
                @mouseover="dropdownMouseover"
                @mouseout="dropdownMouseout"
            >
                <div class="header-name textLine1">
                    {{ userName }}
                </div>
                <img v-show="isDropdown" class="header-name-icon" src="static/user/login_on.svg" />
                <img
                    v-show="!isDropdown"
                    class="header-name-icon"
                    src="static/user/login_off.svg"
                />
                <div class="name-dropdown">
                    <div
                        v-for="(item, index) in dropdownData"
                        :key="item.title"
                        :class="[
                            'name-dropdown-item',
                            'defaultFont',
                            'flexRowCenter',
                            {
                                cursorP: !item.selected,
                                'name-dropdown-selected-item': item.selected,
                            },
                        ]"
                        @click="!item.selected && dropdownItemAction(index)"
                    >
                        {{ item.title }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watchEffect, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Search from '../search/Search.vue'
import { useStore } from 'store/index'
import { checkLoginPath } from '@/router/loginInterceptor'
import { logout } from '@/common/request/index'
import { routerToUserCenter } from 'utils/router/index'
import { ElMessage } from 'element-plus'

export default defineComponent({
    name: 'Header',
    components: {
        Search,
    },
    setup() {
        /**
         * 全局路由
         */
        const router = useRouter()
        /**
         * 当前路由
         */
        const route = useRoute()
        /**
         * 状态
         */
        const store = useStore()
        /**
         * 用户信息
         */
        const userInfo = computed(() => store.state.userModule.userLoginInfo.member)
        /**
         * 用户名称
         */
        const userName = computed(() => userInfo.value.userName)
        /**
         * 用户token
         */
        const userToken = computed(() => store.state.userModule.userLoginInfo.token)

        const titleArr = reactive([
            {
                title: '首页',
                selected: true,
                name: 'home',
            },
            {
                title: '数据接口',
                selected: false,
                name: 'interface',
            },
            {
                title: '解决方案',
                selected: false,
                name: 'solution',
            },
            {
                title: '充值调用',
                selected: false,
                name: 'recharge',
            },
            {
                title: '优惠套餐',
                selected: false,
                name: 'discount',
            },
        ])
        // 检测路由变化时更新header选中状态
        watchEffect(() => {
            let path = route.path
            for (let i = 0; i < titleArr.length; i++) {
                titleArr[i].selected = path.startsWith(`/${titleArr[i].name}`)
                if (i === 1 && !titleArr[i].selected) {
                    titleArr[i].selected = path.startsWith('/search')
                }
            }
        })
        /**
         * header点击
         */
        const headerSelectAction = (name: string) => {
            for (let index = 0; index < titleArr.length; index++) {
                titleArr[index].selected = titleArr[index].name === name
            }
            router.push({
                name,
            })
        }
        /**
         * 登录注册点击
         */
        const headerLoginAction = () => {
            for (let index = 0; index < titleArr.length; index++) {
                titleArr[index].selected = false
            }
            if (userToken.value) {
                // 已经登录
                router.push({
                    path: '/user/data/statement',
                })
                return
            }
            // 未登录
            router.push({
                path: '/login',
            })
        }
        const isDropdown = ref(false)
        const dropdownMouseover = () => {
            isDropdown.value = true
        }
        const dropdownMouseout = () => {
            isDropdown.value = false
        }
        /**
         * 登录后下拉选项
         */
        let dropdownData = reactive([
            {
                title: '个人中心',
                prefix: '/user/',
                selected: false,
            },
            {
                title: '帮助中心',
                prefix: '/help/',
                selected: false,
            },
            {
                title: '退出登录',
                prefix: null,
                selected: false,
            },
        ])
        // 检测路由变化时更新下拉列表选中状态
        watchEffect(() => {
            let path = route.path
            for (let i = 0; i < dropdownData.length; i++) {
                let perfix = dropdownData[i].prefix
                if (perfix) {
                    dropdownData[i].selected = path.startsWith(perfix)
                } else {
                    dropdownData[i].selected = false
                }
            }
        })

        /**
         * 下拉选项点击
         */
        const dropdownItemAction = async (index: number) => {
            for (let i = 0; i < dropdownData.length; i++) {
                dropdownData[i].selected = i === index
            }
            if (index === 0) {
                routerToUserCenter(store, router)
            }
            if (index === 1) {
                // 跳转帮助中心
                router.push({
                    path: '/help/login',
                })
            }
            if (index === 2) {
                // 退出登录
                let _ = await logout()
                ElMessage.success('退出成功')
                store.commit('setUserLoginInfo', null)
                store.commit('setToken', null)
                const findItem = checkLoginPath.find(({ path }) => {
                    return path === route.path
                })
                if (findItem && findItem.mustLogin) {
                    // 在需要登录的页面退出登录，这时更新页面为登录页面
                    router.replace({
                        path: findItem.redirectPath,
                    })
                }
            }
        }
        return {
            titleArr,
            userToken,
            userName,
            headerSelectAction,
            headerLoginAction,
            dropdownData,
            dropdownItemAction,
            isDropdown,
            dropdownMouseover,
            dropdownMouseout,
        }
    },
})
</script>

<style lang="scss" scoped>
.header {
    width: 100%;
    box-sizing: border-box;
    height: 96px;
    padding: 0px 80px;
    background: $themeBgColor;
    box-shadow: 0px 4px 4px -4px #dadada; //rgba(218, 218, 218, 0.5);
    justify-content: space-between;
    z-index: 50;
    .header-left {
        justify-content: flex-start;
        flex: 1 1 auto;
        .header-left-logo {
            width: 174px;
            height: 60px;
            flex-shrink: 0;
        }
        .header-left-input {
            min-width: 210px;
            max-width: 676px;
            height: 54px;
            margin: 0px 80px;
            flex: 1 1 auto;
        }
    }
    .header-right {
        .header-right-button {
            margin: 0px 16px;
            .header-right-title {
                font-size: 16px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: $titleColor;
                line-height: 24px;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .header-right-title-selected {
                color: $themeColor;
            }
        }
        .header-name-button {
            position: relative;
            height: 96px;
            margin: 0px 16px;
            .header-name {
                display: block;
                max-width: 80px;
                font-size: 16px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: $titleColor;
                line-height: 24px;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .header-name-icon {
                margin-left: 5px;
                width: 14px;
                height: 8px;
            }
            .name-dropdown {
                display: none;
                position: absolute;
                width: 160px;
                top: 96px;
                z-index: 99;
                background: $themeBgColor;
                box-shadow: 0px 2px 6px 0px rgba(218, 218, 218, 0.5);
                .name-dropdown-item {
                    width: 100%;
                    height: 48px;
                    background: $themeBgColor;
                    font-size: 16px;
                    color: $titleColor;
                    line-height: 24px;
                }
                .name-dropdown-item:hover {
                    color: $themeColor;
                }
                .name-dropdown-selected-item {
                    color: $themeColor;
                    background: rgba(246, 160, 129, 0.4);
                }
            }
        }
        .header-name-button:hover {
            .name-dropdown {
                display: block;
            }
        }
    }
}
@media screen and (max-width: 1500px) {
    .header {
        padding: 0px 30px;
        .header-left {
            .header-left-input {
                margin: 0px 60px;
            }
        }
        .header-right {
            .header-right-button,
            .header-name-button {
                margin: 0px 14px;
            }
        }
    }
}
@media screen and (max-width: 1400px) {
    .header {
        .header-left {
            .header-left-input {
                margin: 0px 50px;
            }
        }
        .header-right {
            .header-right-button,
            .header-name-button {
                margin: 0px 12px;
            }
        }
    }
}
@media screen and (max-width: 1300px) {
    .header {
        .header-left {
            .header-left-input {
                margin: 0px 40px;
            }
        }
        .header-right {
            .header-right-button,
            .header-name-button {
                margin: 0px 10px;
            }
        }
    }
}
@media screen and (max-width: 1200px) {
    .header {
        .header-left {
            .header-left-input {
                margin: 0px 30px;
            }
        }
        .header-right {
            .header-right-button,
            .header-name-button {
                margin: 0px 8px;
            }
        }
    }
}
@media screen and (max-width: 1100px) {
    .header {
        .header-left {
            .header-left-input {
                margin: 0px 20px;
            }
        }
        .header-right {
            .header-right-button,
            .header-name-button {
                margin: 0px 6px;
            }
        }
    }
}
@media screen and (max-width: 1000px) {
    .header {
        .header-left {
            .header-left-input {
                margin: 0px 10px;
            }
        }
        .header-right {
            .header-right-button,
            .header-name-button {
                margin: 0px 4px;
            }
        }
    }
}
</style>
