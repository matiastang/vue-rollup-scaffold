<!--
 * @Author: matiastang
 * @Date: 2021-11-18 09:46:05
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-06 15:11:12
 * @FilePath: /datumwealth-openalpha-front/src/components/helpLayout/HelpLayout.vue
 * @Description: 帮组中心
-->
<template>
    <div class="help-layout flexColumnCenter">
        <Header class="header" />
        <div ref="contentRef" class="help-layout-content flexColumnCenter">
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
import { computed, defineComponent, ref, Ref, watchEffect } from 'vue'
import Header from '@/components/header/Header.vue'
import Footer from '@/components/footer/Footer.vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
    name: 'HelpLayout',
    setup() {
        const route = useRoute()
        const router = useRouter()
        const helpList = computed(() => {
            if (route.path.startsWith('/help/')) {
                return [
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
                ]
            }
            return [
                {
                    title: '关于我们',
                    selected: false,
                    url: '/about/aboutUs',
                },
                {
                    title: '用户协议',
                    selected: false,
                    url: '/about/agreement',
                },
                {
                    title: '版本政策',
                    selected: false,
                    url: '/about/copyright',
                },
                // {
                //     title: '免责声明',
                //     selected: false,
                //     url: '/about/statement',
                // },
                // {
                //     title: '权利通知',
                //     selected: false,
                //     url: '/about/rightNotify',
                // },
                {
                    title: '认证服务协议',
                    selected: false,
                    url: '/about/authProtocol',
                },
                {
                    title: '意见反馈',
                    selected: true,
                    url: '/about/feedback',
                },
            ]
        })
        // 检测路由变化时更新header选中状态
        watchEffect(() => {
            let path = route.path
            for (let i = 0; i < helpList.value.length; i++) {
                helpList.value[i].selected = path === helpList.value[i].url
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
        const contentRef: Ref<HTMLElement | null> = ref(null)
        // 平滑滚动到页面顶部
        const scrollToTop = () => {
            // const c = document.documentElement.scrollTop || document.body.scrollTop
            const element = contentRef.value
            if (!element) {
                return
            }
            const elementTop = element.scrollTop
            if (elementTop > 0) {
                window.requestAnimationFrame(scrollToTop)
                element.scrollTo(0, elementTop - elementTop / 4)
            }
        }
        return { helpList, menuAction, contentRef, scrollToTop }
    },
    components: {
        Header,
        Footer,
    },
    beforeRouteUpdate(to, from, next) {
        // 在当前路由改变，但是该组件被复用时调用
        // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
        // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        // 可以访问组件实例 `this`
        this.scrollToTop()
        next()
    },
    beforeRouteLeave(to, from, next) {
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
        this.scrollToTop()
        next()
    },
})
</script>

<style lang="scss" scoped>
.help-layout {
    width: 100vw;
    min-width: 1000px;
    justify-content: flex-start;
    .header {
        width: 100%;
        height: 96px;
    }
    .help-layout-content {
        width: 100%;
        height: calc(100vh - 96px);
        overflow-y: scroll;
        justify-content: space-between;
        .help-layout-top-content {
            width: 100%;
            padding: 20px calc(50% - 712px);
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
                min-height: calc(100vh - 96px - 40px);
            }
        }
        .footer {
            width: 100%;
        }
    }
}
@media screen and (max-width: 1500px) {
    .help-layout {
        .help-layout-content {
            .help-layout-top-content {
                padding: 20px 30px 30px 30px;
            }
        }
    }
}
</style>
