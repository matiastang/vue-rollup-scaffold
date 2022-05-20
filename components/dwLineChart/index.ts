/*
 * @Author: matiastang
 * @Date: 2022-05-09 10:46:11
 * @LastEditors: matiastang
 * @LastEditTime: 2022-05-09 11:07:05
 * @FilePath: /dw-vue-components/components/dwLineChart/index.ts
 * @Description:
 */
import { App } from 'vue'
import DwLineChart from './src/DwLineChart.vue'

// 定义 install 方法， App 作为参数
DwLineChart.install = (app: App): void => {
    app.component(DwLineChart.name, DwLineChart)
}

export default DwLineChart
