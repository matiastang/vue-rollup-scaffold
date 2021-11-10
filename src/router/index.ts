/*
 * @Author: your name
 * @Date: 2021-10-18 11:27:55
 * @LastEditTime: 2021-11-10 10:43:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-scaffold/src/router/index.ts
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/components/layout/Layout.vue'
import Home from '@/views/home/Home.vue'
import Login from '@/views/login/Login.vue'
import Interface from '@/views/interface/Interface.vue'
import InterfaceCall from '@/views/interfaceCall/InterfaceCall.vue'
import InterfaceInfo from '@/views/interfaceInfo/InterfaceInfo.vue'
import Solution from '@/views/solution/Solution.vue'
import Recharge from '@/views/recharge/Recharge.vue'
import Discount from '@/views/discount/Discount.vue'
import CompanyTransfer from '../views/companyTransfer/CompanyTransfer.vue'
import NotFound from '@/views/NotFound.vue'

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
                path: 'interface',
                name: 'interface',
                component: Interface,
            },
            {
                path: 'interface/call/:id',
                name: 'InterfaceCall',
                component: InterfaceCall,
            },
            {
                path: 'interface/info/:id',
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
                path: 'recharge/companyTransfer',
                name: 'rechargeTransfer',
                component: CompanyTransfer,
            },
            {
                path: 'discount',
                name: 'discount',
                component: Discount,
            },
            {
                path: 'discount/companyTransfer',
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
            console.log(`路由卫士：即将从${from}跳转到${to}`)
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
    console.log(`即将从${from}跳转到${to}`)
    // TODO: - 权限页面登录校验
    next()
})

/**
 * 全局解析守卫
 */
router.beforeResolve((to) => {
    console.log(`将要跳转到${to}`)
})

/**
 * 全局后置钩子
 */
router.beforeEach((to, from) => {
    console.log(`从${from}跳转到${to}`)
})

export default router
