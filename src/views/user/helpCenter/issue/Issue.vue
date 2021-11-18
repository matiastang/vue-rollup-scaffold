<!--
 * @Author: matiastang
 * @Date: 2021-11-18 10:14:11
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-18 14:30:51
 * @FilePath: /datumwealth-openalpha-front/src/views/user/helpCenter/issue/Issue.vue
 * @Description: 帮助中心-常见问题
-->
<template>
    <div class="issue">
        <div class="issue-title defaultFont">登录注册</div>
        <div v-for="item in issueList" :key="item.title" class="issue-content flexColumnCenter">
            <div class="issue-content-title">{{ item.title }}</div>
            <div
                v-for="(issueItem, index) in item.subIssue"
                :key="issueItem.title"
                class="issue-item flexColumnCenter"
            >
                <div class="issue-item-top flexRowCenter">
                    <div class="issue-item-index defaultFont">{{ index + 1 }}</div>
                    <div class="issue-item-title defaultFont">{{ issueItem.title }}</div>
                </div>
                <div
                    v-for="textItem in issueItem.texts"
                    :key="textItem"
                    class="issue-item-text defaultFont"
                >
                    {{ textItem }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
    name: 'Issue',
    setup() {
        const issueList = reactive([
            {
                title: '一、账号相关',
                subIssue: [
                    {
                        title: '注册的方式有几种?',
                        texts: ['平台目前注册的方式支持“手机号验证码”注册。'],
                    },
                    {
                        title: '注册的方式有几种?',
                        texts: ['登录的方式有几些？'],
                    },
                    {
                        title: '忘记了平台密码，如何进行登录？',
                        texts: [
                            '用户若是忘记密码，可以通过手机验证码的方式进行登录。也可以在帐号+密码登录界面，点击“忘记密码”重置密码后再登录。',
                        ],
                    },
                    {
                        title: '绑定邮箱后收不到验证信息怎么办？',
                        texts: [
                            '(1)网络环境导致验证邮件发送延迟，建议您切换/重启网络后重新发送验证。',
                            '(2)在账户安全中心，更改您的绑定邮箱后，重新发送验证到新的邮箱。',
                        ],
                    },
                ],
            },
            {
                title: '二、接口相关问题',
                subIssue: [
                    {
                        title: '接口的调用方式是什么？',
                        texts: ['支持http和https请求，目前还不提供soap之类的webservice。'],
                    },
                    {
                        title: 'URL的中文编码是utf-8吗？',
                        texts: [
                            '是。申请数据接口选择应用平台时，默认选择第一个即可，申请的数据接口在其他类型平台也可以正常使用。',
                        ],
                    },
                    {
                        title: '返回代码释义是什么？',
                        texts: [
                            '可以在每个接口的接口信息详情里查看，针对返回代码字段都有业务含义释义。',
                        ],
                    },
                    {
                        title: '接口提供的查询接口，接口使用平台有哪些？',
                        texts: ['该接口是通用接口，web、android、ios等等都可以使用。'],
                    },
                    {
                        title: '接口返回的数据是什么编码？',
                        texts: ['API接口的编码为UTF-8。'],
                    },
                    {
                        title: '数据接口支持什么格式？',
                        texts: ['具体可以查看各接口文档，不同的接口所支持的格式不同。'],
                    },
                    {
                        title: '接口返回的数据是否可以推送到服务器？',
                        texts: [
                            '数据返回需要开发者自己进行处理。目前的接口形式，只能自行获取保存，不能主动推送。',
                        ],
                    },
                    {
                        title: '接口支持js和xml，如何实现跨域？',
                        texts: ['不支持，仅支持JSON格式的数据。'],
                    },
                ],
            },
            {
                title: '三、调用相关问题',
                subIssue: [
                    {
                        title: '如何申请接口调用权限？',
                        texts: [
                            '用户登录后，进入“数据接口”，点击“调用接口”按钮，根据客户业务所需，自主进行接口调用。',
                        ],
                    },
                    {
                        title: '为什么无法进行接口调用？',
                        texts: [
                            '用户可在“数据中心-接口账单”页面通过切换Token值查看充值余额或套餐余量。若您的充值余额为负或套餐余量为零，则无法进行接口调用。请及时留意短信或者邮箱提醒，建议您及时充值或购买套餐。',
                        ],
                    },
                    {
                        title: 'Token如何申请？Token值是否支持重置？如何重置？',
                        texts: [
                            '用户购买“充值调用”或“优惠套餐”并支付成功后，会自动生成Token值。您可通过“数据中心-我的接口”查看Token，一个客户默认在充值调用和套餐下各拥有一个Token。Token值支持重置，但一天仅可重置一次。',
                        ],
                    },
                ],
            },
            {
                title: '四、订单、支付相关问题',
                subIssue: [
                    {
                        title: '西筹数据开放平台API接口有哪几种售卖方式？',
                        texts: [
                            '西筹开放平台提供“预充值”和“包年”两种售卖方式',
                            '“预充值”即“充值调用”，是指在实际接口调用中，按接口单价计费、消耗账户余额；',
                            '“包年”即“优惠套餐”，是指在实际接口调用中，按接口调用次数计费、消耗套餐余量；',
                        ],
                    },
                    {
                        title: '充值的方式有几种?',
                        texts: [
                            '本平台支持微信支付、支付宝支付和对公转账三种方式。充值的最低金额为500元，也可选择其他金额进行充值。',
                        ],
                    },
                    {
                        title: '如何通过对公转账的方式进行支付?',
                        texts: [
                            '对公转账付款后，需登录天眼查开放平台，进入“个人中心-我的订单”上传付款凭证，我方财务审核后方可入帐、购买成功。',
                        ],
                    },
                    {
                        title: '如何查看我个人的账户信息，以及账户余额情况?',
                        texts: [
                            '用户登录后，可在“数据中心-接口账单”页面通过切换Token值查看充值余额或套餐余量及接口调用数据。',
                        ],
                    },
                    {
                        title: '接口账单中的数据更新频率如何?',
                        texts: [
                            '接口账单数据每天01:30更新；数据统计截止时间为前一天23:59:59的结果。',
                        ],
                    },
                ],
            },
            {
                title: '五、发票问题',
                subIssue: [
                    {
                        title: '平台可以开什么发票？需要提供什么资料？',
                        texts: [
                            '平台可为用户开具增值税专用发票和增值税普通发票。您可通过“交易管理-我的发票”进行开票申请。',
                            '增值税普通发票需提供：开票资料（名称，纳税人识别号），邮寄地址（地址，收件人，手机）。',
                            '增值税专用发票需提供：开票资料（公司名称，纳税人识别号，注册地址，电话，开户行，账号），邮寄地址（地址，收件人，手机）。',
                        ],
                    },
                    {
                        title: '开发票的最低金额是多少？充值的金额是否可以分开开发票？',
                        texts: [
                            '开发票的得最低金额是500元，一个订单只能开具一张发票。不同的订单可以开具同一张发票。',
                        ],
                    },
                    {
                        title: '个人用户是否可以申请增值税专用发票？',
                        texts: [
                            '可以。个人用户也可以申请增值税专用发票，需提供企业的相关真实信息。',
                        ],
                    },
                    {
                        title: '发票订单提交后审核的时间是多久？',
                        texts: [
                            '用户在提交发票订单之后，相关财务人员会在7个工作日内审核开具，开具完成后将在3个工作日内为客户免费寄出。',
                        ],
                    },
                    {
                        title: '发票订单已经提交，但是信息填写错误，如何处理?',
                        texts: ['请仔细确认发票信息,信息一旦确认将无法再次修改。'],
                    },
                    {
                        title: '从哪儿查看发票的物流单号和信息?',
                        texts: [
                            '用户可在“交易管理”“我的发票”中选择“已邮寄”状态下的发票，点击“查看”到详情页面查看物流的单号和相关信息。',
                        ],
                    },
                    {
                        title: '发票开具后，可以指定选择哪家快递吗?',
                        texts: ['西筹数据开放平台发票邮寄默认使用京东物流。'],
                    },
                ],
            },
        ])
        return {
            issueList,
        }
    },
})
</script>

