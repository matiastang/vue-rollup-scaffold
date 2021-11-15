<!--
 * @Author: matiastang
 * @Date: 2021-11-11 16:00:07
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-15 15:57:11
 * @FilePath: /datumwealth-openalpha-front/src/components/userLayout/UserLayout.vue
 * @Description: 
-->
<template>
    <div class="urer-layout flexColumnCenter">
        <Header class="header" />
        <div class="urer-layout-content flexRowCenter">
            <Menu class="menu-content" />
            <div class="router-content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '@/components/header/Header.vue'
import Menu from '@/components/menu/Menu.vue'

export default defineComponent({
    name: 'UserLayout',
    data() {
        return {}
    },
    components: {
        Header,
        Menu,
    },
})
</script>

<style lang="scss" scoped>
.urer-layout {
    width: 100vw;
    height: 100vh;
    .header {
        width: 100%;
        height: 96px;
    }
    .urer-layout-content {
        width: 100%;
        height: calc(100% - 96px);
        align-items: stretch;
        .menu-content {
            width: 238px;
            background: #2e2725;
        }
        .router-content {
            width: calc(100% - 238px);
            height: 100%;
            overflow-y: scroll;
        }
    }
}
</style>
