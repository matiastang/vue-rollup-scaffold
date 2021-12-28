<!--
 * @Author: matiastang
 * @Date: 2021-12-27 14:56:11
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-28 19:37:47
 * @FilePath: /datumwealth-openalpha-front/src/views/web/product/Product.vue
 * @Description: 产品方案
-->
<template>
    <div class="product">
        <div class="product-banner-container">
            <img
                class="product-banner"
                src="static/product/product-banner.svg"
                @load="bannerLoad"
            />
            <div v-show="showBannerTitle" class="product-banner-content">
                <div class="title">西筹产品方案</div>
                <div class="text">
                    西筹金融科技基于全面的公募基金基础数据与研究驱动所开发的深度衍生数据，围绕基金打造基金组合、资产配置、持仓分析、净值预估等各类场
                    景，全方位赋能财富管理时代。
                </div>
            </div>
        </div>
        <div class="product-container">
            <HomeTitle title="产品功能矩阵" />
            <DwTabs :data="tabData" v-model="tabIndex" />
            <div v-if="tabIndex === 0" class="product-container-1 flexColumnCenter">
                <div class="product-container-1-1 flexRowCenter">
                    <div class="product-container-left">
                        <img class="product-container-1-1-img" src="static/product/FOF-1.svg" />
                    </div>
                    <div class="product-container-1-1-right flexColumnCenter">
                        <div class="title">基金组合抄作业</div>
                        <div class="text">
                            基于自上而下的风险视角大类配置、多视角的智能行业配置、
                            自下而上的公募基金精选池，结合投资者的风险偏好，定制
                            化生成优化基金组合，实现大类资产配置控制整体风险、细
                            分行业实现行业Beta、公募基金精选获取基金选股Alpha的效 果。
                        </div>
                    </div>
                </div>
                <div class="product-container-1-1 flexRowCenter">
                    <div class="product-container-1-1-right flexColumnCenter">
                        <div class="title">资产配置方案</div>
                        <div class="text">
                            基于西筹核心模型，生成资产配置方案，方案集合业绩曲线、业绩指标、历史配置、基金组合等各项功能。
                        </div>
                        <div class="interface flexRowCenter">
                            <div
                                v-for="(item, index) in tabInterfaceData[0][0]"
                                :key="item.id"
                                class="interface-item flexColumnCenter"
                                @click="interfaceAction(item.id)"
                                :style="{ 'margin-right': '35px' }"
                            >
                                <svg class="icon interface-icon-img" aria-hidden="true">
                                    <use :xlink:href="`#${item.iconUrl}`"></use>
                                </svg>
                                <div
                                    class="title"
                                    :style="{ width: `${index === 3 ? 110 : 75}px` }"
                                >
                                    {{ item.name }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="product-container-left">
                        <img
                            class="product-container-1-1-img filter-blur"
                            src="static/product/FOF-2.svg"
                        />
                        <div class="product-container-gif-container flexColumnCenter">
                            <img
                                class="product-container-gif"
                                src="https://datumwealth.oss-cn-chengdu.aliyuncs.com/dw/gif/fof-1.gif"
                            />
                        </div>
                    </div>
                </div>
                <div class="product-container-1-1 flexRowCenter">
                    <div class="product-container-left">
                        <img
                            class="product-container-1-1-img filter-blur"
                            src="static/product/FOF-3.svg"
                        />
                        <div class="product-container-gif-container flexColumnCenter">
                            <img
                                class="product-container-gif"
                                src="https://datumwealth.oss-cn-chengdu.aliyuncs.com/dw/gif/fof-2.gif"
                            />
                        </div>
                    </div>
                    <div class="product-container-1-1-right flexColumnCenter">
                        <div class="title">组合诊断</div>
                        <div class="text">
                            对投资者自选组合的大类配置、行业配比进行诊断，输出各项偏离度情况。
                        </div>
                        <div class="interface flexRowCenter">
                            <div
                                v-for="item in tabInterfaceData[0][1]"
                                :key="item.id"
                                class="interface-item flexColumnCenter"
                                @click="interfaceAction(item.id)"
                                :style="{ 'margin-right': '35px' }"
                            >
                                <svg class="icon interface-icon-img" aria-hidden="true">
                                    <use :xlink:href="`#${item.iconUrl}`"></use>
                                </svg>
                                <div class="title" :style="{ width: '75px' }">
                                    {{ item.name }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="tabIndex === 1" class="product-container-1 flexColumnCenter">
                <div class="product-container-1-1 flexRowCenter">
                    <div class="product-container-left">
                        <img class="product-container-1-1-img" src="static/product/stock-1.svg" />
                    </div>
                    <div class="product-container-1-1-right flexColumnCenter">
                        <div class="title">股基连连看</div>
                        <div class="text">
                            股票与公募基金之间的连接工具，基于公募基金持仓维度分析个股与行业的持仓统计与增减持变化动态情况。
                        </div>
                    </div>
                </div>
                <div class="product-container-1-1 flexRowCenter">
                    <div class="product-container-1-1-right flexColumnCenter">
                        <div class="title">持仓排行</div>
                        <div class="text">
                            股票或行业在基金产品、基金经理、基金公司三个维度下，各个数据来源(季报、半年/年报)下的持仓截面数据统计。
                        </div>
                        <div class="interface flexRowCenter">
                            <div
                                v-for="item in tabInterfaceData[1][0]"
                                :key="item.id"
                                class="interface-item flexColumnCenter"
                                @click="interfaceAction(item.id)"
                                :style="{ 'margin-right': '35px' }"
                            >
                                <svg class="icon interface-icon-img" aria-hidden="true">
                                    <use :xlink:href="`#${item.iconUrl}`"></use>
                                </svg>
                                <div class="title" :style="{ width: '110px' }">
                                    {{ item.name }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="product-container-left">
                        <img
                            class="product-container-1-1-img filter-blur"
                            src="static/product/stock-2.svg"
                        />
                    </div>
                </div>
                <div class="product-container-1-1 flexRowCenter">
                    <div class="product-container-left">
                        <img
                            class="product-container-1-1-img filter-blur"
                            src="static/product/stock-3.svg"
                        />
                    </div>
                    <div class="product-container-1-1-right flexColumnCenter">
                        <div class="title">持仓动态</div>
                        <div class="text">
                            股票或行业在基金产品、基金经理、基金公司三个维度下，各个数据来源(季报、半年/年报)、选定时间区间内的加减仓变化动态。
                        </div>
                        <div class="interface flexRowCenter">
                            <div
                                v-for="item in tabInterfaceData[1][1]"
                                :key="item.id"
                                class="interface-item flexColumnCenter"
                                @click="interfaceAction(item.id)"
                                :style="{ 'margin-right': '35px' }"
                            >
                                <svg class="icon interface-icon-img" aria-hidden="true">
                                    <use :xlink:href="`#${item.iconUrl}`"></use>
                                </svg>
                                <div class="title" :style="{ width: '110px' }">{{ item.name }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="product-container-1-1 flexRowCenter">
                    <div class="product-container-1-1-right flexColumnCenter">
                        <div class="title">持仓分析</div>
                        <div class="text">股票或行业在选定维度下的基金列表及持仓趋势分析。</div>
                        <div class="interface flexRowCenter">
                            <div
                                v-for="item in tabInterfaceData[1][2]"
                                :key="item.id"
                                class="interface-item flexColumnCenter"
                                @click="interfaceAction(item.id)"
                                :style="{ 'margin-right': '35px' }"
                            >
                                <svg class="icon interface-icon-img" aria-hidden="true">
                                    <use :xlink:href="`#${item.iconUrl}`"></use>
                                </svg>
                                <div class="title" :style="{ width: '110px' }">
                                    {{ item.name }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="product-container-left">
                        <img
                            class="product-container-1-1-img filter-blur"
                            src="static/product/stock-4.svg"
                        />
                    </div>
                </div>
            </div>
            <div v-if="tabIndex === 2" class="product-container-1 flexColumnCenter">
                <div class="product-container-1-1 flexRowCenter">
                    <div class="product-container-left">
                        <img
                            class="product-container-1-1-img"
                            src="static/product/estimate-1.svg"
                        />
                    </div>
                    <div class="product-container-1-1-right flexColumnCenter">
                        <div class="title">净值预估</div>
                        <div class="text">
                            根据基金根据基金公司公布的前十大重仓股和大盘的走势，预估出基金当日的净值。
                        </div>
                    </div>
                </div>
                <div class="product-container-1-1 flexRowCenter">
                    <div class="product-container-1-1-right flexColumnCenter">
                        <div class="title">实时净值</div>
                        <div class="text">提供最新的所有基金盘中动态估算净值涨跌幅。</div>
                        <div class="interface flexRowCenter">
                            <div
                                v-for="item in tabInterfaceData[2][0]"
                                :key="item.id"
                                class="interface-item flexColumnCenter"
                                @click="interfaceAction(item.id)"
                                :style="{ 'margin-right': '35px' }"
                            >
                                <svg class="icon interface-icon-img" aria-hidden="true">
                                    <use :xlink:href="`#${item.iconUrl}`"></use>
                                </svg>
                                <div class="title" :style="{ width: '75px' }">
                                    {{ item.name }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="product-container-left">
                        <img
                            class="product-container-1-1-img filter-blur"
                            src="static/product/estimate-2.svg"
                        />
                    </div>
                </div>
                <div class="product-container-1-1 flexRowCenter">
                    <div class="product-container-left">
                        <img
                            class="product-container-1-1-img filter-blur"
                            src="static/product/estimate-3.svg"
                        />
                    </div>
                    <div class="product-container-1-1-right flexColumnCenter">
                        <div class="title">模型择优</div>
                        <div class="text">
                            通过基金代码或基金名称、日平均估计偏差、原模型保留比例、偏差排名百分位阈值获取模型净值偏差信息。
                        </div>
                        <div class="interface flexRowCenter">
                            <div
                                v-for="item in tabInterfaceData[2][1]"
                                :key="item.id"
                                class="interface-item flexColumnCenter"
                                @click="interfaceAction(item.id)"
                                :style="{ 'margin-right': '35px' }"
                            >
                                <svg class="icon interface-icon-img" aria-hidden="true">
                                    <use :xlink:href="`#${item.iconUrl}`"></use>
                                </svg>
                                <div class="title" :style="{ width: '75px' }">{{ item.name }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="product-container-1-1 flexRowCenter">
                    <div class="product-container-1-1-right flexColumnCenter">
                        <div class="title">持仓预估</div>
                        <div class="text">
                            通过基金代码或基金名称、交易日期获取基金持仓行业、市值、占比等字段信息。
                        </div>
                        <div class="interface flexRowCenter">
                            <div
                                v-for="item in tabInterfaceData[2][2]"
                                :key="item.id"
                                class="interface-item flexColumnCenter"
                                @click="interfaceAction(item.id)"
                                :style="{ 'margin-right': '35px' }"
                            >
                                <svg class="icon interface-icon-img" aria-hidden="true">
                                    <use :xlink:href="`#${item.iconUrl}`"></use>
                                </svg>
                                <div class="title" :style="{ width: '110px' }">
                                    {{ item.name }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="product-container-left">
                        <img
                            class="product-container-1-1-img filter-blur"
                            src="static/product/estimate-4.svg"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, reactive, ref, watchSyncEffect, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import HomeTitle from '../home/components/homeTitle/HomeTitle.vue'
import DwTabs from './components/dwTabs/DwTabs.vue'
import ElMessage from '@/common/utils/message'

const router = useRouter()

const tabData = ['基金组合抄作业', '股基连连看', '净值预估']
const tabIndex = ref(0)
const tabInterfaceData = [
    [
        [
            {
                id: 130,
                iconUrl: 'icon-A0130',
                name: '资产配置',
            },
            {
                id: 141,
                iconUrl: 'icon-A0131',
                name: '行业配置',
            },
            {
                id: 143,
                iconUrl: 'icon-A0132',
                name: '组合生成',
            },
            {
                id: 146,
                iconUrl: 'icon-A0133',
                name: '组合净值曲线',
            },
            {
                id: 147,
                iconUrl: 'icon-A0134',
                name: '业绩指标',
            },
        ],
        [
            {
                id: 148,
                iconUrl: 'icon-A0135',
                name: '组合诊断',
            },
        ],
    ],
    [
        [
            {
                id: 151,
                iconUrl: 'icon-A0138',
                name: '个股持仓排行',
            },
            {
                id: 152,
                iconUrl: 'icon-A0139',
                name: '行业持仓排行',
            },
        ],
        [
            {
                id: 149,
                iconUrl: 'icon-A0136',
                name: '个股持仓动态',
            },
            {
                id: 150,
                iconUrl: 'icon-A0137',
                name: '行业持仓动态',
            },
        ],
        [
            {
                id: 153,
                iconUrl: 'icon-A0140',
                name: '个股持仓分析',
            },
            {
                id: 154,
                iconUrl: 'icon-A0141',
                name: '行业持仓分析',
            },
        ],
    ],
    [
        [
            {
                id: 155,
                iconUrl: 'icon-A0142',
                name: '实时净值',
            },
        ],
        [
            {
                id: 156,
                iconUrl: 'icon-A0143',
                name: '模型择优',
            },
        ],
        [
            {
                id: 157,
                iconUrl: 'icon-A0144',
                name: '个股持仓预估',
            },
            {
                id: 158,
                iconUrl: 'icon-A0145',
                name: '行业持仓预估',
            },
        ],
    ],
]

const showBannerTitle = ref(false)
const bannerLoad = () => {
    showBannerTitle.value = true
}

const interfaceAction = (id: number) => {
    router.push({
        path: `/interface/info/${id}`,
    })
}
</script>

<style lang="scss" scoped>
.product {
    width: 100%;
    background: $themeBgColor;
    .product-banner-container {
        position: relative;
        .product-banner {
            width: 100%;
        }
        .product-banner-content {
            position: absolute;
            left: 10%;
            top: 30%;
            width: 90%;
            .title {
                width: 100%;
                font-size: fontSize(64px);
                @include defaultFontMedium;
                font-weight: 500;
                color: $themeBgColor;
                line-height: 75px;
            }
            .text {
                text-indent: 2em;
                width: 100%;
                margin-top: 36px;
                max-width: 792px;
                font-size: fontSize(36px);
                @include defaultFont;
                font-weight: 400;
                color: $themeBgColor;
                line-height: 42px;
                text-align: left;
            }
        }
    }
    .product-container {
        width: 100%;
        padding: 60px 0px;
        .product-container-1 {
            width: 100%;
            box-sizing: border-box;
            padding: 0px 10%;
            .product-container-1-1 {
                width: 100%;
                justify-content: space-between;
                margin-top: 40px;
                .product-container-left {
                    max-width: 50%;
                    box-sizing: border-box;
                    padding: 0px 1%;
                    position: relative;
                    .product-container-1-1-img {
                        width: 100%;
                        flex-grow: 0;
                        flex-shrink: 1;
                    }
                    .filter-blur {
                        -webkit-filter: blur(2px);
                        -moz-filter: blur(2px);
                        -ms-filter: blur(2px);
                        filter: blur(2px);
                    }
                    .product-container-gif-container {
                        position: absolute;
                        top: 0px;
                        bottom: 0px;
                        left: 1%;
                        right: 1%;
                        padding: 10% 0px;
                        box-sizing: border-box;
                        .product-container-gif {
                            height: 100%;
                            border-radius: 6px;
                        }
                    }
                }
                .product-container-1-1-right {
                    flex-grow: 1;
                    max-width: 50%;
                    box-sizing: border-box;
                    flex-shrink: 0;
                    padding: 0px 5%;
                    .title {
                        width: 100%;
                        font-size: fontSize(30px);
                        @include defaultFontMedium;
                        color: $titleColor;
                        line-height: 40px;
                        letter-spacing: 2px;
                        text-align: left;
                        margin-bottom: 36px;
                    }
                    .text {
                        width: 100%;
                        font-size: fontSize(18px);
                        @include defaultFont;
                        color: $titleColor;
                        line-height: 21px;
                        text-align: left;
                    }

                    .interface {
                        width: 100%;
                        justify-content: flex-start;
                        margin-top: 18px;
                        flex-wrap: wrap;
                        .interface-item {
                            align-items: center;
                            justify-content: center;
                            margin-top: 18px;
                            cursor: pointer;
                            .interface-icon-img {
                                width: 48px;
                                height: 48px;
                            }
                            .title {
                                font-size: fontSize(18px);
                                @include defaultFontMedium;
                                color: black;
                                line-height: 21px;
                                text-align: center;
                                font-weight: 500;
                                margin: 18px 0px 0px 0px;
                            }
                        }
                        .interface-item:hover {
                            .interface-icon-img {
                                width: 48px;
                                height: 48px;
                                color: $themeColor;
                            }
                            .title {
                                color: $themeColor;
                            }
                        }
                    }
                }
            }
        }
    }
}

@media screen and (max-width: 1920px) {
}

@media screen and (max-width: 1680px) {
}

@media screen and (max-width: 1600px) {
}

@media screen and (max-width: 1440px) {
}

@media screen and (max-width: 1366px) {
}

@media screen and (max-width: 1500px) {
    .product {
        .product-container {
            .product-container-1 {
                // padding: 0px 100px;
                .product-container-1-1 {
                    .product-container-1-1-right {
                        // padding: 0px 35px;
                    }
                }
            }
        }
    }
}
</style>
