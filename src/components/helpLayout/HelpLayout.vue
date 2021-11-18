<!--
 * @Author: matiastang
 * @Date: 2021-11-18 09:46:05
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-18 14:24:39
 * @FilePath: /datumwealth-openalpha-front/src/components/helpLayout/HelpLayout.vue
 * @Description: 帮组中心
-->
<template>
    <div class="help-layout flexColumnCenter">
        <Header class="header" />
        <div class="help-layout-content flexColumnCenter">
            <div class="help-layout-top-content flexRowCenter">
                <div class="menu-content">
                    <div
                        v-for="item in helpList"
                        :key="item.title"
                        :class="[
                            'menu-item',
                            'flexRowCenter',
                            { 'menu-item-selected': item.selected },
                        ]"
                        @click="!item.selected && menuAction(item.url)"
                    >
                        <div class="menu-item-prefix"></div>
                        <div class="menu-item-title">{{ item.title }}</div>
                    </div>
                </div>
                <div class="router-content">
                    <router-view></router-view>
                </div>
            </div>
            <Footer class="footer" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watchEffect } from 'vue'
import Header from '@/components/header/Header.vue'
import Footer from '@/components/footer/Footer.vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
    name: 'HelpLayout',
    setup() {
        const route = useRoute()
        const router = useRouter()
        const helpList = reactive([
            {
                title: '登录注册',
                selected: true,
                url: '/help/login',
            },
            {
                title: '测试流程',
                selected: false,
                url: '/help/test',
            },
            {
                title: '支付方式',
                selected: false,
                url: '/help/pay',
            },
            {
                title: '常见问题',
                selected: false,
                url: '/help/issue',
            },
        ])
        // 检测路由变化时更新header选中状态
        watchEffect(() => {
            let path = route.path
            for (let i = 0; i < helpList.length; i++) {
                helpList[i].selected = path === helpList[i].url
            }
        })
        /**
         * 点击跳转
         */
        const menuAction = (url: string) => {
            router.push({
                path: url,
            })
        }
        return { helpList, menuAction }
    },
    components: {
        Header,
        Footer,
    },
})
</script>

<style lang="scss" scoped>
.help-layout {
    width: 100vw;
    justify-content: flex-start;
    .header {
        width: 100%;
        height: 96px;
    }
    .help-layout-content {
        width: 100%;
        height: calc(100vh - 96px);
        overflow-y: scroll;
        justify-content: flex-start;
        .help-layout-top-content {
            width: 100%;
            padding: 20px 10% 20px 10%;
            box-sizing: border-box;
            align-items: flex-start;
            .menu-content {
                width: 26%;
                margin-right: 16px;
                background: $themeBgColor;
                .menu-item {
                    width: 100%;
                    height: 66px;
                    color: $themeBgColor;
                    justify-content: flex-start;
                    padding: 0px 16px;
                    box-sizing: border-box;
                    cursor: pointer;
                    .menu-item-prefix {
                        width: 2px;
                        height: 2px;
                        border-radius: 2px;
                        background: $titleColor;
                        margin-right: 5px;
                    }
                    .menu-item-prefix,
                    .menu-item-title {
                        font-size: 16px;
                        color: $titleColor;
                        line-height: 24px;
                    }
                }
                .menu-item-selected {
                    background: $themeColor;
                    .menu-item-prefix {
                        background: $themeBgColor;
                    }
                    .menu-item-title {
                        color: $themeBgColor;
                    }
                }
            }
            .router-content {
                width: 74%;
            }
        }
        .footer {
            width: 100%;
        }
    }
}
@media screen and (max-width: 1360px) {
    .help-layout {
        .help-layout-content {
            .help-layout-top-content {
                padding: 20px 5% 30px 5%;
            }
        }
    }
}
</style>
