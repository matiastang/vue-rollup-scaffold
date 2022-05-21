/*
 * @Author: matiastang
 * @Date: 2022-01-05 17:28:59
 * @LastEditors: matiastang
 * @LastEditTime: 2022-05-21 17:05:37
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
import { nodeResolve } from '@rollup/plugin-node-resolve'
/**
 *  "rollup-plugin-typescript2": "^0.31.2",
 *  "tslib": "^2.3.1",
    "typescript": "^4.5.4",
 */
import typescript from 'rollup-plugin-typescript2'
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
// import json from '@rollup/plugin-json'
export default {
    input: 'src/test/index.ts',
    // input: 'src/main.ts',
    output: {
        file: 'bundle.js',
        format: 'esm',
        // name: 'MyBundle',// 变量名，代表你的 iife/umd 包，同一页上的其他脚本可以访问它。
        exports: 'named',
    },
    plugins: [
        nodeResolve(),
        typescript(),
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
        vue(),
        // json(),
    ],
    external: ['vue'],
    globals: {
        vue: 'Vue',
    },
}
