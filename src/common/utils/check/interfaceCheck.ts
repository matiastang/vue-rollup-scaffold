/*
 * @Author: matiastang
 * @Date: 2021-11-11 17:58:07
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-12 09:50:09
 * @FilePath: /datumwealth-openalpha-front/src/common/utils/check/interfaceCheck.ts
 * @Description: 接口信息校验
 */

/**
 * 接口id校验
 * @param id 接口id
 * @returns 是否符合规则
 */
function interface_id_check(id: string) {
    if (id && id.trim() !== '') {
        return true
    }
    console.warn('接口id为无效值')
    return false
}

export { interface_id_check }
