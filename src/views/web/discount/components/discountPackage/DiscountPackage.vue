<!--
 * @Author: your name
 * @Date: 2021-11-08 15:13:24
 * @LastEditTime: 2021-11-19 15:07:44
 * @LastEditors: matiastang
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/views/web/discount/components/discountPackage/DiscountPackage.vue
-->
<template>
    <div
        :class="[
            'discount-package',
            'flexColumnCenter',
            {
                cursorP: !select,
                'discount-package-select': select,
            },
        ]"
        @click="selectAction"
    >
        <div v-if="recommend" class="discount-recommend defaultFont">推荐</div>
        <div class="discount-title-content flexRowCenter">
            <div class="discount-title-left defaultFont">{{ discount }}</div>
            <div class="discount-title-right defaultFont">{{ text }}</div>
        </div>
        <div v-if="discount !== original" class="discount-original defaultFont">
            {{ `原价${original}元` }}
        </div>
        <div class="discount-text-content flexRowCenter">
            <div class="discount-text-left defaultFont">接口单价低至</div>
            <div class="discount-text-right defaultFont">{{ `${value}元` }}</div>
        </div>
        <img
            v-if="select"
            class="discount-package-selected"
            src="static/recharge/recharge-select.svg"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'DiscountPackage',
    emits: ['selectAction'],
    props: ['discount', 'original', 'text', 'value', 'select', 'recommend'],
    data() {
        return {}
    },
    setup() {
        return {}
    },
    methods: {
        selectAction() {
            if (this.select) {
                console.warn('已经处于选中状态')
                return
            }
            this.$emit('selectAction')
        },
    },
})
</script>

<style lang="scss" scoped>
.discount-package {
    width: 180px;
    height: 90px;
    border-radius: 4px;
    border: 1px solid $borderColor;
    margin: 0px 8px;
    position: relative;
    .discount-recommend {
        position: absolute;
        top: -1px;
        left: -1px;
        width: 30px;
        height: 18px;
        background: #e62412;
        border-radius: 4px 0px 4px 0px;
        font-size: 12px;
        color: $themeBgColor;
        line-height: 18px;
    }
    .discount-title-content {
        .discount-title-left {
            font-size: 22px;
            color: $titleColor;
            line-height: 30px;
            letter-spacing: 2px;
        }
        .discount-title-right {
            font-size: 14px;
            color: $titleColor;
            line-height: 20px;
        }
    }
    .discount-original {
        font-size: 12px;
        color: #595959;
        line-height: 18px;
        text-decoration: line-through;
    }
    .discount-text-content {
        .discount-text-left {
            font-size: 12px;
            color: #595959;
            line-height: 18px;
        }
        .discount-text-right {
            font-size: 12px;
            color: #e62412;
            line-height: 18px;
        }
    }
    .discount-package-selected {
        position: absolute;
        width: 20px;
        height: 18px;
        right: 0px;
        bottom: 0px;
    }
}
.discount-package:hover {
    border: 1px solid $themeColor;
}
.discount-package-select {
    background: linear-gradient(90deg, #ffd9c4 0%, #f08660 100%);
    border: 1px solid $themeColor;
}
</style>
