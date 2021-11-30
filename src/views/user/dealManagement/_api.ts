import request, { RequestMethod } from '@/api/request'
import http from '@/common/request/request'
import { tradePrefix } from '@/common/request/prefix'
import { Order, Invoic } from '@/@types'

interface OrderListResponse {
    rows: Array<Order.AsObject>
    total: number
}

// 删除订单
export function getDownloadOrder(id: number) {
    return http.get<string>(`${tradePrefix}/od/download`, { orderId: id })
    // return request({
    //     url: '/api/trade/od/delete',
    //     method: RequestMethod.get,
    //     params: query,
    // })
}

// 查询订单列表
export function getOrderList(data: Order.QueryList) {
    return http.post<OrderListResponse>(
        `${tradePrefix}/od/list`,
        {},
        {
            params: {
                ...data,
                orderByColumn: 'addTime',
                isAsc: 'desc',
            },
        }
    )
    // return request({
    //     url: '/api/trade/od/list',
    //     method: RequestMethod.post,
    //     data,
    //     params: {
    //         ...data,
    //         orderByColumn: 'addTime',
    //         isAsc: 'desc',
    //     },
    // })
}

// 删除订单
export function getDeleteOrder(query: Order.DeletQuery) {
    return http.get<string>(`${tradePrefix}/od/delete`, query)
    // return request({
    //     url: '/api/trade/od/delete',
    //     method: RequestMethod.get,
    //     params: query,
    // })
}

// 取消订单
export function getOrderCancel(query: Order.CancelQuery) {
    return http.get<string>(`${tradePrefix}/od/cancel`, query)
    // return request({
    //     url: '/api/trade/od/cancel',
    //     method: RequestMethod.get,
    //     params: query,
    // })
}

// 获取订单详细信息
export function getOrderDetail(id: number) {
    return http.get<Order.AsObject>(`${tradePrefix}/od/${id}`)
    // return request({
    //     url: `/api/trade/od/${id}`,
    //     method: RequestMethod.get,
    // })
}

// 新增订单
export function postAddOrder(data: Order.QueryList) {
    return http.post<any>(`${tradePrefix}/od`, data)
    // return request({
    //     url: `/api/trade/od/`,
    //     method: RequestMethod.post,
    //     data,
    // })
}
// 添加支付凭证
export function postAddOrderVoucher(data: Order.Voucher) {
    return http.post<string>(`${tradePrefix}/od/voucher`, data)
    // return request({
    //     url: `/api/trade/od/voucher`,
    //     method: RequestMethod.post,
    //     data,
    // })
}

// 新增发票
export function postAddInv(data: Invoic.AddQuery) {
    return http.post<any>(`${tradePrefix}/inv`, data)
    // return request({
    //     url: `/api/trade/inv`,
    //     method: RequestMethod.post,
    //     data,
    // })
}

// 发票信息
export function getInv(invId: number) {
    return http.get<any>(`${tradePrefix}/inv/${invId}`)
    // return request({
    //     url: `/api/trade/inv/${invId}`,
    //     method: RequestMethod.get,
    // })
}
// 删除发票
export function deleteInv(invId: number) {
    return http.delete<any>(`${tradePrefix}/inv/${invId}`, {})
    // return request({
    //     url: `/api/trade/inv/${invId}`,
    //     method: RequestMethod.delete,
    // })
}

// 查询发票列表
export function postInvList(data: Invoic.Query) {
    return http.post<any>(
        `${tradePrefix}/inv/list`,
        {},
        {
            params: {
                ...data,
                orderByColumn: 'applyTime',
                isAsc: 'desc',
            },
        }
    )
    // return request({
    //     url: `/api/trade/inv/list`,
    //     method: RequestMethod.post,
    //     data,
    //     params: {
    //         ...data,
    //         orderByColumn: 'applyTime',
    //         isAsc: 'desc',
    //     },
    // })
}

// 修改发票信息
export function postInvUpdate(data: Invoic.Update) {
    return http.post<any>(`${tradePrefix}/inv/update`, data)
    // return request({
    //     url: `/api/trade/inv/update`,
    //     method: RequestMethod.post,
    //     data,
    // })
}
