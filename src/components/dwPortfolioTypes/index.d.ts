/*
 * @Author: matiastang
 * @Date: 2022-01-13 09:55:03
 * @LastEditors: matiastang
 * @LastEditTime: 2022-01-13 11:29:47
 * @FilePath: /dw-vue-components/components/dwPortfolioTypes/index.d.ts
 * @Description: DwPortfolio相关类型
 */
interface IndustryBondStockData {
    backWeight: number | null
    bondWeight: number
    stockWeight: number
    tradeDt: string
}

interface IndustryMainData {
    backWeight: number
    commonWeight: number
    consumerWeight: number
    financialWeight: number
    frontWeight: number
    medicineWeight: number
    middleWeight: number
    tmtWeight: number
    tradeDt: string
}

interface PieBondStockData {
    value: number
    name: string
}

export { IndustryBondStockData, IndustryMainData, PieBondStockData }
