/*
 * @Author: matiastang
 * @Date: 2022-02-14 17:21:58
 * @LastEditors: matiastang
 * @LastEditTime: 2022-02-15 09:55:48
 * @FilePath: /dw-vue-components/components/dwFilterAreaSlider/index.ts
 * @Description: DwFilterAreaSlider
 */
import { App } from 'vue'
import DwFilterAreaSlider from './src/DwFilterAreaSlider.vue'

// 定义 install 方法， App 作为参数
DwFilterAreaSlider.install = (app: App): void => {
    app.component(DwFilterAreaSlider.name, DwFilterAreaSlider)
}

export default DwFilterAreaSlider
