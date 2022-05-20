/*
 * @Author: matiastang
 * @Date: 2022-05-09 17:08:31
 * @LastEditors: matiastang
 * @LastEditTime: 2022-05-10 09:50:52
 * @FilePath: /dw-vue-components/components/dwDefectPositionLine/index.ts
 * @Description: 西筹-大v-寻暇记-权益仓位-折线图
 */
import { App } from 'vue'
import DwDefectPositionLine from './src/DwDefectPositionLine.vue'

// 定义 install 方法， App 作为参数
DwDefectPositionLine.install = (app: App): void => {
    app.component(DwDefectPositionLine.name, DwDefectPositionLine)
}

export default DwDefectPositionLine
