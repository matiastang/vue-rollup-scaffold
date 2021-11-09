<!--
 * @Author: your name
 * @Date: 2021-11-04 20:01:27
 * @LastEditTime: 2021-11-09 16:16:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /datumwealth-openalpha-front/src/views/home/components/collapse/Collapse.vue
-->
<template>
    <div class="flexColumnCenter collapse">
        <el-popover
            popper-class="collapse-popover"
            v-for="item in data"
            :key="item.title"
            :show-arrow="false"
            :popper-options="{
                boundariesElement: '.collapse-popover-bound',
                gpuAcceleration: true,
            }"
            trigger="hover"
            placement="right-end"
        >
            <div class="content borderBox">
                <div class="content-item borderBox flexColumnCenter">
                    <div class="content-title defaultFont">基金资产配置</div>
                    <div class="content-bottom borderBox flexRowCenter">
                        <div class="content-bottom-item flexColumnCenter">
                            <div class="content-cell defaultFont">大类资产配置</div>
                        </div>
                        <div class="content-bottom-item flexColumnCenter">
                            <div class="content-cell defaultFont">策略展望</div>
                        </div>
                        <div class="content-bottom-item flexColumnCenter"></div>
                        <div class="content-bottom-item flexColumnCenter"></div>
                    </div>
                </div>
                <div class="content-item borderBox flexColumnCenter">
                    <div class="content-title defaultFont">基金股票投资</div>
                    <div class="content-bottom flexRowCenter">
                        <div class="content-bottom-item borderBox flexColumnCenter">
                            <div class="content-cell defaultFont">股票行业配置(证监分类）</div>
                            <div class="content-cell defaultFont">股票行业配置(指数投资部分）</div>
                            <div class="content-cell defaultFont">股票行业配置(沪港通）</div>
                            <div class="content-cell defaultFont">股票行业配置(申万一级）</div>
                            <div class="content-cell defaultFont">股票行业配置(积极投资部分）</div>
                        </div>
                        <div class="content-bottom-item flexColumnCenter">
                            <div class="content-cell defaultFont">股票行业预估配置(申万一级）</div>
                            <div class="content-cell defaultFont">股票行业板块配置(西筹）</div>
                            <div class="content-cell defaultFont">股票行业板块预估配置(西筹）</div>

                            <div class="content-cell defaultFont">流通受限证券(新发/增发）</div>
                            <div class="content-cell defaultFont">流通受限证券(暂时停牌）</div>
                        </div>
                        <div class="content-bottom-item flexColumnCenter">
                            <div class="content-cell defaultFont">股票交易总额</div>
                            <div class="content-cell defaultFont">股票投资特征</div>
                            <div class="content-cell defaultFont">股票投资买入重大变动</div>
                            <div class="content-cell defaultFont">股票投资卖出重大变动</div>
                            <div class="content-cell defaultFont">基于收益的基金风格分析RBSA</div>
                        </div>
                        <div class="content-bottom-item flexColumnCenter">
                            <div class="content-cell defaultFont">股票持仓明细</div>
                            <div class="content-cell defaultFont">股票持仓明细(积极投资部分）</div>
                            <div class="content-cell defaultFont">股票持仓明细(指数投资部分）</div>
                        </div>
                    </div>
                </div>
                <div class="content-item borderBox flexColumnCenter">
                    <div class="content-title defaultFont">基金债券投资</div>
                    <div class="content-bottom borderBox flexRowCenter">
                        <div class="content-bottom-item flexColumnCenter">
                            <div class="content-cell defaultFont">债券类别配置</div>
                            <div class="content-cell defaultFont">债券投资特征</div>
                        </div>
                        <div class="content-bottom-item flexColumnCenter">
                            <div class="content-cell defaultFont">债券持仓明细</div>
                        </div>
                        <div class="content-bottom-item flexColumnCenter">
                            <div class="content-cell defaultFont">ABS持仓明细</div>
                        </div>
                        <div class="content-bottom-item flexColumnCenter">
                            <div class="content-cell defaultFont">可转债持仓明细</div>
                        </div>
                    </div>
                </div>
                <div class="content-item borderBox flexColumnCenter">
                    <div class="content-title defaultFont">基金基金投资</div>
                    <div class="content-bottom borderBox flexRowCenter">
                        <div class="content-bottom-item flexColumnCenter">
                            <div class="content-cell defaultFont">FOF持仓基金明细</div>
                        </div>
                        <div class="content-bottom-item flexColumnCenter">
                            <div class="content-cell defaultFont">基金管理人持有份额变动</div>
                        </div>
                        <div class="content-bottom-item flexColumnCenter">
                            <div class="content-cell defaultFont">基金管理人投资本基金明细</div>
                        </div>
                        <div class="content-bottom-item flexColumnCenter">
                            <div class="content-cell defaultFont">FOF基金投资特征</div>
                        </div>
                    </div>
                </div>
                <div class="content-item borderBox flexColumnCenter">
                    <div class="content-title defaultFont">基金投资持仓穿透</div>
                    <div class="content-bottom borderBox flexRowCenter">
                        <div class="content-bottom-item flexColumnCenter">
                            <div class="content-cell defaultFont">FOF股票持仓明细</div>
                        </div>
                        <div class="content-bottom-item flexColumnCenter">
                            <div class="content-cell defaultFont">FOF股票行业配置(申万一级）</div>
                        </div>
                        <div class="content-bottom-item flexColumnCenter">
                            <div class="content-cell defaultFont">FOF股票行业板块配置(西筹）</div>
                        </div>
                        <div class="content-bottom-item flexColumnCenter">
                            <div class="content-cell defaultFont">FOF债券持仓明细</div>
                        </div>
                    </div>
                </div>
                <div class="content-item borderBox flexColumnCenter">
                    <div class="content-title defaultFont">基金投资持仓穿透</div>
                    <div class="content-bottom borderBox flexRowCenter">
                        <div class="content-bottom-item flexColumnCenter">
                            <div class="content-cell defaultFont">FOF股票持仓明细</div>
                        </div>
                        <div class="content-bottom-item flexColumnCenter">
                            <div class="content-cell defaultFont">FOF股票行业配置(申万一级）</div>
                        </div>
                        <div class="content-bottom-item flexColumnCenter">
                            <div class="content-cell defaultFont">FOF股票行业板块配置(西筹）</div>
                        </div>
                        <div class="content-bottom-item flexColumnCenter">
                            <div class="content-cell defaultFont">FOF债券持仓明细</div>
                        </div>
                    </div>
                </div>
            </div>
            <template #reference>
                <CollapseCell class="collapse-cell" :title="item.title" :text="item.text" />
            </template>
        </el-popover>
        <div class="defaultFont cursorP collapse-all">查看全部接口</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CollapseCell from '../collapseCell/CollapseCell.vue'

export default defineComponent({
    name: 'dw-collapse',
    props: ['data'],
    data() {
        return {}
    },
    components: {
        CollapseCell,
    },
})
</script>

<style lang="scss">
.collapse {
    height: 100%;
    width: 100%;
    background: $themeColor;
    .collapse-cell {
        width: 100%;
    }
    .collapse-all {
        width: 100%;
        height: 76px;
        font-size: fontSize(18px);
        font-weight: 500;
        color: $themeBgColor;
        line-height: 76px;
    }
}
body {
    .collapse-popover {
        // top: 96px !important;
        // left: calc(34% - 16px) !important;
        width: calc(56% + 16px) !important;
        padding: 0px !important;
        inset: 96px auto auto calc(34% - 16px) !important;
        transform: none !important;
        border: none !important;
        border-radius: 0px !important;
        box-shadow: none !important;
        background: linear-gradient(135deg, #ffffff 0%, #fffaf8 100%);
        box-shadow: 0px 4px 10px 0px rgba(218, 218, 218, 0.5);
        .content {
            padding: 20px 60px;
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
                    width: 100%;
                    .content-bottom-item {
                        width: 25%;
                        align-items: flex-start;
                        .content-cell {
                            width: 100%;
                            font-size: 14px;
                            color: $titleColor;
                            line-height: 20px;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }
}
@media screen and (max-width: 1360px) {
    body {
        .collapse-popover {
            left: calc(36.5% - 16px) !important;
            width: calc(58.5% + 16px) !important;
        }
    }
}
</style>
