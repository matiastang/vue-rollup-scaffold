/*
 * @Author: matiastang
 * @Date: 2022-01-12 18:43:05
 * @LastEditors: matiastang
 * @LastEditTime: 2022-01-13 09:56:06
 * @FilePath: /dw-vue-components/components/dwPortfolioIndustry/index.ts
 * @Description: 导出DwPortfolioIndustry
 */
import { App } from 'vue'
import DwPortfolioIndustry from './src/DwPortfolioIndustry.vue'

// 定义 install 方法， App 作为参数
DwPortfolioIndustry.install = (app: App): void => {
    app.component(DwPortfolioIndustry.name, DwPortfolioIndustry)
}

export default DwPortfolioIndustry
