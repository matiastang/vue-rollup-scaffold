/*
 * @Author: matiastang
 * @Date: 2021-11-22 10:02:44
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-24 17:21:18
 * @FilePath: /datumwealth-openalpha-front/src/common/request/modules/pay/pay.ts
 * @Description: 支付相关接口
 */
import http from '../../request'
import { OdParameters, PaymentType, WeiXinOdResponse, OrderInfoResponse } from './payInterface'
import { tradePrefix } from '../../prefix'
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
    return new Promise<WeiXinOdResponse>((resolve, reject) => {
        http.post(`${tradePrefix}/od`, parameter)
            .then((res) => {
                const data = res.data
                if (data && typeof data === 'object') {
                    const resData = res.data as WeiXinOdResponse
                    resolve(resData)
                    return
                }
                reject(`新增订单错误`)
                return
            })
            .catch(reject)
    })
}

/**
 * 获取订单详情
 * @returns
 */
const getOdInfo = (orderId: string) => {
    return new Promise<OrderInfoResponse>((resolve, reject) => {
        http.get(`${tradePrefix}/od/${orderId}`)
            .then((res) => {
                const data = res.data
                if (data && typeof data === 'object') {
                    const resData = res.data as OrderInfoResponse
                    resolve(resData)
                    return
                }
                reject(`新增订单错误`)
                return
            })
            .catch(reject)
    })
}

/**
 * 获取支付方式列表
 * @returns
 */
const payList = () => {
    return new Promise<PaymentType[]>((resolve, reject) => {
        http.get(`${tradePrefix}/pay/list`)
            .then((res) => {
                const data = res.data
                if (data && typeof data === 'object') {
                    const resData = res.data as { rows: Array<PaymentType> }
                    resolve(
                        resData.rows.map((item, index) => {
                            item.selected = index === 0
                            return item
                        })
                    )
                    return
                }
                reject('获取支付方式错误')
                return
            })
            .catch(reject)
    })
}

/**
 * 查询支付状态
 * @returns
 */
const payStatus = (orderId: number) => {
    return new Promise<boolean>((resolve, reject) => {
        http.get(`${tradePrefix}/pay/status?orderId=${orderId}`)
            .then((res) => {
                const data = res.data
                if (data && typeof data === 'boolean') {
                    resolve(data)
                    return
                }
                reject('查询支付状态错误')
                return
            })
            .catch(reject)
    })
}

export { orderType, addOd, getOdInfo, payList, payStatus }
