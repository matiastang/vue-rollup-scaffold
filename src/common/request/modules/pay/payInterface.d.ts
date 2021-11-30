/*
 * @Author: matiastang
 * @Date: 2021-11-22 10:03:01
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-30 12:08:42
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
 * 支付方式列表
 */
export interface PayListType {
    rows: PaymentType[]
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
    orderSn: string
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

/**
 * 充值调用账单-账单列表-item-响应类型
 */
export interface RechargeItemResponse {
    billDate: string //日期
    effectiveTimes: number //有效调用次数
    price: number //消费金额
    totalTimes: number //总调用次数
}

/**
 * 充值调用账单-账单列表-响应类型
 */
export interface RechargeListResponse {
    pages: number
    total: number
    list: RechargeItemResponse[]
}

/**
 * 充值调用账单-账单详情-item-响应类型
 */
export interface RechargeDetailItemResponse {
    apiInfoId: string //接口ID
    apiName: string //接口名称
    apiPrice: number //单价(元/次)
    apiVersion: string //接口最新版本
    costPrice: number //消费金额
    costTimes: number //计费次数
    countSum: number //总调用量
    validSum: number //有效调用量
}

/**
 * 充值调用账单-账单详情-响应类型
 */
export interface RechargeDetailListResponse {
    pages: number
    total: number
    list: RechargeDetailItemResponse[]
}

/**
 * 充值调用账单-账单列表-请求类型
 */
export interface RechargeListRequest {
    billType: string //账单类型：day-日账单 month-月账单
    endDate?: string //结束日期
    isAsc?: string
    orderBy?: string
    orderByColumn?: string
    pageNum: number
    pageSize: number
    startDate?: string
}

/**
 * 充值调用账单-账单列表-请求类型
 */
export interface RechargeDetailRequest {
    billDay?: string //账单日
    billMonth?: string //账单月
    keywords?: string //搜索
    billType: string //账单类型：day-日账单 month-月账单
    endDate?: string //结束日期
    isAsc?: string
    orderBy?: string
    orderByColumn?: string
    pageNum: number
    pageSize: number
    startDate?: string
}

/**
 * 账户优惠套餐信息
 */
export interface DiscountResponse {
    createTime: string | null //创建时间
    effectiveUseNum: number | null //有效调用次数
    expiredEndDate: string | null //套餐有效期结束时间
    expiredStartDate: string | null //套餐有效期开始时间
    id: number | null
    times: number | null //套餐次数
    token: string | null //token
    totalConsume: number | null //总消费次数
    totalTimes: number | null //总套餐次数
    updateTime: string | null //修改时间
    userId: number | null //用户ID
}
