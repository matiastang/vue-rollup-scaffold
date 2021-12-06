<!--
 * @Author: your name
 * @Date: 2021-11-02 19:15:52
 * @LastEditTime: 2021-12-06 16:12:47
 * @LastEditors: matiastang
 * @Description: In User Settings Edit
 * @FilePath: /datumwealth-openalpha-front/src/components/layout/Layout.vue
-->
<template>
    <div class="layout">
        <Header class="header" />
        <div ref="contentRef" class="content" @scroll="scrollAction">
            <div class="router-content">
                <router-view></router-view>
            </div>
            <Footer class="footer" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'
import Header from '@/components/header/Header.vue'
import Footer from '@/components/footer/Footer.vue'

export default defineComponent({
    data() {
        return {}
    },
    setup() {
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
        // 滑动
        const scrollAction = () => {
            // 滑动
        }
        return {
            contentRef,
            scrollToTop,
            scrollAction,
        }
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
.layout {
    width: 100vw;
    min-width: 1000px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .header {
        width: 100%;
        height: 96px;
    }
    .content {
        width: 100%;
        height: calc(100% - 96px);
        overflow-y: scroll;

        .router-content {
            min-height: 100%;
        }
    }
    .content::-webkit-scrollbar {
        // width: 0px;
        // display: none;
        // width: 8px;
        // height: 8px;
    }
    .content::-webkit-scrollbar-button {
        display: none;
    }
    .content::-webkit-scrollbar-thumb {
        background: #e6e6e6;
    }
    .footer {
        width: 100%;
    }
}
</style>
