/*
 * @Author: matiastang
 * @Date: 2021-11-18 15:06:46
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-18 15:16:28
 * @FilePath: /datumwealth-openalpha-front/src/common/utils/router/index.ts
 * @Description: router 逻辑
 */
import { Store } from 'vuex'
import { Router } from 'vue-router'
import { AllStateTypes } from 'store/indexInterface'
/**
 * 跳转个人中心，根据目前状态跳转不同的页面
 * @param store
 * @param router
 */
export function routerToUserCenter(store: Store<AllStateTypes>, router: Router) {
    const userInfo = store.state.userModule.userLoginInfo.member
    let path = '/user/data/statement'
    if (!userInfo.phone || !userInfo.email) {
        path = '/user/account/setting'
    }
    if (!userInfo.certStatus || userInfo.certStatus !== 1) {
        path = '/user/account/certification'
    }
    router.push({
        path,
    })
}
