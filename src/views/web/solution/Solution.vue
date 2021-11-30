<!--
 * @Author: your name
 * @Date: 2021-11-08 16:10:50
 * @LastEditTime: 2021-11-30 17:24:26
 * @LastEditors: matiastang
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/views/web/solution/Solution.vue
-->
<template>
    <div class="solution">
        <div class="solution-content borderBox flexColumnCenter">
            <img class="solution-icon" :src="getSolutionIconUrl" />
            <div class="solution-top flexColumnCenter">
                <div class="solution-top-title">行业解决方案</div>
                <div class="solution-top-text">
                    基于实际使用场景提供量身定制的接口服务，助力业务增长，创造更多商业价值
                </div>
            </div>
            <div class="solution-content-bottom flexColumnCenter">
                <el-tabs class="right-tabs" v-model="activeName">
                    <el-tab-pane
                        class="right-tab right-zq flexColumnCenter"
                        label="财富管理创业"
                        name="0"
                    >
                        <!-- <div class="text">银行功能开发中</div> -->
                    </el-tab-pane>
                    <el-tab-pane class="right-tab right-yh" label="基金投顾" name="1">
                        <!-- <div class="text">银行功能开发中</div> -->
                    </el-tab-pane>
                    <el-tab-pane class="right-tab right-jj" label="基金销售机构" name="2">
                        <!-- <div class="text">基金代销机构功能开发中</div> -->
                    </el-tab-pane>
                    <el-tab-pane class="right-tab right-dw" label="财经自媒体" name="3">
                        <!-- <div class="text">大V功能开发中</div> -->
                    </el-tab-pane>
                    <el-tab-pane class="right-tab right-jj" label="FOF投资" name="4">
                        <!-- <div class="text">基金代销机构功能开发中</div> -->
                    </el-tab-pane>
                    <el-tab-pane class="right-tab right-dw" label="量化投资" name="5">
                        <!-- <div class="text">大V功能开发中</div> -->
                    </el-tab-pane>
                </el-tabs>
                <div class="tab-zq-scene-content">
                    <OpenalphaTitle title="使用场景" />
                    <div class="scene-bottom flexRowCenter">
                        <SceneCell
                            v-for="(item, index) in sceneData"
                            :key="item.title"
                            :title="item.title"
                            :text="item.text"
                            :url="getSceneUrl(index)"
                            class="scene-cell"
                            :style="{
                                'margin-left': `${index % 4 === 0 ? 0 : 16}px`,
                            }"
                        />
                        <!-- background-image': `url(${getSceneUrl(index)})`, -->
                    </div>
                </div>
                <div class="tab-zq-interface-content">
                    <OpenalphaTitle title="常用接口" />
                    <div class="interface-bottom flexRowCenter">
                        <InterfaceCell
                            v-for="item in interfaceData.list"
                            :key="item.apiId"
                            :title="item.apiName"
                            :text="item.apiDescribe"
                            :url="item.apiIconUrl"
                            class="interface-cell"
                            @click="interfaceAction(item.apiId)"
                        />
                    </div>
                </div>
                <div class="more-interface cursorP flexRowCenter" @click="moreAction">
                    <div class="more-title">更多接口</div>
                    <img class="more-icon" src="static/api/category_off.svg" />
                </div>
            </div>
        </div>
        <div class="solution-bottom">
            <div class="bottom-content borderBox flexColumnCenter">
                <OpenalphaTitle title="合作伙伴" />
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
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref, watchSyncEffect } from 'vue'
import { useRouter } from 'vue-router'
import OpenalphaTitle from '@/components/openalphaTitle/OpenalphaTitle.vue'
import SceneCell from './components/sceneCell/SceneCell.vue'
import InterfaceCell from './components/interfaceCell/InterfaceCell.vue'
import { homePartner, solutionInterfaceList } from '@/common/request'
import { SolutionInterfaceType } from '@/common/request/modules/api/apiInterface'
import { interface_id_check } from 'utils/check/interfaceCheck'
import { ElMessage } from 'element-plus'

