declare const _default: import("vue").DefineComponent<{
    /**
     * 非必传，默认值为false
     * true：手机点击确认登录后可以在 iframe 内跳转到 redirect_uri
     * false：手机点击确认登录后可以在 top window 跳转到 redirect_uri。
     */
    self_redirect: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 必传
     * 应用唯一标识，在微信开放平台提交应用审核通过后获得
     */
    appid: {
        type: StringConstructor;
    };
    /**
     * 必传
     * 应用授权作用域，拥有多个作用域用逗号（,）分隔，网页应用目前仅填写snsapi_login即可
     */
    scope: {
        type: StringConstructor;
    };
    /**
     * 必传
     * 重定向地址，需要进行UrlEncode
     */
    redirect_uri: {
        type: StringConstructor;
    };
    /**
     * 非必传，建议传
     * 用于保持请求和回调的状态，授权请求后原样带回给第三方。该参数可用于防止csrf攻击（跨站请求伪造攻击），建议第三方带上该参数，可设置为简单的随机数加session进行校验
     */
    state: {
        type: StringConstructor;
    };
    /**
     * 非必传
     * 提供"black"、"white"可选，默认为黑色文字描述。详见文档底部FAQ
     */
    style: {
        type: StringConstructor;
    };
    /**
     * 非必传
     * 自定义样式链接，第三方可根据实际需求覆盖默认样式。详见文档底部FAQ
     */
    href: {
        type: StringConstructor;
    };
    styletype: {
        type: StringConstructor;
    };
    sizetype: {
        type: StringConstructor;
    };
    bgcolor: {
        type: StringConstructor;
    };
    rst: {
        type: StringConstructor;
    };
    /**
     * 非必传
     * iframe的宽度，默认300px
     */
    iframeWidth: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * 非必传
     * iframe的高度，默认300px
     */
    iframeHeight: {
        type: NumberConstructor;
        default: number;
    };
}, {
    hidden: import("vue").ComputedRef<boolean>;
    loginSrc: import("vue").ComputedRef<string>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * 非必传，默认值为false
     * true：手机点击确认登录后可以在 iframe 内跳转到 redirect_uri
     * false：手机点击确认登录后可以在 top window 跳转到 redirect_uri。
     */
    self_redirect: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 必传
     * 应用唯一标识，在微信开放平台提交应用审核通过后获得
     */
    appid: {
        type: StringConstructor;
    };
    /**
     * 必传
     * 应用授权作用域，拥有多个作用域用逗号（,）分隔，网页应用目前仅填写snsapi_login即可
     */
    scope: {
        type: StringConstructor;
    };
    /**
     * 必传
     * 重定向地址，需要进行UrlEncode
     */
    redirect_uri: {
        type: StringConstructor;
    };
    /**
     * 非必传，建议传
     * 用于保持请求和回调的状态，授权请求后原样带回给第三方。该参数可用于防止csrf攻击（跨站请求伪造攻击），建议第三方带上该参数，可设置为简单的随机数加session进行校验
     */
    state: {
        type: StringConstructor;
    };
    /**
     * 非必传
     * 提供"black"、"white"可选，默认为黑色文字描述。详见文档底部FAQ
     */
    style: {
        type: StringConstructor;
    };
    /**
     * 非必传
     * 自定义样式链接，第三方可根据实际需求覆盖默认样式。详见文档底部FAQ
     */
    href: {
        type: StringConstructor;
    };
    styletype: {
        type: StringConstructor;
    };
    sizetype: {
        type: StringConstructor;
    };
    bgcolor: {
        type: StringConstructor;
    };
    rst: {
        type: StringConstructor;
    };
    /**
     * 非必传
     * iframe的宽度，默认300px
     */
    iframeWidth: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * 非必传
     * iframe的高度，默认300px
     */
    iframeHeight: {
        type: NumberConstructor;
        default: number;
    };
}>>, {
    self_redirect: boolean;
    iframeWidth: number;
    iframeHeight: number;
}>;
export default _default;
