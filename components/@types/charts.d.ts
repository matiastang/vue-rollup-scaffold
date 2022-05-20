/*
 * @Author: matiastang
 * @Date: 2022-05-13 10:47:34
 * @LastEditors: matiastang
 * @LastEditTime: 2022-05-13 15:44:26
 * @FilePath: /dw-vue-components/components/@types/charts.d.ts
 * @Description: 类型
 */
/**
 * y轴范围计算设置
 */
export interface RangeRound {
    min: boolean
    max: boolean
    diffPercent: number
    decimal: number
}

/**
 * 图grid
 */
export interface ChartsGrid {
    left: number
    right: number
    top: number
    bottom: number
}

/**
 * 类型转换为可选
 */
export type TypeOptional<T> = {
    [key in keyof T]?: T[key]
}

/**
 * Dw Defect Position
 */

export interface DefectPositionThemeColor {
    color?: string
    gridBackgroundColor: string
    gridBorderColor: string
    tooltipBorderColor: string
    tooltipExtraCssTextBackground: string
    tooltipExtraCssTextColor: string
    xAxisAxisLabelColor: string
    yAxisAxisLineLineStyleColor: string
    yAxisAxisTickLineStyleColor: string
    yAxisAxisLabelColor: string
    seriesLineStyleColor: string
    seriesLineMarkLineLineStyle: string
    seriesLineMarkLineEmphasisLineStyle: string
}
/**
 * 主题颜色
 */
export type DefectPositionOptionalThemeColors = TypeOptional<DefectPositionThemeColor>

/**
 * DefectFactorPositionTrace
 */
export interface DefectFactorPositionTraceThemeColor {
    color?: string
    gridBackgroundColor: string
    gridBorderColor: string
    tooltipBorderColor: string
    tooltipExtraCssTextBackground: string
    tooltipExtraCssTextColor: string
    xAxisAxisLabelColor: string
    yAxisAxisLineLineStyleColor: string
    yAxisAxisTickLineStyleColor: string
    yAxisAxisLabelColor: string
    seriesLineMarkLineLineStyle: string
    seriesLineMarkLineEmphasisLineStyle: string
}
/**
 * 主题颜色
 */
export type DefectFactorPositionTraceOptionalThemeColors = TypeOptional<ThemeColor>

export interface DefectFactorPositionTraceBasePieces {
    color: string
}

export interface DefectFactorPositionTracePieces extends BasePieces {
    [key: string]: string
}

/**
 * DefectFactor
 */
export interface DefectFactorThemeColor {
    color?: string
    gridBackgroundColor: string
    gridBorderColor: string
    tooltipBorderColor: string
    tooltipExtraCssTextBackground: string
    tooltipExtraCssTextColor: string
    xAxisAxisLabelColor: string
    yAxisAxisLineLineStyleColor: string
    yAxisAxisLabelColor: string
    seriesLineAreaStyleStartColor: string
    seriesLineAreaStyleEndColor: string
    seriesLineMarkLineLineStyle: string
    seriesLineMarkLineEmphasisLineStyle: string
}

/**
 * 主题颜色
 */
export type DefectFactorOptionalThemeColors = TypeOptional<DefectFactorThemeColor>
