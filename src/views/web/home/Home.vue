<!--
 * @Author: matiastang
 * @Date: 2021-11-19 19:17:03
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-03 16:42:17
 * @FilePath: /datumwealth-openalpha-front/src/views/web/home/Home.vue
 * @Description: 首页
-->
<template>
    <div class="home">
        <div class="collapse-popover-bound home-top borderBox flexRowCenter">
            <div v-if="iNavTree.tree.length > 0" class="borderBox home-top-left">
                <Collapse
                    class="dw-collapse"
                    :data="iNavTree.tree"
                    :selectedIndex="selectedIndex"
                    @mouseoverIndex="mouseoverIndex"
                    @mouseoutIndex="mouseoutIndex"
                />
            </div>
            <div v-if="bannerList.banners.length > 0" class="home-top-right">
                <SwiperSlider class="swiper-slide-content" :banners="bannerList.banners" />
            </div>
            <div
                v-if="selectedCategory"
                class="home-category-content"
                @mouseover="categoryContentMouseover"
                @mouseout="categoryContentMouseout"
            >
                <div v-if="selectedCategory.categoryType === 0" class="content borderBox">
                    <div
                        v-for="childrenItem in selectedCategory.children"
                        :key="childrenItem.categoryId"
                        class="content-item borderBox flexColumnCenter"
                    >
                        <div class="content-title defaultFont">{{ childrenItem.categoryName }}</div>
                        <div class="content-bottom borderBox flexRowCenter">
                            <div
                                v-for="item in childrenItem.apiInfoList.sort(
                                    (left, right) => left.apiOrderNum - right.apiOrderNum
                                )"
                                :key="item.apiCode"
                                class="content-cell defaultFont"
                                @click="apiInfoAction(item.apiInfoId)"
                            >
                                {{ item.apiName }}
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="content borderBox">
                    <div class="content-item borderBox flexColumnCenter">
                        <div class="content-title defaultFont">
                            {{ selectedCategory.categoryName }}
                        </div>
                        <div class="content-bottom flexRowCenter">
                            <div
                                v-for="item in selectedCategory.apiInfoList.sort(
                                    (left, right) => left.apiOrderNum - right.apiOrderNum
                                )"
                                :key="item.apiCode"
                                class="content-cell defaultFont"
                                @click="apiInfoAction(item.apiInfoId)"
                            >
                                {{ item.apiName }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="solutionList.solutions.length > 0" class="solution borderBox flexColumnCenter">
            <HomeTitle data="解决方案" />
            <div class="solution-bottom flexRowCenter">
                <SolutionCell
                    class="solution-cell"
                    v-for="(item, index) in solutionList.solutions"
                    :key="item.title"
                    :data="item"
                    :index="index"
                />
            </div>
        </div>
        <div v-if="hotList.hots.length > 0" class="home-hot borderBox flexColumnCenter">
            <HomeTitle data="热门接口推荐" style="padding-top: 60px" />
            <div class="home-hot-bottom flexColumnCenter">
                <Hot
                    class="home-hot-content"
                    v-for="item in hotList.hots"
                    :key="item.title"
                    :data="item"
                />
            </div>
        </div>
        <div v-if="partnerList.partners.length > 0" class="partners borderBox flexColumnCenter">
            <HomeTitle data="合作伙伴" />
            <div class="partners-content flexRowCenter">
                <img
                    v-for="item in partnerList.partners"
                    :key="item"
                    class="partners-cell"
                    :src="item"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, reactive, computed, ComputedRef, watchSyncEffect } from 'vue'
import SwiperSlider from '@/components/swiperSlider/SwiperSlider.vue'
import Collapse from './components/collapse/Collapse.vue'
import SolutionCell from './components/solutionCell/SolutionCell.vue'
import HomeTitle from './components/homeTitle/HomeTitle.vue'
import Hot from './components/hot/Hot.vue'
import {
    homeBanner,
    homeInterfaceNavigationTree,
    homeSolution,
    homeHotInterface,
    homePartner,
} from '@/common/request/index'
import { HotType, SolutionType } from '@/common/request/modules/home/homeInterface'
import { useRouter } from 'vue-router'
import { interface_id_check } from 'utils/check/interfaceCheck'
import ElMessage from '@/common/utils/message'

