/*
 * @Author: matiastang
 * @Date: 2021-11-11 17:09:26
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-25 16:47:28
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
                children: [
                    {
                        path: '/user/data/discount/info',
                    },
                    {
                        path: '/user/data/recharge/info',
                    },
                ],
            },
            // {
            //     title: '数据统计',
            //     path: '/user/data/statistics',
            //     selected: false,
            //     children: [],
            // },
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
                children: [],
            },
            {
                title: '我的发票',
                path: '/user/deal/invoice',
                selected: false,
                children: [],
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
                children: [],
            },
            {
                title: '实名认证',
                path: '/user/account/certification',
                selected: false,
                children: [],
            },
        ],
    },
]
export default menuData
