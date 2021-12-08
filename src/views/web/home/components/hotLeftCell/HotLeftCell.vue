<!--
 * @Author: matiastang
 * @Date: 2021-11-11 17:58:07
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-08 10:56:48
 * @FilePath: /datumwealth-openalpha-front/src/views/web/home/components/hotLeftCell/HotLeftCell.vue
 * @Description: 首页热榜分类cell
-->
<template>
    <div class="hot-left-cell borderBox flexColumnCenter">
        <svg class="icon hot-left-cell-img" aria-hidden="true">
            <use :xlink:href="`#${url}`"></use>
        </svg>
        <div class="hot-left-cell-title">{{ title || '标题' }}</div>
        <div class="hot-left-cell-text">{{ text || '副标题' }}</div>
        <div class="hot-left-cell-button defaultFont cursorP" @click="categoryAction">查看全部</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { category_id_check } from 'utils/check/interfaceCheck'
import ElMessage from '@/common/utils/message'

export default defineComponent({
    name: 'hotLeftCell',
    props: {
        id: {
            type: Number,
            default: -1,
        },
        url: {
            type: String,
            default: '',
        },
        title: {
            type: String,
            default: '',
        },
        text: {
            type: String,
            default: '',
        },
    },
    setup(props) {
        const router = useRouter()
        // 跳转接口分类
        const categoryAction = () => {
            const categoryId = props.id
            if (category_id_check(categoryId)) {
                router.push({
                    path: `/interface/${categoryId}`,
                })
                return
            }
            ElMessage({
                message: '分类id错误',
                type: 'error',
            })
        }
        return {
            categoryAction,
        }
    },
})
</script>

<style lang="scss" scoped>
.hot-left-cell {
    width: 100%;
    margin: 8px;
    padding-top: 60px;
    padding-bottom: 36px;
    border-radius: 4px;
    .hot-left-cell-img {
        max-width: 120px;
        width: 100%;
        height: 120px;
        color: $themeBgColor;
    }
    .hot-left-cell-title {
        width: 100%;
        box-sizing: border-box;
        padding: 0px 5px;
        font-size: 26px;
        @include defaultFontMedium;
        color: #ffffff;
        line-height: 34px;
        letter-spacing: 2px;
        margin: 32px 0px 18px 0px;
        text-align: center;
    }
    .hot-left-cell-text {
        width: 100%;
        box-sizing: border-box;
        padding: 0px 5px;
        font-size: 14px;
        @include defaultFont;
        color: #ffffff;
        line-height: 20px;
        margin-bottom: 52px;
        text-align: center;
    }
    .hot-left-cell-button {
        max-width: 118px;
        width: 100%;
        height: 42px;
        border-radius: 4px;
        border: 1px solid #ffffff;
        font-size: 16px;
        color: $themeBgColor;
        line-height: 42px;
        text-align: center;
    }
}
</style>
