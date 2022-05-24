/*
 * @Author: matiastang
 * @Date: 2022-01-12 10:24:11
 * @LastEditors: matiastang
 * @LastEditTime: 2022-01-13 10:24:25
 * @FilePath: /dw-vue-components/components/dwPortfolioLine/index.ts
 * @Description: 导出DwPortfolioLine
 */
import { App } from 'vue'
import DwPortfolioLine from './src/DwPortfolioLine.vue'

// 定义 install 方法， App 作为参数
DwPortfolioLine.install = (app: App): void => {
    app.component(DwPortfolioLine.name, DwPortfolioLine)
}

export default DwPortfolioLine
