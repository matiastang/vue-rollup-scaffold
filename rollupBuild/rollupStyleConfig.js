/*
 * @Author: matiastang
 * @Date: 2022-05-23 16:00:46
 * @LastEditors: matiastang
 * @LastEditTime: 2022-05-26 11:24:31
 * @FilePath: /vue-rollup-scaffold/rollupBuild/rollupStyleConfig.js
 * @Description: rollup 配置文件
 */
/**
 * 引用
 */
import { nodeResolve } from '@rollup/plugin-node-resolve'
/**
 * pnpm [semantic error TS2305: Module '"vue"' has no exported member 'App'.](https://github.com/ezolenko/rollup-plugin-typescript2/issues/234)
 */
import typescript2 from 'rollup-plugin-typescript2'
/**
 * Vue解析
 */
import vue from 'rollup-plugin-vue'
/**
 * 样式解析
 */
import postcss from 'rollup-plugin-postcss'
/**
 * 自动头部
 * 使用autoprefixer除了以上配置，还需要配置browserslist，有2种方式，一种是建立.browserslistrc文件，另一种是直接在package.json里面配置，我们在package.json中，添加"browserslist"字段。
"browserslist": [
  "defaults",
  "not ie < 8",
  "last 2 versions",
  "> 1%",
  "iOS 7",
  "last 3 iOS versions"
]
 */
import autoprefixer from 'autoprefixer'
/**
 * 使用scss变量
 */
import postcsssimplevars from 'postcss-simple-vars'
/**
 * cssnano对打包后的css进行压缩。使用方式也很简单，和autoprefixer一样，安装cssnano，然后配置。
 */
// 安装必要的 PostCSS插件
// 下面需要安装四个插件，如下插件：
// postcss-simple-vars 可以使用Sass风格的变量(e.g. myColor: #fff;，color:myColor;)而不是冗长的CSS语法(e.g. :root {--myColor: #fff}，color: var(--myColor))。
// postcss-nested 允许使用嵌套规则。实际上我不用它写嵌套规则；
// postcss-cssnext 这个插件集使得大多数现代CSS语法(通过最新的CSS标准)可用，编译后甚至可以在不支持新特性的旧浏览器中工作。
// cssnano — 压缩，减小输出CSS文件大小。相当于JavaScript中对应的UglifyJS。
/**
 * rollup-plugin-postcss可配置是否将css单独分离，默认没有extract，css样式生成style标签内联到head中，配置了extract，就会将css抽离成单独的文件。
 */

import clear from 'rollup-plugin-clear'
// import basePlugin from './rollupBasePluginConfig'
// import basePlugin from './basePlugin'
/**
 * 压缩
 */
import { terser } from 'rollup-plugin-terser'
/**
 * 去除无效代码
 */
import cleanup from 'rollup-plugin-cleanup'
/**
 * 获取版本号
 */
import _package_ from '../package.json'
/**
 * rollup-plugin-serve、rollup-plugin-livereload
这两个插件常常一起使用，rollup-plugin-serve用于启动一个服务器，rollup-plugin-livereload用于文件变化时，实时刷新页面。
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
export default {
  ...
  plugins:[
    serve({
      contentBase: '',  //服务器启动的文件夹，默认是项目根目录，需要在该文件下创建index.html
      port: 8020   //端口号，默认10001
    }),    
    livereload('dist')   //watch dist目录，当目录中的文件发生变化时，刷新页面
  ]
}
 */
import path from 'path'

// const overrides = {
//     compilerOptions: { declaration: true }, // 是否创建 typescript 声明文件
//     include: ['src/components/*.ts+(|x)', 'src/components/**/*.ts+(|x)'],
//     exclude: [
//         // 排除项
//         'node_modules',
//         'src/App.vue',
//         'src/main.ts',
//         'stc/test/**',
//     ],
// }

const createStyleConfig = (moduleName, external) => ({
    input: `src/components/${moduleName}/index.ts`,
    output: {
        file: `dist_${_package_.version}/${moduleName}/index.js`,
        // entryFileNames: 'matias/[name].[format].js',
        format: 'es',
    },
    plugins: [
        clear({
            targets: [`dist_${_package_.version}`],
        }),
        nodeResolve(),
        typescript2({
            // check: true, // 解决`pnpm`时：semantic error TS2305: Module '"vue"' has no exported member 'App'.
            // tsconfig: path.resolve('../src/components/tsconfig.json'),
            tsconfig: './tsconfig.json',
            // tsconfigOverride: overrides,
        }),
        vue({
            css: false,
            defaultLang: { script: 'ts' },
        }),
        // css 处理，暂时没有加插件
        // rollup-plugin-postcss可配置是否将css单独分离，默认没有extract，css样式生成style标签内联到head中，配置了extract，就会将css抽离成单独的文件。
        postcss({
            modules: true, // 增加 css-module 功能
            extensions: ['.less', '.scss', '.sass', '.css'],
            plugins: [postcsssimplevars, autoprefixer],
            // additionalData: `
            //         @use "@/common/scss/element-variables.scss" as * ;
            //         @use "@/common/scss/index.scss" as * ;
            //     `,
            // use: [
            //     // [
            //     //     'less',
            //     //     {
            //     //         javascriptEnabled: true,
            //     //     },
            //     // ],
            //     [
            //         'scss',
            //         {
            //             javascriptEnabled: true,
            //         },
            //     ],
            // ],
            // 样式输出到 createModuleConfig 创建的模块文件夹下
            extract: `index.css`,
        }),
    ],
    external: (id) => external.some((e) => id.indexOf(e) === 0),
})

export default createStyleConfig
