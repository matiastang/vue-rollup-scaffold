<!--
 * @Author: matiastang
 * @Date: 2021-11-18 10:15:42
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-03 16:43:48
 * @FilePath: /datumwealth-openalpha-front/src/views/user/helpCenter/test/Test.vue
 * @Description: 帮助中心-测试流程
-->
<template>
    <div class="test flexColumnCenter">
        <div class="test-title defaultFont">测试流程</div>
        <div class="test-item flexColumnCenter">
            <div class="test-item-title defaultFont">1、选择接口</div>
            <div class="test-item-text defaultFont">
                进入“数据接口”,根据客户业务所需，选择不同接口,点击“试用接口”按钮,开始测试接口
            </div>
            <img class="test-item-img" src="static/help/test-1.png" />
        </div>
        <div class="test-item flexColumnCenter">
            <div class="test-item-title defaultFont">2、接口测试</div>
            <div class="test-item-text defaultFont">
                选择完接口后，点击“调用接口”按钮，填写必要的API参数，点击“调用接口”完成数据测试。
            </div>
            <img class="test-item-img" src="static/help/test-2.png" />
            <div class="test-item-text defaultFont">
                在浏览接口文档的过程中，您可随时通过点击接口文档中的“试用接口”按钮直接进入数据测试页面。
            </div>
            <img class="test-item-img" src="static/help/test-3.png" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Test',
    setup() {
        return {}
    },
})
</script>

<style lang="scss" scoped>
.test {
    width: 100%;
    height: 100%;
    padding: 20px 16px;
    box-sizing: border-box;
    background: $themeBgColor;
    justify-content: flex-start;
    .test-title {
        width: 100%;
        height: 42px;
        font-size: fontSize(18px);
        color: $titleColor;
        line-height: 26px;
        text-align: left;
        border-bottom: 1px solid #dfdfdf;
    }
    .test-item {
        width: 100%;
        justify-content: flex-start;
        align-items: flex-start;
        .test-item-title {
            font-size: fontSize(14px);
            color: $titleColor;
            line-height: 20px;
            margin-top: 19px;
            .test-item-home {
                color: rgba(78, 154, 235, 1);
                font-size: fontSize(14px);
                line-height: 20px;
            }
        }
        .test-item-text {
            margin: 12px 0px 12px 24px;
            font-size: fontSize(14px);
            color: #595959;
            line-height: 20px;
            text-align: left;
        }
        .test-item-img {
            width: calc(100% - 24px);
            // height: 362px;
            // background: $themeColor;
            margin-bottom: 12px;
            margin-left: 24px;
        }
    }
}
</style>
