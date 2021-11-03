<!--
 * @Author: your name
 * @Date: 2021-11-02 19:15:52
 * @LastEditTime: 2021-11-03 20:02:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /datumwealth-openalpha-front/src/views/Layout.vue
-->
<template>
    <div class="layout">
        <Header class="header" />
        <div class="content">
            <div class="router-content">
                <router-view></router-view>
            </div>
            <Footer class="footer" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '@/components/header/Header.vue'
import Footer from '@/components/footer/Footer.vue'

export default defineComponent({
    data() {
        return {}
    },
    components: {
        Header,
        Footer,
    },
})
</script>

<style lang="scss" scoped>
.layout {
    width: 100vw;
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
    .footer {
        width: 100%;
    }
}
</style>
