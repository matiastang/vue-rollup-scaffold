<!--
 * @Author: matiastang
 * @Date: 2021-11-19 19:17:03
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-23 10:58:32
 * @FilePath: /datumwealth-openalpha-front/src/views/web/interface/components/interfaceHot/InterfaceHot.vue
 * @Description: 接口列表热榜页
-->
<template>
    <div class="Interface-hot-cell borderBox flexRowCenter">
        <HotSwiper class="hot-swiper" :data="data" />
        <img class="hot-icon" src="static/api/hot.svg" />
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import HotSwiper from '../hotSwiper/HotSwiper.vue'
import { ListRecoType } from '@/common/request/modules/api/apiInterface'

export default defineComponent({
    name: 'InterfaceHot',
    props: {
        data: {
            type: Array as PropType<ListRecoType[]>,
            default: () => {
                return []
            },
        },
    },
    components: {
        HotSwiper,
    },
})
</script>

<style lang="scss" scoped>
.Interface-hot-cell {
    width: 100%;
    position: relative;
    .hot-swiper {
        width: 100%;
        height: 238px;
    }
    .hot-icon {
        position: absolute;
        width: 60px;
        height: 60px;
        top: 0px;
        right: 0px;
        z-index: 10;
    }
}
</style>
