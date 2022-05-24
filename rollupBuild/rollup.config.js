/*
 * @Author: matiastang
 * @Date: 2022-01-05 17:28:59
 * @LastEditors: matiastang
 * @LastEditTime: 2022-05-23 17:33:10
 * @FilePath: /vue-front-scaffold/rollupBuild/rollup.config.js
 * @Description: rollup配置
 */
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
    compilerOptions: { declaration: false }, // 是否创建 typescript 声明文件
    exclude: [
        // 排除项
        'node_modules',
        'src/App.vue',
        'src/main.ts',
    ],
}

import path from 'path'
console.log(__dirname)
import componentModuleMap from './componentsName'
import componentModuleConfig from './rollupModuleConfig'
import componentStyleConfig from './rollupStyleConfig'
import pkg from '../package.json'

const external = Object.keys(pkg.dependencies)
const isDev = false //process.env.NODE_ENV === 'development';

/*
    dev 情况下不做样式抽离
    其他环境下，除了基本的 js 打包外，遍历要拆分的模块，分别生成一个配置项，在这个配置项中处理各自的样式分离
*/
const rollupConfig = isDev
    ? componentModuleConfig(componentModuleMap, external, isDev)
    : Object.keys(componentModuleMap).map((moduleName) =>
          componentStyleConfig(moduleName, external)
      )

// isDev
//     ? componentModuleConfig(componentModuleMap, external, isDev)
//     : [componentModuleConfig({}, external, isDev)].concat(
//           Object.keys(componentModuleMap).map((moduleName) =>
//               componentStyleConfig(moduleName, external)
//           )
//       )

export default rollupConfig

// export default {
//     // 入口 可以是一个字符串，也可以是对象
//     input: {
//         index: 'src/test/main.ts',
//         ...componentModuleMap,
//     },
//     output: {
//         // file: 'dist/index.js',
//         // format: 'esm',
//         // // name: 'MyBundle',// 变量名，代表你的 iife/umd 包，同一页上的其他脚本可以访问它。
//         // exports: 'named',
//         // // Governs names of CSS files (for assets from CSS use `hash` option for url handler).
//         // // Note: using value below will put `.css` files near js,
//         // // but make sure to adjust `hash`, `assetDir` and `publicPath`
//         // // options for url handler accordingly.
//         // assetFileNames: '[name]-[hash][extname]',
//         dir: 'rollupDist', // 可以是 dir 表示输出目录 也可以是 file 表示输出文件。出口处设置输出到一个 dir 而不是 file
//         format: 'es', // 输出的格式 可以是 cjs commonJs 规范 | es es Module 规范 | iife 浏览器可引入的规范
//         sourceMap: true,
//         entryFileNames: '[name].[format].js', // 输出文件名
//         exports: 'named',
//     },
//     // 是否开启代码分割
//     experimentalCodeSplitting: true,
//     // 需要引入的插件
//     plugins: [
//         nodeResolve(),
//         // typescript(),
//         typescript2({
//             // check: true, // 解决`pnpm`时：semantic error TS2305: Module '"vue"' has no exported member 'App'.
//             // tsconfig: path.resolve(__dirname, 'tsconfig.json'),
//             // tsconfig: 'components/tsconfig.json',
//             tsconfigOverride: overrides,
//         }),
//         vue({
//             css: false,
//             defaultLang: { script: 'ts' },
//         }),
//         json(),
//         postcss({
//             plugins: [],
//         }),
//     ],
//     // 将模块视为外部模块，不会打包在库中
//     /*
//         external 是一个从外部传入的数组表示不需要被打包的包
//         通过判断当前处理的包的名称是否已数组中的包名开头，来将其排除
//     */
//     // external: (id) => external.some((e) => id.indexOf(e) === 0),
//     external: ['vue'],
//     globals: {
//         vue: 'Vue',
//     },
//     // 文件监听
//     // watch: {
//     //     include: 'src/**',
//     //     clearScreen: true,
//     // },
// }
