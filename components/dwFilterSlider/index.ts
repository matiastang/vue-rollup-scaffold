/*
 * @Author: matiastang
 * @Date: 2022-02-11 11:31:20
 * @LastEditors: matiastang
 * @LastEditTime: 2022-02-11 11:32:48
 * @FilePath: /dw-vue-components/components/dwFilterSlider/index.ts
 * @Description: 导出DwFilterSlider
 */
import { App } from 'vue'
import DwFilterSlider from './src/DwFilterSlider.vue'

// 定义 install 方法， App 作为参数
DwFilterSlider.install = (app: App): void => {
    app.component(DwFilterSlider.name, DwFilterSlider)
}

export default DwFilterSlider
