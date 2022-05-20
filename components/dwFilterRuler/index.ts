/*
 * @Author: matiastang
 * @Date: 2022-02-14 16:01:56
 * @LastEditors: matiastang
 * @LastEditTime: 2022-02-14 16:01:57
 * @FilePath: /dw-vue-components/components/dwFilterRuler/index.ts
 * @Description: DwFilterRuler
 */
import { App } from 'vue'
import DwFilterRuler from './src/DwFilterRuler.vue'

// 定义 install 方法， App 作为参数
DwFilterRuler.install = (app: App): void => {
    app.component(DwFilterRuler.name, DwFilterRuler)
}

export default DwFilterRuler
