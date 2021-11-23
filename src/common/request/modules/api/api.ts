/*
 * @Author: matiastang
 * @Date: 2021-11-23 09:50:48
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-23 18:18:59
 * @FilePath: /datumwealth-openalpha-front/src/common/request/modules/api/api.ts
 * @Description: 开放接口
 */
import http from '../../request'
import { ListRecoType } from './apiInterface'
import { apiPrefix } from '../../prefix'
/**
 * 获取列表页热门推荐接口
 */
const apiHotInterface = () => {
    return new Promise<ListRecoType[]>((resolve, reject) => {
        http.get(`${apiPrefix}/openApi/listReco`)
            .then((res) => {
                const data = res.data
                if (typeof data === 'object' && Array.isArray(data)) {
                    resolve(
                        data.map((item) => {
                            return item as ListRecoType
                        })
                    )
                    return
                }
                reject('列表页热门推荐数据错误')
                return
            })
            .catch(reject)
    })
}

/**
 * /apiInfoCode/{apiInfoCode}/{apiVersion}调用接口
 */
const apiInfoCode = (apiInfoCode: string, apiVersion: string, data: any) => {
    return new Promise<ListRecoType[]>((resolve, reject) => {
        http.request({
            url: `${apiPrefix}/apiInfoCode/${apiInfoCode}/${apiVersion}`,
            method: 'GET',
            data,
        })
            .then((res) => {
                const data = res.data
                if (typeof data === 'object' && Array.isArray(data)) {
                    resolve(
                        data.map((item) => {
                            return item as ListRecoType
                        })
                    )
                    return
                }
                reject('列表页热门推荐数据错误')
                return
            })
            .catch(reject)
    })
}

export { apiHotInterface, apiInfoCode }