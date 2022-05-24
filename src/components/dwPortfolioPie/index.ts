/*
 * @Author: matiastang
 * @Date: 2022-01-12 16:39:26
 * @LastEditors: matiastang
 * @LastEditTime: 2022-01-13 18:45:04
 * @FilePath: /dw-vue-components/components/dwPortfolioPie/index.ts
 * @Description: 导出DwPortfolioPie
 */
import { App } from 'vue'
import DwPortfolioPie from './src/DwPortfolioPie.vue'

// 定义 install 方法， App 作为参数
DwPortfolioPie.install = (app: App): void => {
    app.component(DwPortfolioPie.name, DwPortfolioPie)
}

export default DwPortfolioPie
