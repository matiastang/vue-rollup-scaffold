<!--
 * @Author: your name
 * @Date: 2021-11-02 19:15:52
 * @LastEditTime: 2021-12-22 18:03:30
 * @LastEditors: matiastang
 * @Description: In User Settings Edit
 * @FilePath: /datumwealth-openalpha-front/src/views/user/login/Login.vue
-->
<template>
    <div class="login flexRowCenter">
        <div class="login-content flexRowCenter">
            <div class="login-left">
                <div class="login-title">研究驱动的财富管理基础设施供应商</div>
                <div class="login-text">全面、深度、专业、有趣的基金数据产品</div>
            </div>
            <!-- 登录模块 -->
            <LoginModule class="login-module"></LoginModule>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useRoute, useRouter, LocationQueryValue } from 'vue-router'
import LoginModule from '@/components/loginModule/LoginModule.vue'
import { oauthCallback } from '@/common/request'
import { UserLoginInfo } from '@/user'
import { useStore } from 'store/index'
import { ElLoading } from 'element-plus'
import ElMessage from '@/common/utils/message'
import { RejectType } from '@/common/request/request'
import { routerToUserCenter } from 'utils/router/index'
import userWechatLogin from './wechatLogin'

export default defineComponent({
    setup() {
        const route = useRoute()
        const router = useRouter()
        const store = useStore()

        userWechatLogin(route, router, store)

        // const wechatState = computed(() => store.state.userModule.wechatState)
        // const getQueryValue = (value: LocationQueryValue | LocationQueryValue[]) => {
        //     if (Array.isArray(value)) {
        //         return null
        //     }
        //     if (!value || value.trim() === '') {
        //         return null
        //     }
        //     return value
        // }
        // const wexinOauthCallback = (code: string, state: string) => {
        //     if (!wechatState.value) {
        //         return
        //     }
        //     if (state !== wechatState.value) {
        //         console.warn(`微信登录state校验错误${wechatState.value}!=${state}`)
        //         return
        //     }
        //     const loading = ElLoading.service({
        //         lock: true,
        //         text: 'Loading',
        //         background: 'rgba(0, 0, 0, 0.7)',
        //     })
        //     oauthCallback(code)
        //         .then((res) => {
        //             console.log(res)
        //             if (typeof res === 'string') {
        //                 console.log(`未绑定`)
        //                 router.push({
        //                     path: `/wechatBinder/${res}`,
        //                 })
        //             } else {
        //                 console.log(`已绑定`)
        //                 const dwInfo = res as UserLoginInfo
        //                 store.commit('setUserLoginInfo', dwInfo.member)
        //                 store.commit('setToken', dwInfo.token)
        //                 routerToUserCenter(store, router)
        //             }
        //         })
        //         .catch((error: RejectType) => {
        //             ElMessage({
        //                 message: error.msg || '重置失败',
        //                 type: 'error',
        //             })
        //         })
        //         .finally(() => {
        //             loading.close()
        //         })
        // }
        // onMounted(() => {
        //     const code = getQueryValue(route.query.code)
        //     const state = getQueryValue(route.query.state)
        //     if (code && state) {
        //         wexinOauthCallback(code, state)
        //     }
        // })
        return {}
    },
    components: {
        LoginModule,
    },
})
</script>

<style lang="scss" scoped>
.login {
    width: 100%;
    height: calc(100vh - 96px);
    background-image: url('static/login/login-bg.jpg');
    background-size: cover;
    .login-content {
        width: 100%;
        margin: 0px 80px;
        .login-left {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            align-self: flex-start;
            margin-right: 33px;
            .login-title {
                font-size: fontSize(48px);
                @include defaultFontMedium;
                color: $themeBgColor;
                line-height: 67px;
                letter-spacing: 4px;
                margin-top: 68px;
            }
            .login-text {
                font-size: fontSize(30px);
                @include defaultFontMedium;
                color: $themeBgColor;
                line-height: 42px;
                letter-spacing: 2px;
                margin-top: 48px;
            }
        }
        .login-module {
            flex: 0 0 50%;
            width: 50%;
            max-width: 697px;
            min-width: 570px;
            background: $themeBgColor;
            border-radius: 8px;
        }
    }
}
</style>
