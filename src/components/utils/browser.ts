/*
 * @Author: matiastang
 * @Date: 2022-01-11 18:57:04
 * @LastEditors: matiastang
 * @LastEditTime: 2022-01-12 10:14:42
 * @FilePath: /dw-vue-components/components/utils/browser.ts
 * @Description: 浏览器信息
 */
/**
 * 获取浏览器信息
 */
const browserInfo = () => {
    const u = navigator.userAgent,
        app = navigator.appVersion
    const versions = {
        /**
         * IE内核
         */
        trident: u.indexOf('Trident') > -1, // IE内核
        /**
         * opera内核
         */
        presto: u.indexOf('Presto') > -1, //opera内核
        /**
         * 苹果、谷歌内核
         */
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        /**
         * 火狐内核
         */
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
        /**
         * 是否为移动终端
         */
        mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
        /**
         * ios终端
         */
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        /**
         * android终端或者uc浏览器
         */
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
        /**
         * 是否为iPhone或者QQHD浏览器
         */
        iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
        /**
         * 是否iPad
         */
        iPad: u.indexOf('iPad') > -1, //是否iPad
        /**
         * 是否web应该程序，没有头部与底部
         */
        webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
    }
    // const language = (navigator.browserLanguage || navigator.language).toLowerCase()
    const language = navigator.language.toLowerCase()
    return {
        versions,
        language,
    }
}

export default browserInfo
