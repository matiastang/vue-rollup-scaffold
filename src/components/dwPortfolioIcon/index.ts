/*
 * @Author: matiastang
 * @Date: 2022-01-11 15:48:33
 * @LastEditors: matiastang
 * @LastEditTime: 2022-01-13 11:17:51
 * @FilePath: /dw-vue-components/components/dwPortfolioIcon/index.ts
 * @Description: 导出DwPortfolioIcon
 */
import { App } from 'vue'
import DwPortfolioIcon from './src/DwPortfolioIcon.vue'

// 定义 install 方法， App 作为参数
DwPortfolioIcon.install = (app: App): void => {
    app.component(DwPortfolioIcon.name, DwPortfolioIcon)
}

export default DwPortfolioIcon
