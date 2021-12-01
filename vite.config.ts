/*
 * @Author: your name
 * @Date: 2021-10-15 16:57:39
 * @LastEditTime: 2021-12-01 15:31:59
 * @LastEditors: matiastang
 * @Description: In User Settings Edit
 * @FilePath: /datumwealth-openalpha-front/vite.config.ts
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

const proxyPath = '/dev-api'
const target = 'https://test.openalpha.cn/open' //'https://test.mini.datumwealth.cn/open'

export default defineConfig({
    // 共享配置
    plugins: [
        vue(),
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
            localsConvention: 'camelCaseOnly',
        },
        // CSS 预处理器的选项
        preprocessorOptions: {
            less: {},
            scss: {
                additionalData: `
                    @use "@/common/css/element-variables.scss" as * ;
                    @use "@/common/css/index.scss" as * ;
                `,
            },
            sass: {},
        },
    },
    // 开发服务配置
    server: {
        host: '127.0.0.1',
        port: 3000,
        strictPort: true,
        fs: {
            strict: false,
        },
        proxy: {
            // 选项写法
            [proxyPath]: {
                target, // 所要代理的目标地址
                rewrite: (path) => path.replace(/^\/dev-api/, ''), // 重写传过来的path路径，比如 `/api/index/1?id=10&name=zs`（注意:path路径最前面有斜杠（/），因此，正则匹配的时候不要忘了是斜杠（/）开头的；选项的 key 也是斜杠（/）开头的）
                changeOrigin: true, // true/false, Default: false - changes the origin of the host header to the target URL
            },
        },
    },
    // 构建配置
    build: {
        outDir: './build',
        assetsInlineLimit: 10240,
        // rollupOptions: {
        //     input:'src/pages/default/index.html'
        // }
    },
})
