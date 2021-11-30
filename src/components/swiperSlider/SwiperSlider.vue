<!--
 * @Author: matiastang
 * @Date: 2021-11-11 17:58:07
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-30 19:35:29
 * @FilePath: /datumwealth-openalpha-front/src/components/swiperSlider/SwiperSlider.vue
 * @Description: 首页banner
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
        <swiper-slide v-for="item in banners" :key="item" class="swiper-slide">
            <img class="banner" :src="item" />
        </swiper-slide>
    </swiper>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue'
// import Swiper core and required modules
import { Pagination, Autoplay } from 'swiper'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/scss'
import 'swiper/scss/pagination'
import 'swiper/scss/autoplay'

export default defineComponent({
    name: '',
    props: {
        banners: {
            type: Array as PropType<Array<string>>,
            default: () => {
                return []
            },
        },
    },
    setup() {
        const onSlideChange = () => {
            // TODO: - 切换处理
        }
        const autoplay = reactive({
            disableOnInteraction: false,
            delay: 5000,
        })
        const pagination = reactive({
            clickable: true,
        })
        return {
            onSlideChange,
            autoplay,
            pagination,
            modules: [Pagination, Autoplay],
        }
    },
    components: {
        Swiper,
        SwiperSlide,
    },
})
</script>

<style lang="scss" scoped>
.swiper {
    border-radius: 6px;
    overflow: hidden;
    background: $themeBgColor;
    .swiper-slide {
        width: 100%;
        height: 100%;
        background: $bgColor;
        .banner {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
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
