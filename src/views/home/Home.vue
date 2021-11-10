<!--
 * @Author: your name
 * @Date: 2021-10-15 17:25:57
 * @LastEditTime: 2021-11-10 20:06:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-scaffold/src/views/Home.vue
-->
<template>
    <div class="home">
        <div class="collapse-popover-bound home-top borderBox flexRowCenter">
            <div class="borderBox home-top-left">
                <Collapse class="dw-collapse" :data="collapseData" />
            </div>
            <div class="home-top-right">
                <SwiperSlider style="height: 100%">
                    <swiper-slide class="swiper-slide"> Slide 1 </swiper-slide>
                    <swiper-slide class="swiper-slide"> Slide 2 </swiper-slide>
                    <swiper-slide class="swiper-slide"> Slide 3 </swiper-slide>
                </SwiperSlider>
            </div>
        </div>
        <div class="solution borderBox flexColumnCenter">
            <HomeTitle data="解决方案" />
            <div class="solution-bottom flexRowCenter">
                <SolutionCell
                    class="solution-cell"
                    v-for="item in solutionData"
                    :key="item.title"
                    :data="item"
                />
            </div>
        </div>
        <div class="home-hot borderBox flexColumnCenter">
            <HomeTitle data="热门接口推荐" />
            <div class="home-hot-bottom flexColumnCenter">
                <Hot v-for="item in hotData" :key="item.title" :data="item" />
            </div>
        </div>
        <div class="partners borderBox flexColumnCenter">
            <HomeTitle data="合作伙伴" />
            <div class="partners-content flexRowCenter">
                <div v-for="item in partnersData" :key="item" class="partners-cell">
                    {{ item.title }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SwiperSlider from '@/components/swiperSlider/SwiperSlider.vue'
import Collapse from './components/collapse/Collapse.vue'
import SolutionCell from './components/solutionCell/SolutionCell.vue'
import HomeTitle from './components/homeTitle/HomeTitle.vue'
import Hot from './components/hot/Hot.vue'

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
            solutionData: [
                {
                    title: '证券',
                    data: [
                        {
                            text: '·基金详情',
                        },
                        {
                            text: '·基金筛选',
                        },
                        {
                            text: '·基金持仓变动',
                        },
                    ],
                },
                {
                    title: '银行',
                    data: [
                        {
                            text: '·精准选基',
                        },
                        {
                            text: '·风险防范',
                        },
                    ],
                },
                {
                    title: '基金代销机构',
                    data: [
                        {
                            text: '·基金研究',
                        },
                        {
                            text: '·全市场分析',
                        },
                    ],
                },
                {
                    title: '大V',
                    data: [
                        {
                            text: '·基金研究',
                        },
                        {
                            text: '·组合诊断',
                        },
                        {
                            text: '·智能选基',
                        },
                    ],
                },
            ],
            hotData: [
                {
                    title: '基金基本信息',
                    text: '全国基金信息，实时数据更新',
                    topColor: '#F8642A',
                    bottomColor: '#FDA668',
                    dataList: [
                        {
                            title: '基金基本要素',
                            texts: ['基金名称', '基金代码', '基金经理', '管理规模'],
                            value: 0.15,
                        },
                        {
                            title: '基金基本要素',
                            texts: ['基金名称', '基金代码', '基金经理', '管理规模'],
                            value: 0.15,
                        },
                        {
                            title: '基金基本要素',
                            texts: ['基金名称', '基金代码', '基金经理', '管理规模'],
                            value: 0.15,
                        },
                        {
                            title: '基金基本要素',
                            texts: ['基金名称', '基金代码', '基金经理', '管理规模'],
                            value: 0.15,
                        },
                    ],
                },
                {
                    title: '基金净值',
                    text: '全国基金信息，实时数据更新',
                    topColor: '#F49D12',
                    bottomColor: '#FFC67A',
                    dataList: [
                        {
                            title: '基金基本要素',
                            texts: ['基金名称', '基金代码', '基金经理', '管理规模'],
                            value: 0.15,
                        },
                        {
                            title: '基金基本要素',
                            texts: ['基金名称', '基金代码', '基金经理', '管理规模'],
                            value: 0.15,
                        },
                        {
                            title: '基金基本要素',
                            texts: ['基金名称', '基金代码', '基金经理', '管理规模'],
                            value: 0.15,
                        },
                        {
                            title: '基金基本要素',
                            texts: ['基金名称', '基金代码', '基金经理', '管理规模'],
                            value: 0.15,
                        },
                    ],
                },
                {
                    title: '基金业绩表现',
                    text: '全国基金信息，实时数据更新',
                    topColor: '#F1343A',
                    bottomColor: '#FA7377',
                    dataList: [
                        {
                            title: '基金基本要素',
                            texts: ['基金名称', '基金代码', '基金经理', '管理规模'],
                            value: 0.15,
                        },
                        {
                            title: '基金基本要素',
                            texts: ['基金名称', '基金代码', '基金经理', '管理规模'],
                            value: 0.15,
                        },
                        {
                            title: '基金基本要素',
                            texts: ['基金名称', '基金代码', '基金经理', '管理规模'],
                            value: 0.15,
                        },
                        {
                            title: '基金基本要素',
                            texts: ['基金名称', '基金代码', '基金经理', '管理规模'],
                            value: 0.15,
                        },
                    ],
                },
                {
                    title: '基金投资组合',
                    text: '全国基金信息，实时数据更新',
                    topColor: '#3785F9',
                    bottomColor: '#7AB0FF',
                    dataList: [
                        {
                            title: '基金基本要素',
                            texts: ['基金名称', '基金代码', '基金经理', '管理规模'],
                            value: 0.15,
                        },
                        {
                            title: '基金基本要素',
                            texts: ['基金名称', '基金代码', '基金经理', '管理规模'],
                            value: 0.15,
                        },
                        {
                            title: '基金基本要素',
                            texts: ['基金名称', '基金代码', '基金经理', '管理规模'],
                            value: 0.15,
                        },
                        {
                            title: '基金基本要素',
                            texts: ['基金名称', '基金代码', '基金经理', '管理规模'],
                            value: 0.15,
                        },
                    ],
                },
                {
                    title: '基金财务数据',
                    text: '全国基金信息，实时数据更新',
                    topColor: '#12BAF5',
                    bottomColor: '#6ADBFF',
                    dataList: [
                        {
                            title: '基金基本要素',
                            texts: ['基金名称', '基金代码', '基金经理', '管理规模'],
                            value: 0.15,
                        },
                        {
                            title: '基金基本要素',
                            texts: ['基金名称', '基金代码', '基金经理', '管理规模'],
                            value: 0.15,
                        },
                        {
                            title: '基金基本要素',
                            texts: ['基金名称', '基金代码', '基金经理', '管理规模'],
                            value: 0.15,
                        },
                        {
                            title: '基金基本要素',
                            texts: ['基金名称', '基金代码', '基金经理', '管理规模'],
                            value: 0.15,
                        },
                    ],
                },
                {
                    title: '基金风险',
                    text: '全国基金信息，实时数据更新',
                    topColor: '#EF1E51',
                    bottomColor: '#FF6D88',
                    dataList: [
                        {
                            title: '基金基本要素',
                            texts: ['基金名称', '基金代码', '基金经理', '管理规模'],
                            value: 0.15,
                        },
                        {
                            title: '基金基本要素',
                            texts: ['基金名称', '基金代码', '基金经理', '管理规模'],
                            value: 0.15,
                        },
                        {
                            title: '基金基本要素',
                            texts: ['基金名称', '基金代码', '基金经理', '管理规模'],
                            value: 0.15,
                        },
                        {
                            title: '基金基本要素',
                            texts: ['基金名称', '基金代码', '基金经理', '管理规模'],
                            value: 0.15,
                        },
                    ],
                },
                {
                    title: '基金业绩归因',
                    text: '全国基金信息，实时数据更新',
                    topColor: '#9233F9',
                    bottomColor: '#BF84FF',
                    dataList: [
                        {
                            title: '基金基本要素',
                            texts: ['基金名称', '基金代码', '基金经理', '管理规模'],
                            value: 0.15,
                        },
                        {
                            title: '基金基本要素',
                            texts: ['基金名称', '基金代码', '基金经理', '管理规模'],
                            value: 0.15,
                        },
                        {
                            title: '基金基本要素',
                            texts: ['基金名称', '基金代码', '基金经理', '管理规模'],
                            value: 0.15,
                        },
                        {
                            title: '基金基本要素',
                            texts: ['基金名称', '基金代码', '基金经理', '管理规模'],
                            value: 0.15,
                        },
                    ],
                },
            ],
            partnersData: [
                {
                    title: '中国工商银行',
                },
                {
                    title: '中国工商银行',
                },
                {
                    title: '中国工商银行',
                },
                {
                    title: '中国工商银行',
                },
                {
                    title: '中国工商银行',
                },
                {
                    title: '中国工商银行',
                },
                {
                    title: '中国工商银行',
                },
                {
                    title: '中国工商银行',
                },
                {
                    title: '中国工商银行',
                },
                {
                    title: '中国工商银行',
                },
                {
                    title: '中国工商银行',
                },
                {
                    title: '中国工商银行',
                },
                {
                    title: '中国工商银行',
                },
                {
                    title: '中国工商银行',
                },
                {
                    title: '中国工商银行',
                },
                {
                    title: '中国工商银行',
                },
                {
                    title: '中国工商银行',
                },
                {
                    title: '中国工商银行',
                },
            ],
        }
    },
    components: {
        SwiperSlider,
        Collapse,
        SolutionCell,
        HomeTitle,
        Hot,
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
        align-items: stretch;
        .home-top-left {
            width: 30%;
            padding-right: 16px;
            box-sizing: border-box;
            // margin-right: 16px;
        }
        .home-top-right {
            width: 70%;
        }
    }
    .solution {
        width: 100%;
        padding: 60px calc(10% - 8px) 40px calc(10% - 8px);
        background: #fbfbfb;
        .solution-bottom {
            width: 100%;
            justify-content: space-between;
            align-items: stretch;
            .solution-cell {
                width: 25%;
                margin: 0px 8px;
            }
        }
    }
    .home-hot {
        width: 100%;
        padding: 60px calc(10% - 8px) 60px calc(10% - 8px);
        .home-hot-bottom {
            width: 100%;
            flex-wrap: wrap;
            justify-content: space-between;
        }
    }
    .partners {
        width: 100%;
        padding: 0px calc(10% - 8px) 60px calc(10% - 8px);
        .partners-content {
            width: 100%;
            flex-wrap: wrap;
            justify-content: space-between;
            .partners-cell {
                width: 224px;
                height: 80px;
                background: #ffffff;
                box-shadow: 0px 4px 10px 0px rgba(218, 218, 218, 0.5);
                margin: 8px;
            }
        }
    }
}
@media screen and (max-width: 1360px) {
    .home {
        .home-top {
            padding: 20px 5% 30px 5%;
            .home-top-left {
                width: 35%;
            }
            .home-top-right {
                width: 65%;
            }
        }
        .solution {
            padding: 60px calc(5% - 8px) 40px calc(5% - 8px);
        }
        .home-hot {
            padding: 0px calc(5% - 8px) 60px calc(5% - 8px);
        }
        .partners {
            padding: 60px calc(5% - 8px) 60px calc(5% - 8px);
        }
    }
}
</style>
