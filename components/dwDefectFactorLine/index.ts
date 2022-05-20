/*
 * @Author: matiastang
 * @Date: 2022-05-10 09:50:09
 * @LastEditors: matiastang
 * @LastEditTime: 2022-05-10 09:52:36
 * @FilePath: /dw-vue-components/components/dwDefectFactorLine/index.ts
 * @Description: 西筹-大v-寻暇记-因子收益率-折线图
 */
import { App } from 'vue'
import DwDefectFactorLine from './src/DwDefectFactorLine.vue'

// 定义 install 方法， App 作为参数
DwDefectFactorLine.install = (app: App): void => {
    app.component(DwDefectFactorLine.name, DwDefectFactorLine)
}

export default DwDefectFactorLine
