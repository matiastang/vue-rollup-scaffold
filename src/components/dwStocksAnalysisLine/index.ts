/*
 * @Author: matiastang
 * @Date: 2022-01-13 14:21:56
 * @LastEditors: matiastang
 * @LastEditTime: 2022-01-13 17:47:57
 * @FilePath: /dw-vue-components/components/dwStocksAnalysisLine/index.ts
 * @Description: 导出DwStocksAnalysisLine
 */
import { App } from 'vue'
import DwStocksAnalysisLine, { AnalyzeType, ReportType } from './src/DwStocksAnalysisLine.vue'

// 定义 install 方法， App 作为参数
DwStocksAnalysisLine.install = (app: App): void => {
    app.component(DwStocksAnalysisLine.name, DwStocksAnalysisLine)
}

export { AnalyzeType, ReportType }

export default DwStocksAnalysisLine
