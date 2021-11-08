<!--
 * @Author: your name
 * @Date: 2021-11-08 16:37:02
 * @LastEditTime: 2021-11-08 17:44:37
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/components/weixinModel/WeixinModel.vue
-->
<template>
    <div class="weixin-model">
        <el-dialog :="$attrs" center>
            <div class="model-title defaultFont">西筹数据开放平台优惠套餐</div>
            <div class="model-pay-title">微信支付</div>
            <div class="model-Price-content flexRowCenter">
                <div class="model-Price-title defaultFont">实付金额:</div>
                <div class="model-Price-price">{{ `${price.toFixed(2)}元` }}</div>
            </div>
            <div class="model-Price-content flexRowCenter">
                <div class="model-Price-title defaultFont">单据编号:</div>
                <div class="model-Price-order">{{ order }}</div>
            </div>
            <img class="model-code" />
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'WeixinModel',
    inheritAttrs: false,
    props: {
        price: {
            type: Number,
            default: 6000,
        },
        order: {
            type: String,
            default: 'W20211027134801613670',
        },
    },
    setup() {
        return {}
    },
    components: {},
})
</script>

<style lang="scss" scoped>
.weixin-model {
    ::v-deep(.el-dialog) {
        width: 50%;
        max-width: 742px;
        background: $themeBgColor;
        box-shadow: 0px 2px 32px 0px rgba(104, 104, 104, 0.5);
        border-radius: 8px;
    }
    ::v-deep(.el-dialog__header) {
        padding: 25px 25px 0px 25px;
        width: 100%;
        height: 41px;
        box-sizing: border-box;
        button {
            width: 16px;
            height: 16px;
            top: 25px;
            right: 25px;
        }
    }
    ::v-deep(.el-dialog__body) {
        padding: 0px 25px 66px 25px;
        .model-title {
            height: 41px;
            width: 100%;
            font-size: 18px;
            color: $titleColor;
            line-height: 40px;
            text-align: left;
            border-bottom: 1px solid #dfdfdf;
        }
        .model-pay-title {
            width: 100%;
            font-size: 18px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: $titleColor;
            line-height: 26px;
            text-align: center;
            letter-spacing: 1px;
            margin: 14px 0px;
        }
        .model-Price-content {
            margin-bottom: 18px;
            justify-content: flex-start;
            .model-Price-title {
                font-size: 14px;
                color: #595959;
                line-height: 20px;
                margin-right: 12px;
            }
            .model-Price-price {
                font-size: 16px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: $themeColor;
                line-height: 24px;
                letter-spacing: 1px;
            }
            .model-Price-order {
                font-size: 16px;
                color: $titleColor;
                line-height: 24px;
            }
        }
        .model-code {
            margin-top: 17px;
            width: 100%;
            max-width: 694px;
            height: 371px;
            background: $themeColor;
            border: none;
        }
    }
    ::v-deep(.el-dialog__footer) {
        display: none;
    }
}
@media screen and (max-width: 1300px) {
    .weixin-model {
        ::v-deep(.el-dialog) {
            width: 60%;
        }
    }
}
@media screen and (max-width: 1100px) {
    .weixin-model {
        ::v-deep(.el-dialog) {
            width: 70%;
        }
    }
}
@media screen and (max-width: 900px) {
    .weixin-model {
        ::v-deep(.el-dialog) {
            width: 80%;
        }
    }
}
@media screen and (max-width: 800px) {
    .weixin-model {
        ::v-deep(.el-dialog) {
            width: 90%;
        }
    }
}
</style>
