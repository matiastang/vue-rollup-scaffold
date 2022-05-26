/*
 * @Author: matiastang
 * @Date: 2022-05-23 16:23:38
 * @LastEditors: matiastang
 * @LastEditTime: 2022-05-25 15:06:57
 * @FilePath: /vue-rollup-scaffold/rollupBuild/basePlugin.js
 * @Description: 基础插件
 */

import { nodeResolve } from '@rollup/plugin-node-resolve'
/**
 * pnpm [semantic error TS2305: Module '"vue"' has no exported member 'App'.](https://github.com/ezolenko/rollup-plugin-typescript2/issues/234)
 */
import typescript2 from 'rollup-plugin-typescript2'
import vue from 'rollup-plugin-vue'

/**
 * 压缩
 */
import { terser } from 'rollup-plugin-terser'

/**
 * 去除无效代码
 */
import cleanup from 'rollup-plugin-cleanup'

const overrides = {
    compilerOptions: { declaration: false }, // 是否创建 typescript 声明文件
    exclude: [
        // 排除项
        'node_modules',
        'src/App.vue',
        'src/main.ts',
    ],
}

const config = [
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
    cleanup(),
]
export default config
