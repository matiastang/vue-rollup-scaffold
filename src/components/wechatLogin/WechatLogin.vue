<!--
 * @Author: matiastang
 * @Date: 2021-12-21 17:46:03
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-22 11:09:15
 * @FilePath: /datumwealth-openalpha-front/src/components/wechatLogin/WechatLogin.vue
 * @Description: 微信登录
 * https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html
 * http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js
-->
<template>
    <div class="wechat-login-container">
        <iframe
            v-if="!hidden"
            id="wechat-login-qrcode"
            class="wechat-login-qrcode"
            :src="loginSrc"
            :width="iframeWidth"
            :height="iframeHeight"
        ></iframe>
    </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

const prop = defineProps({
    /**
     * 非必传，默认值为false
     * true：手机点击确认登录后可以在 iframe 内跳转到 redirect_uri
     * false：手机点击确认登录后可以在 top window 跳转到 redirect_uri。
     */
    self_redirect: {
        type: Boolean,
        default: false,
    },
    /**
     * 必传
     * 应用唯一标识，在微信开放平台提交应用审核通过后获得
     */
    appid: {
        type: String,
    },
    /**
     * 必传
     * 应用授权作用域，拥有多个作用域用逗号（,）分隔，网页应用目前仅填写snsapi_login即可
     */
    scope: {
        type: String,
    },
    /**
     * 必传
     * 重定向地址，需要进行UrlEncode
     */
    redirect_uri: {
        type: String,
    },
    /**
     * 非必传，建议传
     * 用于保持请求和回调的状态，授权请求后原样带回给第三方。该参数可用于防止csrf攻击（跨站请求伪造攻击），建议第三方带上该参数，可设置为简单的随机数加session进行校验
     */
    state: {
        type: String,
    },
    /**
     * 非必传
     * 提供"black"、"white"可选，默认为黑色文字描述。详见文档底部FAQ
     */
    style: {
        type: String,
    },
    /**
     * 非必传
     * 自定义样式链接，第三方可根据实际需求覆盖默认样式。详见文档底部FAQ
     */
    href: {
        type: String,
    },
    styletype: {
        type: String,
    },
    sizetype: {
        type: String,
    },
    bgcolor: {
        type: String,
    },
    rst: {
        type: String,
    },
    /**
     * 非必传
     * iframe的宽度，默认300px
     */
    iframeWidth: {
        type: Number,
        default: 300,
    },
    /**
     * 非必传
     * iframe的高度，默认300px
     */
    iframeHeight: {
        type: Number,
        default: 400,
    },
})

/**
 * 是否隐藏iframe
 */
const hidden = computed(() => {
    const appid = prop.appid
    const scope = prop.scope
    const redirect_uri = prop.redirect_uri
    if (appid === undefined) {
        console.error('必传参数appid未传')
        return true
    }
    if (appid.trim() === '') {
        console.error('必传参数appid为空')
        return true
    }
    if (scope === undefined) {
        console.error('必传参数scope未传')
        return true
    }
    if (scope.trim() === '') {
        console.error('必传参数scope为空')
        return true
    }
    if (redirect_uri === undefined) {
        console.error('必传参数redirect_uri未传')
        return true
    }
    if (redirect_uri.trim() === '') {
        console.error('必传参数redirect_uri为空')
        return true
    }
    const state = prop.state
    if (state) {
        if (state.trim() === '') {
            console.warn(
                '参数state为空！该参数可用于防止csrf攻击（跨站请求伪造攻击），建议第三方带上该参数，可设置为简单的随机数加session进行校验'
            )
        }
    } else {
        console.warn(
            '参数state未传！该参数可用于防止csrf攻击（跨站请求伪造攻击），建议第三方带上该参数，可设置为简单的随机数加session进行校验'
        )
    }
    return false
})

/**
 * 地址
 */
const loginSrc = computed(() => {
    const state = prop.state
    let loginSrc = `https://open.weixin.qq.com/connect/qrconnect?appid=${prop.appid}&scope=${
        prop.scope
    }&redirect_uri=${prop.redirect_uri}&state=${
        state ? state : ''
    }&login_type=jssdk&self_redirect=${prop.self_redirect}`
    if (prop.styletype) {
        loginSrc += `&styletype=${prop.styletype}`
    }
    if (prop.sizetype) {
        loginSrc += `&sizetype=${prop.sizetype}`
    }
    if (prop.bgcolor) {
        loginSrc += `&bgcolor=${prop.bgcolor}`
    }
    if (prop.rst) {
        loginSrc += `&rst=${prop.rst}`
    }
    if (prop.style) {
        loginSrc += `&style=${prop.style}`
    }
    if (prop.href) {
        loginSrc += `&href=${prop.href}`
    }
    console.log(loginSrc)
    return loginSrc
})
</script>

<style lang="scss" scoped>
.wechat-login-container {
    width: 300px;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    .wechat-login-qrcode {
        border: none;
    }
}
</style>