export default defineComponent({
    setup() {
        const router = useRouter()
        // 首页banner
        const bannerList = reactive({
            banners: Array<string>(),
        })
        watchSyncEffect(async () => {
            let res = await homeBanner()
            bannerList.banners = res.map((item) => item.content)
        })
        // 接口导航树
        const iNavTree = reactive({
            tree: Array<HotType>(),
        })
        // 首页需要显示的分类
        watchSyncEffect(async () => {
            let categoryTree = await homeInterfaceNavigationTree()
            iNavTree.tree = categoryTree.filter((item: HotType, index) => {
                return index < 7
            })
        })
        // 当前选中的category
        const selectedIndex: Ref<number | null> = ref(null)
        const canRemove = ref(true)
        const selectedCategory: ComputedRef<HotType | null> = computed(() => {
            let index = selectedIndex.value
            if (index !== null) {
                return iNavTree.tree[index]
            }
            return null
        })
        const mouseoverIndex = (index: number) => {
            canRemove.value = false
            selectedIndex.value = index
        }
        const mouseoutIndex = (index: number) => {
            setTimeout(() => {
                if (canRemove.value) {
                    selectedIndex.value = null
                }
            }, 50)
            canRemove.value = true
        }
        const categoryContentMouseover = () => {
            canRemove.value = false
        }
        const categoryContentMouseout = () => {
            setTimeout(() => {
                if (canRemove.value) {
                    selectedIndex.value = null
                }
            }, 50)
            canRemove.value = true
        }
        const apiInfoAction = (id: number) => {
            if (interface_id_check(id)) {
                router.push({
                    path: `/interface/info/${id}`,
                })
                return
            }
            ElMessage({
                message: '接口id错误',
                type: 'error',
            })
        }
        // 首页解决方案
        const solutionList = reactive({
            solutions: Array<SolutionType>(),
        })
        watchSyncEffect(async () => {
            solutionList.solutions = await homeSolution()
        })
        // 首页热榜
        const hotList = reactive({
            hots: Array<HotType>(),
        })
        watchSyncEffect(async () => {
            hotList.hots = await homeHotInterface()
        })
        // 合作伙伴
        const partnerList = reactive({
            partners: Array<string>(),
        })
        watchSyncEffect(async () => {
            let res = await homePartner()
            partnerList.partners = res.map((item) => item.content)
        })
        return {
            bannerList,
            iNavTree,
            selectedIndex,
            selectedCategory,
            apiInfoAction,
            mouseoverIndex,
            mouseoutIndex,
            categoryContentMouseover,
            categoryContentMouseout,
            solutionList,
            hotList,
            partnerList,
        }
    },
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
})
</script>

<style lang="scss" scoped>
.home {
    width: 100%;
    .home-top {
        width: 100%;
        background-image: url('static/home/banner-bg.svg');
        object-fit: cover;
        padding: 20px calc(50% - 712px) 30px calc(50% - 712px);
        align-items: stretch;
        position: relative;
        justify-content: flex-start;
        .home-top-left {
            width: 30%;
            padding-right: 16px;
            box-sizing: border-box;
        }
        .home-top-right {
            width: 70%;
            .swiper-slide-content {
                height: 100%;
            }
        }
        .home-category-content {
            position: absolute;
            right: calc(50% - 712px);
            top: 0px;
            padding: 20px 60px;
            width: calc(997px + 16px);
            height: 630px;
            box-sizing: border-box;
            background: $themeBgColor;
            z-index: 9;
            overflow-y: scroll;
            .content-item {
                border-bottom: 1px solid #dfdfdf;
                align-items: flex-start;
                .content-title {
                    font-size: 14px;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: $themeColor;
                    line-height: 20px;
                    letter-spacing: 1px;
                    margin-top: 23px;
                }
                .content-bottom {
                    padding: 12px 0px;
                    box-sizing: border-box;
                    width: 100%;
                    justify-content: flex-start;
                    flex-wrap: wrap;
                    .content-cell {
                        width: 25%;
                        margin: 6px 0px;
                        font-size: 14px;
                        color: $titleColor;
                        line-height: 20px;
                        flex-shrink: 0;
                        cursor: pointer;
                        text-align: left;
                    }
                    .content-cell:hover {
                        color: $themeColor;
                    }
                }
            }
        }
    }
    .solution {
        width: 100%;
        padding: 60px calc(50% - 720px) 40px calc(50% - 720px);
        background-image: url('static/home/scheme-bg.png');
        object-fit: cover;
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
        box-sizing: border-box;
        padding: 60px calc(50% - 720px) 60px calc(50% - 720px);
        .home-hot-bottom {
            width: 100%;
            flex-wrap: wrap;
            justify-content: space-between;
            .home-hot-content {
                width: 100%;
            }
        }
    }
    .partners {
        width: 100%;
        background-image: url('static/home/partners-bg.png');
        object-fit: cover;
        padding: 0px calc(50% - 720px) 60px calc(50% - 720px);
        .partners-content {
            width: 100%;
            flex-wrap: wrap;
            justify-content: flex-start;
            .partners-cell {
                width: 224px;
                height: 80px;
                background: #ffffff;
                box-shadow: 0px 4px 10px 0px rgba(218, 218, 218, 0.5);
                margin: 8px;
                object-fit: cover;
            }
        }
    }
}
@media screen and (max-width: 1500px) {
    .home {
        .home-top {
            padding: 20px 30px 30px 30px;
            .home-category-content {
                right: 30px;
                width: calc(70% - 26px);
            }
        }
        .solution {
            padding: 60px 22px 40px 22px;
        }
        .home-hot {
            padding: 0px 22px 60px 22px;
        }
        .partners {
            padding: 60px 22px 60px 22px;
        }
    }
}
</style>
