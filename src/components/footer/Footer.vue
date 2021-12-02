<!--
 * @Author: your name
 * @Date: 2021-11-03 18:49:04
 * @LastEditTime: 2021-12-02 10:40:03
 * @LastEditors: matiastang
 * @Description: In User Settings Edit
 * @FilePath: /datumwealth-openalpha-front/src/components/footer/Footer.vue
-->
<template>
    <div class="footer">
        <div class="footer-content">
            <div class="footer-top">
                <div class="footer-data-source">
                    <div class="footer-title">数据来源</div>
                    <div
                        v-for="item in dataSource"
                        :key="item.title"
                        :class="['footer-text', { 'footer-text-url': item.url !== undefined }]"
                        @click="openAction(item)"
                    >
                        {{ item.title }}
                    </div>
                </div>
                <div class="footer-help-center">
                    <div class="footer-title">帮助中心</div>
                    <div
                        v-for="item in helpCenter"
                        :key="item.title"
                        :class="['footer-text', { 'footer-text-url': item.url !== undefined }]"
                        @click="footerAction(item)"
                    >
                        {{ item.title }}
                    </div>
                </div>
                <div class="footer-about-us">
                    <div class="footer-title">关于我们</div>
                    <div
                        v-for="item in aboutUs"
                        :key="item.title"
                        :class="['footer-text', { 'footer-text-url': item.url !== undefined }]"
                        @click="footerAction(item)"
                    >
                        {{ item.title }}
                    </div>
                </div>
                <div class="footer-contact footer-last-content">
                    <div class="footer-title">联系方式</div>
                    <div v-for="item in contact" :key="item.title" class="footer-text">
                        {{ item.title }}
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <div class="footer-bottom-title">
                    Copyright © 成都西筹金融科技有限公司 All Rights Reserved.
                </div>
                <div class="footer-bottom-text">备案号：蜀ICP备2021002963号-3</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface FooterData {
    /**
     * 名称
     */
    title: string
    /**
     * 跳转地址
     */
    url?: string
}

export default defineComponent({
    setup() {
        const route = useRoute()
        const router = useRouter()
        const dataSource = [
            {
                title: '西筹金融科技',
                url: 'http://www.datumwealth.com/',
            },
            {
                title: '况客科技',
                url: 'https://www.qutke.com/',
            },
            {
                title: '汇迪投资',
                url: 'http://www.hdinvesting.cn/',
            },
        ]
        const helpCenter = [
            {
                title: '登陆注册',
                url: '/help/login',
            },
            {
                title: '测试流程',
                url: '/help/test',
            },
            {
                title: '支付方式',
                url: '/help/pay',
            },
            {
                title: '常见问题',
                url: '/help/issue',
            },
        ]
        const aboutUs = [
            {
                title: '关于我们',
                url: '/about/aboutUs',
            },
            {
                title: '用户协议',
                url: '/about/agreement',
            },
            {
                title: '版权政策',
                url: '/about/copyright',
            },
            {
                title: '认证服务协议',
                url: '/about/authProtocol',
            },
            // {
            //     title: '免责声明',
            //     url: '/about/statement',
            // },
            // {
            //     title: '权利通知',
            //     url: '/about/rightNotify',
            // },
            {
                title: '意见反馈',
                url: '/about/feedback',
            },
        ]
        const contact = [
            {
                title: '联系电话：010-85794515',
            },
            {
                title: '服务时间：周一至周五 9:00-18:00',
            },
            {
                title: '电子邮箱：service@datumwealth.com',
                // title: '电子邮箱：info@qutke.com',
            },
            {
                title: '工作地址：',
            },
            {
                title: '北京：北京市朝阳区关东店北街1号国安大厦19层',
            },
            {
                title: '成都：成都市高新区天府大道北段1677号交子金融科技中心B座306 ',
            },
        ]
        const openAction = (data: FooterData) => {
            window.open(data.url)
        }
        /**
         * 点击跳转
         */
        const footerAction = (data: FooterData) => {
            if (data.url && !route.path.startsWith(data.url)) {
                router.push({
                    path: data.url,
                })
            }
        }
        return {
            dataSource,
            helpCenter,
            aboutUs,
            contact,
            footerAction,
            openAction,
        }
    },
})
</script>

<style lang="scss" scoped>
.footer {
    width: 100%;
    min-height: 412px;
    background: #281d19;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .footer-content {
        width: 100%;
        box-sizing: border-box;
        height: 100%;
        padding: 20px calc(50% - 712px) 30px calc(50% - 712px);
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        .footer-top {
            width: 100%;
            flex-grow: 1;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-top: 32px;
            .footer-data-source,
            .footer-help-center,
            .footer-about-us,
            .footer-contact {
                min-width: 150px;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
                .footer-title {
                    width: 100%;
                    font-size: 14px;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: $themeBgColor;
                    line-height: 20px;
                    letter-spacing: 1px;
                    margin-bottom: 24px;
                }
                .footer-text {
                    font-size: 12px;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 400;
                    color: $themeBgColor;
                    line-height: 20px;
                    letter-spacing: 1px;
                    margin-bottom: 8px;
                }
                .footer-text:hover {
                    font-size: 14px;
                }
                .footer-text-url {
                    cursor: pointer;
                }
            }
            .footer-last-content {
                min-width: 400px;
                .footer-text:hover {
                    font-size: 12px;
                }
            }
        }
        .footer-bottom {
            width: 100%;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border-top: 1px solid $themeBgColor;
            padding-top: 23px;
            .footer-bottom-title {
                font-size: 12px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: $themeBgColor;
                line-height: 17px;
                letter-spacing: 1px;
            }
            .footer-bottom-text {
                margin-top: 8px;
                font-size: 12px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: $themeBgColor;
                line-height: 17px;
                letter-spacing: 1px;
            }
        }
    }
}
@media screen and (max-width: 1500px) {
    .footer {
        .footer-content {
            padding: 20px 30px 30px 30px;
        }
    }
}
</style>
