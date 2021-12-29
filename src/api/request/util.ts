/*
 * @Author: matiastang
 * @Date: 2021-11-16 11:03:28
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-02 15:25:39
 * @FilePath: /datumwealth-openalpha-front/src/common/request/util.ts
 * @Description: 接口工具类
 */
import objectHash from 'object-hash'

/**
 * 获取对象的hash值
 * @param {Object} object hash对象
 * @return {String} hash值
 */
function getObjectHash(object: object | null) {
    /**
     * 默认方式,包括了键值对
     */
    return objectHash(object)
}

export { getObjectHash }
