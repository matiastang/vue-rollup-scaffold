<!--
 * @Author: your name
 * @Date: 2021-11-08 16:10:50
 * @LastEditTime: 2021-11-11 13:48:25
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/views/solution/Solution.vue
-->
<template>
    <div class="solution">
        <div class="solution-content borderBox flexColumnCenter">
            <div class="solution-top flexColumnCenter">
                <div class="solution-top-title">行业解决方案</div>
                <div class="solution-top-text">
                    基于实际使用场景提供量身定制的接口服务，助力业务增长，创造更多商业价值
                </div>
            </div>
            <div class="solution-content-bottom">
                <el-tabs class="right-tabs" v-model="activeName" @tab-click="tabClick">
                    <el-tab-pane class="right-tab right-zq flexColumnCenter" label="证券" name="zq">
                        <div class="tab-zq-scene-content">
                            <OpenalphaTitle title="使用场景" />
                            <div class="scene-bottom flexRowCenter">
                                <SceneCell
                                    v-for="(item, index) in sceneData"
                                    :key="item.title"
                                    :title="item.title"
                                    :text="item.text"
                                    class="scene-cell"
                                    :style="{ 'margin-left': `${index % 4 === 0 ? 0 : 16}px` }"
                                />
                            </div>
                        </div>
                        <div class="tab-zq-interface-content">
                            <OpenalphaTitle title="常用接口" />
                            <div class="interface-bottom flexRowCenter">
                                <InterfaceCell
                                    v-for="item in interfaceData"
                                    :key="item.title"
                                    :title="item.title"
                                    :text="item.text"
                                    class="interface-cell"
                                />
                            </div>
                        </div>
                        <div class="more-interface cursorP flexRowCenter" @click="moreAction">
                            <div class="more-title">更多接口</div>
                            <div class="more-icon"></div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane class="right-tab right-yh" label="银行" name="yh">
                        <div class="text">银行功能开发中</div>
                    </el-tab-pane>
                    <el-tab-pane class="right-tab right-jj" label="基金代销机构" name="jj">
                        <div class="text">基金代销机构功能开发中</div>
                    </el-tab-pane>
                    <el-tab-pane class="right-tab right-dw" label="大V" name="dw">
                        <div class="text">大V功能开发中</div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <div class="solution-bottom">
            <div class="bottom-content borderBox flexColumnCenter">
                <OpenalphaTitle title="合作伙伴" />
                <div class="partners-content flexRowCenter">
                    <div v-for="item in partnersData" :key="item" class="partners-cell">
                        {{ item.title }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import OpenalphaTitle from '@/components/openalphaTitle/OpenalphaTitle.vue'
import SceneCell from './components/sceneCell/SceneCell.vue'
import InterfaceCell from './components/interfaceCell/InterfaceCell.vue'

export default defineComponent({
    name: 'Solution',
    setup() {
        let partnersData = reactive([
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
        ])
        let activeName = ref('zq')
        let sceneData = reactive([
            {
                title: '股票行情',
                text: '票行情数据包括股票名、股票号、总市值、流通市值等',
            },
            {
                title: '股票行情',
                text: '票行情数据包括股票名、股票号、总市值、流通市值等',
            },
            {
                title: '股票行情',
                text: '票行情数据包括股票名、股票号、总市值、流通市值等',
            },
            {
                title: '股票行情',
                text: '票行情数据包括股票名、股票号、总市值、流通市值等',
            },
        ])
        let interfaceData = reactive([
            {
                title: '股票行情',
                text: '票行情数据包括股票名、股票号、总市值、流通市值等',
            },
            {
                title: '股票行情',
                text: '票行情数据包括股票名、股票号、总市值、流通市值等',
            },
            {
                title: '股票行情',
                text: '票行情数据包括股票名、股票号、总市值、流通市值等',
            },
            {
                title: '股票行情',
                text: '票行情数据包括股票名、股票号、总市值、流通市值等',
            },
            {
                title: '股票行情',
                text: '票行情数据包括股票名、股票号、总市值、流通市值等',
            },
            {
                title: '股票行情',
                text: '票行情数据包括股票名、股票号、总市值、流通市值等',
            },
            {
                title: '股票行情',
                text: '票行情数据包括股票名、股票号、总市值、流通市值等',
            },
            {
                title: '股票行情',
                text: '票行情数据包括股票名、股票号、总市值、流通市值等',
            },
            {
                title: '股票行情',
                text: '票行情数据包括股票名、股票号、总市值、流通市值等',
            },
            {
                title: '股票行情',
                text: '票行情数据包括股票名、股票号、总市值、流通市值等',
            },
            {
                title: '股票行情',
                text: '票行情数据包括股票名、股票号、总市值、流通市值等',
            },
            {
                title: '股票行情',
                text: '票行情数据包括股票名、股票号、总市值、流通市值等',
            },
            {
                title: '股票行情',
                text: '票行情数据包括股票名、股票号、总市值、流通市值等',
            },
            {
                title: '股票行情',
                text: '票行情数据包括股票名、股票号、总市值、流通市值等',
            },
            {
                title: '股票行情',
                text: '票行情数据包括股票名、股票号、总市值、流通市值等',
            },
            {
                title: '股票行情',
                text: '票行情数据包括股票名、股票号、总市值、流通市值等',
            },
            {
                title: '股票行情',
                text: '票行情数据包括股票名、股票号、总市值、流通市值等',
            },
            {
                title: '股票行情',
                text: '票行情数据包括股票名、股票号、总市值、流通市值等',
            },
            {
                title: '股票行情',
                text: '票行情数据包括股票名、股票号、总市值、流通市值等',
            },
            {
                title: '股票行情',
                text: '票行情数据包括股票名、股票号、总市值、流通市值等',
            },
            {
                title: '股票行情',
                text: '票行情数据包括股票名、股票号、总市值、流通市值等',
            },
        ])
        const router = useRouter()
        const moreAction = () => {
            router.push({
                path: '/interface',
            })
        }
        return {
            partnersData,
            activeName,
            sceneData,
            interfaceData,
            moreAction,
        }
    },
    components: {
        OpenalphaTitle,
        SceneCell,
        InterfaceCell,
    },
})
</script>

<style lang="scss" scoped>
.solution {
    width: 100%;
    .solution-content {
        width: 100%;
        padding: 96px 10% 0px 10%;
        background: #fbfbfb;
        .solution-top {
            width: 100%;
            align-items: flex-start;
            padding-bottom: 100px;
            .solution-top-title {
                font-size: 48px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: $titleColor;
                line-height: 56px;
                letter-spacing: 4px;
            }
            .solution-top-text {
                font-size: 22px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: $titleColor;
                line-height: 30px;
                letter-spacing: 2px;
                margin-top: 32px;
            }
        }
        .solution-content-bottom {
            width: 100%;
            .right-tabs {
                width: 100%;
                .right-tab {
                    width: 100%;
                    .text {
                        width: 100%;
                        text-align: center;
                    }
                    .tab-zq-scene-content {
                        width: 100%;
                        .scene-bottom {
                            width: 100%;
                            margin: 24px 0px 40px 0px;
                        }
                    }
                    .tab-zq-interface-content {
                        width: 100%;
                        .interface-bottom {
                            width: 100%;
                            flex-wrap: wrap;
                            justify-content: flex-start;
                            .interface-cell {
                                width: 25%;
                            }
                        }
                    }
                    .more-interface {
                        width: 200px;
                        height: 50px;
                        background: $themeColor;
                        box-shadow: 0px 4px 12px 0px #f0ae94;
                        border-radius: 34px;
                        margin-top: 28px;
                        margin-bottom: 40px;
                        .more-title {
                            font-size: 18px;
                            font-family: PingFangSC-Medium, PingFang SC;
                            font-weight: 500;
                            color: $themeBgColor;
                            line-height: 26px;
                            letter-spacing: 1px;
                        }
                        .more-icon {
                            margin-left: 12px;
                            height: 12px;
                            width: 6px;
                            background: $themeBgColor;
                        }
                    }
                }
                ::v-deep(.el-tabs__item) {
                    height: 36px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    letter-spacing: 1px;
                    font-size: 18px;
                    color: $titleColor;
                    line-height: 26px;
                }
                ::v-deep(.is-active) {
                    font-weight: 500 !important;
                    color: $themeColor !important;
                }
                ::v-deep(.el-tabs__active-bar) {
                    background: $themeColor;
                }
            }
        }
    }
    .solution-bottom {
        width: 100%;
        .bottom-content {
            width: 100%;
            padding: 32px 10% 48px 10%;
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
}
@media screen and (max-width: 1360px) {
    .solution {
        .solution-content {
            padding: 96px 5% 0px 5%;
        }
        .solution-bottom {
            .bottom-content {
                padding: 32px 5% 48px 5%;
            }
        }
    }
}
</style>
