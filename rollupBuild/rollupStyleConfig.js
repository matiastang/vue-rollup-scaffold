/*
 * @Author: matiastang
 * @Date: 2022-05-23 16:00:46
 * @LastEditors: matiastang
 * @LastEditTime: 2022-05-23 18:04:26
 * @FilePath: /vue-front-scaffold/rollupBuild/rollupStyleConfig.js
 * @Description: rollup 配置文件
 */
import postcss from 'rollup-plugin-postcss'
import clear from 'rollup-plugin-clear'
// import basePlugin from './rollupBasePluginConfig'
import basePlugin from './basePlugin'

const createStyleConfig = (moduleName, external) => ({
    input: `src/components/${moduleName}/index.ts`,
    output: {
        file: `matias/${moduleName}.js`,
        // entryFileNames: 'matias/[name].[format].js',
        format: 'es',
    },
    plugins: [
        clear({
            targets: ['matias'],
        }),
        ...basePlugin,
        // css 处理，暂时没有加插件
        // rollup-plugin-postcss可配置是否将css单独分离，默认没有extract，css样式生成style标签内联到head中，配置了extract，就会将css抽离成单独的文件。
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
            // 样式输出到 createModuleConfig 创建的模块文件夹下
            extract: `css/${moduleName}/index.css`,
        }),
    ],
    external: (id) => external.some((e) => id.indexOf(e) === 0),
})

export default createStyleConfig
