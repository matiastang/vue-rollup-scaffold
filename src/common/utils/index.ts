/*
 * @Author: matiastang
 * @Date: 2021-11-16 10:37:34
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-16 10:56:08
 * @FilePath: /datumwealth-openalpha-front/src/common/utils/index.ts
 * @Description: 工具函数
 */
/**
 * 手机号脱敏
 * @param phone
 * @returns
 */
const phoneDesensitization = (phone: string) => {
    if (phone.length < 3) {
        return phone
    }
    if (phone.length < 7) {
        return phone.replace(phone.substring(3, phone.length), '***')
    }
    return phone.replace(phone.substring(3, 7), '****')
}
console.log(phoneDesensitization(''))
console.log(phoneDesensitization('1'))
console.log(phoneDesensitization('18'))
console.log(phoneDesensitization('183'))
console.log(phoneDesensitization('1838'))
console.log(phoneDesensitization('18380'))
console.log(phoneDesensitization('183804'))
console.log(phoneDesensitization('1838044'))
console.log(phoneDesensitization('18380449'))
console.log(phoneDesensitization('183804496'))
console.log(phoneDesensitization('1838044961'))
console.log(phoneDesensitization('18380449615'))

export { phoneDesensitization }
