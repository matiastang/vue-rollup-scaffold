<!--
 * @Author: matiastang
 * @Date: 2021-11-15 15:30:33
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-15 15:33:14
 * @FilePath: /datumwealth-openalpha-front/src/views/user/dataCenter/rechargeInfo/RechargeInfo.vue
 * @Description: 充值订单详情
-->
<template>
    <div class="recharge-info">
        <div class="recharge-info-top flexRowCenter">
            <div class="recharge-info-index defaultFont">当前位置:</div>
            <div class="recharge-info-title defaultFont">{{ '充值调用账单 >' }}</div>
            <div class="recharge-info-text defaultFont">账单详情</div>
        </div>
        <div class="recharge-info-content flexColumnCenter">
            <div class="recharge-info-title defaultFont">2021-10-20日 账单详情</div>
            <div class="recharge-base-info-content flexRowCenter">
                <div class="recharge-base-info-title defaultFont">订单编号:</div>
                <div class="recharge-base-info-text defaultFont">S20211008174916250831</div>
                <div class="recharge-base-info-title defaultFont">订单类型:</div>
                <div class="recharge-base-info-text defaultFont">充值调用</div>
                <div class="recharge-base-info-title defaultFont">计费方式:</div>
                <div class="recharge-base-info-text defaultFont">按次计费</div>
                <div class="recharge-base-info-title defaultFont">套餐到期日:</div>
                <div class="recharge-base-info-text defaultFont">2021-11-20</div>
            </div>
            <div class="recharge-info-search-content flexRowCenter">
                <SearchInput class="search-input" placeholder="请输入需要查询的账单" />
                <div class="recharge-info-export defaultFont">账单导出</div>
            </div>
            <el-table class="recharge-info-table" :data="tableData" style="width: 100%">
                <el-table-column prop="date" label="接口ID" min-width="100" />
                <el-table-column prop="name" label="接口名称" min-width="100" />
                <el-table-column prop="state" label="单价(元/次)" min-width="80" />
                <el-table-column prop="city" label="每日最大调用量" min-width="80" />
                <el-table-column prop="address" label="最新版本" min-width="80" />
                <el-table-column prop="zip" label="总调用量" min-width="80" />
                <el-table-column prop="time" label="有效调用量" min-width="100" />
                <el-table-column prop="count" label="计费次数" min-width="100" />
                <el-table-column prop="money" label="消费金额(元)" min-width="100" />
            </el-table>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue'
import SearchInput from '@/components/searchInput/SearchInput.vue'

export default defineComponent({
    name: 'rechargeInfo',
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
                money: '299.7',
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
                money: '299.7',
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
                money: '299.7',
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
                money: '299.7',
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
                money: '299.7',
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
.recharge-info {
    width: 100%;
    box-sizing: border-box;
    padding: 20px 16px;
    overflow-y: scroll;
    .recharge-info-top {
        justify-content: flex-start;
        .recharge-info-index {
            font-size: 16px;
            color: $placeholderColor;
            line-height: 24px;
        }
        .recharge-info-title {
            font-size: 16px;
            color: $titleColor;
            line-height: 24px;
        }
        .recharge-info-text {
            font-size: 16px;
            color: $themeColor;
            line-height: 24px;
        }
    }
    .recharge-info-content {
        width: 100%;
        box-sizing: border-box;
        background: $themeBgColor;
        border-radius: 4px;
        margin-top: 20px;
        padding: 16px 24px;
        .recharge-info-title {
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
        .recharge-base-info-content {
            width: 100%;
            margin-top: 18px;
            justify-content: flex-start;
            .recharge-base-info-title {
                font-size: 14px;
                color: $placeholderColor;
                line-height: 20px;
                margin-right: 12px;
            }
            .recharge-base-info-text {
                font-size: 14px;
                color: $titleColor;
                line-height: 20px;
                margin-right: 24px;
            }
        }
        .recharge-info-search-content {
            width: 100%;
            justify-content: flex-start;
            margin-top: 18px;
            .search-input {
                width: 744px;
            }
            .recharge-info-export {
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
        .recharge-info-table {
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