<style lang="scss" scoped>
.issue {
    width: 100%;
    padding: 20px 16px;
    box-sizing: border-box;
    background: $themeBgColor;
    justify-content: flex-start;
    .issue-title {
        width: 100%;
        height: 42px;
        font-size: 18px;
        color: $titleColor;
        line-height: 26px;
        text-align: left;
        border-bottom: 1px solid #dfdfdf;
    }
    .issue-content {
        width: 100%;
        margin-top: 20px;
        margin-bottom: 25px;
        .issue-content-title {
            width: 100%;
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: $titleColor;
            line-height: 20px;
            letter-spacing: 1px;
        }
        .issue-item {
            width: 100%;
            box-sizing: border-box;
            padding: 23px 0px 23px 30px;
            border-bottom: 1px dashed #dfdfdf;
            align-items: flex-start;
            .issue-item-top {
                width: 100%;
                justify-content: flex-start;
                margin-bottom: 12px;
                .issue-item-index {
                    padding: 0px 6px;
                    height: 20px;
                    background: $themeColor;
                    border-radius: 2px;
                    font-size: 14px;
                    color: $themeBgColor;
                    line-height: 20px;
                }
                .issue-item-title {
                    font-size: 14px;
                    color: $titleColor;
                    line-height: 20px;
                    margin-left: 8px;
                    text-align: left;
                }
            }
            .issue-item-text {
                font-size: 14px;
                color: $placeholderColor;
                line-height: 24px;
                margin-left: 28px;
                text-align: left;
            }
        }
    }
}
</style>
