<!--
 * @Author: your name
 * @Date: 2021-11-04 17:15:04
 * @LastEditTime: 2021-11-10 20:11:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /datumwealth-openalpha-front/src/components/swiperSlider/SwiperSlider.vue
-->
<template>
    <swiper
        class="swiper"
        loop="true"
        :modules="modules"
        :slides-per-view="1"
        :pagination="pagination"
        :autoplay="autoplay"
        @slideChange="onSlideChange"
    >
        <slot></slot>
        <swiper-slide class="swiper-slide"> Slide 1 </swiper-slide>
        <swiper-slide class="swiper-slide"> Slide 2 </swiper-slide>
        <swiper-slide class="swiper-slide"> Slide 3 </swiper-slide>
    </swiper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import Swiper core and required modules
import { Pagination, Autoplay } from 'swiper'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/scss'
import 'swiper/scss/pagination'
import 'swiper/scss/autoplay'

export default defineComponent({
    data() {
        return {
            autoplay: {
                disableOnInteraction: false,
                delay: 5000,
            },
            pagination: {
                clickable: true,
            },
        }
    },
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        const onSlideChange = () => {
            console.log('slide change')
        }
        return {
            onSlideChange,
            modules: [Pagination, Autoplay],
        }
    },
})
</script>

<style lang="scss" scoped>
.swiper {
    border-radius: 10px;
    overflow: hidden;
    background: $themeBgColor;
    .swiper-slide {
        width: 100%;
        height: 100%;
        background: $bgColor;
    }
    ::v-deep(.swiper-pagination) {
        display: flex;
        justify-content: flex-end;
        bottom: 24px !important;
        right: 45px !important;
        width: calc(100% - 45px) !important;
    }
    ::v-deep(.swiper-pagination-bullet) {
        width: 30px;
        height: 4px;
        background: $themeBgColor;
        border-radius: 2px;
        opacity: 1 !important;
    }
    ::v-deep(.swiper-pagination-bullet-active) {
        width: 30px;
        height: 4px;
        background: $themeColor;
        border-radius: 2px;
    }
}
</style>
