<!--
 * @Author: matiastang
 * @Date: 2021-11-23 10:25:09
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-29 11:01:23
 * @FilePath: /datumwealth-openalpha-front/src/views/web/interface/components/hotSwiper/HotSwiper.vue
 * @Description: 接口热榜列表
-->
<template>
    <swiper
        class="swiper"
        loop="true"
        :modules="modules"
        :slides-per-view="4"
        :pagination="pagination"
        :autoplay="autoplay"
        @slideChange="onSlideChange"
    >
        <swiper-slide v-for="item in data" :key="item.apiCode" class="swiper-slide">
            <HotCell
                class="hot-cell"
                :url="item.listRecoIcon"
                :title="item.apiName"
                :text="item.listRecoDesc"
                :id="item.apiInfoId"
            />
        </swiper-slide>
    </swiper>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue'
// import Swiper core and required modules
import { Pagination, Autoplay } from 'swiper'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
import HotCell from '../hotCell/HotCell.vue'
import { ListRecoType } from '@/common/request/modules/api/apiInterface'

// Import Swiper styles
import 'swiper/scss'
import 'swiper/scss/pagination'
import 'swiper/scss/autoplay'

export default defineComponent({
    name: 'HotSwiper',
    props: {
        data: {
            type: Array as PropType<ListRecoType[]>,
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
        HotCell,
    },
})
</script>

<style lang="scss" scoped>
.swiper {
    border-radius: 10px;
    overflow: hidden;
    background: $themeBgColor;
    .swiper-slide {
        width: 25% !important;
        height: 100%;
        background: $bgColor;
        .hot-cell {
            width: 100%;
            height: 100%;
        }
    }
    ::v-deep(.swiper-pagination) {
        display: flex;
        justify-content: center;
        bottom: 24px !important;
        right: 45px !important;
        width: calc(100% - 45px) !important;
    }
    ::v-deep(.swiper-pagination-bullet) {
        width: 30px;
        height: 4px;
        background: #dfdfdf;
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
