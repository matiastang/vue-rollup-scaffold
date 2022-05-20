/*
 * @Author: matiastang
 * @Date: 2022-02-11 17:52:56
 * @LastEditors: matiastang
 * @LastEditTime: 2022-02-14 17:19:22
 * @FilePath: /dw-vue-components/components/dwFilterArea/index.ts
 * @Description: DwFilterArea
 */
import { App } from 'vue'
import DwFilterArea from './src/DwFilterArea.vue'
// import { ChartItem, CanvasItem } from './src/interface'

// 定义 install 方法， App 作为参数
DwFilterArea.install = (app: App): void => {
    app.component(DwFilterArea.name, DwFilterArea)
}

// export { ChartItem, CanvasItem }

export default DwFilterArea
