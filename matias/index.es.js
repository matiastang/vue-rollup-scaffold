import { defineComponent, computed, openBlock, createElementBlock, createCommentVNode } from 'vue';
import script$1 from './dwFilterRuler.es.js';
export { default as DwFilterRuler } from './dwFilterRuler.es.js';

var script = defineComponent({
    name: 'DwWechatLogin',
    props: {
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
    },
    setup(prop) {
        /**
         * 是否隐藏iframe
         */
        const hidden = computed(() => {
            const appid = prop.appid;
            const scope = prop.scope;
            const redirect_uri = prop.redirect_uri;
            if (appid === undefined) {
                console.error('必传参数appid未传');
                return true;
            }
            if (appid.trim() === '') {
                console.error('必传参数appid为空');
                return true;
            }
            if (scope === undefined) {
                console.error('必传参数scope未传');
                return true;
            }
            if (scope.trim() === '') {
                console.error('必传参数scope为空');
                return true;
            }
            if (redirect_uri === undefined) {
                console.error('必传参数redirect_uri未传');
                return true;
            }
            if (redirect_uri.trim() === '') {
                console.error('必传参数redirect_uri为空');
                return true;
            }
            const state = prop.state;
            if (state) {
                if (state.trim() === '') {
                    console.warn('参数state为空！该参数可用于防止csrf攻击（跨站请求伪造攻击），建议第三方带上该参数，可设置为简单的随机数加session进行校验');
                }
            }
            else {
                console.warn('参数state未传！该参数可用于防止csrf攻击（跨站请求伪造攻击），建议第三方带上该参数，可设置为简单的随机数加session进行校验');
            }
            return false;
        });
        /**
         * 地址
         */
        const loginSrc = computed(() => {
            const state = prop.state;
            let loginSrc = `https://open.weixin.qq.com/connect/qrconnect?appid=${prop.appid}&scope=${prop.scope}&redirect_uri=${prop.redirect_uri}&state=${state ? state : ''}&login_type=jssdk&self_redirect=${prop.self_redirect}`;
            if (prop.styletype) {
                loginSrc += `&styletype=${prop.styletype}`;
            }
            if (prop.sizetype) {
                loginSrc += `&sizetype=${prop.sizetype}`;
            }
            if (prop.bgcolor) {
                loginSrc += `&bgcolor=${prop.bgcolor}`;
            }
            if (prop.rst) {
                loginSrc += `&rst=${prop.rst}`;
            }
            if (prop.style) {
                loginSrc += `&style=${prop.style}`;
            }
            if (prop.href) {
                loginSrc += `&href=${prop.href}`;
            }
            console.log(loginSrc);
            return loginSrc;
        });
        return {
            hidden,
            loginSrc,
        };
    },
});

const _hoisted_1 = { class: "dw-wechat-login-container" };
const _hoisted_2 = ["src", "width", "height"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    (!_ctx.hidden)
      ? (openBlock(), createElementBlock("iframe", {
          key: 0,
          id: "dw-wechat-login-qrcode",
          class: "dw-wechat-login-qrcode",
          src: _ctx.loginSrc,
          width: _ctx.iframeWidth,
          height: _ctx.iframeHeight,
          style: {"border":"none"}
        }, null, 8 /* PROPS */, _hoisted_2))
      : createCommentVNode("v-if", true)
  ]))
}

script.render = render;
script.__scopeId = "data-v-7fb5c734";
script.__file = "src/components/dwWechatLogin/src/DwWechatLogin.vue";

// 定义 install 方法， App 作为参数
script.install = (app) => {
    app.component(script.name, script);
};

// import DwFilterAreaSlider from './dwFilterAreaSlider/index'
// import DwFilterRulerSlider from './dwFilterRulerSlider/index'
// 寻暇记
// import DwDefectDashboard from './dwDefectDashboard/index'
// import DwDefectPositionLine from './dwDefectPositionLine/index'
// import DwDefectFactorLine from './dwDefectFactorLine/index'
// import DwDefectFactorPositionTraceLine from './dwDefectFactorPositionTraceLine/index'
// import _package from '../../package.json'
// 所有组件列表
const components = [
    // 基础
    // DwEcharts,
    // DwLineChart,
    script,
    // DwDragVerify,
    // DwPortfolioBg,
    // DwPortfolioIcon,
    // DwPortfolioLine,
    // DwPortfolioPie,
    // DwPortfolioIndustry,
    // DwPortfolioNetWorth,
    // DwStocksAnalysisLine,
    // DwFilterSlider,
    // DwFilterArea,
    script$1,
    // DwFilterAreaSlider,
    // DwFilterRulerSlider,
    // 寻暇记
    // DwDefectDashboard,
    // DwDefectPositionLine,
    // DwDefectFactorLine,
    // DwDefectFactorPositionTraceLine,
];
// 定义 install 方法， App 作为参数, options
const install = (app) => {
    // 遍历注册所有组件
    components.map((component) => {
        app.component(component.name, component);
    });
};
var index = {
    // version: _package.version,
    install,
};

export { script as DwWechatLogin, index as default };
