/*
 * @Author: your name
 * @Date: 2021-10-15 16:57:39
 * @LastEditTime: 2022-05-24 14:59:28
 * @LastEditors: matiastang
 * @Description: In User Settings Edit
 * @FilePath: /vue-rollup-scaffold/vite.config.ts
 */
// vite配置文件vite.config.js

// node路径
import path from 'path'
// vite
import { defineConfig } from 'vite'
// 解析.vue文件
import vue from '@vitejs/plugin-vue'
// 解析.jsx语法
import vueJsx from '@vitejs/plugin-vue-jsx'
// 手动导入使用 unplugin-element-plus
// import ElementPlus from 'unplugin-element-plus/vite'
// 自动导入使用 unplugin-vue-components
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 开启GZIP压缩
import compressPlugin from 'vite-plugin-compression'
// 图片压缩
import viteImagemin from 'vite-plugin-imagemin'
import config from './loadenv'
// 加载.svg
import svgLoader from 'vite-svg-loader'

import Inspect from 'vite-plugin-inspect'
import _package from './package.json'

export default defineConfig(({ mode, command }) => {
    return {
        // 共享配置
        plugins: [
            vue(),
            svgLoader(),
            vueJsx(),
            Components({
                resolvers: [
                    ElementPlusResolver({
                        importStyle: 'sass',
                        // directives: true,
                        // version: "1.2.0-beta.1",
                    }),
                ],
            }),
            // ElementPlus({
            //     useSource: true,
            // }),

            compressPlugin({
                ext: '.gz', //gz br
                algorithm: 'gzip', //brotliCompress gzip
                deleteOriginFile: false,
            }),
            viteImagemin({
                gifsicle: {
                    optimizationLevel: 7,
                    interlaced: false,
                },
                optipng: {
                    optimizationLevel: 7,
                },
                webp: {
                    quality: 75,
                },
                mozjpeg: {
                    quality: 65,
                },
                pngquant: {
                    quality: [0.65, 0.9],
                    speed: 4,
                },
            }),
            Inspect(),
        ],
        resolve: {
            // 别名
            alias: [
                { find: 'root', replacement: path.resolve(__dirname, './') },
                { find: '@', replacement: path.resolve(__dirname, './src') },
                { find: 'static', replacement: path.resolve(__dirname, './static') },
                { find: 'store', replacement: path.resolve(__dirname, './src/store') },
                { find: 'utils', replacement: path.resolve(__dirname, './src/common/utils') },
            ],
        },
        css: {
            modules: {
                /**
                 * generateScopedName和hashPrefix申明了，使用cssModules时样式的名称转换
                 */
                generateScopedName: '[name]-[local]-[hash:base64:6]',
                hashPrefix: 'prefix',
                localsConvention: 'camelCaseOnly',
            },
            // CSS 预处理器的选项
            preprocessorOptions: {
                less: {
                    additionalData: '@import "@/common/less/index.less";',
                    // 支持内联 JavaScript
                    javascriptEnabled: true,
                },
                scss: {
                    additionalData: `
                    @use "@/common/scss/element-variables.scss" as * ;
                    @use "@/common/scss/index.scss" as * ;
                `,
                },
                sass: {},
                stylus: {
                    additionalData: '@import "../src/common/stylus/index.styl";',
                },
            },
        },
        // 开发服务配置
        server: {
            host: '0.0.0.0',
            port: 3000,
            strictPort: true,
            fs: {
                strict: false,
            },
            proxy: {
                // 选项写法
                [config.VITE_APP_BASE_API]: {
                    target: config.VITE_APP_BASE_HOST, // 所要代理的目标地址
                    rewrite: (path) => path.replace(/^\/dev-api/, ''), // 重写传过来的path路径，比如 `/api/index/1?id=10&name=zs`（注意:path路径最前面有斜杠（/），因此，正则匹配的时候不要忘了是斜杠（/）开头的；选项的 key 也是斜杠（/）开头的）
                    changeOrigin: true, // true/false, Default: false - changes the origin of the host header to the target URL
                },
            },
        },
        // 构建配置
        build: {
            outDir: mode === 'production' ? `dist_${_package.version}` : 'dist',
            assetsInlineLimit: 10240,
            // rollupOptions: {
            //     input:'src/pages/default/index.html'
            // }
        },
    }
})
