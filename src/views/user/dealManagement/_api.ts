import http from '@/common/request/request'
import { tradePrefix } from '@/common/request/prefix'
import { Order, Invoic } from '@/@types'

interface OrderListResponse {
    rows: Array<Order.AsObject>
    total: number
}

// 删除订单
export function getDownloadOrder(orderSn: string, id: number) {
    return http.download(
        `${orderSn}.pdf`,
        {
            url: `${tradePrefix}/od/download`,
            method: 'GET',
            params: { orderId: id },
        },
        true
    )
}

// 查询订单列表
export function getOrderList(data: Order.QueryList) {
    return http.post<OrderListResponse>(
        `${tradePrefix}/od/list`,
        {
            ...data,
            orderByColumn: 'addTime',
            isAsc: 'desc',
        },
        {
            params: {
                ...data,
                orderByColumn: 'addTime',
                isAsc: 'desc',
            },
        }
    )
}

// 删除订单
export function getDeleteOrder(query: Order.DeletQuery) {
    return http.get<string>(`${tradePrefix}/od/delete`, query)
}

// 取消订单
export function getOrderCancel(query: Order.CancelQuery) {
    return http.get<string>(`${tradePrefix}/od/cancel`, query)
}

// 获取订单详细信息
export function getOrderDetail(id: number) {
    return http.get<Order.AsObject>(`${tradePrefix}/od/${id}`)
}

// 新增订单
export function postAddOrder(data: Order.QueryList) {
    return http.post<any>(`${tradePrefix}/od`, data)
}
// 添加支付凭证
export function postAddOrderVoucher(data: Order.Voucher) {
    return http.post<string>(`${tradePrefix}/od/voucher`, data)
}

// 新增发票
export function postAddInv(data: Invoic.AddQuery) {
    return http.post<any>(`${tradePrefix}/inv`, data)
}

// 发票信息
export function getInv(invId: number) {
    return http.get<any>(`${tradePrefix}/inv/${invId}`)
}
// 删除发票
export function deleteInv(invId: number) {
    return http.delete<any>(`${tradePrefix}/inv/${invId}`, {})
}

// 查询发票列表
export function postInvList(data: Invoic.Query) {
    return http.post<any>(
        `${tradePrefix}/inv/list`,
        {
            ...data,
            orderByColumn: 'addTime',
            isAsc: 'desc',
        },
        {
            params: {
                ...data,
                orderByColumn: 'applyTime',
                isAsc: 'desc',
            },
        }
    )
}

// 修改发票信息
export function postInvUpdate(data: Invoic.Update) {
    return http.post<any>(`${tradePrefix}/inv/update`, data)
}
// 获取联系人
export function getInvHistory() {
    return http.get<Invoic.AsObject>(`${tradePrefix}/inv/history`)
}
