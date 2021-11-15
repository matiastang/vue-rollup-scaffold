<!--
 * @Author: matiastang
 * @Date: 2021-11-15 10:57:51
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-15 11:16:07
 * @FilePath: /datumwealth-openalpha-front/src/components/tokenView/TokenView.vue
 * @Description: token显示view
-->
<template>
    <div class="token-view flexRowCenter">
        <!-- <div class="token-view-text">{{ token }}</div> -->
        <el-input
            class="token-view-text"
            :show-password="tokenHide"
            type="text"
            :modelValue="token"
            readonly
        />
        <div class="token-view-right flexRowCenter">
            <div class="token-button flexRowCenter cursorP" @click="tokenClick">
                <img v-if="tokenHide" class="token-icon" src="static/login/password-off.svg" />
                <img v-else class="token-icon" src="static/login/password-on.svg" />
            </div>
            <div class="token-description"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'TokenView',
    props: {
        token: {
            type: String,
        },
        hide: {
            type: Boolean,
            default: true,
        },
    },
    setup(props) {
        let tokenHide = ref(props.hide)
        /**
         * 是否显示
         */
        const tokenClick = () => {
            tokenHide.value = !tokenHide.value
        }
        return {
            tokenHide,
            tokenClick,
        }
    },
})
</script>

<style lang="scss" scoped>
.token-view {
    width: 100%;
    box-sizing: border-box;
    padding: 9px 8px 9px 0px;
    height: 42px;
    border-radius: 2px;
    border: 1px solid #bfbfbf;
    justify-content: space-between;
    ::v-deep(.el-input__inner) {
        border: none;
    }
    .token-view-right {
        height: 100%;
        .token-button {
            width: 30px;
            height: 100%;
            .token-icon {
                width: 16px;
                height: 16px;
            }
        }
        .token-description {
            width: 14px;
            height: 14px;
            border: 1px solid #8c8c8c;
        }
    }
}
</style>
