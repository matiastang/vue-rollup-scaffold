/*
 * @Author: matiastang
 * @Date: 2021-11-22 10:02:44
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-25 11:20:12
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
        http.get<PaymentType[]>(`${tradePrefix}/pay/list`)
            .then((res) => {
                resolve(
                    res.map((item, index) => {
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
 * 充值调用账单-查询账户信息
 * @returns
 */
const userRechargeInfo = () => {
    return http.get<RechargeResponse>(`${memberPrefix}/stat/recharge/account`)
}

export { orderType, addOd, getOdInfo, payList, payStatus, userRechargeInfo }
