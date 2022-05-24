/*
 * @Author: matiastang
 * @Date: 2022-01-11 11:26:24
 * @LastEditors: matiastang
 * @LastEditTime: 2022-01-13 10:24:43
 * @FilePath: /dw-vue-components/components/dwPortfolioBg/index.ts
 * @Description: DwPortfolioBg导出
 */
import { App } from 'vue'
import DwPortfolioBg from './src/DwPortfolioBg.vue'

// 定义 install 方法， App 作为参数
DwPortfolioBg.install = (app: App): void => {
    app.component(DwPortfolioBg.name, DwPortfolioBg)
}

export default DwPortfolioBg
