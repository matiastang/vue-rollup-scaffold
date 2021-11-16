/*
 * @Author: matiastang
 * @Date: 2021-11-16 10:37:34
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-16 11:22:34
 * @FilePath: /datumwealth-openalpha-front/src/common/utils/index.ts
 * @Description: 工具函数
 */
import { Exact, Maybe, OrderTypeEnum, PayStatusEnum } from '@/@types'
/**
 * 手机号脱敏
 * @param phone
 * @returns
 */
const phoneDesensitization = (phone: string) => {
    if (phone.length <= 3) {
        return phone
    }
    if (phone.length === 4) {
        return phone.substring(0, 3) + '*'
    }
    if (phone.length === 5) {
        return phone.substring(0, 3) + '**'
    }
    if (phone.length === 6) {
        return phone.substring(0, 3) + '***'
    }
    return phone.substring(0, 3) + '****' + phone.substring(7, phone.length)
}
// console.log(phoneDesensitization(''))
// console.log(phoneDesensitization('1'))
// console.log(phoneDesensitization('18'))
// console.log(phoneDesensitization('183'))
// console.log(phoneDesensitization('1838'))
// console.log(phoneDesensitization('18380'))
// console.log(phoneDesensitization('183804'))
// console.log(phoneDesensitization('1838044'))
// console.log(phoneDesensitization('18380449'))
// console.log(phoneDesensitization('183804496'))
// console.log(phoneDesensitization('1838044961'))
// console.log(phoneDesensitization('18380449615'))
/**
1
18
183
183*
183**
183***
183****
183****9
183****96
183****961
183****9615
 */

export { phoneDesensitization }

// 添加日期范围
export function addDateRange(params: Exact<{}>, dateRange: Array<String>, propName?: string) {
    let search = { ...params, beginTime: '', endTime: '' } as Exact<{
        beginTime: String
        endTime: String
    }>
    dateRange = Array.isArray(dateRange) ? dateRange : []
    if (typeof propName === 'undefined') {
        search['beginTime'] = dateRange[0]
        search['endTime'] = dateRange[1]
    }
    return search
}
/**
 *
 * @param type
 * @returns
 */
export function orderTypeToText(type: OrderTypeEnum) {
    const result = {
        1: '充值',
        2: '套餐',
    }
    return result[type] || ''
}
/**
 *
 * @param type
 * @returns
 */
export function payStatusToText(type: PayStatusEnum) {
    const result = {
        0: '未支付',
        1: '支付中',
        2: '已支付',
        3: '已退款',
        4: '退款中',
        5: '退款失败',
        6: '已取消',
        7: '部分退款',
    }
    return result[type] || ''
}
