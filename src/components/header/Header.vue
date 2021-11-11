<!--
 * @Author: matiastang
 * @Date: 2021-11-01 17:46:01
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-11 15:13:01
 * @FilePath: /datumwealth-openalpha-front/src/components/header/Header.vue
 * @Description: header
-->
<template>
    <div class="header borderBox flexRowCenter">
        <div class="header-left flexRowCenter">
            <img class="header-left-logo" src="static/header/logo.png" />
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
            <div class="header-right-button cursorP" @click="headerLoginAction">
                <div class="header-right-title">
                    {{ getUserName }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Search from '../search/Search.vue'

export default defineComponent({
    name: 'Header',
    components: {
        Search,
    },
    setup() {
        const router = useRouter()
        const route = useRoute()
        let titleArr = reactive([
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
        for (let index = 0; index < titleArr.length; index++) {
            titleArr[index].selected = route.path.startsWith(`/${titleArr[index].name}`)
        }
        // 检测路由变化时更新header选中状态
        watch(
            () => route.path,
            (newPath: string) => {
                for (let index = 0; index < titleArr.length; index++) {
                    titleArr[index].selected = newPath.startsWith(`/${titleArr[index].name}`)
                }
            }
        )
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
            router.push({
                name: 'login',
            })
        }
        return {
            titleArr,
            headerSelectAction,
            headerLoginAction,
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
    padding: 0px 5%;
    background: $themeBgColor;
    box-shadow: 0px 4px 4px -4px rgba(218, 218, 218, 0.5);
    justify-content: space-between;
    .header-left {
        justify-content: flex-start;
        flex: 1 1 auto;
        .header-left-logo {
            width: 173px;
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
            margin: 16px;
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
    }
}
@media screen and (max-width: 1360px) {
    .header {
        padding: 0px 3%;
        .header-left {
            .header-left-input {
                margin: 0px 40px;
            }
        }
        .header-right {
            .header-right-button {
                margin: 16px;
            }
        }
    }
}
@media screen and (max-width: 1200px) {
    .header {
        padding: 0px 2%;
        .header-left {
            .header-left-input {
                margin: 0px 20px;
            }
        }
        .header-right {
            .header-right-button {
                margin: 16px 8px;
            }
        }
    }
}
@media screen and (max-width: 1000px) {
    .header {
        padding: 0px 1%;
        .header-left {
            .header-left-input {
                margin: 0px 10px;
            }
        }
        .header-right {
            .header-right-button {
                margin: 16px 6px;
            }
        }
    }
}
</style>
