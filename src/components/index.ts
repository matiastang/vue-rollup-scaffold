/*
 * @Author: matiastang
 * @Date: 2021-12-30 15:31:25
 * @LastEditors: matiastang
 * @LastEditTime: 2022-05-23 17:17:06
 * @FilePath: /vue-front-scaffold/src/components/index.ts
 * @Description: 导出所有组件
 */
import { App } from 'vue'
import DwWechatLogin from './dwWechatLogin/index'
import DwDragVerify from './dwDragVerify/index'
// 类型
// export * from './@types/index'
// 基础
// import DwEcharts from './dwEcharts/index'
// import DwLineChart from './dwLineChart/index'
// 西筹基金组合小程序图谱组件
// import DwPortfolioBg from './dwPortfolioBg/index'
// import DwPortfolioIcon from './dwPortfolioIcon/index'
// import DwPortfolioLine from './dwPortfolioLine/index'
// import DwPortfolioPie from './dwPortfolioPie/index'
// import DwPortfolioIndustry from './dwPortfolioIndustry/index'
// import DwPortfolioNetWorth from './dwPortfolioNetWorth/index'
// 西筹个股分析小程序图谱组件
// import DwStocksAnalysisLine, { AnalyzeType, ReportType } from './dwStocksAnalysisLine/index'
// 基金筛选
// import DwFilterSlider from './dwFilterSlider/index'
// import DwFilterArea from './dwFilterArea/index'
// // import { ChartItem, CanvasItem } from './dwFilterArea/src/interface'
// import DwFilterRuler from './dwFilterRuler/index'
// import DwFilterAreaSlider from './dwFilterAreaSlider/index'
// import DwFilterRulerSlider from './dwFilterRulerSlider/index'
// 寻暇记
// import DwDefectDashboard from './dwDefectDashboard/index'
// import DwDefectPositionLine from './dwDefectPositionLine/index'
// import DwDefectFactorLine from './dwDefectFactorLine/index'
// import DwDefectFactorPositionTraceLine from './dwDefectFactorPositionTraceLine/index'

import _package from '../../package.json'

// 所有组件列表
const components = [
    // 基础
    // DwEcharts,
    // DwLineChart,
    DwWechatLogin,
    // DwDragVerify,
    // DwPortfolioBg,
    // DwPortfolioIcon,
    // DwPortfolioLine,
    // DwPortfolioPie,
    // DwPortfolioIndustry,
    // DwPortfolioNetWorth,
    // DwStocksAnalysisLine,
    // DwFilterSlider,
    // DwFilterArea,
    // DwFilterRuler,
    // DwFilterAreaSlider,
    // DwFilterRulerSlider,
    // 寻暇记
    // DwDefectDashboard,
    // DwDefectPositionLine,
    // DwDefectFactorLine,
    // DwDefectFactorPositionTraceLine,
]

// 定义 install 方法， App 作为参数, options
const install = (app: App): void => {
    // 遍历注册所有组件
    components.map((component) => {
        app.component(component.name, component)
    })
}

export {
    // initEcharts,
    // 基础
    // DwEcharts,
    // DwLineChart,
    // 西筹“基金筛选”小程序
    // DwFilterSlider,
    // DwFilterArea,
    // // ChartItem,
    // // CanvasItem,
    // DwFilterRuler,
    // DwFilterAreaSlider,
    // DwFilterRulerSlider,
    // // 西筹“个股分析”小程序
    // DwStocksAnalysisLine,
    // AnalyzeType,
    // ReportType,
    // 西筹“基金组合”小程序
    // DwPortfolioBg,
    // DwPortfolioIcon,
    // DwPortfolioLine,
    // DwPortfolioPie,
    // DwPortfolioIndustry,
    // DwPortfolioNetWorth,
    // 西筹通用组件
    DwWechatLogin,
    DwDragVerify,
    // 寻暇记
    // DwDefectDashboard,
    // DwDefectPositionLine,
    // DwDefectFactorLine,
    // DwDefectFactorPositionTraceLine,
}

export default {
    version: _package.version,
    install,
}
