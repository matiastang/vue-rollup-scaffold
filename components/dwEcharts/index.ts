/*
 * @Author: matiastang
 * @Date: 2022-05-09 09:47:23
 * @LastEditors: matiastang
 * @LastEditTime: 2022-05-09 09:49:29
 * @FilePath: /dw-vue-components/components/dwEcharts/index.ts
 * @Description: echarts容器
 */
import { App } from 'vue'
import DwEcharts from './src/DwEcharts.vue'

// 定义 install 方法， App 作为参数
DwEcharts.install = (app: App): void => {
    app.component(DwEcharts.name, DwEcharts)
}

export default DwEcharts
