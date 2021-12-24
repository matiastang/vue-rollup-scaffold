/*
 * @Author: matiastang
 * @Date: 2021-12-22 17:52:30
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-24 11:20:42
 * @FilePath: /datumwealth-openalpha-front/src/views/user/login/wechatLogin.ts
 * @Description: 微信登录检测逻辑
 */
import { computed, onMounted } from 'vue'
import { RouteLocationNormalizedLoaded, Router, LocationQueryValue } from 'vue-router'
import { oauthCallback, oauthBinder } from '@/common/request'
import { UserLoginInfo } from '@/user'
import { Store } from 'vuex'
import { AllStateTypes } from 'store/indexInterface'
import { ElLoading } from 'element-plus'
import ElMessage from '@/common/utils/message'
import { RejectType } from '@/common/request/request'
import { routerToUserCenter } from 'utils/router/index'

const userWechatLogin = (
    route: RouteLocationNormalizedLoaded,
    router: Router,
    store: Store<AllStateTypes>,
    toUserCenter: boolean = true,
    isBinder: boolean = false
) => {
    const wechatState = computed(() => store.state.userModule.wechatState)
    const userId = computed(() => store.state.userModule.userLoginInfo.member.id)
    const getQueryValue = (value: LocationQueryValue | LocationQueryValue[]) => {
        if (Array.isArray(value)) {
            return null
        }
        if (!value || value.trim() === '') {
            return null
        }
        return value
    }
    const wexinOauthCallback = (code: string, state: string) => {
        if (!wechatState.value) {
            return
        }
        if (state !== wechatState.value) {
            console.warn(`微信登录state校验错误${wechatState.value}!=${state}`)
            return
        }
        const loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)',
        })

        const weixinOauthBinder = (weixinUUID: string) => {
            if (!weixinUUID || !userId.value) {
                ElMessage.error('数据异常')
                return
            }
            oauthBinder(userId.value.toString(), weixinUUID)
                .then((res: string) => {
                    store.commit('setBindWechat', 1)
                    ElMessage({
                        message: res,
                        type: 'success',
                    })
                })
                .catch((err) => {
                    ElMessage.error(err.msg || '登录错误')
                })
                .finally(() => {
                    loading.close()
                })
        }

        oauthCallback(code)
            .then((res) => {
                console.log(res)
                if (typeof res === 'string') {
                    if (isBinder) {
                        console.log(`未绑定，自动绑定`)
                        weixinOauthBinder(res)
                        return
                    }
                    loading.close()
                    console.log(`未绑定，跳转绑定页面`)
                    router.push({
                        path: `/wechatBinder/${res}`,
                        query: {
                            type: toUserCenter ? 'center' : 'call',
                        },
                    })
                } else {
                    loading.close()
                    if (isBinder) {
                        console.log(`已绑定，设置成功`)
                        return
                    }
                    console.log(`已绑定，登录成功`)
                    const dwInfo = res as UserLoginInfo
                    store.commit('setUserLoginInfo', dwInfo.member)
                    store.commit('setToken', dwInfo.token)
                    if (toUserCenter) {
                        routerToUserCenter(store, router)
                    }
                }
            })
            .catch((error: RejectType) => {
                loading.close()
                ElMessage({
                    message: error.msg || '重置失败',
                    type: 'error',
                })
            })
    }

    onMounted(() => {
        const code = getQueryValue(route.query.code)
        const state = getQueryValue(route.query.state)
        if (code && state) {
            wexinOauthCallback(code, state)
        }
    })
}

export default userWechatLogin
