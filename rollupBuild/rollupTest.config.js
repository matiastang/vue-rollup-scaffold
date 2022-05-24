/*
 * @Author: matiastang
 * @Date: 2022-01-05 17:28:59
 * @LastEditors: matiastang
 * @LastEditTime: 2022-05-23 15:21:58
 * @FilePath: /vue-front-scaffold/rollupBuild/rollup.config.js
 * @Description:
 */
// // import vue from 'rollup-plugin-vue'
// import { nodeResolve } from '@rollup/plugin-node-resolve'
// import path from 'path'
// // import commonjs from '@rollup/plugin-commonjs'
// import { terser } from 'rollup-plugin-terser'
// import typescript from 'rollup-plugin-typescript2'
// import pkg from '../package.json'
// // const deps = Object.keys(pkg.dependencies)
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// import vue from 'rollup-plugin-vue'
// // const vue = require('rollup-plugin-vue')

// export default [
//     {
//         input: path.resolve(__dirname, '../components/index.ts'),
//         output: [
//             {
//                 format: 'es',
//                 file: pkg.module,
//             },
//         ],
//         plugins: [
//             terser(),
//             nodeResolve(),
//             // commonjs(),
//             vue({
//                 target: 'browser',
//                 css: false,
//                 exposeFilename: false,
//             }),
//             typescript({
//                 tsconfigOverride: {
//                     compilerOptions: {
//                         declaration: true,
//                     },
//                     include: ['components/**/*', 'shims-vue.d.ts'],
//                     exclude: ['node_modules', 'packages/**/__tests__/*'],
//                 },
//                 abortOnError: false,
//             }),
//         ],
//         // external(id) {
//         //     return /^vue/.test(id) || deps.some((k) => new RegExp('^' + k).test(id))
//         // },
//     },
// ]
/**
 * "@rollup/plugin-node-resolve": "^13.3.0",
 * rollup 无法识别 node_modules 中的包，@rollup/plugin-node-resolve帮助 rollup 查找外部模块，然后导入
 */
// import * from 'roll
import { nodeResolve } from '@rollup/plugin-node-resolve'
/**
 *  "rollup-plugin-typescript2": "^0.31.2",
 *  "tslib": "^2.3.1",
    "typescript": "^4.5.4",
 */
import typescript from '@rollup/plugin-typescript'
/**
 * [semantic error TS2305: Module '"vue"' has no exported member 'App'.](https://github.com/ezolenko/rollup-plugin-typescript2/issues/234)
 *
 */
import typescript2 from 'rollup-plugin-typescript2'
/**
 * "rollup-plugin-vue": "^6.0.0",
 */
import vue from 'rollup-plugin-vue'
/**
 * "rollup-plugin-scss": "^3.0.0",
 */

/**
 * @rollup/plugin-json
 */
import json from '@rollup/plugin-json'

import styles from 'rollup-plugin-styles'
import postcss from 'rollup-plugin-postcss'

const overrides = {
    compilerOptions: { declaration: true }, // 是否创建 typescript 声明文件
    exclude: [
        // 排除项
        'node_modules',
        'src/App.vue',
        'src/main.ts',
    ],
}

import path from 'path'
console.log(__dirname)

export default {
    // 入口 可以是一个字符串，也可以是对象
    input: {
        index: 'src/test/main.ts',
    },
    // input: 'src/test/main.ts',
    // input: 'src/main.ts',
    // input: 'components/index.ts',
    output: {
        // file: 'dist/index.js',
        // format: 'esm',
        // // name: 'MyBundle',// 变量名，代表你的 iife/umd 包，同一页上的其他脚本可以访问它。
        // exports: 'named',
        // // Governs names of CSS files (for assets from CSS use `hash` option for url handler).
        // // Note: using value below will put `.css` files near js,
        // // but make sure to adjust `hash`, `assetDir` and `publicPath`
        // // options for url handler accordingly.
        // assetFileNames: '[name]-[hash][extname]',
        dir: 'dist', // 可以是 dir 表示输出目录 也可以是 file 表示输出文件
        format: 'es', // 输出的格式 可以是 cjs commonJs 规范 | es es Module 规范 | iife 浏览器可引入的规范
        sourceMap: true,
        entryFileNames: '[name]/index.js',
        exports: 'named',
    },
    // 是否开启代码分割
    experimentalCodeSplitting: true,
    // 需要引入的插件
    plugins: [
        nodeResolve(),
        // typescript(),
        typescript2({
            // check: true, // 解决`pnpm`时：semantic error TS2305: Module '"vue"' has no exported member 'App'.
            // tsconfig: path.resolve(__dirname, 'tsconfig.json'),
            // tsconfig: 'components/tsconfig.json',
            tsconfigOverride: overrides,
        }),
        // typescript({
        //     tsconfigOverride: {
        //         compilerOptions: {
        //             declaration: true,
        //         },
        //         include: ['components/**/*', 'shims-vue.d.ts'],
        //         exclude: ['node_modules', 'packages/**/__tests__/*'],
        //     },
        //     abortOnError: false,
        // }),
        vue({
            css: false,
            // compileTemplate: true,
            defaultLang: { script: 'ts' },
        }),
        json(),
        postcss({
            plugins: [],
        }),
        // styles(),
        // css({ output: 'bundle.css' }),
    ],
    // 将模块视为外部模块，不会打包在库中
    /*
        external 是一个从外部传入的数组表示不需要被打包的包
        通过判断当前处理的包的名称是否已数组中的包名开头，来将其排除
    */
    // external: (id) => external.some((e) => id.indexOf(e) === 0),
    external: ['vue'],
    globals: {
        vue: 'Vue',
    },
    // 文件监听
    watch: {
        include: 'src/**',
        clearScreen: true,
    },
}
