/*
 * @Author: matiastang
 * @Date: 2022-05-10 15:30:38
 * @LastEditors: matiastang
 * @LastEditTime: 2022-05-10 15:33:28
 * @FilePath: /dw-vue-components/components/dwDefectDashboard/index.ts
 * @Description: 西筹-大v-寻暇记-仪表盘图
 */
import { App } from 'vue'
import DwDefectDashboard from './src/DwDefectDashboard.vue'

// 定义 install 方法， App 作为参数
DwDefectDashboard.install = (app: App): void => {
    app.component(DwDefectDashboard.name, DwDefectDashboard)
}

export default DwDefectDashboard
