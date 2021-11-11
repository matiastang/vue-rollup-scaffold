/*
 * @Author: matiastang
 * @Date: 2021-11-11 17:09:26
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-11 17:43:18
 * @FilePath: /datumwealth-openalpha-front/src/components/menu/menu.ts
 * @Description:
 */
const menuData = [
    {
        title: '数据中心',
        name: 'data',
        children: [
            {
                title: '接口账单',
                path: '/user/data/statement',
                selected: false,
            },
            {
                title: '数据统计',
                path: '/user/data/statistics',
                selected: false,
            },
        ],
    },
    {
        title: '交易管理',
        name: 'deal',
        children: [
            {
                title: '我的订单',
                path: '/user/deal/order',
                selected: false,
            },
            {
                title: '我的发票',
                path: '/user/deal/invoice',
                selected: false,
            },
        ],
    },
    {
        title: '账号管理',
        name: 'account',
        children: [
            {
                title: '账号设置',
                path: '/user/account/setting',
                selected: false,
            },
            {
                title: '实名认证',
                path: '/user/account/certification',
                selected: false,
            },
        ],
    },
]
export default menuData
