/*
 * @Author: matiastang
 * @Date: 2022-01-13 15:27:56
 * @LastEditors: matiastang
 * @LastEditTime: 2022-01-19 15:13:29
 * @FilePath: /dw-vue-components/components/utils/fromatter.ts
 * @Description: 转换函数
 */

const bigDataFormatter = (number: number, fixedLen: number = 2) => {
    if (number > 0) {
        if (number >= 1000000000000) {
            return removeZeroSuffix((number / 1000000000000).toFixed(fixedLen)) + '万亿'
        } else if (number >= 100000000) {
            return removeZeroSuffix((number / 100000000).toFixed(fixedLen)) + '亿'
        } else if (number >= 10000) {
            return removeZeroSuffix((number / 10000).toFixed(fixedLen)) + '万'
        } else {
            return removeZeroSuffix(number.toFixed(2))
        }
    } else {
        if (number <= -1000000000000) {
            return removeZeroSuffix((number / 1000000000000).toFixed(fixedLen)) + '万亿'
        } else if (number <= -100000000) {
            return removeZeroSuffix((number / 100000000).toFixed(fixedLen)) + '亿'
        } else if (number <= -10000) {
            return removeZeroSuffix((number / 10000).toFixed(fixedLen)) + '万'
        } else {
            return removeZeroSuffix(number.toFixed(fixedLen))
        }
    }
}

const moneyFormatter = (number: number, fixedLen: number = 2, suffix: string = '元') => {
    return bigDataFormatter(number, fixedLen) + suffix
}

/**
 * 去除数字字符串小数点儿后全为0的情况
 */
const removeZeroSuffix = (value: string) => {
    const arr = value.split('.')
    if (arr.length !== 2) {
        return value
    }
    const suffix = arr[1]
    const newSuffix = [] as string[]
    for (let index = suffix.length - 1; index >= 0; index--) {
        const char = suffix[index]
        if (char === '0' && newSuffix.length <= 0) {
            continue
        }
        newSuffix.push(char)
    }
    if (newSuffix.length <= 0) {
        return arr[0]
    }
    return `${arr[0]}.${newSuffix.reverse().join('')}`
}

export { bigDataFormatter, moneyFormatter, removeZeroSuffix }
