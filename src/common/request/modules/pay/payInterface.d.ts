/*
 * @Author: matiastang
 * @Date: 2021-11-22 10:03:01
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-25 11:18:45
 * @FilePath: /datumwealth-openalpha-front/src/common/request/modules/pay/payInterface.d.ts
 * @Description: 支付相关类型
 */
/**
 * 支付方式类型
 */
export interface PaymentType {
    payId: number
    payName: string
    selected: boolean
}

/**
 * 新增订单类型
 */
export interface OdParameters {
    // 商品总金额
    goodsAmount: number
    // 订单类型1：充值,2：套餐
    orderType: number
    // 支付方式id
    payId: number
}

/**
 * 新增微信订单返回类型
 */
export interface WeiXinOdResponse {
    payUrl: string
    codeUrl: string // "weixin://wxpay/bizpayurl?pr=j1lOIc5zz",
    orderId: number // 19
}

export interface OrderInfoResponse {
    confirmTime: string
    modifyTime: string // "2021-11-22 18:29:29"
    addTime: string //"2021-11-22 10:02:46"
    goodsAmount: number // 0.01
    payName: string // "对公转账"
    orderSn: string //"DW01202111220075"
    postscript: string // "余额充值"
}

/**
 * 充值账户信息
 */
export interface RechargeResponse {
    balance: number | null
    createTime: string | null
    id: integer | null
    token: string | null
    totalAmount: number | null
    totalConsume: number | null
    updateTime: string | null
    userId: BigInteger | null
}
