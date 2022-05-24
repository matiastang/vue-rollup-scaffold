/*
 * @Author: matiastang
 * @Date: 2022-05-10 10:41:00
 * @LastEditors: matiastang
 * @LastEditTime: 2022-05-19 16:54:36
 * @FilePath: /dw-vue-components/components/dwDefectFactorPositionTraceLine/index.ts
 * @Description: 西筹-大v-寻暇记-权益仓位-权益&仓位-折线图
 */
import { App } from 'vue'
import DwDefectFactorPositionTraceLine from './src/DwDefectFactorPositionTraceLine.vue'
// const DwDefectFactorPositionTraceLine = () => import('./src/DwDefectFactorPositionTraceLine.vue')

// 定义 install 方法， App 作为参数
DwDefectFactorPositionTraceLine.install = (app: App): void => {
    app.component(DwDefectFactorPositionTraceLine.name, DwDefectFactorPositionTraceLine)
}

export default DwDefectFactorPositionTraceLine
