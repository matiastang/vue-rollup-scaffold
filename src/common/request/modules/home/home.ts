/*
 * @Author: matiastang
 * @Date: 2021-11-18 19:23:01
 * @LastEditors: matiastang
 * @LastEditTime: 2021-11-19 16:28:03
 * @FilePath: /datumwealth-openalpha-front/src/common/request/modules/home/home.ts
 * @Description: 首页相关接口
 */
import http from '../../request'
import { Md5 } from 'ts-md5/dist/md5'
import { MbMemberAuthLogs } from '@/user'
import { HotType, SolutionType } from './homeInterface'
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
        http.get(`${contentPrefix}/article/list?categoryCode=${HomeListType.banner}`)
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
 * 获取首页接口分类导航树接口
 */
const homeInterfaceNavigationTree = () => {
    return new Promise<HotType[]>((resolve, reject) => {
        http.get(`${apiPrefix}/openApi/navBar/tree`)
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

/**
 * 首页解决方案
 * @returns
 */
const homeSolution = () => {
    return new Promise<SolutionType[]>((resolve, reject) => {
        http.get(`${contentPrefix}/solution/home`)
            .then((res) => {
                const data = res.data
                if (typeof data === 'object' && Array.isArray(data)) {
                    resolve(
                        data.map((item) => {
                            return item as SolutionType
                        })
                    )
                    return
                }
                reject('获取solution错误')
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

/**
 * 首页合作伙伴
 * @returns
 */
const homePartner = () => {
    return new Promise<string[]>((resolve, reject) => {
        http.get(`${contentPrefix}/article/list?categoryCode=${HomeListType.partner}`)
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
                reject('获取partner错误')
                return
            })
            .catch(reject)
    })
}

export { homeBanner, homeInterfaceNavigationTree, homeSolution, homeHotInterface, homePartner }
