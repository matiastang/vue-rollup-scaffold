/*
 * @Author: your name
 * @Date: 2021-10-18 11:27:55
 * @LastEditTime: 2021-11-04 19:26:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-scaffold/src/router/index.ts
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/components/layout/Layout.vue'
import Login from '../views/Login.vue'
import Home from '../views/home/Home.vue'
import NotFound from '../views/NotFound.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'layout',
        component: Layout,
        children: [
            {
                path: 'home',
                component: Home,
            },
            {
                path: 'login',
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
