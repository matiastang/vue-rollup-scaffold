/*
 * @Author: matiastang
 * @Date: 2022-03-21 10:15:40
 * @LastEditors: matiastang
 * @LastEditTime: 2022-03-21 10:18:26
 * @FilePath: /dw-vue-components/components/dwPortfolioNetWorth/index.ts
 * @Description: 导出DwPortfolioNetWorth
 */
import { App } from 'vue'
import DwPortfolioNetWorth from './src/DwPortfolioNetWorth.vue'

// 定义 install 方法， App 作为参数
DwPortfolioNetWorth.install = (app: App): void => {
    app.component(DwPortfolioNetWorth.name, DwPortfolioNetWorth)
}

export default DwPortfolioNetWorth
