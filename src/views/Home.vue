<!--
 * @Author: your name
 * @Date: 2021-10-15 17:25:57
 * @LastEditTime: 2021-11-03 20:03:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-scaffold/src/views/Home.vue
-->
<template>
    <div class="home"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            animation: false,
            zoom: false,
        }
    },
    methods: {
        animationAction() {
            this.animation = !this.animation
        },
        zoomAction() {
            this.zoom = !this.zoom
        },
    },
})
</script>

<style lang="scss" scoped>
.home {
    // min-height: 100%;
}
</style>
