/*
 * @Author: matiastang
 * @Date: 2022-02-15 09:54:23
 * @LastEditors: matiastang
 * @LastEditTime: 2022-02-15 09:56:09
 * @FilePath: /dw-vue-components/components/dwFilterRulerSlider/index.ts
 * @Description:
 */
import { App } from 'vue'
import DwFilterRulerSlider from './src/DwFilterRulerSlider.vue'

// 定义 install 方法， App 作为参数
DwFilterRulerSlider.install = (app: App): void => {
    app.component(DwFilterRulerSlider.name, DwFilterRulerSlider)
}

export default DwFilterRulerSlider
