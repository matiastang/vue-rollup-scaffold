/*
 * @Author: matiastang
 * @Date: 2021-11-12 16:57:17
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-12 17:47:37
 * @FilePath: /datumwealth-openalpha-front/src/router/loginInterceptor.ts
 * @Description: 需要校验登录的路由
 */
/**
 * 需要校验登录的路由列表
 */
const checkLoginPath = [
    {
        path: '/user/data/statement',
        redirectPath: '/login',
        mustLogin: true, // 必须登录或必须未登录
    },
    {
        path: '/user/data/statistics',
        redirectPath: '/login',
        mustLogin: true,
    },
    {
        path: '/user/deal/order',
        redirectPath: '/login',
        mustLogin: true,
    },
    {
        path: '/user/deal/invoice',
        redirectPath: '/login',
        mustLogin: true,
    },
    {
        path: '/user/account/setting',
        redirectPath: '/login',
        mustLogin: true,
    },
    {
        path: '/user/account/certification',
        redirectPath: '/login',
        mustLogin: true,
    },
    {
        path: '/login',
        redirectPath: '/user/data/statement',
        mustLogin: false,
    },
]

export { checkLoginPath }
