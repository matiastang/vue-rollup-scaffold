/*
 * @Author: matiastang
 * @Date: 2021-11-12 09:49:44
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-12 10:46:07
 * @FilePath: /datumwealth-openalpha-front/src/common/utils/check/userInfoCheck.ts
 * @Description: 用户信息校验
 */
/**
 * 手机号校验
 * @param phone 手机号
 * @returns 结果
 */
function phone_check(phone: string): string | null {
    if (phone.trim() == '') {
        return '请输入手机号'
    }
    if (phone.length < 11) {
        return '请输入11位手机号'
    }
    return null
}

/**
 * 验证码校验
 * @param code 手机号
 * @returns 结果
 */
function code_check(code: string): string | null {
    if (code.trim() == '') {
        return '请输入验证码'
    }
    if (code.length !== 6) {
        return '请输入4位验证码'
    }
    return null
}

/**
 * 密码校验
 * @param password 密码
 * @returns 结果
 */
function password_check(password: string): string | null {
    if (password.trim() == '') {
        return '请输入密码'
    }
    return null
}

export { phone_check, code_check, password_check }
