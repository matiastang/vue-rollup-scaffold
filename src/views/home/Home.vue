<!--
 * @Author: your name
 * @Date: 2021-10-15 17:25:57
 * @LastEditTime: 2021-11-04 20:16:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-scaffold/src/views/Home.vue
-->
<template>
    <div class="home">
        <div class="home-top borderBox flexRowCenter">
            <div class="home-top-left">
                <Collapse class="dw-collapse" :data="collapseData" />
            </div>
            <div class="home-top-right">
                <SwiperSlider style="height: 100%" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SwiperSlider from '@/components/swiperSlider/SwiperSlider.vue'
import Collapse from './components/collapse/Collapse.vue'

export default defineComponent({
    data() {
        return {
            collapseData: [
                {
                    title: '基金基本信息',
                    text: '基金基本要素｜基金分类树｜基金规模',
                },
                {
                    title: '基金净值',
                    text: '基金净值｜基金（ETF）份额参考净值',
                },
                {
                    title: '基金业绩表现',
                    text: '基金年度风险收益指标统计 | 基金绝对胜率',
                },
                {
                    title: '基金投资组合',
                    text: '基金资产配置｜基金股票投资｜基金债券投资',
                },
                {
                    title: '基金财务数据',
                    text: '基金财务指标｜基金资产负债｜基金利润',
                },
                {
                    title: '基金风险',
                    text: '利率风险',
                },
                {
                    title: '基金业绩归因',
                    text: '基金资产配置归因｜基金股票投资归因',
                },
            ],
        }
    },
    components: {
        SwiperSlider,
        Collapse,
    },
    methods: {},
})
</script>

<style lang="scss" scoped>
.home {
    width: 100%;
    .home-top {
        width: 100%;
        background: #fff2ee;
        padding: 20px 10% 30px 10%;
        align-items: flex-start;
        .home-top-left {
            width: 404px;
            margin-right: 16px;
        }
        .home-top-right {
            width: calc(100% - 420px);
            height: 100%;
        }
    }
}
</style>
