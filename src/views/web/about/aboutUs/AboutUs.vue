<!--
 * @Author: matiastang
 * @Date: 2021-11-26 13:40:01
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-08 18:36:34
 * @FilePath: /datumwealth-openalpha-front/src/views/web/about/aboutUs/AboutUs.vue
 * @Description: 关于我们
-->
<template>
    <div class="about-us flexColumnCenter">
        <div class="about-us-title defaultFont">关于我们</div>
        <div class="about-us-content">
            <div class="about-us-content-text">
                成都西筹金融科技有限公司是一家以研究和数据落地能力见长的基金数据供应商，构建了覆盖公募基金、私募基金、养老金等资管产品的深度数据库：涵盖基础数据、衍生数据和定制数据。公司业务覆盖全市场资管产品，目前已服务资金规模过万亿的多家头部金融机构客户。我们的愿景是以投研产品化和数据科技手段为资产管理、财富管理行业提供优质的创新型基础设施服务。
            </div>
            <div class="about-us-content-text">官方热线：010-85794515</div>
            <div class="about-us-content-text">
                官方邮箱：<span class="about-us-text-span agreement-content-url"
                    >service@datumwealth.com</span
                >
            </div>
            <div class="about-us-content-text">
                网址：<span class="about-us-text-span agreement-content-url"
                    >http://www.datumwealth.com</span
                >
            </div>
            <div class="about-us-content-text">
                总部地址：中国（四川）自由贸易试验区成都高新区天府大道北段1677号B座0306号
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'AboutUs',
    setup() {
        return {}
    },
})
</script>

<style lang="scss" scoped>
.about-us {
    width: 100%;
    height: calc(100vh - 146px);
    padding: 20px 16px;
    box-sizing: border-box;
    background: $themeBgColor;
    justify-content: flex-start;
    .about-us-title {
        width: 100%;
        height: 42px;
        font-size: fontSize(18px);
        color: $titleColor;
        line-height: 26px;
        text-align: left;
        border-bottom: 1px solid #dfdfdf;
    }
    .about-us-content {
        width: 100%;
        box-sizing: border-box;
        .about-us-content-header {
            @include defaultFontMedium;
            width: 100%;
            font-size: fontSize(16px);
            line-height: lineHeight(16px);
            color: $titleColor;
            text-align: left;
            margin: 10px 0px;
        }
        .about-us-content-title {
            @include defaultFontMedium;
            width: 100%;
            font-size: fontSize(14px);
            line-height: lineHeight(14px);
            color: $titleColor;
            text-align: left;
            margin: 10px 0px;
        }
        .about-us-content-text {
            @include defaultFont;
            width: 100%;
            font-size: fontSize(14px);
            line-height: lineHeight(14px);
            color: $titleColor;
            text-align: left;
            margin: 10px 0px;
            .about-us-text-span {
                font-size: fontSize(14px);
                line-height: lineHeight(14px);
                color: $titleColor;
                @include defaultFontMedium;
            }
        }
        :deep(.agreement-content-url) {
            color: #4e9aeb !important;
            font-size: fontSize(14px);
            line-height: 20px;
        }
    }
}
</style>
