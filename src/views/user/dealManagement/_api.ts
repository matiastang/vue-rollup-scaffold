import request, { RequestMethod } from '@/api/request'
import { Order } from '@/@types/order'

// 查询订单列表
export function getOrderList(query: Order.QueryList) {
    return request({
        url: '/api/trade/od/list',
        method: RequestMethod.get,
        params: query,
    })
}

// 删除订单
export function getDeleteOrder(query: Order.QueryList) {
    return request({
        url: '/api/trade/od/delete',
        method: RequestMethod.get,
        params: query,
    })
}

// 取消订单
export function getOrderCancel(query: Order.CancelQuery) {
    return request({
        url: '/api/trade/od/cancel',
        method: RequestMethod.get,
        params: query,
    })
}

// 获取订单详细信息
export function getOrderDetail(id: string) {
    return request({
        url: `/api/trade/od/${id}`,
        method: RequestMethod.get,
    })
}

// 新增订单
export function postAddOrder(data: Order.QueryList) {
    return request({
        url: `/api/trade/od/`,
        method: RequestMethod.post,
        data,
    })
}
