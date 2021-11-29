/*
 * @Author: matiastang
 * @Date: 2021-11-22 10:02:44
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-29 15:05:40
 * @FilePath: /datumwealth-openalpha-front/src/common/request/modules/pay/pay.ts
 * @Description: 支付相关接口
 */
import http from '@/common/request/request'
import { tradePrefix, memberPrefix } from '@/common/request/prefix'
import {
    OdParameters,
    PaymentType,
    WeiXinOdResponse,
    OrderInfoResponse,
    RechargeResponse,
    PayListType,
    DiscountResponse,
    RechargeListRequest,
    RechargeListResponse,
    RechargeDetailRequest,
    RechargeDetailListResponse,
} from './payInterface'
/**
 * 订单类型
 */
enum orderType {
    // 充值
    recharge = 1,
    // 套餐
    discount = 2,
    // 试用
    test = 3,
}

/**
 * 新增订单
 * @returns
 */
const addOd = (parameter: OdParameters) => {
    return http.post<WeiXinOdResponse>(`${tradePrefix}/od`, parameter)
}

/**
 * 获取订单详情
 * @returns
 */
const getOdInfo = (orderId: string) => {
    return http.get<OrderInfoResponse>(`${tradePrefix}/od/${orderId}`)
}

/**
 * 获取支付方式列表
 * @returns
 */
const payList = () => {
    return new Promise<PaymentType[]>((resolve, reject) => {
        http.request<PayListType>({
            url: `${tradePrefix}/pay/list`,
            method: 'GET',
        })
            .then((res) => {
                resolve(
                    res.data.rows.map((item, index) => {
                        item.selected = index === 0
                        return item
                    })
                )
            })
            .catch(reject)
    })
}

/**
 * 查询支付状态
 * @returns
 */
const payStatus = (orderId: number) => {
    return http.get<boolean>(`${tradePrefix}/pay/status?orderId=${orderId}`)
}

/**
 * 支付提交
 * @returns
 */
const paySubmit = (orderId: number, payId: number) => {
    return http.get<WeiXinOdResponse>(`${tradePrefix}/pay/submit`, {
        orderId, // 订单Id
        payId, // 支付id
    })
}

/**
 * 充值调用账单-查询账户信息
 * @returns
 */
const userRechargeInfo = () => {
    return http.get<RechargeResponse>(`${memberPrefix}/stat/recharge/account`)
}

/**
 * 充值调用账单-账单列表
 * @returns
 */
const userRechargeList = (parameters: RechargeListRequest) => {
    return http.get<RechargeListResponse>(`${memberPrefix}/stat/recharge/bill/list`, parameters)
}

/**
 * 充值调用账单-账单详情
 * @returns
 */
const userRechargeDetail = (parameters: RechargeDetailRequest) => {
    return http.get<RechargeDetailListResponse>(
        `${memberPrefix}/stat/recharge/bill/detail`,
        parameters
    )
}

/**
 * 充值调用账单-账单-导出
 * @returns
 */
const userRechargeExport = (parameters: RechargeDetailRequest) => {
    let fileName = '账单'
    const type = parameters.billType
    if (type === 'day') {
        fileName = `${parameters.billDay}日账单`
    } else {
        fileName = `${parameters.billMonth}月账单`
    }
    return http.download(fileName, {
        url: `${memberPrefix}/stat/recharge/bill/detail/export`,
        method: 'POST',
        data: parameters,
    })
}

/**
 * 优惠套餐-查询账户的套餐信息
 * @returns
 */
const userDiscountInfo = () => {
    return http.get<DiscountResponse>(`${memberPrefix}/stat/combo/account`)
}

/**
 * 充值调用账单-账单列表
 * @returns
 */
const userDiscountList = (parameters: RechargeListRequest) => {
    return http.get<RechargeListResponse>(`${memberPrefix}/stat/combo/bill/list`, parameters)
}

/**
 * 充值调用账单-账单详情
 * @returns
 */
const userDiscountDetail = (parameters: RechargeDetailRequest) => {
    return http.get<RechargeDetailListResponse>(
        `${memberPrefix}/stat/combo/bill/detail`,
        parameters
    )
}

/**
 * 充值调用账单-账单-导出
 * @returns
 */
const userDiscountExport = (parameters: RechargeDetailRequest) => {
    let fileName = ''
    const type = parameters.billType
    if (type === 'day') {
        fileName = `${parameters.billDay}日账单`
    } else {
        fileName = `${parameters.billMonth}月账单`
    }
    return http.download(fileName, {
        url: `${memberPrefix}/stat/combo/bill/detail/export`,
        method: 'POST',
        data: parameters,
    })
}

export {
    orderType,
    addOd,
    getOdInfo,
    payList,
    payStatus,
    paySubmit,
    userRechargeInfo,
    userRechargeList,
    userRechargeDetail,
    userRechargeExport,
    userDiscountInfo,
    userDiscountList,
    userDiscountDetail,
    userDiscountExport,
}
