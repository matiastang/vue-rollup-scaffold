<!--
 * @Author: your name
 * @Date: 2021-11-02 19:15:52
 * @LastEditTime: 2021-11-02 20:07:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /datumwealth-openalpha-front/src/views/Layout.vue
-->
<template>
    <div class="layout">
        <Header class="header" />
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import Header from '@/components/header/Header.vue'

export default defineComponent({
    data() {
        return {}
    },
    components: {
        Header,
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
    }
}
</style>
