/*
 * @Author: your name
 * @Date: 2021-10-15 17:23:18
 * @LastEditTime: 2021-10-19 17:17:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-scaffold/global.d.ts
 */
/* eslint-disable */
declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	const component: DefineComponent<{}, {}, any>
	export default component
}
