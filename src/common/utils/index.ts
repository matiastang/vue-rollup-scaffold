/*
 * @Author: matiastang
 * @Date: 2021-11-16 10:37:34
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-16 11:22:34
 * @FilePath: /datumwealth-openalpha-front/src/common/utils/index.ts
 * @Description: 工具函数
 */
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
