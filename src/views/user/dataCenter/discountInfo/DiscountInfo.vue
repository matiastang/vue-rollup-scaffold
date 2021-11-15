<!--
 * @Author: matiastang
 * @Date: 2021-11-15 14:59:37
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-15 15:29:35
 * @FilePath: /datumwealth-openalpha-front/src/views/user/dataCenter/discountInfo/DiscountInfo.vue
 * @Description: 优惠套餐详情
-->
<template>
    <div class="discount-info">
        <div class="discount-info-top flexRowCenter">
            <div class="discount-info-index defaultFont">当前位置:</div>
            <div class="discount-info-title defaultFont">{{ '优惠套餐账单 >' }}</div>
            <div class="discount-info-text defaultFont">账单详情</div>
        </div>
        <div class="discount-info-content flexColumnCenter">
            <div class="discount-info-title defaultFont">2021-10-20日 账单详情</div>
            <div class="discount-base-info-content flexRowCenter">
                <div class="discount-base-info-title defaultFont">订单编号:</div>
                <div class="discount-base-info-text defaultFont">S20211008174916250831</div>
                <div class="discount-base-info-title defaultFont">订单类型:</div>
                <div class="discount-base-info-text defaultFont">优惠套餐</div>
                <div class="discount-base-info-title defaultFont">计费方式:</div>
                <div class="discount-base-info-text defaultFont">按年计费</div>
                <div class="discount-base-info-title defaultFont">套餐到期日:</div>
                <div class="discount-base-info-text defaultFont">2021-11-20</div>
            </div>
            <div class="discount-info-search-content flexRowCenter">
                <SearchInput class="search-input" placeholder="请输入需要查询的账单" />
                <div class="discount-info-export defaultFont">账单导出</div>
            </div>
            <el-table class="discount-info-table" :data="tableData" style="width: 100%">
                <el-table-column prop="date" label="接口ID" min-width="100" />
                <el-table-column prop="name" label="接口名称" min-width="100" />
                <el-table-column prop="state" label="单价(元/次)" min-width="80" />
                <el-table-column prop="city" label="每日最大调用量" min-width="80" />
                <el-table-column prop="address" label="最新版本" min-width="80" />
                <el-table-column prop="zip" label="总调用量" min-width="80" />
                <el-table-column prop="time" label="有效调用量" min-width="100" />
                <el-table-column prop="count" label="计费次数" min-width="100" />
            </el-table>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue'
import SearchInput from '@/components/searchInput/SearchInput.vue'

export default defineComponent({
    name: 'DiscountInfo',
    setup() {
        // table数据
        let tableData = [
            {
                date: '1074',
                name: '基金风险收益指标',
                state: '0.15',
                city: '50000',
                address: '1.0',
                zip: '2000',
                time: '1998',
                count: '1998',
            },
            {
                date: '1074',
                name: '基金风险收益指标',
                state: '0.15',
                city: '50000',
                address: '1.0',
                zip: '2000',
                time: '1998',
                count: '1998',
            },
            {
                date: '1074',
                name: '基金风险收益指标',
                state: '0.15',
                city: '50000',
                address: '1.0',
                zip: '2000',
                time: '1998',
                count: '1998',
            },
            {
                date: '1074',
                name: '基金风险收益指标',
                state: '0.15',
                city: '50000',
                address: '1.0',
                zip: '2000',
                time: '1998',
                count: '1998',
            },
            {
                date: '1074',
                name: '基金风险收益指标',
                state: '0.15',
                city: '50000',
                address: '1.0',
                zip: '2000',
                time: '1998',
                count: '1998',
            },
        ]
        return {
            tableData,
        }
    },
    components: {
        SearchInput,
    },
})
</script>

<style lang="scss" scoped>
.discount-info {
    width: 100%;
    box-sizing: border-box;
    padding: 20px 16px;
    overflow-y: scroll;
    .discount-info-top {
        justify-content: flex-start;
        .discount-info-index {
            font-size: 16px;
            color: $placeholderColor;
            line-height: 24px;
        }
        .discount-info-title {
            font-size: 16px;
            color: $titleColor;
            line-height: 24px;
        }
        .discount-info-text {
            font-size: 16px;
            color: $themeColor;
            line-height: 24px;
        }
    }
    .discount-info-content {
        width: 100%;
        box-sizing: border-box;
        background: $themeBgColor;
        border-radius: 4px;
        margin-top: 20px;
        padding: 16px 24px;
        .discount-info-title {
            width: 100%;
            height: 36px;
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: $titleColor;
            line-height: 36px;
            letter-spacing: 1px;
            border-bottom: 1px solid #dfdfdf;
            text-align: left;
        }
        .discount-base-info-content {
            width: 100%;
            margin-top: 18px;
            justify-content: flex-start;
            .discount-base-info-title {
                font-size: 14px;
                color: $placeholderColor;
                line-height: 20px;
                margin-right: 12px;
            }
            .discount-base-info-text {
                font-size: 14px;
                color: $titleColor;
                line-height: 20px;
                margin-right: 24px;
            }
        }
        .discount-info-search-content {
            width: 100%;
            justify-content: flex-start;
            margin-top: 18px;
            .search-input {
                width: 744px;
            }
            .discount-info-export {
                width: 118px;
                height: 42px;
                background: $themeColor;
                border-radius: 4px;
                font-size: 16px;
                color: $themeBgColor;
                line-height: 42px;
                margin-left: 18px;
            }
        }
        .discount-info-table {
            margin-top: 18px;
            ::v-deep(th) {
                background: #e9e9e9;
            }
            .info-title {
                font-size: 16px;
                color: #4e9aeb;
                line-height: 24px;
                text-align: left;
            }
        }
    }
}
</style>