export default defineComponent({
    name: 'Solution',
    setup() {
        const activeName = ref('0')
        // 场景
        const sceneList = [
            [
                {
                    title: '平台搭建',
                    text: '消除净值化时代财富管理创业领域的研究门槛和数据高墙，快速有效搭建平台',
                },
                {
                    title: '产品信息',
                    text: '极致专业的全市场基金产品数据，广度、深度行业领先，简单调用，无门槛',
                },
                {
                    title: '深度数据',
                    text: '围绕基金的近千个指标，包含历史时间序列等全量数据库。助力打造有特色的财富管理平台',
                },
                {
                    title: '增值服务',
                    text: '提供各类基金衍生数据和研究赋能的数据接口，满足客户不断丰富的财富管理需求',
                },
            ],
            [
                {
                    title: '基金研究',
                    text: '提供专业且客观的基金分类体系，各类基金风格与能力评估数据和标签，助力深度基金研究',
                },
                {
                    title: '资产配置',
                    text: '丰富的资产配置模型可供参考，配置数据落地可供接口简单调用，极大简化配置研究成本',
                },
                {
                    title: '组合诊断',
                    text: '针对投资组合进行数据穿透，全方面提供围绕投资组合的评估数据接口，涵盖场景测试和持仓分析',
                },
                {
                    title: '智能选基',
                    text: '贴近中国投资实践的智能投顾服务，多维度构建策略，轻松选出好基金',
                },
            ],
            [
                {
                    title: '指标选基',
                    text: '为基金筛选提供更多的数据维度，让客户精准定位目标基金，助力基金销售场景',
                },
                {
                    title: '持仓优化',
                    text: '针对基金销售机构的客户持仓，协助从资产配置、基金选择等角度给出分析结果和优化建议',
                },
                {
                    title: '定投温度',
                    text: '宽基/行业指数估值分位表，感受定投温度',
                },
                {
                    title: '基金推荐',
                    text: '结合销售机构的白名单设定和基金分类标签，赋能更全面的基金评分体系搭建和推荐逻辑',
                },
            ],
            [
                {
                    title: '基金画像',
                    text: '为内容创作提供丰富的基金数据面板和各类分析功能，启发独特的创作视角',
                },
                {
                    title: '持仓信息',
                    text: '提供覆盖基金成立以来全面的持仓信息和行业分类数据，挖掘基金经理的超额来源',
                },
                {
                    title: '多维排行',
                    text: '打造围绕基金数百种指标的历史排名变动数据，为创作提供万花筒式的洞察',
                },
                {
                    title: '内容发现',
                    text: '提供全面快速的基金披露信息数据，捕捉各类细节变化，让即时内容创作更高效',
                },
            ],
            [
                {
                    title: '经理画像',
                    text: '提供覆盖全市场的基金经理数据接口，为刻画基金经理风格和业绩创造更多可能',
                },
                {
                    title: '风格分析',
                    text: '提供基于RBSA模型的基金风格动态数据，便捷的接口调用可节约大量计算资源',
                },
                {
                    title: '风险控制',
                    text: '风险全面评估，实时监测异常',
                },
                {
                    title: '组合优化',
                    text: '贴近机构投资实践的算法模型，完美自洽资产配置、基金筛选和风险偏好设定等约束',
                },
            ],
            [
                {
                    title: '另类数据',
                    text: '依托西筹公募基金持仓预估算法，提供全市场基金持仓变动估算数据，助力alpha挖掘',
                },
                {
                    title: '基金情绪',
                    text: '提供基金仓位、风格、行业等多维度的动态模型数据，精准刻画机构情绪信息',
                },
                {
                    title: '因子挖掘',
                    text: '海量数据供选择，打造独一无二的因子库，协助开发者快速构建基金组合策略',
                },
                {
                    title: '股基联动',
                    text: '提供基金披露和持仓估算视角下的股票调仓动态信息，为超额的挖掘提供新的视角',
                },
            ],
        ]
        const sceneData = computed(() => {
            return sceneList[Number(activeName.value)]
        })
        /**
         * icon
         */
        const getSolutionIconUrl = computed(() => {
            return new URL(`/static/solution/icon_${activeName.value}.svg`, import.meta.url).href
        })
        /**
         * scene icon
         */
        const getSceneUrl = (index: number) => {
            const actionIndex = Number(activeName.value)
            return new URL(
                `/static/solution/scene_${
                    actionIndex > 2 ? actionIndex - 3 : actionIndex
                }_${index}.png`,
                import.meta.url
            ).href
        }
        const interfaceData = reactive({
            list: [] as SolutionInterfaceType[],
        })
        watchSyncEffect(async () => {
            const res = await solutionInterfaceList(Number(activeName.value) + 10)
            interfaceData.list = res.rows
        })
        const router = useRouter()
        const moreAction = () => {
            router.push({
                path: '/interface',
            })
        }
        const interfaceAction = (id: number) => {
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
        // 合作伙伴
        const partnerList = reactive({
            partners: Array<string>(),
        })
        watchSyncEffect(async () => {
            let res = await homePartner()
            partnerList.partners = res.map((item) => item.content)
        })
        return {
            partnerList,
            activeName,
            sceneData,
            interfaceData,
            getSolutionIconUrl,
            moreAction,
            getSceneUrl,
            interfaceAction,
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
        position: relative;
        width: 100%;
        padding: 96px calc(50% - 712px) 0px calc(50% - 712px);
        background: #fbfbfb;
        .solution-icon {
            position: absolute;
            top: 0px;
            right: 0px;
            width: 598px;
            height: 598px;
        }
        .solution-top {
            width: 100%;
            align-items: flex-start;
            padding-bottom: 100px;
            z-index: 1;
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
            z-index: 1;
            .right-tabs {
                width: 100%;
                .right-tab {
                    width: 100%;
                    .text {
                        width: 100%;
                        text-align: center;
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
                :deep(.el-tabs__nav-wrap::after) {
                    width: 800px;
                }
            }
            .tab-zq-scene-content {
                width: 100%;
                margin-top: 30px;
                .scene-bottom {
                    width: 100%;
                    margin: 24px 0px 40px 0px;
                    align-items: stretch;
                    .scene-cell {
                        object-fit: cover;
                    }
                }
            }
            .tab-zq-interface-content {
                width: 100%;
                .interface-bottom {
                    width: 100%;
                    flex-wrap: wrap;
                    justify-content: flex-start;
                    margin-top: 24px;
                    .interface-cell {
                        width: 25%;
                        flex-grow: 0;
                        flex-shrink: 0;
                    }
                }
            }
            .more-interface {
                align-self: center;
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
                    margin-left: 6px;
                    height: 16px;
                    width: 16px;
                    // background: $themeBgColor;
                }
            }
        }
    }
    .solution-bottom {
        width: 100%;
        .bottom-content {
            width: 100%;
            background-image: url('static/home/partners-bg.png');
            object-fit: cover;
            padding: 32px calc(50% - 712px) 48px calc(50% - 712px);
            .partners-content {
                width: 100%;
                flex-wrap: wrap;
                justify-content: flex-start;
                margin-top: 24px;
                .partners-cell {
                    width: calc(20% - 16px);
                    min-width: 224px;
                    height: 80px;
                    background: #ffffff;
                    box-shadow: 0px 4px 10px 0px rgba(218, 218, 218, 0.5);
                    margin: 8px;
                    object-fit: cover;
                }
            }
        }
    }
}
@media screen and (max-width: 1500px) {
    .solution {
        .solution-content {
            padding: 96px 30px 0px 30px;
        }
        .solution-bottom {
            .bottom-content {
                padding: 32px 30px 48px 30px;
            }
        }
    }
}
</style>
