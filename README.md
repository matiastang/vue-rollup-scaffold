<!--
 * @Author: your name
 * @Date: 2021-10-15 14:16:17
 * @LastEditTime: 2022-04-01 15:55:20
 * @LastEditors: matiastang
 * @Description: In User Settings Edit
 * @FilePath: /datumwealth-front-scaffold/README.md
-->
# vue-scaffold

## 说明

该项目为`西筹金融科技开放平台`前端项目。使用`Vue3`+`TS`+`Vite`开发。

## 运行

1. 安装依赖

> $ pnpm i

2. 开发运行

> $ pnpm run dev

3. 生产打包

> $ pnpm run build

## 版本

### 1.0.0

完成开发平台的基本功能：`登录注册`，`充值购买`，`基础接口展示及调用`，`页面基本适配`。

## package包

* 使用`pnpm`管理三方包

### dependencies

* vue

> "vue": "^3.2.20"

### devDependencies

#### css modules

`.module.css` 为后缀名的 `CSS` 文件都被认为是一个 `CSS modules` 文件。导入这样的文件会返回一个相应的模块对象。
```css
/* index.module.css */
.red {
  color: red;
}
```
```ts
const dom = document.getElementById('title-red')
if (dom) {
    dom.className = classes.red
}
```

#### less

1. 安装
> `pnpm add -D less less-loader`
```json
"less": "^4.1.2",
"less-loader": "^10.2.0",
```
2. 配置
```ts
css: {
     // CSS 预处理器的选项
     preprocessorOptions: {
         less: {
             additionalData: '@import "@/common/less/index.less";',
         },
     },
},
```

### .scss and .sass

1. 安装
> `pnpm add -D sass sass-loader`
```json
"sass": "^1.43.2",
"sass-loader": "^12.2.0",
```
2. 配置
```ts
css: {
   // CSS 预处理器的选项
   preprocessorOptions: {
      scss: {
         additionalData: `
            @use "@/common/css/element-variables.scss" as * ;
            @use "@/common/css/index.scss" as * ;
         `,
      },
   },
},
```

### .styl and .stylus

1. 安装
> `pnpm add -D stylus stylus-loader`
```json
"stylus": "^0.55.0",
"stylus-loader": "^6.2.0",
```
2. 配置
**注意**只能使用相对路径。
```ts
css: {
   // CSS 预处理器的选项
   preprocessorOptions: {
      scss: {
         stylus: {
                additionalData: '@import "../src/common/stylus/index.styl";',
            },
      },
   },
},
```
*注意*由于`Stylus API` 限制，`@import` 别名和 `URL` 变基不支持 `Stylus`。所以不能全局导入
3. 使用
```vue
<style lang="stylus" scoped>
/*
* 全局变量：`$size`
*/
//使用别名@路径引入报错
// @import "@/common/stylus/test.styl"
/*
如果是`webpack`打包则可以使用`@import "~@/common/stylus/test.styl"`。
原因：CSS loader 会把把非根路径的url解释为相对路径， 加~前缀才会解释成模块路径。
*/
// 使用相对路径导入成功，如变量`$testColor`
// @import "../../common/stylus/test.styl"
.home
    display: flex
    justify-content: center
    align-items: center
    & .text
        font-size: $size
        color: #bfbfbf
        line-height: 20px
        text-align: center
    & .body
        color: $testColor
</style>
```
**注意**
`vite`打包只能使用相对路径：`Vite 为 Sass 和 Less 改进了 @import 解析，以保证 Vite 别名也能被使用。另外，url() 中的相对路径引用的，与根文件不同目录中的 Sass/Less 文件会自动变基以保证正确性。由于 Stylus API 限制，@import 别名和 URL 变基不支持 Stylus。`

> "stylus": "^0.55.0",

* typescript

> "typescript": "^4.4.4"

* vite

> "vite": "^2.6.7"

* path路径

> "@types/node": "^16.11.1"

* vue文件解析

> "@vitejs/plugin-vue": "^1.9.3"

* JSX 支持

> "@vitejs/plugin-vue-jsx": "^1.2.0",

* 路由

>  "vue-router": "^4.0.12"

* 状态管理

> "vuex": "^4.0.2"

* ESLint + Prettier

> "@vue/cli-plugin-eslint": "^4.5.14",
> "@vue/eslint-config-prettier": "^6.0.0"
> "@vue/eslint-config-typescript": "^8.0.0"
> "eslint": "^8.0.1"
> "eslint-plugin-prettier": "^4.0.0"
> "eslint-plugin-vue": "^7.19.1"
> "@typescript-eslint/eslint-plugin": "^5.0.0"
> "@typescript-eslint/parser": "^5.0.0",
> "prettier": "^2.4.1"

* 三方组件库

> "element-plus": "^1.2.0-beta.1",

* 请求

> "axios": "^0.24.0",