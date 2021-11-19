/*
 * @Author: matiastang
 * @Date: 2021-11-18 19:23:01
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-19 11:17:42
 * @FilePath: /datumwealth-openalpha-front/src/common/request/modules/home/home.ts
 * @Description: 首页相关接口
 */
import http from '../../request'
import { Md5 } from 'ts-md5/dist/md5'
import { MbMemberAuthLogs } from '@/user'
import { HotType } from './homeInterface'
import { apiPrefix, contentPrefix } from '../../prefix'

enum HomeListType {
    // 首页banner
    banner = 'INDEX_BANNER',
    // 帮助中心
    help = 'HELP_CENTER',
    // 合作伙伴
    partner = 'PARTNER',
}

/**
 * 首页banner
 * @returns
 */
const homeBanner = () => {
    return new Promise<string[]>((resolve, reject) => {
        http.get(`${contentPrefix}/article/list`, {
            data: {
                categoryCode: HomeListType.banner,
            },
        })
            .then((res) => {
                const data = res.data
                if (typeof data === 'object' && Array.isArray(data)) {
                    resolve(
                        data
                            .map((item) => {
                                return item.content as string
                            })
                            .filter((item) => {
                                return item
                            })
                    )
                    return
                }
                reject('获取banner错误')
                return
            })
            .catch(reject)
    })
}

/**
 * 获取首页推荐热门接口列表(含内容)
 */
const homeHotInterface = () => {
    return new Promise<HotType[]>((resolve, reject) => {
        http.get(`${apiPrefix}/openApi/homeReco`)
            .then((res) => {
                const data = res.data
                if (typeof data === 'object' && Array.isArray(data)) {
                    resolve(
                        data.map((item) => {
                            return item as HotType
                        })
                    )
                    return
                }
                reject('首页热榜错误')
                return
            })
            .catch(reject)
    })
}

export { homeBanner, homeHotInterface }