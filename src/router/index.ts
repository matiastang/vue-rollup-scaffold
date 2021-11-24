/*
 * @Author: your name
 * @Date: 2021-10-18 11:27:55
 * @LastEditTime: 2021-11-23 15:31:55
 * @LastEditors: matiastang
 * @Description: In User Settings Edit
 * @FilePath: /datumwealth-openalpha-front/src/router/index.ts
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
// layout
import Layout from '@/components/layout/Layout.vue'
import UserLayout from '@/components/userLayout/UserLayout.vue'
import HelpLayout from '@/components/helpLayout/HelpLayout.vue'
// web
import Home from '@/views/web/home/Home.vue'
import Interface from '@/views/web/interface/Interface.vue'
import InterfaceCall from '@/views/web/interfaceCall/InterfaceCall.vue'
import InterfaceInfo from '@/views/web/interfaceInfo/InterfaceInfo.vue'
import Solution from '@/views/web/solution/Solution.vue'
import Recharge from '@/views/web/recharge/Recharge.vue'
import Discount from '@/views/web/discount/Discount.vue'
import CompanyTransfer from '@/views/web/companyTransfer/CompanyTransfer.vue'
// user
import Login from '@/views/user/login/Login.vue'
import InterfaceStatement from '@/views/user/dataCenter/interfaceStatement/InterfaceStatement.vue'
import DiscountInfo from '@/views/user/dataCenter/discountInfo/DiscountInfo.vue'
import RechargeInfo from '@/views/user/dataCenter/rechargeInfo/RechargeInfo.vue'
import DataStatistics from '@/views/user/dataCenter/dataStatistics/DataStatistics.vue'
import Order from '@/views/user/dealManagement/order/index.vue'
import Invoice from '@/views/user/dealManagement/invoice/index.vue'
import Setting from '@/views/user/accountManagement/setting/Setting.vue'
import Certification from '@/views/user/accountManagement/certification/Certification.vue'
// 帮助中心
import LoginRegister from '@/views/user/helpCenter/loginRegister/LoginRegister.vue'
import Test from '@/views/user/helpCenter/test/Test.vue'
import Pay from '@/views/user/helpCenter/pay/Pay.vue'
import Issue from '@/views/user/helpCenter/issue/Issue.vue'

// NotFound
import NotFound from '@/views/NotFound.vue'
// 校验登录列表
import { checkLoginPath } from './loginInterceptor'
import { localStorageKey, localStorageRead } from 'utils/storage/localStorage'
// 支付宝支付页面
import Alipay from '@/views/web/alipay/Alipay.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'layout',
        component: Layout,
        children: [
            {
                path: 'home',
                name: 'home',
                component: Home,
            },
            {
                path: 'interface/:id*',
                name: 'interface',
                component: Interface,
            },
            {
                path: 'interface/call/:id(\\d+)',
                name: 'InterfaceCall',
                component: InterfaceCall,
            },
            {
                path: 'interface/info/:id(\\d+)',
                name: 'InterfaceInfo',
                component: InterfaceInfo,
            },
            {
                path: 'solution',
                name: 'solution',
                component: Solution,
            },
            {
                path: 'recharge',
                name: 'recharge',
                component: Recharge,
            },
            {
                path: 'recharge/companyTransfer/:id(\\d+)',
                name: 'rechargeTransfer',
                component: CompanyTransfer,
            },
            {
                path: 'discount',
                name: 'discount',
                component: Discount,
            },
            {
                path: 'discount/companyTransfer/:id(\\d+)',
                name: 'discountTransfer',
                component: CompanyTransfer,
            },
            {
                path: 'login',
                name: 'login',
                component: Login,
            },
        ],
        beforeEnter: (to, from) => {
            console.log(`web路由卫士：即将从${from.path}跳转到${to.path}`)
            return true
        },
    },
    {
        path: '/alipay',
        name: 'alipay',
        component: Alipay,
        beforeEnter: (to, from) => {
            console.log(`web路由卫士：即将从${from.path}跳转到${to.path}`)
            return true
        },
    },
    {
        path: '/user',
        name: 'user',
        component: UserLayout,
        children: [
            {
                path: 'data/statement',
                name: 'interfaceStatement',
                component: InterfaceStatement,
            },
            {
                path: 'data/discount/info/:id(\\d+)',
                name: 'discountInfo',
                component: DiscountInfo,
            },
            {
                path: 'data/recharge/info/:id(\\d+)',
                name: 'rechargeInfo',
                component: RechargeInfo,
            },
            {
                path: 'data/statistics',
                name: 'dataStatistics',
                component: DataStatistics,
            },
            {
                path: 'deal/order',
                name: 'dealOrder',
                component: Order,
            },
            {
                path: 'deal/invoice',
                name: 'dealInvoice',
                component: Invoice,
            },
            {
                path: 'account/setting',
                name: 'accountSetting',
                component: Setting,
            },
            {
                path: 'account/certification',
                name: 'accountCertification',
                component: Certification,
            },
        ],
        beforeEnter: (to, from) => {
            console.log(`user路由卫士：即将从${from.path}跳转到${to.path}`)
            return true
        },
    },
    {
        path: '/help',
        name: 'help',
        component: HelpLayout,
        children: [
            {
                path: 'login',
                name: 'helpLoginRegister',
                component: LoginRegister,
            },
            {
                path: 'test',
                name: 'helpTest',
                component: Test,
            },
            {
                path: 'pay',
                name: 'helpPay',
                component: Pay,
            },
            {
                path: 'issue',
                name: 'helpIssue',
                component: Issue,
            },
        ],
        beforeEnter: (to, from) => {
            console.log(`help路由卫士：即将从${from.path}跳转到${to.path}`)
            return true
        },
    },
    {
        // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
    },
]
/**
 * 创建Router
 */
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

/**
 * 全局前置守卫
 */
router.beforeEach((to, from, next) => {
    console.log(`即将从${from.path}跳转到${to.path}`)
    if (to.path === '/') {
        next({
            path: '/home',
            replace: true,
        })
        return
    }
    // 登录校验
    const toPath = to.path
    const findItem = checkLoginPath.find(({ path }) => {
        return path === toPath
    })
    if (findItem) {
        // 用户token
        const userToken = localStorageRead<string>(localStorageKey.userTokenKey)
        if (userToken && userToken.trim() !== '') {
            // 已登录
            if (findItem.mustLogin) {
                next()
            } else {
                console.info(
                    `访问${findItem.path}页面要求必须未登录，但已登录，重定向到登录${findItem.redirectPath}页面`
                )
                next({
                    path: findItem.redirectPath,
                    replace: true,
                })
            }
        } else {
            // 未登录
            if (findItem.mustLogin) {
                console.info(
                    `访问${findItem.path}页面要求必须登录，但未登录，重定向到登录${findItem.redirectPath}页面`
                )
                next({
                    path: findItem.redirectPath,
                    replace: true,
                })
            } else {
                next()
            }
        }
        return
    }
    next()
})

/**
 * 全局解析守卫
 */
router.beforeResolve((to) => {
    console.log(`将要跳转到${to.path}`)
})

/**
 * 全局后置钩子
 */
router.beforeEach((to, from) => {
    console.log(`从${from.path}跳转到${to.path}`)
})

export default router
