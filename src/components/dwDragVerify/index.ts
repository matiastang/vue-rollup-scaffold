/*
 * @Author: matiastang
 * @Date: 2022-01-05 10:32:56
 * @LastEditors: matiastang
 * @LastEditTime: 2022-01-13 10:24:47
 * @FilePath: /dw-vue-components/components/dwDragVerify/index.ts
 * @Description: 拖拽验证导出
 */
import { App } from 'vue'
import DwDragVerify from './src/DwDragVerify.vue'

// 定义 install 方法， App 作为参数
DwDragVerify.install = (app: App): void => {
    app.component(DwDragVerify.name, DwDragVerify)
}

export default DwDragVerify
