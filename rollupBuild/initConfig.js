/*
 * @Author: matiastang
 * @Date: 2022-05-24 11:05:19
 * @LastEditors: matiastang
 * @LastEditTime: 2022-05-26 10:49:10
 * @FilePath: /vue-rollup-scaffold/rollupBuild/initConfig.js
 * @Description: 全量导出
 */
/**
 * 引用
 */
import { nodeResolve } from '@rollup/plugin-node-resolve'
/**
 * pnpm [semantic error TS2305: Module '"vue"' has no exported member 'App'.](https://github.com/ezolenko/rollup-plugin-typescript2/issues/234)
 */
import typescript2 from 'rollup-plugin-typescript2'
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
 * 压缩
 */
// import { terser } from 'rollup-plugin-terser'

/**
 * 去除无效代码
 */
// import cleanup from 'rollup-plugin-cleanup'

// import postcss from 'rollup-plugin-postcss'
// import eslint from 'rollup-plugin-eslint'
/**
 * 清除文件夹
 */
import clear from 'rollup-plugin-clear'
/**
 * json解析
 */
import json from '@rollup/plugin-json'
/**
 * 压缩
 */
import { terser } from 'rollup-plugin-terser'
/**
 * 去除无效代码
 */
// import cleanup from 'rollup-plugin-cleanup'
/**
 * 获取版本号
 */
import _package_ from '../package.json'

const overrides = {
    compilerOptions: { declaration: true }, // 是否创建 typescript 声明文件
    include: ['*.ts+(|x)', '**/*.ts+(|x)'],
    outDir: `dist_${_package_.version}`, // 指定输出目录
    exclude: [
        // 排除项
        'node_modules',
        'src/App.vue',
        'src/main.ts',
    ],
}

const indexModuleConfig = (external, isDev) => ({
    input: {
        index: 'src/components/index.ts',
    },
    output: {
        dir: `dist_${_package_.version}`,
        format: 'es',
        sourceMap: true,
        // entryFileNames: '[name].[format].js',
        entryFileNames: '[name].js',
        exports: 'named',
    },
    experimentalCodeSplitting: true,
    plugins: [
        clear({
            targets: [`dist_${_package_.version}`],
        }),
        nodeResolve(),
        typescript2({
            // check: true, // 解决`pnpm`时：semantic error TS2305: Module '"vue"' has no exported member 'App'.
            // tsconfig: path.resolve(__dirname, 'tsconfig.json'),
            // tsconfig: 'components/tsconfig.json',
            tsconfigOverride: overrides,
        }),
        vue({
            css: false,
            defaultLang: { script: 'ts' },
        }),
        // cleanup(),
        // postcss({
        //     // modules: true, // 增加 css-module 功能
        //     // extensions: ['.less', '.scss', '.css'],
        //     // use: [
        //     //     [
        //     //         'less',
        //     //         {
        //     //             javascriptEnabled: true,
        //     //         },
        //     //     ],
        //     //     [
        //     //         'scss',
        //     //         {
        //     //             javascriptEnabled: true,
        //     //         },
        //     //     ],
        //     // ],
        //     inject: isDev, // dev 环境下的 样式是入住到 js 中的，其他环境不会注入
        //     extract: false, // 无论是 dev 还是其他环境这个配置项都不做 样式的抽离
        // }),
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
        json(),
        // eslint({
        //     include: ['src/**/*.js'],
        // }),
        terser(),
        // cleanup(),
    ],
    // 将模块视为外部模块，不会打包在库中
    external: (id) => external.some((e) => id.indexOf(e) === 0),
    // ...(isDev
    //     ? {
    //           watch: {
    //               include: 'src/**',
    //               clearScreen: true,
    //           },
    //       }
    //     : {}),
})

export default indexModuleConfig
