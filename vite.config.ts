/*
 * @Author: your name
 * @Date: 2021-10-15 16:57:39
 * @LastEditTime: 2021-10-19 17:44:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-scaffold/vite.config.ts
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

export default defineConfig({
	// 共享配置
	plugins: [vue(), vueJsx()],
	resolve: {
		// 别名
		alias: [{ find: '@', replacement: path.resolve(__dirname, './src') }],
	},
	css: {
		modules: {
			localsConvention: 'camelCaseOnly',
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
	},
	// 构建配置
	build: {
		outDir: './build',
		// rollupOptions: {
		//     input:'src/pages/default/index.html'
		// }
	},
})
