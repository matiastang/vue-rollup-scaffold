/*
 * @Author: matiastang
 * @Date: 2022-05-23 16:00:27
 * @LastEditors: matiastang
 * @LastEditTime: 2022-05-25 17:21:28
 * @FilePath: /vue-rollup-scaffold/rollupBuild/rollupModuleConfig.js
 * @Description: rollup 配置文件
 */
import postcss from 'rollup-plugin-postcss'
// import eslint from 'rollup-plugin-eslint'
import clear from 'rollup-plugin-clear'
// import basePlugin from './rollupBasePluginConfig'
import basePlugin from './basePlugin'

const overrides = {
    compilerOptions: { declaration: false }, // 是否创建 typescript 声明文件
    exclude: [
        // 排除项
        'node_modules',
        'src/App.vue',
        'src/main.ts',
    ],
}

const createModuleConfig = (cModuleMap, external, isDev) => ({
    input: {
        // index: 'src/test/main.ts',
        index: 'src/components/index.ts',
        ...cModuleMap,
    },
    output: {
        dir: 'es',
        format: 'es',
        sourceMap: true,
        entryFileNames: '[name].[format].js',
        exports: 'named',
    },
    experimentalCodeSplitting: true,
    plugins: [
        clear({
            targets: ['es'],
        }),
        ...basePlugin,
        postcss({
            // modules: true, // 增加 css-module 功能
            // extensions: ['.less', '.scss', '.css'],
            // use: [
            //     [
            //         'less',
            //         {
            //             javascriptEnabled: true,
            //         },
            //     ],
            //     [
            //         'scss',
            //         {
            //             javascriptEnabled: true,
            //         },
            //     ],
            // ],
            inject: false, //isDev, // dev 环境下的 样式是入住到 js 中的，其他环境不会注入
            extract: true, // 无论是 dev 还是其他环境这个配置项都不做 样式的抽离
        }),
        // eslint({
        //     include: ['src/**/*.js'],
        // }),
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

export default createModuleConfig
