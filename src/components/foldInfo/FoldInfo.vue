<!--
 * @Author: your name
 * @Date: 2021-11-10 13:38:22
 * @LastEditTime: 2021-11-23 16:15:29
 * @LastEditors: matiastang
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /datumwealth-openalpha-front/src/components/foldInfo/FoldInfo.vue
-->
<template>
    <div class="fold-info borderBox flexColumnCenter">
        <div class="fold-info-header borderBox cursorP flexRowCenter" @click="foldAction">
            <div class="header-title defaultFont">{{ title }}</div>
            <img
                class="header-img"
                :src="!hidden ? 'static/user/login_on.svg' : 'static/user/login_off.svg'"
            />
        </div>
        <div v-show="!hidden" class="fold-content">
            <slot></slot>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'FoldInfo',
    props: {
        title: {
            type: String,
            default: '标题',
        },
        show: {
            type: Boolean,
            default: true,
        },
    },
    emits: ['trialAction'],
    setup(props) {
        let hidden = ref(!props.show)
        const foldAction = () => {
            hidden.value = !hidden.value
        }
        return {
            hidden,
            foldAction,
        }
    },
})
</script>

<style lang="scss" scoped>
.fold-info {
    width: 100%;
    border: 1px solid #dfdfdf;
    .fold-info-header {
        width: 100%;
        height: 60px;
        background: #e9e9e9;
        padding: 0px 36px;
        justify-content: flex-start;
        .header-title {
            font-size: 16px;
            color: $titleColor;
            line-height: 24px;
            margin-right: 8px;
        }
        .header-img {
            width: 14px;
            height: 8px;
        }
    }
    .fold-content {
        width: 100%;
    }
}
</style>
